"""Shared reading-time helpers for validators, enrich scripts, and Pelican build."""

from __future__ import annotations

import math
import re

WORDS_PER_MINUTE = 200
READING_TIME_LABEL = re.compile(r"^(\d+)\s*min read$", re.I)


def word_count(text: str) -> int:
    return len(re.findall(r"\w+", text or ""))


def minutes_from_words(words: int) -> int:
    return max(1, math.ceil(words / WORDS_PER_MINUTE))


def label_from_words(words: int) -> str:
    return f"{minutes_from_words(words)} min read"


def label_from_text(text: str) -> str:
    return label_from_words(word_count(text))


def minutes_from_label(label: str) -> int | None:
    m = READING_TIME_LABEL.match((label or "").strip())
    return int(m.group(1)) if m else None


def iso_duration(minutes: int) -> str:
    return f"PT{minutes}M"
