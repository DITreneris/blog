#!/usr/bin/env python3
"""Create article markdown for every manifest row that lacks a file."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
ARTICLES = ROOT / "content" / "articles"
NEW_POST = ROOT / "scripts" / "new_post.py"


def main() -> int:
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f)

    created = 0
    skipped = 0
    for row in manifest.get("illustrations", []):
        path = ARTICLES / f"{row['slug']}.md"
        if path.exists():
            skipped += 1
            continue
        subprocess.run(
            [
                sys.executable,
                str(NEW_POST),
                "--from-illustration",
                row["id"],
                "--status",
                "published",
            ],
            check=True,
            cwd=ROOT,
        )
        created += 1

    print(f"Created {created}, skipped {skipped} (already exist).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
