#!/usr/bin/env python3
"""Post-build SEO checks on output/ HTML (OG URLs, JSON-LD hygiene, sitemap)."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import date, datetime
from pathlib import Path
from typing import Any

import frontmatter
import yaml

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"
ARTICLES = ROOT / "content" / "articles"
PRIORITY_SLUGS_YAML = ROOT / "data" / "seo_priority_slugs.yaml"
SITE_YAML = ROOT / "data" / "site.yaml"

OG_IMAGE_RE = re.compile(
    r'<meta\s+(?:property="og:image"|name="twitter:image")\s+content="([^"]*)"',
    re.I,
)
OG_TITLE_RE = re.compile(
    r'<meta\s+property="og:title"\s+content="([^"]*)"',
    re.I,
)
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)
LLMS_ALT_RE = re.compile(
    r'<link\s+rel="alternate"[^>]*href="([^"]*llms\.txt)"',
    re.I,
)
CANONICAL_RE = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', re.I)
JSON_LD_RE = re.compile(
    r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>',
    re.S,
)
SITEMAP_EXCLUDE = {"design-system", "drafts", "author"}
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
CHECKED_SCHEMA_TYPES = frozenset({"Article", "BreadcrumbList", "FAQPage", "HowTo"})
STRING_KEYS = frozenset({"headline", "name", "description", "text"})


def _normalize_ws(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def _canonical_host() -> str:
    data = yaml.safe_load(SITE_YAML.read_text(encoding="utf-8")) or {}
    url = (data.get("brand") or {}).get("site_url", "https://www.promptanatomy.blog")
    return str(url).rstrip("/")


def _published_slugs() -> list[str]:
    slugs: list[str] = []
    for path in ARTICLES.glob("*.md"):
        post = frontmatter.load(path)
        meta = post.metadata or {}
        if str(meta.get("status", "published")).lower() != "published":
            continue
        slugs.append(str(meta.get("slug") or path.stem))
    return sorted(slugs)


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


def _string_has_seo_leak(value: str) -> str | None:
    if "&nbsp;" in value or "\xa0" in value or "&#160;" in value:
        return "contains nbsp entity or character"
    if "<" in value or ">" in value:
        return "contains HTML"
    return None


def _walk_json_ld_strings(
    data: Any, path: Path, schema_type: str, errors: list[str]
) -> None:
    if isinstance(data, dict):
        for key, value in data.items():
            if key in STRING_KEYS and isinstance(value, str):
                leak = _string_has_seo_leak(value)
                if leak:
                    errors.append(
                        f"{path}: {schema_type} JSON-LD {key} {leak}: {value[:80]!r}"
                    )
            else:
                _walk_json_ld_strings(value, path, schema_type, errors)
    elif isinstance(data, list):
        for item in data:
            _walk_json_ld_strings(item, path, schema_type, errors)


def _check_json_ld_hygiene(html: str, path: Path) -> list[str]:
    errors: list[str] = []
    for block in JSON_LD_RE.finditer(html):
        try:
            data = json.loads(block.group(1))
        except json.JSONDecodeError:
            continue
        schema_type = data.get("@type")
        if schema_type not in CHECKED_SCHEMA_TYPES:
            continue
        _walk_json_ld_strings(data, path, str(schema_type), errors)
    return errors


def _check_extra_files() -> list[str]:
    errors: list[str] = []
    required = (
        OUTPUT / "llms.txt",
        OUTPUT / "robots.txt",
        OUTPUT / "ai.txt",
        OUTPUT / ".well-known" / "security.txt",
    )
    for path in required:
        if not path.is_file():
            errors.append(f"{path.relative_to(OUTPUT).as_posix()} missing under output/")
    return errors


def _check_home_title_og(home: Path) -> list[str]:
    html = home.read_text(encoding="utf-8")
    title_m = TITLE_RE.search(html)
    og_m = OG_TITLE_RE.search(html)
    if not title_m:
        return ["index.html: missing <title>"]
    if not og_m:
        return ["index.html: missing og:title"]
    title = _normalize_ws(title_m.group(1))
    og_title = _normalize_ws(og_m.group(1))
    if title != og_title:
        return [
            f"index.html: <title> ({title!r}) != og:title ({og_title!r})"
        ]
    return []


def _check_llms_alternate(home: Path) -> list[str]:
    html = home.read_text(encoding="utf-8")
    match = LLMS_ALT_RE.search(html)
    if not match:
        return ["index.html: missing llms.txt alternate link"]
    href = match.group(1)
    if not href.startswith("https://"):
        return [f"index.html: llms.txt alternate is not absolute https: {href}"]
    host = _canonical_host().removeprefix("https://").removeprefix("http://")
    if host and host not in href:
        return [f"index.html: llms.txt alternate missing canonical host {host}: {href}"]
    return []


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


def _load_priority_slugs() -> list[str]:
    if not PRIORITY_SLUGS_YAML.is_file():
        return []
    data = yaml.safe_load(PRIORITY_SLUGS_YAML.read_text(encoding="utf-8")) or {}
    return [str(s) for s in data.get("priority_slugs") or []]


def _check_slugs_in_sitemap(slugs: list[str], label: str) -> list[str]:
    if not slugs:
        return []
    sitemap = OUTPUT / "sitemap.xml"
    if not sitemap.is_file():
        return [f"output/sitemap.xml missing ({label} slug check skipped)"]

    text = sitemap.read_text(encoding="utf-8")
    errors: list[str] = []
    for slug in slugs:
        needle = f"/articles/{slug}/"
        if needle not in text:
            errors.append(f"sitemap.xml missing {label} published slug: {slug}")
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
        errors.extend(_check_home_title_og(home))
        errors.extend(_check_llms_alternate(home))

    sample_article: Path | None = None
    for html_path in sorted(OUTPUT.rglob("index.html")):
        html = html_path.read_text(encoding="utf-8")
        rel = html_path.relative_to(OUTPUT)
        errors.extend(_check_og_urls(html, rel))
        errors.extend(_check_json_ld_hygiene(html, rel))
        if "articles" in rel.parts:
            if not OG_IMAGE_RE.search(html):
                errors.append(f"{rel}: missing og:image or twitter:image meta")
            if sample_article is None:
                sample_article = html_path

    if sample_article:
        errors.extend(_check_canonical(sample_article))

    errors.extend(_check_sitemap(article_dates))
    errors.extend(_check_slugs_in_sitemap(_load_priority_slugs(), "priority"))
    errors.extend(_check_slugs_in_sitemap(_published_slugs(), "published"))

    if errors:
        print("SEO output validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  {err}", file=sys.stderr)
        return 1

    print("SEO output validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
