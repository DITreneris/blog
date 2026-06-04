#!/usr/bin/env python3
"""Fail if theme CSS files (except tokens.css) contain hardcoded hex colors."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_DIR = ROOT / "theme" / "promptanatomy" / "static" / "css"
HEX_PATTERN = re.compile(r"#[0-9a-fA-F]{3,8}\b")
ALLOWED = {"tokens.css", "pygments.css", "site.min.css", "article.min.css"}


def main() -> int:
    errors: list[str] = []
    for path in sorted(CSS_DIR.glob("*.css")):
        if path.name in ALLOWED:
            continue
        text = path.read_text(encoding="utf-8")
        for line_no, line in enumerate(text.splitlines(), start=1):
            if "#" in line and HEX_PATTERN.search(line):
                errors.append(f"{path.relative_to(ROOT)}:{line_no}: {line.strip()}")
    if errors:
        print("Hardcoded hex colors found outside tokens.css:", file=sys.stderr)
        for msg in errors:
            print(f"  {msg}", file=sys.stderr)
        return 1
    print("Theme token validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
