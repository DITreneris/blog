#!/usr/bin/env python3
"""Add og to usage for published article rows in data/illustrations.yaml."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
ARTICLES = ROOT / "content" / "articles"


def _published_slugs() -> set[str]:
    slugs: set[str] = set()
    for path in ARTICLES.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        fm_block = text.split("---", 2)[1]
        fm = yaml.safe_load(fm_block) or {}
        if fm.get("status") == "published" and fm.get("slug"):
            slugs.add(str(fm["slug"]))
    return slugs


def _merged_slugs(manifest: dict) -> set[str]:
    return {
        str(row["slug"])
        for row in manifest.get("illustrations") or []
        if row.get("slug") and row.get("status") == "merged"
    }


def _apply_og_to_text(text: str, target_slugs: set[str]) -> tuple[str, list[str]]:
    lines = text.splitlines(keepends=True)
    current_slug: str | None = None
    changed: list[str] = []

    for i, line in enumerate(lines):
        slug_match = re.match(r"^(\s*)slug:\s+(\S+)\s*$", line)
        if slug_match:
            current_slug = slug_match.group(2)
            continue

        usage_match = re.match(r"^(\s*)usage:\s+\[(.+)\]\s*$", line)
        if not usage_match or not current_slug or current_slug not in target_slugs:
            continue

        parts = [p.strip() for p in usage_match.group(2).split(",")]
        if "og" in parts:
            continue
        parts.append("og")
        indent = usage_match.group(1)
        lines[i] = f"{indent}usage: [{', '.join(parts)}]\n"
        changed.append(current_slug)

    return "".join(lines), changed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    published = _published_slugs()
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f) or {}
    merged = _merged_slugs(manifest)
    target = published - merged

    raw = ILLUSTRATIONS_YAML.read_text(encoding="utf-8")
    updated_text, changed = _apply_og_to_text(raw, target)

    for slug in sorted(changed):
        print(f"  + og: {slug}")

    if args.dry_run:
        print(f"Dry run: would update {len(changed)} row(s).")
        return 0

    if not changed:
        print("No manifest rows to update.")
        return 0

    ILLUSTRATIONS_YAML.write_text(updated_text, encoding="utf-8")
    print(f"Updated {len(changed)} row(s) in {ILLUSTRATIONS_YAML.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
