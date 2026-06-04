#!/usr/bin/env python3
"""Report image weights; fail build if heroes exceed thresholds."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLE_IMAGES = ROOT / "content" / "images" / "articles"

DEFAULT_WEBP_MAX_KB = 150
DEFAULT_PNG_MAX_KB = 400
TOP_N = 20


def _kb(path: Path) -> float:
    return path.stat().st_size / 1024


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--webp-max-kb",
        type=int,
        default=DEFAULT_WEBP_MAX_KB,
    )
    parser.add_argument(
        "--png-max-kb",
        type=int,
        default=DEFAULT_PNG_MAX_KB,
    )
    parser.add_argument(
        "--warn-only",
        action="store_true",
        help="Print violations but exit 0",
    )
    args = parser.parse_args()

    if not ARTICLE_IMAGES.is_dir():
        print("No article images directory.", file=sys.stderr)
        return 0

    heroes: list[tuple[float, Path]] = []
    errors: list[str] = []

    for hero_png in sorted(ARTICLE_IMAGES.glob("*/hero.png")):
        heroes.append((_kb(hero_png), hero_png))
        if _kb(hero_png) > args.png_max_kb:
            errors.append(
                f"{hero_png.relative_to(ROOT)}: PNG {_kb(hero_png):.0f} KB "
                f"(max {args.png_max_kb} KB)"
            )
        hero_webp = hero_png.with_suffix(".webp")
        if hero_webp.is_file() and _kb(hero_webp) > args.webp_max_kb:
            errors.append(
                f"{hero_webp.relative_to(ROOT)}: WebP {_kb(hero_webp):.0f} KB "
                f"(max {args.webp_max_kb} KB)"
            )

    heroes.sort(key=lambda x: x[0], reverse=True)
    print(f"Top {TOP_N} hero PNG sizes:")
    for size, path in heroes[:TOP_N]:
        print(f"  {size:7.1f} KB  {path.relative_to(ROOT)}")

    if errors:
        print("\nImage weight violations:", file=sys.stderr)
        for err in errors:
            print(f"  {err}", file=sys.stderr)
        if args.warn_only:
            print("(warn-only mode — exiting 0)", file=sys.stderr)
            return 0
        return 1

    print(f"Image weight audit OK ({len(heroes)} heroes).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
