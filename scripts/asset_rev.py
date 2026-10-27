"""Cache-bust content images that ship with a sync stamp.

`/images/…` is cached as immutable for a year. The stamp changes when the
master changes, so the query string changes with the file and the path stays
the one Pelican copies.
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"


def asset_rev(path: object) -> str:
    """Append `?v=<stamp>` when `content/<path>.stamp` exists."""
    if path is None:
        return ""
    text = str(path).strip()
    if not text or "?" in text:
        return text
    stamp = CONTENT / f"{text.lstrip('/')}.stamp"
    if not stamp.is_file():
        return text
    digest = stamp.read_text(encoding="utf-8").strip()
    if not digest:
        return text
    return f"{text}?v={digest[:12]}"
