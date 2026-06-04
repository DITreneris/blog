#!/usr/bin/env python3
"""Concatenate and minify theme CSS into site.min.css (+ article.min.css)."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_DIR = ROOT / "theme" / "promptanatomy" / "static" / "css"

SITE_PARTS = (
    "fonts.css",
    "tokens.css",
    "base.css",
    "layout.css",
    "components.css",
)

ARTICLE_PARTS = ("article.css", "pygments.css")


def _minify(css: str) -> str:
    try:
        import rcssmin
    except ImportError as exc:
        raise SystemExit(
            "rcssmin is required. Install: pip install rcssmin"
        ) from exc
    return rcssmin.cssmin(css)


def _build_bundle(name: str, parts: tuple[str, ...]) -> Path:
    chunks: list[str] = []
    for part in parts:
        path = CSS_DIR / part
        if not path.is_file():
            raise SystemExit(f"Missing CSS part: {path}")
        chunks.append(path.read_text(encoding="utf-8"))
    combined = "\n".join(chunks)
    out = CSS_DIR / name
    out.write_text(_minify(combined), encoding="utf-8")
    print(f"  Wrote {out.relative_to(ROOT)} ({out.stat().st_size} bytes)")
    return out


def main() -> int:
    print("Building CSS bundles...")
    _build_bundle("site.min.css", SITE_PARTS)
    _build_bundle("article.min.css", ARTICLE_PARTS)
    print("CSS build OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
