#!/usr/bin/env python3
"""Fail the build if required static and image assets are missing from output/."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"

sys_path = ROOT / "scripts"
if str(sys_path) not in sys.path:
    sys.path.insert(0, str(sys_path))
from generate_brand_assets import find_author_photo_source  # noqa: E402

START_HERE_OG_SLUGS = (
    "the-model-is-not-the-system",
    "10-signs-your-company-is-vibe-prompting",
    "how-to-design-an-ai-agent-workflow",
)

REQUIRED = [
    OUTPUT / "static" / "img" / "og-default.png",
    OUTPUT / "static" / "favicon-32x32.png",
    OUTPUT / "images" / "hub" / "hero.png",
    OUTPUT / "images" / "hub" / "ecosystem.png",
    OUTPUT / "images" / "hub" / "og.png",
    OUTPUT / "images" / "articles" / "the-model-is-not-the-system" / "hero.png",
]

for slug in START_HERE_OG_SLUGS:
    REQUIRED.append(OUTPUT / "images" / "articles" / slug / "og.png")

REQUIRED.append(OUTPUT / "images" / "topics" / "framework" / "og.png")

if find_author_photo_source() is not None:
    REQUIRED.append(OUTPUT / "images" / "author" / "tomas-staniulis.jpg")


def main() -> int:
    if not OUTPUT.is_dir():
        print("output/ not found. Run pelican first.", file=sys.stderr)
        return 1

    missing = [p for p in REQUIRED if not p.is_file()]
    if missing:
        print("Missing required build assets:", file=sys.stderr)
        for path in missing:
            print(f"  {path.relative_to(ROOT)}", file=sys.stderr)
        return 1

    print(f"Build asset check OK ({len(REQUIRED)} paths).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
