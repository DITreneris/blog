#!/usr/bin/env python3
"""Compare key brand colors between tokens.css and data/og/brand.mjs."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOKENS = ROOT / "theme" / "promptanatomy" / "static" / "css" / "tokens.css"
BRAND = ROOT / "data" / "og" / "brand.mjs"

# CSS custom property → brand.mjs colors key
PAIRS: dict[str, str] = {
    "--color-brand-dark": "brandDark",
    "--color-brand-accent": "brandAccent",
    "--color-text-on-dark": "textOnDark",
    "--color-surface-dark-card": "surfaceDarkCard",
    "--color-text-secondary": "textSecondary",
    "--color-text-on-dark-muted": "textOnDarkMuted",
    "--color-border-dark": "borderDark",
    "--color-badge-accent-bg": "badgeAccentBg",
}

CSS_VAR = re.compile(
    r"(--color-brand-dark|--color-brand-accent|--color-text-on-dark|"
    r"--color-surface-dark-card|--color-text-secondary|--color-text-on-dark-muted|"
    r"--color-border-dark|--color-badge-accent-bg)\s*:\s*([^;]+);"
)
MJS_KEY = re.compile(r"(\w+)\s*:\s*('([^']+)'|\"([^\"]+)\")")


def normalize(value: str) -> str:
    value = value.strip().lower()
    if value.startswith("#") and len(value) == 4:
        return "#" + "".join(c * 2 for c in value[1:])
    return value


def parse_tokens(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    found: dict[str, str] = {}
    for match in CSS_VAR.finditer(text):
        found[match.group(1)] = normalize(match.group(2))
    return found


def parse_brand(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    colors_block = re.search(r"colors:\s*\{([^}]+)\}", text, re.DOTALL)
    if not colors_block:
        return {}
    found: dict[str, str] = {}
    for match in MJS_KEY.finditer(colors_block.group(1)):
        key = match.group(1)
        value = match.group(3) or match.group(4)
        found[key] = normalize(value)
    return found


def main() -> int:
    if not TOKENS.is_file() or not BRAND.is_file():
        print("Missing tokens.css or brand.mjs", file=sys.stderr)
        return 1

    css = parse_tokens(TOKENS)
    mjs = parse_brand(BRAND)
    errors: list[str] = []

    for css_key, mjs_key in PAIRS.items():
        css_val = css.get(css_key)
        mjs_val = mjs.get(mjs_key)
        if css_val is None:
            errors.append(f"tokens.css missing {css_key}")
            continue
        if mjs_val is None:
            errors.append(f"brand.mjs missing colors.{mjs_key}")
            continue
        if css_val != mjs_val:
            errors.append(
                f"{css_key} ({css_val}) != brand.mjs {mjs_key} ({mjs_val})"
            )

    if errors:
        print("Brand sync validation failed:", file=sys.stderr)
        for msg in errors:
            print(f"  {msg}", file=sys.stderr)
        print(
            "Update both tokens.css and data/og/brand.mjs, then npm run build:satori.",
            file=sys.stderr,
        )
        return 1

    print("Brand sync validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
