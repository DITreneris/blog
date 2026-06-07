#!/usr/bin/env python3
"""Editorial corpus inventory: taxonomy, consistency, validity, credibility signals."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import Counter
from datetime import date
from pathlib import Path

import frontmatter
import yaml

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "content" / "articles"
CLUSTERS_YAML = ROOT / "data" / "editorial_clusters.yaml"
CATEGORIES_YAML = ROOT / "data" / "categories.yaml"
REPORTS_DIR = ROOT / "docs" / "reports"
LINK_PATTERN = re.compile(r"\]\(/articles/([a-z0-9-]+)/")
COMPOSITE_MARKERS = re.compile(r"anonymized composite|composite \(", re.I)
NAV_HUB_SLUGS = frozenset(
    {
        "prompt-anatomy-foundations",
        "prompt-anatomy-glossary",
        "prompt-anatomy-ecosystem-map",
    }
)
NAV_HUB_INBOUND_MIN = 3
PILLAR_SLUGS = frozenset(
    {
        "the-model-is-not-the-system",
        "10-signs-your-company-is-vibe-prompting",
        "how-to-design-an-ai-agent-workflow",
        "what-is-context-architecture",
    }
)
THIN_OPINION_WORDS = 600


def _word_count(text: str) -> int:
    return len(re.findall(r"\w+", text or ""))


def _load_clusters() -> dict:
    if not CLUSTERS_YAML.is_file():
        return {"clusters": {}, "recommended_tags": [], "hub_categories": []}
    with CLUSTERS_YAML.open(encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def _load_reading_paths() -> dict[str, list[str]]:
    if not CATEGORIES_YAML.is_file():
        return {}
    with CATEGORIES_YAML.open(encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
    paths: dict[str, list[str]] = {}
    for cat in data.get("categories", []):
        slugs = [entry["slug"] for entry in cat.get("reading_path", []) if entry.get("slug")]
        paths[cat.get("title", cat.get("slug", ""))] = slugs
    return paths


def _load_articles() -> list[dict]:
    rows = []
    for path in sorted(ARTICLES.glob("*.md")):
        post = frontmatter.load(path)
        meta = post.metadata
        body = post.content or ""
        slug = str(meta.get("slug") or path.stem)
        outbound = LINK_PATTERN.findall(body)
        rows.append(
            {
                "path": path,
                "slug": slug,
                "title": meta.get("title", slug),
                "category": meta.get("category", ""),
                "status": meta.get("status", "unknown"),
                "content_tier": meta.get("content_tier") or "",
                "tags": list(meta.get("tags") or []),
                "words": _word_count(body),
                "outbound": outbound,
                "faq_count": len(meta.get("faq") or []),
                "hero_caption": bool(meta.get("hero_caption")),
                "reading_time": meta.get("reading_time", ""),
                "body": body,
            }
        )
    return rows


def _inbound_counts(published: list[dict]) -> Counter:
    inbound: Counter = Counter()
    pub_slugs = {r["slug"] for r in published}
    for row in published:
        for target in row["outbound"]:
            if target in pub_slugs:
                inbound[target] += 1
    return inbound


def _slug_category_map(published: list[dict]) -> dict[str, str]:
    return {r["slug"]: r["category"] for r in published}


def _journey_coverage(published: list[dict], clusters_cfg: dict) -> dict:
    """Resolve continue-learning slots for published corpus (stub articles)."""
    from resolve_article_journey import (
        attach_journey_to_articles,
        journey_has_primary_slot,
    )

    with CATEGORIES_YAML.open(encoding="utf-8") as f:
        categories_data = yaml.safe_load(f) or {}

    stubs = []
    for row in published:
        stub = type("ArticleStub", (), {})()
        stub.slug = row["slug"]
        stub.title = row["title"]
        stub.content_tier = row["content_tier"]
        stub.tags = row["tags"]
        stub.category = type("Cat", (), {"name": row["category"]})()
        stub.date = None
        stubs.append(stub)

    attach_journey_to_articles(
        stubs,
        categories_data=categories_data,
        clusters_data=clusters_cfg,
    )

    with_primary = 0
    empty: list[str] = []
    for stub in stubs:
        cl = getattr(stub, "continue_learning", {}) or {}
        has_nav = any(
            cl.get(k) is not None for k in ("previous", "next", "hub", "deeper", "practical")
        ) or bool(cl.get("related"))
        if journey_has_primary_slot(cl) or has_nav:
            with_primary += 1
        else:
            empty.append(stub.slug)

    total = len(stubs) or 1
    return {
        "with_primary_slot_pct": round(100 * with_primary / total),
        "with_primary_slot_count": with_primary,
        "empty_journey": empty,
    }


def _nav_hub_inbound(inbound: Counter) -> list[dict]:
    issues = []
    for slug in sorted(NAV_HUB_SLUGS):
        count = inbound.get(slug, 0)
        if count < NAV_HUB_INBOUND_MIN:
            issues.append({"slug": slug, "inbound": count, "min": NAV_HUB_INBOUND_MIN})
    return issues


def _run_validate_summary() -> dict:
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "validate_content.py")],
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    stderr = proc.stderr or ""
    errors = [line.strip() for line in stderr.splitlines() if line.strip().startswith("- ")]
    warnings = [
        line.replace("warning:", "").strip()
        for line in stderr.splitlines()
        if "warning:" in line.lower()
    ]
    return {
        "exit_code": proc.returncode,
        "ok": proc.returncode == 0,
        "error_count": len(errors),
        "warning_count": len(warnings),
        "errors": errors[:50],
        "warnings": warnings[:50],
    }


def build_report(rows: list[dict], clusters_cfg: dict) -> dict:
    published = [r for r in rows if r["status"] == "published"]
    drafts = [r for r in rows if r["status"] == "draft"]
    inbound = _inbound_counts(published)
    slug_cat = _slug_category_map(published)
    pub_slugs = set(slug_cat)

    hub_slugs: set[str] = set()
    for cluster in clusters_cfg.get("clusters", {}).values():
        hub_slugs.update(cluster.get("hub_slugs") or [])

    hub_category_set = set(clusters_cfg.get("hub_categories") or ["Framework", "AI Governance"])

    # Inventory
    by_category = Counter(r["category"] for r in published)
    by_tier = Counter(r["content_tier"] or "unset" for r in published)
    words = [r["words"] for r in published]

    # Taxonomy
    missing_tags = [r["slug"] for r in published if not r["tags"]]
    missing_tier = [r["slug"] for r in published if not r["content_tier"]]

    reading_path_issues: list[dict] = []
    reading_path_category_mismatch: list[dict] = []
    for cat_title, slugs in _load_reading_paths().items():
        for slug in slugs:
            if slug not in pub_slugs:
                reading_path_issues.append(
                    {"category": cat_title, "slug": slug, "issue": "not_published"}
                )
            elif slug_cat.get(slug) != cat_title:
                reading_path_category_mismatch.append(
                    {
                        "hub_category": cat_title,
                        "slug": slug,
                        "article_category": slug_cat[slug],
                    }
                )

    # Consistency
    orphans = [r["slug"] for r in published if inbound[r["slug"]] == 0]
    low_inbound = [
        r["slug"] for r in published if 0 < inbound[r["slug"]] <= 2
    ]

    cluster_gaps: list[dict] = []
    for name, cluster in clusters_cfg.get("clusters", {}).items():
        for spoke in cluster.get("spokes") or []:
            if spoke not in pub_slugs:
                continue
            row = next(r for r in published if r["slug"] == spoke)
            hubs = cluster.get("hub_slugs") or []
            missing_hub_links = [h for h in hubs if h not in row["outbound"]]
            if missing_hub_links:
                cluster_gaps.append(
                    {
                        "cluster": name,
                        "spoke": spoke,
                        "missing_hub_links": missing_hub_links,
                    }
                )

    # Credibility
    credibility: list[dict] = []

    for r in published:
        if not r["content_tier"]:
            credibility.append({"slug": r["slug"], "issue": "missing_content_tier"})
        if not r["tags"]:
            credibility.append({"slug": r["slug"], "issue": "missing_tags"})

    for slug in PILLAR_SLUGS:
        if slug not in pub_slugs:
            continue
        row = next(r for r in published if r["slug"] == slug)
        if row["faq_count"] < 2:
            credibility.append({"slug": slug, "issue": "pillar_faq_lt_2"})
        if not row["hero_caption"]:
            credibility.append({"slug": slug, "issue": "pillar_missing_hero_caption"})

    for r in published:
        if r["category"] != "Case Studies":
            continue
        if not COMPOSITE_MARKERS.search(r["body"][:800]):
            credibility.append(
                {"slug": r["slug"], "issue": "case_study_missing_composite_disclosure"}
            )

    for r in published:
        if r["category"] != "Opinion" or r["words"] >= THIN_OPINION_WORDS:
            continue
        has_hub_link = any(
            slug_cat.get(link) in hub_category_set or link in hub_slugs
            for link in r["outbound"]
        )
        if not has_hub_link:
            credibility.append(
                {
                    "slug": r["slug"],
                    "issue": "thin_opinion_without_hub_link",
                    "words": r["words"],
                }
            )

    validity = _run_validate_summary()
    journey = _journey_coverage(published, clusters_cfg)
    nav_hub_inbound = _nav_hub_inbound(inbound)

    return {
        "generated": date.today().isoformat(),
        "inventory": {
            "total_files": len(rows),
            "published": len(published),
            "drafts": len(drafts),
            "by_category": dict(by_category),
            "by_tier": dict(by_tier),
            "word_min": min(words) if words else 0,
            "word_max": max(words) if words else 0,
            "word_avg": round(sum(words) / len(words)) if words else 0,
        },
        "taxonomy": {
            "missing_tags_count": len(missing_tags),
            "missing_tags": missing_tags,
            "missing_tier_count": len(missing_tier),
            "missing_tier": missing_tier,
            "reading_path_issues": reading_path_issues,
            "reading_path_category_mismatch": reading_path_category_mismatch,
        },
        "consistency": {
            "orphans": orphans,
            "low_inbound": low_inbound,
            "cluster_gaps": cluster_gaps,
            "journey_coverage": journey,
            "nav_hub_inbound": nav_hub_inbound,
        },
        "validity": validity,
        "credibility": credibility,
    }


def _format_stdout(report: dict) -> str:
    inv = report["inventory"]
    lines = [
        f"Editorial inventory ({report['generated']})",
        f"  Published: {inv['published']}  Drafts: {inv['drafts']}  Avg words: {inv['word_avg']}",
        "",
        "By category:",
    ]
    for cat, n in sorted(inv["by_category"].items(), key=lambda x: -x[1]):
        lines.append(f"  {cat}: {n}")

    tax = report["taxonomy"]
    lines.extend(
        [
            "",
            f"Taxonomy: {tax['missing_tags_count']} published without tags",
            f"Reading path issues: {len(tax['reading_path_issues'])}",
            f"Reading path category mismatch: {len(tax.get('reading_path_category_mismatch', []))}",
        ]
    )

    con = report["consistency"]
    lines.extend(
        [
            "",
            f"Orphans (0 inbound): {len(con['orphans'])}",
            f"  {', '.join(con['orphans']) or 'none'}",
            f"Cluster hub link gaps: {len(con['cluster_gaps'])}",
            f"Journey coverage: {con['journey_coverage']['with_primary_slot_pct']}% "
            f"({con['journey_coverage']['with_primary_slot_count']}/{inv['published']})",
            f"Nav hub inbound gaps: {len(con.get('nav_hub_inbound', []))}",
        ]
    )

    val = report["validity"]
    lines.extend(
        [
            "",
            f"validate_content.py: {'OK' if val['ok'] else 'FAIL'} "
            f"(errors={val['error_count']}, warnings={val['warning_count']})",
            f"Credibility flags: {len(report['credibility'])}",
        ]
    )
    return "\n".join(lines)


def _format_markdown(report: dict) -> str:
    inv = report["inventory"]
    lines = [
        "# Editorial status report",
        "",
        f"**Generated:** {report['generated']}",
        "",
        "## Inventory",
        "",
        f"| Metric | Value |",
        f"|--------|------:|",
        f"| Published | {inv['published']} |",
        f"| Drafts | {inv['drafts']} |",
        f"| Avg words | {inv['word_avg']} |",
        "",
        "### By category",
        "",
        "| Category | Count |",
        "|----------|------:|",
    ]
    for cat, n in sorted(inv["by_category"].items(), key=lambda x: -x[1]):
        lines.append(f"| {cat} | {n} |")

    tax = report["taxonomy"]
    lines.extend(
        [
            "",
            "## Taxonomy",
            "",
            f"- Published without tags: **{tax['missing_tags_count']}**",
            f"- Published without content_tier: **{tax['missing_tier_count']}**",
            f"- Reading path broken slugs: **{len(tax['reading_path_issues'])}**",
            f"- Reading path category mismatch: **{len(tax.get('reading_path_category_mismatch', []))}**",
            "",
        ]
    )
    if tax.get("reading_path_category_mismatch"):
        lines.append("| Hub category | Slug | Article category |")
        lines.append("|--------------|------|------------------|")
        for issue in tax["reading_path_category_mismatch"]:
            lines.append(
                f"| {issue['hub_category']} | `{issue['slug']}` | {issue['article_category']} |"
            )
        lines.append("")
    if tax["reading_path_issues"]:
        lines.append("| Category | Slug | Issue |")
        lines.append("|----------|------|-------|")
        for issue in tax["reading_path_issues"]:
            lines.append(f"| {issue['category']} | `{issue['slug']}` | {issue['issue']} |")
        lines.append("")

    con = report["consistency"]
    lines.extend(
        [
            "## Consistency",
            "",
            "### Orphans (zero inbound links)",
            "",
        ]
    )
    if con["orphans"]:
        for slug in con["orphans"]:
            lines.append(f"- `{slug}`")
    else:
        lines.append("- none")

    lines.extend(["", "### Cluster hub link gaps", ""])
    if con["cluster_gaps"]:
        for gap in con["cluster_gaps"]:
            missing = ", ".join(f"`{s}`" for s in gap["missing_hub_links"])
            lines.append(f"- `{gap['spoke']}` ({gap['cluster']}) missing links to {missing}")
    else:
        lines.append("- none")

    jc = con.get("journey_coverage", {})
    if jc:
        lines.extend(
            [
                "",
                "### Journey coverage",
                "",
                f"- Articles with continue-learning slots: **{jc.get('with_primary_slot_pct', 0)}%** "
                f"({jc.get('with_primary_slot_count', 0)}/{inv['published']})",
            ]
        )
        if jc.get("empty_journey"):
            lines.append(f"- Empty journey: `{', '.join(jc['empty_journey'][:10])}`"
                         + (" …" if len(jc["empty_journey"]) > 10 else ""))

    nav_issues = con.get("nav_hub_inbound") or []
    lines.extend(["", "### Nav hub inbound", ""])
    if nav_issues:
        for issue in nav_issues:
            lines.append(
                f"- `{issue['slug']}` inbound **{issue['inbound']}** (min {issue['min']})"
            )
    else:
        lines.append("- all nav hubs meet minimum inbound")

    val = report["validity"]
    lines.extend(
        [
            "",
            "## Validity",
            "",
            f"`validate_content.py`: **{'OK' if val['ok'] else 'FAIL'}** "
            f"(errors={val['error_count']}, warnings={val['warning_count']})",
            "",
        ]
    )

    cred = report["credibility"]
    lines.extend(["## Credibility flags", ""])
    if cred:
        by_issue: Counter = Counter(c["issue"] for c in cred)
        for issue, count in by_issue.most_common():
            lines.append(f"- `{issue}`: {count}")
    else:
        lines.append("- none")

    lines.extend(
        [
            "",
            "---",
            "",
            "Refresh via `make audit-content`. Update [`docs/EDITORIAL_PLAN.md`](../EDITORIAL_PLAN.md) §2 when baseline shifts.",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Editorial corpus inventory audit")
    parser.add_argument("--json", action="store_true", help="Print JSON to stdout")
    parser.add_argument(
        "--markdown",
        action="store_true",
        help="Write docs/reports/editorial-status-YYYY-MM-DD.md",
    )
    args = parser.parse_args()

    clusters_cfg = _load_clusters()
    rows = _load_articles()
    report = build_report(rows, clusters_cfg)

    if args.json:
        print(json.dumps(report, indent=2))
        return 0

    if args.markdown:
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        out_path = REPORTS_DIR / f"editorial-status-{report['generated']}.md"
        out_path.write_text(_format_markdown(report), encoding="utf-8")
        print(f"Wrote {out_path.relative_to(ROOT)}")
        return 0

    print(_format_stdout(report))
    return 0


if __name__ == "__main__":
    sys.exit(main())
