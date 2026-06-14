#!/usr/bin/env python3
"""Rank published articles by prose/style weakness signals."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

import frontmatter

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "content" / "articles"
REPORTS_DIR = ROOT / "docs" / "reports"

DECK_SECTION_MIN_WORDS = 80
DECK_SECTION_THRESHOLD = 0.5
THIN_H2_MIN_WORDS = 40
LONG_SENTENCE_WORDS = 35
TARGET_AVG_SENTENCE = (15, 22)

BOILERPLATE_MARKER = "The hero diagram summarizes the core idea"
FIELD_NOTES_SUMMARY = re.compile(r"^Field notes on ", re.I)
GENERIC_TAKEAWAY = re.compile(
    r"only creates value when wrapped in workflow, context, and evaluation"
)
STRUCTURED_TAKEAWAY = re.compile(
    r"^Structured implementation turns .+ into repeatable outcomes\.$", re.I
)

TIER_PRIORITY = {
    "pillar": 0,
    "playbook": 0,
    "opinion": 1,
    "template": 2,
    "nav": 3,
    "": 1,
}


def _word_count(text: str) -> int:
    return len(re.findall(r"\w+", text or ""))


def _strip_prose(body: str) -> str:
    text = re.sub(r"```[\s\S]*?```", " ", body)
    text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^\)]+\)", " ", text)
    text = re.sub(r"^\|.+\|$", " ", text, flags=re.M)
    text = re.sub(r"^#{1,6}\s+.*$", " ", text, flags=re.M)
    text = re.sub(r"^[-*]\s+", " ", text, flags=re.M)
    return text


def _sentences(body: str) -> list[str]:
    text = _strip_prose(body)
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def _h2_stats(body: str) -> tuple[int, int, int]:
    sections = re.split(r"\n##\s+", body.strip())
    if len(sections) < 2:
        return 0, 0, 0
    thin_deck = 0
    thin_h2 = 0
    counted = 0
    for section in sections[1:]:
        chunk = section.split("\n##", 1)[0]
        wc = _word_count(chunk)
        counted += 1
        if wc < DECK_SECTION_MIN_WORDS:
            thin_deck += 1
        if wc < THIN_H2_MIN_WORDS:
            thin_h2 += 1
    return counted, thin_deck, thin_h2


def _adjacent_opening_repeat(body: str) -> bool:
    paras = [p.strip() for p in re.split(r"\n\s*\n", body) if p.strip() and not p.strip().startswith("#")]
    openings: list[str] = []
    for para in paras[:12]:
        words = re.findall(r"\w+", para)
        if len(words) >= 3:
            openings.append(" ".join(words[:3]).lower())
    for i in range(1, len(openings)):
        if openings[i] == openings[i - 1]:
            return True
    return False


def score_article(meta: dict, body: str) -> dict:
    flags: list[str] = []
    score = 0.0

    counted, thin_deck, thin_h2 = _h2_stats(body)
    if counted and thin_deck / counted > DECK_SECTION_THRESHOLD:
        ratio = thin_deck / counted
        score += 30 * ratio
        flags.append(f"slide-deck {thin_deck}/{counted} H2s under {DECK_SECTION_MIN_WORDS}w")

    sents = _sentences(body)
    sent_lengths = [_word_count(s) for s in sents] if sents else [0]
    max_sent = max(sent_lengths) if sent_lengths else 0
    avg_sent = sum(sent_lengths) / len(sent_lengths) if sent_lengths else 0

    if max_sent >= LONG_SENTENCE_WORDS:
        excess = min(max_sent - LONG_SENTENCE_WORDS, 80) / 80
        score += 20 * (0.4 + 0.6 * excess)
        flags.append(f"max sentence {max_sent}w")

    if avg_sent > TARGET_AVG_SENTENCE[1] + 8:
        score += 10 * min((avg_sent - TARGET_AVG_SENTENCE[1]) / 20, 1.0)
        flags.append(f"avg sentence {avg_sent:.0f}w")

    if counted and thin_h2 / counted > 0.6:
        score += 15 * (thin_h2 / counted)
        flags.append(f"thin H2 {thin_h2}/{counted} under {THIN_H2_MIN_WORDS}w")

    if not meta.get("hero_caption"):
        score += 5
        flags.append("missing hero_caption")

    summary = str(meta.get("summary") or "")
    takeaway = str(meta.get("key_takeaway") or "")
    if BOILERPLATE_MARKER in body:
        score += 10
        flags.append("boilerplate body")
    if FIELD_NOTES_SUMMARY.match(summary):
        score += 10
        flags.append("stub summary")
    if GENERIC_TAKEAWAY.search(takeaway) or STRUCTURED_TAKEAWAY.match(takeaway):
        score += 10
        flags.append("stub key_takeaway")

    if _adjacent_opening_repeat(body):
        score += 5
        flags.append("repeated paragraph openings")

    tier = str(meta.get("content_tier") or "")
    tier_penalty = TIER_PRIORITY.get(tier, 1) * 2.5
    score += tier_penalty

    return {
        "slug": str(meta.get("slug") or ""),
        "title": str(meta.get("title") or ""),
        "category": str(meta.get("category") or ""),
        "content_tier": tier or "unset",
        "words": _word_count(body),
        "score": round(score, 1),
        "max_sentence_words": max_sent,
        "avg_sentence_words": round(avg_sent, 1),
        "flags": flags,
    }


def build_report() -> dict:
    rows: list[dict] = []
    for path in sorted(ARTICLES.glob("*.md")):
        post = frontmatter.load(path)
        meta = post.metadata
        if meta.get("status") != "published":
            continue
        row = score_article(meta, post.content or "")
        row["slug"] = str(meta.get("slug") or path.stem)
        rows.append(row)

    rows.sort(key=lambda r: (-r["score"], r["slug"]))
    return {
        "generated": date.today().isoformat(),
        "published_count": len(rows),
        "articles": rows,
        "weakest_10": [r["slug"] for r in rows[:10]],
    }


def _format_markdown(report: dict) -> str:
    lines = [
        "# Prose style audit",
        "",
        f"**Generated:** {report['generated']}",
        "",
        f"**Published articles scored:** {report['published_count']}",
        "",
        "Run `make audit-prose` or `python scripts/audit_prose_style.py --markdown` to refresh.",
        "Rubric: [CONTENT_STANDARDS.md § Prose quality](../CONTENT_STANDARDS.md#prose-quality).",
        "",
        "## Weakest 10 (rewrite first)",
        "",
    ]
    for i, slug in enumerate(report["weakest_10"], 1):
        row = next(r for r in report["articles"] if r["slug"] == slug)
        flag_text = "; ".join(row["flags"]) if row["flags"] else "—"
        lines.append(
            f"{i}. `{slug}` — score **{row['score']}** ({row['category']}, "
            f"{row['content_tier']}) — {flag_text}"
        )

    lines.extend(
        [
            "",
            "## Full ranked inventory",
            "",
            "| Rank | Slug | Score | Tier | Category | Words | Max sent | Flags |",
            "|-----:|------|------:|------|----------|------:|---------:|-------|",
        ]
    )
    for i, row in enumerate(report["articles"], 1):
        flags = "; ".join(row["flags"]) if row["flags"] else "—"
        lines.append(
            f"| {i} | `{row['slug']}` | {row['score']} | {row['content_tier']} | "
            f"{row['category']} | {row['words']} | {row['max_sentence_words']} | {flags} |"
        )

    lines.extend(
        [
            "",
            "---",
            "",
            "Phase I backlog batches: ranks 11–20, 21–30, … in [`todo.md`](../../todo.md).",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Prose/style weakness audit")
    parser.add_argument("--json", action="store_true", help="Print JSON to stdout")
    parser.add_argument(
        "--markdown",
        action="store_true",
        help="Write docs/reports/prose-style-audit-YYYY-MM-DD.md",
    )
    args = parser.parse_args()
    report = build_report()

    if args.json:
        print(json.dumps(report, indent=2))
        return 0

    if args.markdown:
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        out_path = REPORTS_DIR / f"prose-style-audit-{report['generated']}.md"
        out_path.write_text(_format_markdown(report), encoding="utf-8")
        print(f"Wrote {out_path.relative_to(ROOT)}")
        return 0

    print(f"Prose style audit ({report['generated']}) — {report['published_count']} published")
    for i, row in enumerate(report["articles"][:15], 1):
        flags = ", ".join(row["flags"][:2]) or "ok"
        print(f"  {i:2}. {row['slug']}: {row['score']} ({flags})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
