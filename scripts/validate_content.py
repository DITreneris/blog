#!/usr/bin/env python3
"""Validate Markdown frontmatter for articles and pages."""

from __future__ import annotations

import re
import sys
from enum import Enum
from pathlib import Path

import frontmatter
import yaml

from reading_time import WORDS_PER_MINUTE, minutes_from_label, word_count

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
ARTICLES = CONTENT / "articles"
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"

CAPTION_DIAGRAM_KEYWORDS = re.compile(
    r"\b(ladder|split|three types|tube|gauge|contrast|rungs|memory tiers|"
    r"stack|canvas|cadence|forum|procurement|timeline|worksheet|agenda|ritual|"
    r"scorecard|timeline|matrix|pipeline|registry|RACI|audit|gates)\b",
    re.I,
)

BOILERPLATE_MARKER = "The hero diagram summarizes the core idea"
FIELD_NOTES_SUMMARY = re.compile(r"^Field notes on ", re.I)
GENERIC_TAKEAWAY = re.compile(
    r"only creates value when wrapped in workflow, context, and evaluation"
)
STRUCTURED_TAKEAWAY = re.compile(
    r"^Structured implementation turns .+ into repeatable outcomes\.$", re.I
)
LINK_PATTERN = re.compile(r"\]\(/articles/([a-z0-9-]+)/")
MIN_CASE_STUDY_WORDS = 250
MIN_TEMPLATE_WORDS = 150
MIN_FRAMEWORK_WORDS = 900
MIN_PILLAR_WORDS = 1200
# Release 2: enforce pillar minimum on all start-here slugs.
PILLAR_SLUGS = frozenset(
    {
        "the-model-is-not-the-system",
        "10-signs-your-company-is-vibe-prompting",
        "how-to-design-an-ai-agent-workflow",
        "what-is-context-architecture",
        "prompt-registry-playbook",
        "rag-in-production",
        "grounding-ai-outputs",
        "model-context-protocol-enterprise",
    }
)
PILLAR_SLUGS_RELEASE_2: frozenset[str] = frozenset()

# Ecosystem soft-launch field notes — FAQ deferred (CONTENT_STANDARDS / SEO Phase B).
FAQ_DEFER_SLUG_SUFFIXES = ("-launch", "-soft-launch")
FAQ_DEFER_SLUGS = frozenset(
    {
        "corporate-ladder-soft-launch",
        "executive-os-pro-launch",
        "shipping-prompt-anatomy",
    }
)
FAQ_BODY_LEAK = re.compile(r"^\s*[-*]?\s*question:\s", re.I | re.M)
DECK_SECTION_MIN_WORDS = 80
DECK_SECTION_THRESHOLD = 0.5


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


def _deck_section_warnings(body: str) -> list[str]:
    """Warn when most H2 sections are thin (slide-deck rhythm)."""
    sections = re.split(r"\n##\s+", body.strip())
    if len(sections) < 2:
        return []
    thin = 0
    counted = 0
    for section in sections[1:]:
        chunk = section.split("\n##", 1)[0]
        wc = word_count(chunk)
        counted += 1
        if wc < DECK_SECTION_MIN_WORDS:
            thin += 1
    if counted and thin / counted > DECK_SECTION_THRESHOLD:
        return [
            f"{thin}/{counted} H2 sections under {DECK_SECTION_MIN_WORDS} words (slide-deck rhythm)"
        ]
    return []


def _slug_satori_templates() -> dict[str, str]:
    if not ILLUSTRATIONS_YAML.is_file():
        return {}
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f) or {}
    out: dict[str, str] = {}
    for row in manifest.get("illustrations") or []:
        slug = row.get("slug")
        template = row.get("template")
        if slug and template:
            out[str(slug)] = str(template)
    return out


