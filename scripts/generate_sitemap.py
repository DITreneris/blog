#!/usr/bin/env python3
"""Generate sitemap.xml in output/ after Pelican build."""

from __future__ import annotations

import sys
from pathlib import Path
from xml.etree.ElementTree import Element, ElementTree, SubElement

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output"
SITEURL = "https://www.promptanatomy.blog"


def add_url(urlset: Element, loc: str) -> None:
    url = SubElement(urlset, "url")
    SubElement(url, "loc").text = loc


def main() -> int:
    if not OUTPUT.is_dir():
        print("output/ not found. Run pelican first.", file=sys.stderr)
        return 1

    urlset = Element(
        "urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    )

    index = OUTPUT / "index.html"
    if index.exists():
        add_url(urlset, f"{SITEURL}/")

    for path in sorted(OUTPUT.rglob("index.html")):
        rel = path.relative_to(OUTPUT).as_posix()
        if rel == "index.html":
            continue
        loc = f"{SITEURL}/{rel.removesuffix('/index.html')}/"
        add_url(urlset, loc)

    tree = ElementTree(urlset)
    tree.write(OUTPUT / "sitemap.xml", encoding="utf-8", xml_declaration=True)
    print(f"Wrote {OUTPUT / 'sitemap.xml'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
