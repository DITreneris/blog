#!/usr/bin/env python3
"""Scaffold a new article from data/illustrations.yaml or CLI args."""

from __future__ import annotations

import argparse
import re
import sys
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
ARTICLES = ROOT / "content" / "articles"
DEFAULT_SATORI_TEMPLATE = "category-default"

# Category/tier → suggested Satori template (Opinion requires explicit --satori-template).
TIER_SATORI_TEMPLATE: dict[str, str | None] = {
    "opinion": None,
    "template": "checklist-worksheet",
    "playbook": "category-default",
    "pillar": "category-default",
    "nav": "glossary-terms",
}
CATEGORY_SATORI_TEMPLATE: dict[str, str | None] = {
    "Opinion": None,
    "Templates": "checklist-worksheet",
    "Case Studies": "case-study-support",
    "AI Governance": "governance-raci",
    "Framework": "category-default",
    "Prompt Systems": "prompt-registry",
    "AI Agents": "multi-agent-handoff",
    "Implementation Notes": "category-default",
}

BODY_TEMPLATE = """\
{intro}

## Why this matters

{why}

## What to do instead

{what}

## Implementation checklist

- Define the workflow before selecting tools.
- Assign owners for context and evaluation.
- Measure outcomes against business metrics, not demo quality.
"""


def _slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[-\s]+", "-", text).strip("-")


def _load_manifest() -> dict:
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def _find_row(manifest: dict, illustration_id: str) -> dict | None:
    for row in manifest.get("illustrations", []):
        if row["id"] == illustration_id:
            return row
    return None


def _hero_path(slug: str) -> str:
    return f"images/articles/{slug}/hero.png"


def _resolve_satori_template(
    category: str,
    *,
    content_tier: str | None = None,
    explicit: str | None = None,
) -> str | None:
    if explicit:
        return explicit
    if content_tier and content_tier in TIER_SATORI_TEMPLATE:
        tier_tpl = TIER_SATORI_TEMPLATE[content_tier]
        if tier_tpl is not None:
            return tier_tpl
        if content_tier == "opinion":
            return None
    return CATEGORY_SATORI_TEMPLATE.get(category, DEFAULT_SATORI_TEMPLATE)


def _append_satori_manifest_row(
    slug: str,
    title: str,
    category: str,
    *,
    template: str,
) -> None:
    """Append a Satori row before hub_images (preserves YAML comments)."""
    text = ILLUSTRATIONS_YAML.read_text(encoding="utf-8")
    if f"\n    slug: {slug}\n" in text or f"slug: {slug}\n" in text:
        return
    block = (
        f"\n  - id: satori-{slug}\n"
        f"    generator: satori\n"
        f"    template: {template}\n"
        f"    source: Satori/{slug}.png\n"
        f"    slug: {slug}\n"
        f'    title: "{title}"\n'
        f"    category: {category}\n"
        f"    usage: [hero]\n"
        f"    status: mapped\n"
    )
    marker = "\ncategory_og:"
    if marker not in text:
        print("category_og marker not found in illustrations.yaml", file=sys.stderr)
        sys.exit(1)
    ILLUSTRATIONS_YAML.write_text(text.replace(marker, block + marker, 1), encoding="utf-8")
    print(f"Manifest: appended satori-{slug} row")


def _write_post(
    path: Path,
    *,
    title: str,
    slug: str,
    summary: str,
    category: str,
    hero_image: str,
    key_takeaway: str = "",
    featured: bool = False,
    status: str = "draft",
    force: bool = False,
) -> None:
    if path.exists() and not force:
        print(f"Exists (use --force): {path}", file=sys.stderr)
        sys.exit(1)

    today = date.today().isoformat()
    kt = key_takeaway or f"Structured implementation turns {title.lower()} into repeatable outcomes."
    lines = [
        "---",
        f'title: "{title}"',
        f"slug: {slug}",
        f'summary: "{summary}"',
        f"category: {category}",
        f"date: {today}",
        f"status: {status}",
        f'hero_image: {_hero_path(slug)}',
        f'reading_time: "6 min read"',
        f'key_takeaway: "{kt}"',
    ]
    if featured:
        lines.append("featured: true")
    lines.extend(["---", ""])

    intro = f"This article explains **{title}** in practical terms for teams building controlled AI systems."
    body = BODY_TEMPLATE.format(
        intro=intro,
        why="Teams that skip structure inherit inconsistent quality and unclear accountability.",
        what="Map the business task, design the workflow, then place the model where it adds leverage.",
    )
    path.write_text("\n".join(lines) + body + "\n", encoding="utf-8")
    print(f"Created: {path.relative_to(ROOT)}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--from-illustration", metavar="ID", help="Manifest illustration id")
    parser.add_argument("--title", help="Article title")
    parser.add_argument("--category", default="Framework")
    parser.add_argument("--slug", help="URL slug (derived from title if omitted)")
    parser.add_argument("--summary", help="One-line summary")
    parser.add_argument("--status", default="published", choices=("draft", "published"))
    parser.add_argument("--featured", action="store_true")
    parser.add_argument("--no-satori", action="store_true", help="Skip Satori manifest row")
    parser.add_argument(
        "--satori-template",
        metavar="NAME",
        help="Satori template module (required for Opinion; see data/og/templates/)",
    )
    parser.add_argument(
        "--content-tier",
        choices=("pillar", "playbook", "template", "opinion", "nav"),
        help="content_tier hint for default Satori template selection",
    )
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    if args.from_illustration:
        manifest = _load_manifest()
        row = _find_row(manifest, args.from_illustration)
        if not row:
            print(f"Unknown illustration id: {args.from_illustration}", file=sys.stderr)
            return 1
        slug = row["slug"]
        path = ARTICLES / f"{slug}.md"
        _write_post(
            path,
            title=row["title"],
            slug=slug,
            summary=args.summary or f"Field notes on {row['title'].lower()}.",
            category=row["category"],
            hero_image=_hero_path(slug),
            featured=bool(row.get("featured")),
            status=args.status,
            force=args.force,
        )
        return 0

    if not args.title:
        parser.error("--title is required unless --from-illustration is set")
    slug = args.slug or _slugify(args.title)
    path = ARTICLES / f"{slug}.md"
    _write_post(
        path,
        title=args.title,
        slug=slug,
        summary=args.summary or f"Notes on {args.title.lower()}.",
        category=args.category,
        hero_image=_hero_path(slug),
        featured=args.featured,
        status=args.status,
        force=args.force,
    )
    if not args.no_satori:
        tpl = _resolve_satori_template(
            args.category,
            content_tier=args.content_tier,
            explicit=args.satori_template,
        )
        if tpl is None:
            print(
                "Opinion posts need an illustration-first template. "
                "Pass --satori-template (e.g. split-compare, tier-ladder) or --no-satori.",
                file=sys.stderr,
            )
            return 1
        _append_satori_manifest_row(slug, args.title, args.category, template=tpl)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
