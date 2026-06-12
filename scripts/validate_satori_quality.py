#!/usr/bin/env python3
"""Warn when Satori heroes use thin Tier-B templates on teaching-heavy tiers."""

from __future__ import annotations

import sys
from collections import defaultdict
from pathlib import Path

import frontmatter
import yaml

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "content" / "articles"
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"

# Thin horizontal / dev-microcopy templates — see docs/reports/satori-tier-b-audit.md
TIER_B_TEMPLATES = frozenset(
    {
        "observability-trace",
        "business-outcomes",
        "multi-agent-handoff",
        "governance-eval-gates",
        "clear-scorecard",
        "category-default",
    }
)

# Slugs where Tier-B template is an acceptable semantic fit (observability / handoff topics)
TIER_B_ALLOWLIST = frozenset(
    {
        "multi-agent-observability",
        "handoff-rules-between-humans-and-ai",
    }
)

# Templates intentionally shared across multiple teaching articles
DUPLICATE_TEMPLATE_ALLOWLIST = frozenset(
    {
        "checklist-worksheet",
        "operating-cadence",
        "article-og",
    }
)

TEACHING_TIERS = frozenset({"playbook", "pillar", "template", "nav"})

HERO_TITLE_MAX = 48


def _resolved_hero_title(row: dict, fm_title: str) -> str:
    return str(row.get("satori_title") or fm_title or row.get("title") or "")


def _slug_satori_meta() -> dict[str, dict]:
    if not ILLUSTRATIONS_YAML.is_file():
        return {}
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f) or {}
    out: dict[str, dict] = {}
    for row in manifest.get("illustrations") or []:
        if row.get("generator") != "satori":
            continue
        slug = row.get("slug")
        if slug:
            out[str(slug)] = row
    return out


def _published_teaching_by_template(
    meta_by_slug: dict[str, dict],
) -> dict[str, list[str]]:
    by_template: dict[str, list[str]] = defaultdict(list)
    for path in sorted(ARTICLES.glob("*.md")):
        post = frontmatter.load(path)
        meta = post.metadata
        if meta.get("status") != "published":
            continue
        tier = str(meta.get("content_tier") or "")
        if tier not in TEACHING_TIERS:
            continue
        slug = str(meta.get("slug") or path.stem)
        row = meta_by_slug.get(slug)
        if not row:
            continue
        usage = row.get("usage") or []
        if "hero" not in usage:
            continue
        template = str(row.get("template") or "")
        if template:
            by_template[template].append(slug)
    return by_template


def main() -> int:
    meta_by_slug = _slug_satori_meta()
    warnings: list[str] = []

    for path in sorted(ARTICLES.glob("*.md")):
        post = frontmatter.load(path)
        meta = post.metadata
        if meta.get("status") != "published":
            continue

        slug = str(meta.get("slug") or path.stem)
        row = meta_by_slug.get(slug)
        if not row:
            continue

        template = str(row.get("template") or "")
        tier = str(meta.get("content_tier") or "")

        if (
            tier in TEACHING_TIERS
            and template in TIER_B_TEMPLATES
            and slug not in TIER_B_ALLOWLIST
        ):
            warnings.append(
                f"{path.name}: playbook/pillar/template on Tier-B Satori template "
                f"'{template}' (see docs/reports/satori-tier-b-audit.md; use satori-hero skill)"
            )

        title = str(meta.get("title") or "")
        usage = row.get("usage") or []
        hero_title = _resolved_hero_title(row, title)
        if "hero" in usage:
            if "(" in hero_title or ")" in hero_title:
                warnings.append(
                    f"{path.name}: hero title contains parentheses — shorten title or "
                    "set satori_title without brackets"
                )
            if len(hero_title) > HERO_TITLE_MAX:
                warnings.append(
                    f"{path.name}: hero title too long ({len(hero_title)} chars, max "
                    f"{HERO_TITLE_MAX}) — shorten article title or set satori_title"
                )

    for template, slugs in sorted(_published_teaching_by_template(meta_by_slug).items()):
        if template in DUPLICATE_TEMPLATE_ALLOWLIST:
            continue
        if len(slugs) < 2:
            continue
        slug_list = ", ".join(sorted(slugs))
        warnings.append(
            f"duplicate Satori template '{template}' on {len(slugs)} teaching articles: "
            f"{slug_list} — assign dedicated worksheet per slug (satori-hero skill)"
        )

    for warn in warnings:
        print(f"  warning: {warn}", file=sys.stderr)

    if warnings:
        print(f"Satori quality: {len(warnings)} warning(s).", file=sys.stderr)
    else:
        print("Satori quality validation OK.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
