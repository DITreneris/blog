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
        "prompt-registry",
        "multi-agent-handoff",
        "business-outcomes",
        "og-default",
    }
)


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f) or {}

    for row in manifest.get("illustrations") or []:
        if row.get("generator") != "satori":
            continue
        row_id = row.get("id") or row.get("slug") or "?"
        template = row.get("template")
        source = row.get("source")
        slug = row.get("slug")

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

        if not slug:
            errors.append(f"{row_id}: satori row missing slug")

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