def validate_file(path: Path, slugs: set[str], slug_templates: dict[str, str]) -> list[str]:
    errors: list[str] = []
    warnings: list[str] = []
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
        hero_path = (CONTENT / hero).resolve()
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

        rt = minutes_from_label(str(meta.get("reading_time") or ""))
        if rt is not None:
            expected = max(1, (word_count(body) + WORDS_PER_MINUTE - 1) // WORDS_PER_MINUTE)
            if abs(rt - expected) > 2:
                errors.append(
                    f"{path.name}: reading_time '{rt} min' mismatches ~{expected} min from word count"
                )

        for slug in LINK_PATTERN.findall(body):
            if slug not in slugs:
                errors.append(f"{path.name}: broken internal link to /articles/{slug}/")

        category = meta.get("category")
        wc = word_count(body)
        if category == Category.CASE_STUDIES.value and wc < MIN_CASE_STUDY_WORDS:
            errors.append(
                f"{path.name}: case study too short ({wc} words, min {MIN_CASE_STUDY_WORDS})"
            )
        if category == Category.TEMPLATES.value and wc < MIN_TEMPLATE_WORDS:
            errors.append(
                f"{path.name}: template too short ({wc} words, min {MIN_TEMPLATE_WORDS})"
            )

        slug = str(meta.get("slug") or path.stem)
        if meta.get("faq") and FAQ_BODY_LEAK.search(body):
            errors.append(
                f"{path.name}: FAQ metadata leaked into body (use YAML frontmatter + FrontmatterMarkdownReader)"
            )

        if slug in PILLAR_SLUGS and wc < MIN_PILLAR_WORDS:
            errors.append(
                f"{path.name}: pillar article too short ({wc} words, min {MIN_PILLAR_WORDS})"
            )
        elif slug in PILLAR_SLUGS_RELEASE_2 and wc < MIN_PILLAR_WORDS:
            warnings.append(
                f"{path.name}: start-here pillar below target ({wc} words, min {MIN_PILLAR_WORDS} in Release 2)"
            )

        if slug in PILLAR_SLUGS:
            if not meta.get("hero_caption"):
                errors.append(f"{path.name}: pillar article missing hero_caption")
            faq = meta.get("faq") or []
            if len(faq) < 2:
                errors.append(
                    f"{path.name}: pillar article needs at least 2 FAQ items in frontmatter"
                )
        elif meta.get("status") == "published" and not meta.get("hero_caption"):
            warnings.append(f"{path.name}: published article missing hero_caption")

        tier = str(meta.get("content_tier") or "")
        if (
            meta.get("status") == "published"
            and tier in {"playbook", "template"}
            and slug not in FAQ_DEFER_SLUGS
            and not any(slug.endswith(suf) for suf in FAQ_DEFER_SLUG_SUFFIXES)
        ):
            faq = meta.get("faq") or []
            if len(faq) < 2:
                warnings.append(
                    f"{path.name}: published {tier} has fewer than 2 FAQ items "
                    "(prefer ≥2 for GEO; see CONTENT_STANDARDS)"
                )

        if (
            category == Category.FRAMEWORK.value
            and wc < MIN_FRAMEWORK_WORDS
            and meta.get("content_tier") != "nav"
        ):
            warnings.append(
                f"{path.name}: framework article short ({wc} words, target {MIN_FRAMEWORK_WORDS}+)"
            )

        for msg in _deck_section_warnings(body):
            warnings.append(f"{path.name}: {msg}")

        manifest_tpl = slug_templates.get(slug)
        if meta.get("content_tier") == "opinion" and manifest_tpl == "category-default":
            warnings.append(
                f"{path.name}: Opinion post uses generic category-default Satori hero "
                "(see EDITORIAL_PLAN §5.1)"
            )
        caption = str(meta.get("hero_caption") or "")
        if (
            manifest_tpl == "category-default"
            and caption
            and CAPTION_DIAGRAM_KEYWORDS.search(caption)
        ):
            warnings.append(
                f"{path.name}: hero_caption describes a bespoke diagram but manifest "
                "uses category-default"
            )

    for warn in warnings:
        print(f"  warning: {warn}", file=sys.stderr)

    return errors


def main() -> int:
    paths = list((CONTENT / "articles").glob("*.md"))
    paths += list((CONTENT / "pages").glob("*.md"))

    if not paths:
        print("No content files found.", file=sys.stderr)
        return 1

    slugs = _slug_paths()
    slug_templates = _slug_satori_templates()
    all_errors: list[str] = []
    for path in sorted(paths):
        all_errors.extend(validate_file(path, slugs, slug_templates))

    if all_errors:
        print("Validation failed:", file=sys.stderr)
        for err in all_errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print(f"OK: {len(paths)} file(s) validated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
