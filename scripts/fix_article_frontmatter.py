#!/usr/bin/env python3
"""Normalize article frontmatter (quoted YAML strings) for Pelican and validators."""

from __future__ import annotations

from pathlib import Path

import frontmatter
import yaml

ARTICLES = Path(__file__).resolve().parents[1] / "content" / "articles"

STRING_FIELDS = frozenset(
    {
        "title",
        "slug",
        "summary",
        "category",
        "status",
        "reading_time",
        "key_takeaway",
        "authors",
        "hero_image",
    }
)


def _dump_post(post: frontmatter.Post) -> str:
    meta = dict(post.metadata)
    header = yaml.dump(
        meta,
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False,
        width=1000,
    )
    return f"---\n{header}---\n\n{post.content.lstrip()}"


def main() -> int:
    for path in sorted(ARTICLES.glob("*.md")):
        post = frontmatter.load(path)
        for key in list(post.metadata):
            val = post.metadata[key]
            if key in STRING_FIELDS and val is not None:
                post.metadata[key] = str(val).strip()
        path.write_text(_dump_post(post), encoding="utf-8")
        print(f"  normalized: {path.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
