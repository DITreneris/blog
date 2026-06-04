#!/usr/bin/env python3
"""Post-build SEO checks on output/ HTML (OG URLs, JSON-LD hygiene, sitemap)."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"

OG_IMAGE_RE = re.compile(
    r'<meta\s+(?:property="og:image"|name="twitter:image")\s+content="([^"]*)"',
    re.I,
)
JSON_LD_RE = re.compile(
    r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>',
    re.S,
)
SITEMAP_EXCLUDE = {"design-system", "drafts", "author"}


def _check_og_urls(html: str, path: Path) -> list[str]:
    errors: list[str] = []
    for match in OG_IMAGE_RE.finditer(html):
        value = match.group(1)
        if "\n" in value or "\r" in value or value != value.strip():
            errors.append(f"{path}: og/twitter image URL contains whitespace")
            break
    return errors


def _check_article_json_ld(html: str, path: Path) -> list[str]:
    errors: list[str] = []
    for block in JSON_LD_RE.finditer(html):
        try:
            data = json.loads(block.group(1))
        except json.JSONDecodeError:
            continue
        if data.get("@type") != "Article":
            continue
        desc = data.get("description", "")
        if isinstance(desc, str) and ("<" in desc or ">" in desc):
            errors.append(f"{path}: Article JSON-LD description contains HTML")
    return errors


def _check_sitemap() -> list[str]:
    errors: list[str] = []
    sitemap = OUTPUT / "sitemap.xml"
    if not sitemap.is_file():
        return ["output/sitemap.xml missing"]
    text = sitemap.read_text(encoding="utf-8")
    for slug in SITEMAP_EXCLUDE:
        needle = f"/{slug}/"
        if needle in text:
            errors.append(f"sitemap.xml includes excluded route {needle}")
    if "<lastmod>" not in text:
        errors.append("sitemap.xml missing <lastmod> entries")
    return errors


def main() -> int:
    if not OUTPUT.is_dir():
        print("output/ not found. Run pelican first.", file=sys.stderr)
        return 1

    errors: list[str] = []
    for html_path in sorted(OUTPUT.rglob("index.html")):
        html = html_path.read_text(encoding="utf-8")
        rel = html_path.relative_to(OUTPUT)
        errors.extend(_check_og_urls(html, rel))
        if "articles" in rel.parts:
            errors.extend(_check_article_json_ld(html, rel))

    errors.extend(_check_sitemap())

    if errors:
        print("SEO output validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  {err}", file=sys.stderr)
        return 1

    print("SEO output validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
