#!/usr/bin/env python3
"""Validate Markdown frontmatter for articles and pages."""

from __future__ import annotations

import re
import sys
from enum import Enum
from pathlib import Path

import frontmatter

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
ARTICLES = CONTENT / "articles"

BOILERPLATE_MARKER = "The hero diagram summarizes the core idea"
FIELD_NOTES_SUMMARY = re.compile(r"^Field notes on ", re.I)
GENERIC_TAKEAWAY = re.compile(
    r"only creates value when wrapped in workflow, context, and evaluation"
)
STRUCTURED_TAKEAWAY = re.compile(
    r"^Structured implementation turns .+ into repeatable outcomes\.$", re.I
)
LINK_PATTERN = re.compile(r"\]\(/articles/([a-z0-9-]+)/")
WORDS_PER_MINUTE = 200
MIN_CASE_STUDY_WORDS = 250
MIN_TEMPLATE_WORDS = 150


class Category(str, Enum):
    PROMPT_SYSTEMS = "Prompt Systems"
    AI_AGENTS = "AI Agents"
    AI_GOVERNANCE = "AI Governance"
    IMPLEMENTATION = "Implementation Notes"
    CASE_STUDIES = "Case Studies"
    TEMPLATES = "Templates"
    OPINION = "Opinion"
    FRAMEWORK = "Framework"


REQUIRED = ("title", "slug", "summary", "category", "date", "status")


def _slug_paths() -> set[str]:
    return {p.stem for p in ARTICLES.glob("*.md")}


def _word_count(text: str) -> int:
    return len(re.findall(r"\w+", text or ""))


def _reading_time_minutes(label: str) -> int | None:
    m = re.match(r"^(\d+)\s*min read$", (label or "").strip(), re.I)
    return int(m.group(1)) if m else None


def validate_file(path: Path, slugs: set[str]) -> list[str]:
    errors: list[str] = []
    post = frontmatter.load(path)
    meta = post.metadata
    is_page = "pages" in path.parts
    body = post.content or ""

    if is_page:
        if not meta.get("title"):
            errors.append(f"{path.name}: missing required field 'title'")
        if "Placeholder about page" in body:
            errors.append(f"{path.name}: about page still contains placeholder copy")
        return errors

    for key in REQUIRED:
        if key not in meta or meta[key] in (None, ""):
            errors.append(f"{path.name}: missing required field '{key}'")

    if "category" in meta and meta["category"]:
        try:
            Category(meta["category"])
        except ValueError:
            valid = ", ".join(c.value for c in Category)
            errors.append(
                f"{path.name}: invalid category '{meta['category']}'. "
                f"Must be one of: {valid}"
            )

    if "status" in meta and meta["status"] not in ("draft", "published"):
        errors.append(f"{path.name}: status must be 'draft' or 'published'")

    hero = meta.get("hero_image")
    if hero:
        hero_path = CONTENT / hero.replace("/", "\\")
        if not hero_path.is_file():
            errors.append(f"{path.name}: hero_image not found at content/{hero}")

    if meta.get("status") == "published" and not hero:
        print(
            f"  warning: {path.name}: published article has no hero_image",
            file=sys.stderr,
        )

    if meta.get("status") == "published":
        if BOILERPLATE_MARKER in body:
            errors.append(f"{path.name}: published body contains boilerplate template")
        summary = str(meta.get("summary") or "")
        if FIELD_NOTES_SUMMARY.match(summary):
            errors.append(f"{path.name}: summary uses 'Field notes on' stub pattern")
        takeaway = str(meta.get("key_takeaway") or "")
        if GENERIC_TAKEAWAY.search(takeaway) or STRUCTURED_TAKEAWAY.match(takeaway):
            errors.append(f"{path.name}: key_takeaway looks like auto-generated stub")

        rt = _reading_time_minutes(str(meta.get("reading_time") or ""))
        if rt is not None:
            expected = max(1, (_word_count(body) + WORDS_PER_MINUTE - 1) // WORDS_PER_MINUTE)
            if abs(rt - expected) > 2:
                errors.append(
                    f"{path.name}: reading_time '{rt} min' mismatches ~{expected} min from word count"
                )

        for slug in LINK_PATTERN.findall(body):
            if slug not in slugs:
                errors.append(f"{path.name}: broken internal link to /articles/{slug}/")

        category = meta.get("category")
        wc = _word_count(body)
        if category == Category.CASE_STUDIES.value and wc < MIN_CASE_STUDY_WORDS:
            errors.append(
                f"{path.name}: case study too short ({wc} words, min {MIN_CASE_STUDY_WORDS})"
            )
        if category == Category.TEMPLATES.value and wc < MIN_TEMPLATE_WORDS:
            errors.append(
                f"{path.name}: template too short ({wc} words, min {MIN_TEMPLATE_WORDS})"
            )

    return errors


def main() -> int:
    paths = list((CONTENT / "articles").glob("*.md"))
    paths += list((CONTENT / "pages").glob("*.md"))

    if not paths:
        print("No content files found.", file=sys.stderr)
        return 1

    slugs = _slug_paths()
    all_errors: list[str] = []
    for path in sorted(paths):
        all_errors.extend(validate_file(path, slugs))

    if all_errors:
        print("Validation failed:", file=sys.stderr)
        for err in all_errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print(f"OK: {len(paths)} file(s) validated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
