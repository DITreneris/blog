#!/usr/bin/env python3
"""Copy and optimize illustration masters into content/images for Pelican."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
MASTERS = ROOT / "data" / "01_illustrations"
ARTICLE_IMAGES = ROOT / "content" / "images" / "articles"
HUB_IMAGES = ROOT / "content" / "images" / "hub"

MAX_WIDTH = 1600
JPEG_QUALITY = 85
# PNG optimize target: resize large sources; Pillow save with optimize=True


def _load_manifest() -> dict:
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def _optimize_image(src: Path, dest: Path) -> None:
    try:
        from PIL import Image
    except ImportError as exc:
        raise SystemExit(
            "Pillow is required for image sync. Install: pip install Pillow"
        ) from exc

    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as img:
        img = img.convert("RGBA") if img.mode in ("P", "LA") else img.convert("RGB")
        w, h = img.size
        if w > MAX_WIDTH:
            ratio = MAX_WIDTH / w
            img = img.resize((MAX_WIDTH, int(h * ratio)), Image.Resampling.LANCZOS)
        img.save(dest, format="PNG", optimize=True)


def sync_article_row(row: dict, dry_run: bool) -> list[str]:
    errors: list[str] = []
    source_rel = row["source"]
    slug = row["slug"]
    src = MASTERS / source_rel.replace("/", "\\").replace("\\", "/")
    if not src.is_file():
        # try forward slashes on Windows
        src = MASTERS / Path(source_rel)
    if not src.is_file():
        errors.append(f"Missing source: {source_rel}")
        return errors

    dest = ARTICLE_IMAGES / slug / "hero.png"
    if dry_run:
        print(f"  [dry-run] {source_rel} -> {dest.relative_to(ROOT)}")
        return errors

    _optimize_image(src, dest)
    print(f"  OK: {dest.relative_to(ROOT)}")
    return errors


def sync_hub(manifest: dict, dry_run: bool) -> list[str]:
    errors: list[str] = []
    hub_map = manifest.get("hub_images") or {}
    illustrations = {r["id"]: r for r in manifest.get("illustrations", [])}

    for key, dest_rel in hub_map.items():
        row = next(
            (r for r in manifest.get("illustrations", []) if r.get("hub_asset") == key),
            None,
        )
        if not row:
            errors.append(f"No illustration with hub_asset={key}")
            continue
        src = MASTERS / row["source"]
        if not src.is_file():
            src = MASTERS / Path(row["source"])
        dest = ROOT / "content" / dest_rel.replace("/", "\\")
        if dry_run:
            print(f"  [dry-run] hub {key}: {row['source']} -> {dest.relative_to(ROOT)}")
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        _optimize_image(src, dest)
        print(f"  OK hub: {dest.relative_to(ROOT)}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--id", help="Sync single illustration id")
    args = parser.parse_args()

    manifest = _load_manifest()
    rows = manifest.get("illustrations", [])
    if args.id:
        rows = [r for r in rows if r["id"] == args.id]
        if not rows:
            print(f"Unknown id: {args.id}", file=sys.stderr)
            return 1

    all_errors: list[str] = []
    print("Syncing article heroes...")
    for row in rows:
        all_errors.extend(sync_article_row(row, args.dry_run))

    print("Syncing hub images...")
    all_errors.extend(sync_hub(manifest, args.dry_run))

    if all_errors:
        for e in all_errors:
            print(f"  ERROR: {e}", file=sys.stderr)
        return 1

    print(f"Done: {len(rows)} article hero(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
