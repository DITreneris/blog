#!/usr/bin/env python3
"""Post-build SEO checks on output/ HTML (OG URLs, JSON-LD hygiene, sitemap)."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import date, datetime
from pathlib import Path

import frontmatter

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"
ARTICLES = ROOT / "content" / "articles"

OG_IMAGE_RE = re.compile(
    r'<meta\s+(?:property="og:image"|name="twitter:image")\s+content="([^"]*)"',
    re.I,
)
CANONICAL_RE = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', re.I)
JSON_LD_RE = re.compile(
    r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>',
    re.S,
)
SITEMAP_EXCLUDE = {"design-system", "drafts", "author"}
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def _article_lastmod_map() -> dict[str, str]:
    result: dict[str, str] = {}
    for path in ARTICLES.glob("*.md"):
        post = frontmatter.load(path)
        meta = post.metadata or {}
        slug = str(meta.get("slug") or path.stem)
        raw = meta.get("modified") or meta.get("date")
        if raw is None:
            continue
        if isinstance(raw, datetime):
            result[slug] = raw.date().isoformat()
        elif isinstance(raw, date):
            result[slug] = raw.isoformat()
        else:
            result[slug] = str(raw)[:10]
    return result


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


def _check_extra_files() -> list[str]:
    errors: list[str] = []
    for name in ("llms.txt", "robots.txt"):
        if not (OUTPUT / name).is_file():
            errors.append(f"output/{name} missing")
    return errors


def _check_canonical(html_path: Path) -> list[str]:
    html = html_path.read_text(encoding="utf-8")
    if not CANONICAL_RE.search(html):
        return [f"{html_path.relative_to(OUTPUT)}: missing rel=canonical"]
    return []


def _check_sitemap(article_dates: dict[str, str]) -> list[str]:
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

    tree = ET.parse(sitemap)
    root = tree.getroot()
    for url_el in root.findall("sm:url", SITEMAP_NS):
        loc_el = url_el.find("sm:loc", SITEMAP_NS)
        lastmod_el = url_el.find("sm:lastmod", SITEMAP_NS)
        if loc_el is None or loc_el.text is None:
            continue
        loc = loc_el.text
        if lastmod_el is None or not (lastmod_el.text or "").strip():
            errors.append(f"sitemap.xml url missing lastmod: {loc}")
            continue
        if "/articles/" not in loc:
            continue
        slug = loc.split("/articles/", 1)[1].strip("/")
        expected = article_dates.get(slug)
        if expected and lastmod_el.text != expected:
            errors.append(
                f"sitemap.xml lastmod for {slug}: got {lastmod_el.text}, "
                f"expected {expected} from frontmatter"
            )
    return errors


def main() -> int:
    if not OUTPUT.is_dir():
        print("output/ not found. Run pelican first.", file=sys.stderr)
        return 1

    article_dates = _article_lastmod_map()
    errors: list[str] = []
    errors.extend(_check_extra_files())

    home = OUTPUT / "index.html"
    if home.is_file():
        errors.extend(_check_canonical(home))

    sample_article: Path | None = None
    for html_path in sorted(OUTPUT.rglob("index.html")):
        html = html_path.read_text(encoding="utf-8")
        rel = html_path.relative_to(OUTPUT)
        errors.extend(_check_og_urls(html, rel))
        if "articles" in rel.parts:
            if not OG_IMAGE_RE.search(html):
                errors.append(f"{rel}: missing og:image or twitter:image meta")
            if sample_article is None:
                sample_article = html_path
            errors.extend(_check_article_json_ld(html, rel))

    if sample_article:
        errors.extend(_check_canonical(sample_article))

    errors.extend(_check_sitemap(article_dates))

    if errors:
        print("SEO output validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  {err}", file=sys.stderr)
        return 1

    print("SEO output validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
