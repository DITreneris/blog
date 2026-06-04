#!/usr/bin/env python3
"""Assign realistic publish dates from a fixed editorial order.

Start: 2024-01-06, ~24-day cadence (jittered), curriculum order from hub + categories.
Removes bulk ``modified: 2026-06-04`` unless a real refresh offset applies to pillars.
"""
from __future__ import annotations

import re
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "content" / "articles"

# Curriculum: framework → prompts → implementation → agents → governance → case/template → opinion
PUBLICATION_ORDER: list[str] = [
    "the-model-is-not-the-system",
    "prompt-anatomy-foundations",
    "prompt-engineering-vs-ai-workflow-engineering",
    "types-of-prompts-for-business-workflows",
    "structured-prompt-system-blueprint",
    "what-is-context-architecture",
    "memory-types-for-ai-systems",
    "evaluation-hooks-for-ai-workflows",
    "ai-implementation-maturity-ladder",
    "10-signs-your-company-is-vibe-prompting",
    "chaos-vs-control-prompting",
    "your-company-does-not-need-more-ai-tools",
    "what-scales-ai-beyond-basics",
    "how-to-design-an-ai-agent-workflow",
    "from-prompt-to-agent",
    "multi-agent-handoff-pattern",
    "ai-tender-response-pipeline",
    "ai-outreach-with-outlook-guardrails",
    "handoff-rules-between-humans-and-ai",
    "team-rituals-for-ai-implementation",
    "from-prompts-to-business-outcomes",
    "prompt-anatomy-ecosystem-map",
    "ai-governance-roles-and-ownership",
    "data-boundaries-for-ai-agents",
    "audit-trails-for-ai-workflows",
    "ai-risk-review-cadence",
    "case-study-vibe-prompting-to-structured-workflow",
    "ai-workflow-canvas-template",
    "when-ai-hallucinates-confidence",
    "why-ai-hallucinates",
    "context-window-myths",
    "tokens-as-fuel-for-ai-output",
    "tokens-and-context-window-limits",
    "three-types-of-rag",
    "three-types-of-ai-memory-short",
    "five-levels-of-ai-control",
    "prompt-engineering-memes-vs-reality",
    "what-your-ai-stack-reveals",
]

# Drafts continue the cadence after published catalog (not shown on site while draft)
DRAFT_ORDER: list[str] = [
    "prompt-anatomy-workflow-basics",
    "context-layers-in-prompt-design",
    "prompt-anatomy-framework-overview",
    "why-structured-ai-beats-more-tools",
    "implementation-notes-hero-structure",
    "ai-bot-for-research-scraping",
    "telegram-bot-for-ops-alerts",
    "twitter-engagement-bot-with-limits",
]

# Slight jitter (days) per step so the calendar is not perfectly periodic
# ~23-day average: 38 published posts from 2024-01-06 land near May 2026
INTERVAL_DAYS = [22, 24, 21, 23, 22, 24, 21, 23, 22, 24, 21, 23, 22, 24, 21, 23]

PILLAR_SLUGS = frozenset(
    {
        "the-model-is-not-the-system",
        "10-signs-your-company-is-vibe-prompting",
        "what-is-context-architecture",
        "how-to-design-an-ai-agent-workflow",
    }
)

START = date(2024, 1, 6)
TODAY = date.today()


def _schedule(slugs: list[str], start: date) -> dict[str, date]:
    out: dict[str, date] = {}
    d = start
    for i, slug in enumerate(slugs):
        out[slug] = d
        if i < len(slugs) - 1:
            d += timedelta(days=INTERVAL_DAYS[i % len(INTERVAL_DAYS)])
    return out


def _modified_for(slug: str, pub: date) -> date | None:
    """Pillars get a plausible refresh ~10–13 weeks after publish."""
    if slug not in PILLAR_SLUGS:
        return None
    refresh = pub + timedelta(days=70 + (pub.toordinal() % 4) * 7)
    if pub < refresh < TODAY:
        return refresh
    return None


def _patch_frontmatter(text: str, pub: date, mod: date | None) -> str:
    if not text.startswith("---"):
        return text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return text
    fm = parts[1]
    body = parts[2]

    fm = re.sub(r"^date:\s*.+$", f"date: {pub.isoformat()}", fm, flags=re.M)
    if re.search(r"^modified:\s*.+$", fm, flags=re.M):
        if mod:
            fm = re.sub(r"^modified:\s*.+$", f"modified: {mod.isoformat()}", fm, flags=re.M)
        else:
            fm = re.sub(r"^modified:\s*.+\n?", "", fm, flags=re.M)
    elif mod:
        fm = re.sub(r"(^date:\s*.+$)", rf"\1\nmodified: {mod.isoformat()}", fm, flags=re.M)

    return f"---{fm}---{body}"


def main() -> int:
    pub_dates = _schedule(PUBLICATION_ORDER, START)
    last_pub = max(pub_dates.values())
    draft_start = last_pub + timedelta(days=INTERVAL_DAYS[0])
    draft_dates = _schedule(DRAFT_ORDER, draft_start)
    all_dates = {**pub_dates, **draft_dates}

    md_files = {p.stem: p for p in ARTICLES.glob("*.md")}
    missing = [s for s in all_dates if s not in md_files]
    if missing:
        print("Missing article files:", ", ".join(missing), file=sys.stderr)
        return 1

    extra = set(md_files) - set(all_dates)
    if extra:
        print("Articles not in schedule (unchanged):", ", ".join(sorted(extra)), file=sys.stderr)

    for slug, pub in all_dates.items():
        path = md_files[slug]
        mod = _modified_for(slug, pub)
        new_text = _patch_frontmatter(path.read_text(encoding="utf-8"), pub, mod)
        path.write_text(new_text, encoding="utf-8")
        print(f"{pub.isoformat()}  {slug}")

    print(f"\nPublished span: {START.isoformat()} -> {last_pub.isoformat()}")
    print(f"Draft span continues -> {max(draft_dates.values()).isoformat()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
