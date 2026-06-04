#!/usr/bin/env python3
"""Fail if aria-labelledby targets are missing from built HTML."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"

ARIA_LABELLEDBY = re.compile(r'aria-labelledby="([^"]+)"')
ID_ATTR = re.compile(r'\bid="([^"]+)"')


def check_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    ids = set(ID_ATTR.findall(text))
    errors: list[str] = []
    for label_id in ARIA_LABELLEDBY.findall(text):
        for part in label_id.split():
            if part not in ids:
                errors.append(f"{path.relative_to(OUTPUT)}: aria-labelledby={part!r} has no id={part!r}")
    return errors


def main() -> int:
    if not OUTPUT.is_dir():
        print(f"Build output not found: {OUTPUT}", file=sys.stderr)
        return 1

    html_files = sorted(OUTPUT.rglob("*.html"))
    if not html_files:
        print("No HTML files in output/", file=sys.stderr)
        return 1

    errors: list[str] = []
    for path in html_files:
        errors.extend(check_file(path))

    if errors:
        print("A11y landmark validation failed:", file=sys.stderr)
        for msg in errors:
            print(f"  {msg}", file=sys.stderr)
        return 1

    print(f"A11y landmark validation OK ({len(html_files)} HTML files).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
