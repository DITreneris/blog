#!/usr/bin/env python3
"""Rewrite article frontmatter with quoted strings for Pelican compatibility."""

from __future__ import annotations

from pathlib import Path

import frontmatter
import yaml

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "content" / "articles"


def _quote(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def _dump_meta(meta: dict) -> str:
    lines = ["---"]
    order = (
        "title",
        "slug",
        "summary",
        "category",
        "date",
        "date_modified",
        "status",
        "hero_image",
        "reading_time",
        "key_takeaway",
        "featured",
        "tags",
    )
    seen = set()
    for key in order:
        if key not in meta or meta[key] is None:
            continue
        val = meta[key]
        seen.add(key)
        if key in ("title", "summary", "key_takeaway", "reading_time") and isinstance(
            val, str
        ):
            lines.append(f'{key}: "{_quote(val)}"')
        elif key == "featured":
            lines.append(f"featured: {str(bool(val)).lower()}")
        elif key == "tags" and isinstance(val, list):
            lines.append(f"tags: {yaml.dump(val, default_flow_style=True).strip()}")
        else:
            lines.append(f"{key}: {val}")
    for key, val in meta.items():
        if key in seen:
            continue
        if isinstance(val, str):
            lines.append(f'{key}: "{_quote(val)}"')
        else:
            lines.append(f"{key}: {val}")
    lines.append("---")
    return "\n".join(lines)


def main() -> int:
    for path in sorted(ARTICLES.glob("*.md")):
        post = frontmatter.load(path)
        body = post.content
        if not post.metadata.get("authors"):
            post.metadata["authors"] = "Prompt Anatomy"
        text = _dump_meta(post.metadata) + "\n\n" + body.strip() + "\n"
        path.write_text(text, encoding="utf-8")
        print(path.name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
