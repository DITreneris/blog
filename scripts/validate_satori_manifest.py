#!/usr/bin/env python3
"""Validate Satori rows in data/illustrations.yaml and master PNG presence."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
MASTERS = ROOT / "data" / "01_illustrations"
OG_DEFAULT = ROOT / "theme" / "promptanatomy" / "static" / "img" / "og-default.png"
TEMPLATES_DIR = ROOT / "data" / "og" / "templates"
KNOWN_TEMPLATES = frozenset(
    {
        "context-architecture",
        "case-study-support",
        "case-study-eval-scale",
        "prompt-registry",
        "prompt-registry-blueprint",
        "multi-agent-handoff",
        "business-outcomes",
        "governance-raci",
        "governance-raci-worksheet",
        "governance-audit-log",
        "governance-eval-gates",
        "clear-scorecard",
        "rag-ladder",
        "mcp-architecture",
        "platform-comparison",
        "glossary-terms",
        "split-compare",
        "tier-ladder",
        "context-window-tube",
        "memory-tiers",
        "grounding-stack",
        "context-rot",
        "checklist-worksheet",
        "security-controls",
        "observability-trace",
        "workflow-canvas",
        "framework-chooser",
        "procurement-timeline",
        "implementation-stack",
        "operating-cadence",
        "workflow-roi",
        "agent-orchestrator",
        "eval-hooks-worksheet",
        "prompt-regression-week",
        "clear-scorecard-worksheet",
        "team-rituals-worksheet",
        "risk-forum-worksheet",
        "business-outcomes-flow",
        "multi-agent-handoff-worksheet",
        "og-default",
        "category-default",
        "article-og",
        "homepage-hero-frame",
        "homepage-og",
        "category-og",
    }
)


def _og_source(row: dict) -> str | None:
    if row.get("og_source"):
        return str(row["og_source"])
    slug = row.get("slug")
    if slug and "og" in (row.get("usage") or []):
        return f"Satori/{slug}-og.png"
    return None


def _is_manual_og_row(row: dict) -> bool:
    if row.get("manual") is True:
        return True
    og_src = row.get("og_source")
    if og_src and not str(og_src).replace("\\", "/").startswith("Satori/"):
        return True
    usage = row.get("usage") or []
    if "og" not in usage or row.get("generator") == "satori":
        return False
    src = row.get("source")
    if (
        src
        and not str(src).replace("\\", "/").startswith("Satori/")
        and not row.get("satori_og")
    ):
        return True
    return False


def _validate_manual_row(row: dict, errors: list[str], warnings: list[str]) -> None:
    row_id = row.get("id") or row.get("slug") or "?"
    if row.get("manual") and row.get("generator") == "satori":
        errors.append(f"{row_id}: manual:true rows must not use generator:satori")
    source = row.get("source")
    if source:
        master = MASTERS / Path(str(source).replace("\\", "/"))
        if not master.is_file():
            errors.append(
                f"{row_id}: operator master not found at "
                f"data/01_illustrations/{source}"
            )
    if (
        row.get("manual")
        and row.get("og_source")
        and row.get("source") == row.get("og_source")
    ):
        warnings.append(
            f"{row_id}: source and og_source share one operator master (intentional)"
        )
    if "og" in (row.get("usage") or []) and row.get("og_source"):
        og_master = MASTERS / Path(str(row["og_source"]).replace("\\", "/"))
        if not og_master.is_file():
            errors.append(
                f"{row_id}: operator OG master not found at "
                f"data/01_illustrations/{row['og_source']}"
            )


def _validate_satori_row(row: dict, errors: list[str]) -> None:
    row_id = row.get("id") or row.get("slug") or row.get("category_slug") or "?"
    template = row.get("template")
    source = row.get("source")
    slug = row.get("slug")
    hub_asset = row.get("hub_asset")
    category_slug = row.get("category_slug")

    if not template:
        errors.append(f"{row_id}: generator satori requires template")
    elif template not in KNOWN_TEMPLATES:
        errors.append(f"{row_id}: unknown template '{template}'")
    elif not (TEMPLATES_DIR / f"{template}.mjs").is_file():
        errors.append(f"{row_id}: template file missing: {template}.mjs")

    if not source:
        errors.append(f"{row_id}: generator satori requires source path")
    else:
        master = MASTERS / Path(str(source).replace("\\", "/"))
        if not master.is_file():
            errors.append(
                f"{row_id}: Satori master not found at data/01_illustrations/{source} "
                f"(run npm run build:satori)"
            )

    if not slug and not hub_asset and not category_slug:
        errors.append(f"{row_id}: satori row requires slug, hub_asset, or category_slug")

    usage = row.get("usage") or []
    if slug and template == "category-default" and "hero" in usage:
        errors.append(
            f"{row_id}: category-default banned on article hero rows — "
            "assign a topic worksheet template (see .cursor/skills/satori-hero/SKILL.md)"
        )

    if row.get("embed_source"):
        embed = MASTERS / Path(str(row["embed_source"]).replace("\\", "/"))
        if not embed.is_file():
            errors.append(f"{row_id}: embed_source not found: {row['embed_source']}")

    og_src = _og_source(row)
    if og_src and slug:
        og_master = MASTERS / Path(og_src.replace("\\", "/"))
        if not og_master.is_file():
            errors.append(
                f"{row_id}: OG master not found at data/01_illustrations/{og_src} "
                f"(run npm run build:satori)"
            )
        og_template = row.get("og_template") or "article-og"
        if og_template not in KNOWN_TEMPLATES:
            errors.append(f"{row_id}: unknown og_template '{og_template}'")


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f) or {}

    for row in manifest.get("illustrations") or []:
        if row.get("generator") != "satori":
            if _is_manual_og_row(row):
                _validate_manual_row(row, errors, warnings)
            elif "og" in (row.get("usage") or []) and row.get("slug"):
                og_src = _og_source(row)
                if og_src:
                    og_master = MASTERS / Path(og_src.replace("\\", "/"))
                    if not og_master.is_file():
                        row_id = row.get("id") or row.get("slug")
                        errors.append(
                            f"{row_id}: OG master not found at data/01_illustrations/{og_src} "
                            f"(run npm run build:satori)"
                        )
            continue
        _validate_satori_row(row, errors)

    for row in manifest.get("category_og") or []:
        if row.get("generator") != "satori":
            continue
        _validate_satori_row(row, errors)

    if not OG_DEFAULT.is_file():
        errors.append(f"Missing og-default.png at {OG_DEFAULT.relative_to(ROOT)} (run npm run build:satori)")

    fonts_dir = ROOT / "data" / "og" / "fonts"
    for name in ("Inter-Regular.woff", "Inter-Bold.woff"):
        if not (fonts_dir / name).is_file():
            warnings.append(f"Missing font {name} (run npm run fonts:fetch)")

    for warn in warnings:
        print(f"  warning: {warn}", file=sys.stderr)

    if errors:
        print("Satori manifest validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print("Satori manifest validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
