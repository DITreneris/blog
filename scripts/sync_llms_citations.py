#!/usr/bin/env python3
"""Sync or verify llms.txt Preferred citation pages from data/seo_citations.yaml."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
LLMS_PATH = ROOT / "content" / "extra" / "llms.txt"
CITATIONS_PATH = ROOT / "data" / "seo_citations.yaml"

SECTION_START = "## Preferred citation pages"
SECTION_END = "## Topics"

LINK_RE = re.compile(
    r"^-\s+\[(?P<title>[^\]]+)\]\((?P<url>[^)]+)\):\s*(?P<desc>.+)\s*$"
)


def _load_config() -> tuple[str, list[dict]]:
    data = yaml.safe_load(CITATIONS_PATH.read_text(encoding="utf-8"))
    site_url = str(data.get("site_url", "https://www.promptanatomy.blog")).rstrip("/")
    citations = list(data.get("citations") or [])
    return site_url, citations


def _citation_lines(site_url: str, citations: list[dict]) -> list[str]:
    lines: list[str] = []
    for row in citations:
        slug = str(row["slug"])
        title = str(row["title"])
        desc = str(row["description"])
        url = f"{site_url}/articles/{slug}/"
        lines.append(f"- [{title}]({url}): {desc}")
    return lines


def _parse_llms_slugs(text: str) -> set[str]:
    slugs: set[str] = set()
    in_section = False
    for line in text.splitlines():
        if line.strip() == SECTION_START:
            in_section = True
            continue
        if in_section and line.strip().startswith("## "):
            break
        if not in_section:
            continue
        match = LINK_RE.match(line.strip())
        if match:
            url = match.group("url")
            if "/articles/" in url:
                slug = url.split("/articles/", 1)[1].strip("/")
                slugs.add(slug)
    return slugs


def _replace_section(text: str, lines: list[str]) -> str:
    start = text.find(SECTION_START)
    if start < 0:
        raise ValueError(f"{LLMS_PATH}: missing {SECTION_START!r}")
    end = text.find(SECTION_END, start)
    if end < 0:
        raise ValueError(f"{LLMS_PATH}: missing {SECTION_END!r}")
    block = SECTION_START + "\n" + "\n".join(lines) + "\n\n"
    return text[:start] + block + text[end:]


def write_llms() -> int:
    site_url, citations = _load_config()
    lines = _citation_lines(site_url, citations)
    text = LLMS_PATH.read_text(encoding="utf-8")
    LLMS_PATH.write_text(_replace_section(text, lines), encoding="utf-8")
    print(f"Updated {LLMS_PATH} ({len(lines)} citation links).")
    return 0


def check_llms() -> int:
    site_url, citations = _load_config()
    expected_slugs = [str(row["slug"]) for row in citations]
    expected_set = set(expected_slugs)
    text = LLMS_PATH.read_text(encoding="utf-8")
    actual_set = _parse_llms_slugs(text)

    warnings: list[str] = []
    missing = expected_set - actual_set
    extra = actual_set - expected_set
    if missing:
        warnings.append(f"llms.txt missing slugs from seo_citations.yaml: {sorted(missing)}")
    if extra:
        warnings.append(f"llms.txt has extra citation slugs not in yaml: {sorted(extra)}")

    for row in citations:
        slug = str(row["slug"])
        title = str(row["title"])
        desc = str(row["description"])
        url = f"{site_url}/articles/{slug}/"
        needle = f"[{title}]({url}): {desc}"
        if needle not in text:
            warnings.append(f"llms.txt citation line mismatch for {slug}")

    if warnings:
        for msg in warnings:
            print(f"  warning: {msg}", file=sys.stderr)
        return 0

    print("llms.txt citations match seo_citations.yaml.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--write", action="store_true", help="Regenerate citation section")
    group.add_argument("--check", action="store_true", help="Warn if yaml and llms.txt drift")
    args = parser.parse_args()
    if args.write:
        return write_llms()
    return check_llms()


if __name__ == "__main__":
    sys.exit(main())
