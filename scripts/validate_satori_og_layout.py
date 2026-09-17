#!/usr/bin/env python3
"""Mechanical layout rules for dedicated Satori diagram OG templates.

CI cannot screenshot. These checks stop the known failure mode: shrinking a
hero worksheet (CSS gap, stripped gold-top) into articleOgFrameWithDiagram.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES_DIR = ROOT / "data" / "og" / "templates"
GAP_SHORTHAND = re.compile(r"(?<![A-Za-z])gap\s*:")


def main() -> int:
    errors: list[str] = []
    checked = 0
    for path in sorted(TEMPLATES_DIR.glob("*.mjs")):
        if path.name == "base.mjs":
            continue
        text = path.read_text(encoding="utf-8")
        if "articleOgFrameWithDiagram" not in text:
            continue
        checked += 1
        if "ogWorksheetShell" not in text:
            errors.append(
                f"{path.name}: articleOgFrameWithDiagram without ogWorksheetShell"
            )
        if GAP_SHORTHAND.search(text):
            errors.append(
                f"{path.name}: CSS gap shorthand — use rowGap / columnGap"
            )

    if errors:
        print("Satori OG layout validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print(f"Satori OG layout validation OK ({checked} diagram OG module(s)).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
