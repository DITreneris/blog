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
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
