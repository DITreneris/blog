"""Plain-text sanitizer for SEO surfaces (titles, meta, JSON-LD)."""

from __future__ import annotations

import html
import re
from typing import Any

_TAG_RE = re.compile(r"<[^>]+>")
_WS_RE = re.compile(r"\s+")


def seo_plain(value: Any) -> str:
    """Strip Typogrify/HTML artifacts for meta tags and structured data."""
    if value is None:
        return ""
    text = str(value)
    text = text.replace("\xa0", " ").replace("&nbsp;", " ").replace("&#160;", " ")
    text = html.unescape(text)
    text = _TAG_RE.sub("", text)
    text = _WS_RE.sub(" ", text).strip()
    return text
