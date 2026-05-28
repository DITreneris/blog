#!/usr/bin/env python3
"""Generate sitemap.xml in output/ after Pelican build."""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path
from xml.etree.ElementTree import Element, ElementTree, SubElement

import yaml

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"
SITE_CONFIG = yaml.safe_load((ROOT / "data" / "site.yaml").read_text(encoding="utf-8"))
SITEURL = SITE_CONFIG.get("brand", {}).get("site_url", "https://www.promptanatomy.blog")

EXCLUDE = {"design-system", "drafts", "author"}


def add_url(urlset: Element, loc: str, lastmod: str | None = None) -> None:
    url = SubElement(urlset, "url")
    SubElement(url, "loc").text = loc
    if lastmod:
        SubElement(url, "lastmod").text = lastmod


def main() -> int:
    if not OUTPUT.is_dir():
        print("output/ not found. Run pelican first.", file=sys.stderr)
        return 1

    urlset = Element(
        "urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    )

    index = OUTPUT / "index.html"
    if index.exists():
        lastmod = datetime.fromtimestamp(
            index.stat().st_mtime, tz=timezone.utc
        ).date().isoformat()
        add_url(urlset, f"{SITEURL}/", lastmod)

    for path in sorted(OUTPUT.rglob("index.html")):
        rel = path.relative_to(OUTPUT).as_posix()
        if rel == "index.html":
            continue
        slug_root = rel.split("/", 1)[0]
        if slug_root in EXCLUDE:
            continue
        lastmod = datetime.fromtimestamp(
            path.stat().st_mtime, tz=timezone.utc
        ).date().isoformat()
        loc = f"{SITEURL}/{rel.removesuffix('/index.html')}/"
        add_url(urlset, loc, lastmod)

    tree = ElementTree(urlset)
    tree.write(OUTPUT / "sitemap.xml", encoding="utf-8", xml_declaration=True)
    print(f"Wrote {OUTPUT / 'sitemap.xml'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
