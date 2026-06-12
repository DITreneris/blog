#!/usr/bin/env python3
"""Generate sitemap.xml in output/ after Pelican build."""

from __future__ import annotations

import sys
from datetime import date, datetime, timezone
from pathlib import Path
from xml.etree.ElementTree import Element, ElementTree, SubElement

import frontmatter
import yaml

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"
ARTICLES = ROOT / "content" / "articles"
SITE_CONFIG = yaml.safe_load((ROOT / "data" / "site.yaml").read_text(encoding="utf-8"))
SITEURL = SITE_CONFIG.get("brand", {}).get("site_url", "https://www.promptanatomy.blog")

EXCLUDE = {"design-system", "drafts", "author"}


def _article_lastmod_map() -> dict[str, str]:
    """slug -> ISO date from frontmatter modified or date."""
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


def add_url(urlset: Element, loc: str, lastmod: str | None = None) -> None:
    url = SubElement(urlset, "url")
    SubElement(url, "loc").text = loc
    if lastmod:
        SubElement(url, "lastmod").text = lastmod


def _lastmod_for_path(rel: str, path: Path, article_dates: dict[str, str]) -> str:
    if rel.startswith("articles/") and rel.endswith("/index.html"):
        slug = rel.removeprefix("articles/").removesuffix("/index.html")
        if slug in article_dates:
            return article_dates[slug]
    return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).date().isoformat()


def main() -> int:
    if not OUTPUT.is_dir():
        print("output/ not found. Run pelican first.", file=sys.stderr)
        return 1

    article_dates = _article_lastmod_map()

    urlset = Element(
        "urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    )

    index = OUTPUT / "index.html"
    if index.exists():
        lastmod = _lastmod_for_path("index.html", index, article_dates)
        add_url(urlset, f"{SITEURL}/", lastmod)

    for path in sorted(OUTPUT.rglob("index.html")):
        rel = path.relative_to(OUTPUT).as_posix()
        if rel == "index.html":
            continue
        slug_root = rel.split("/", 1)[0]
        if slug_root in EXCLUDE:
            continue
        lastmod = _lastmod_for_path(rel, path, article_dates)
        loc = f"{SITEURL}/{rel.removesuffix('/index.html')}/"
        add_url(urlset, loc, lastmod)

    tree = ElementTree(urlset)
    tree.write(OUTPUT / "sitemap.xml", encoding="utf-8", xml_declaration=True)
    print(f"Wrote {OUTPUT / 'sitemap.xml'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
