#!/usr/bin/env python3
"""Copy and optimize illustration masters into content/images for Pelican."""

from __future__ import annotations

import argparse
import hashlib
import sys
from dataclasses import dataclass
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
MASTERS = ROOT / "data" / "01_illustrations"
ARTICLE_IMAGES = ROOT / "content" / "images" / "articles"

MAX_WIDTH = 1600
WEBP_QUALITY = 80
WEBP_METHOD = 4
RESPONSIVE_WIDTHS = (400, 800, 1600)
# Bump to force a one-time re-encode of every dest.
ENCODER_ID = "png-opt1-webp-q80-m4-w400-800-1600"


@dataclass
class SyncStats:
    skipped: int = 0
    wrote: int = 0


def _load_manifest() -> dict:
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def _stamp_path(dest: Path) -> Path:
    return Path(str(dest) + ".stamp")


def fingerprint(src: Path, encoder_id: str = ENCODER_ID) -> str:
    digest = hashlib.sha256()
    digest.update(src.read_bytes())
    digest.update(encoder_id.encode("utf-8"))
    return digest.hexdigest()


def required_outputs(dest: Path, *, write_webp: bool) -> list[Path]:
    outs = [dest]
    if write_webp and dest.suffix.lower() == ".png":
        base = dest.with_suffix("")
        outs.append(dest.with_suffix(".webp"))
        for width in RESPONSIVE_WIDTHS:
            outs.append(Path(f"{base}-{width}.webp"))
    return outs


def is_fresh(src: Path, dest: Path, *, write_webp: bool) -> bool:
    stamp = _stamp_path(dest)
    if not stamp.is_file() or not src.is_file():
        return False
    if stamp.read_text(encoding="utf-8").strip() != fingerprint(src):
        return False
    return all(path.is_file() for path in required_outputs(dest, write_webp=write_webp))


def _write_stamp(src: Path, dest: Path) -> None:
    _stamp_path(dest).write_text(fingerprint(src) + "\n", encoding="utf-8")


def _write_webp_variants(img, png_path: Path) -> None:
    from PIL import Image

    base = png_path.with_suffix("")
    w, h = img.size
    img.save(
        png_path.with_suffix(".webp"),
        format="WEBP",
        quality=WEBP_QUALITY,
        method=WEBP_METHOD,
    )
    for target_w in RESPONSIVE_WIDTHS:
        if target_w >= w:
            variant = img
        else:
            ratio = target_w / w
            variant = img.resize(
                (target_w, int(h * ratio)), Image.Resampling.LANCZOS
            )
        out = Path(f"{base}-{target_w}.webp")
        variant.save(out, format="WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)


def _optimize_image(src: Path, dest: Path, *, write_webp: bool = True) -> None:
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
        if write_webp and dest.suffix.lower() == ".png":
            _write_webp_variants(img, dest)


def sync_dest(
    src: Path,
    dest: Path,
    *,
    write_webp: bool,
    dry_run: bool,
    force: bool,
    stats: SyncStats,
    label: str | None = None,
) -> None:
    try:
        shown = dest.relative_to(ROOT)
    except ValueError:
        shown = dest
    tag = label or str(shown)

    if dry_run:
        extra = " (+ webp variants)" if write_webp else ""
        print(f"  [dry-run] {src} -> {shown}{extra}")
        return

    if not force and is_fresh(src, dest, write_webp=write_webp):
        stats.skipped += 1
        return

    _optimize_image(src, dest, write_webp=write_webp)
    _write_stamp(src, dest)
    stats.wrote += 1
    print(f"  OK: {tag}")


def sync_article_row(
    row: dict, dry_run: bool, force: bool, stats: SyncStats
) -> list[str]:
    errors: list[str] = []
    usage = row.get("usage") or []

    slug = row.get("slug")
    if not slug:
        return errors

    source_rel = row.get("source")
    if "hero" in usage:
        if not source_rel:
            errors.append(f"{slug}: hero usage requires source")
            return errors
        src = MASTERS / Path(source_rel.replace("\\", "/"))
        if not src.is_file():
            errors.append(f"Missing source: {source_rel}")
            return errors

        dest = ARTICLE_IMAGES / slug / "hero.png"
        sync_dest(
            src,
            dest,
            write_webp=True,
            dry_run=dry_run,
            force=force,
            stats=stats,
        )

    if "og" in usage:
        og_rel = row.get("og_source") or f"Satori/{slug}-og.png"
        og_src = MASTERS / Path(og_rel.replace("\\", "/"))
        if not og_src.is_file():
            errors.append(f"Missing OG source for {slug}: {og_rel}")
        else:
            og_dest = ARTICLE_IMAGES / slug / "og.png"
            sync_dest(
                og_src,
                og_dest,
                write_webp=False,
                dry_run=dry_run,
                force=force,
                stats=stats,
                label=f"og {og_dest.relative_to(ROOT)}",
            )

    return errors


def sync_hub(
    manifest: dict, dry_run: bool, force: bool, stats: SyncStats
) -> list[str]:
    errors: list[str] = []
    hub_map = manifest.get("hub_images") or {}

    for key, dest_rel in hub_map.items():
        row = next(
            (r for r in manifest.get("illustrations", []) if r.get("hub_asset") == key),
            None,
        )
        if not row:
            errors.append(f"No illustration with hub_asset={key}")
            continue
        src = MASTERS / Path(str(row["source"]).replace("\\", "/"))
        if not src.is_file():
            errors.append(f"Missing hub source for {key}: {row['source']}")
            continue
        dest = ROOT / "content" / Path(str(dest_rel).replace("\\", "/"))
        sync_dest(
            src,
            dest,
            write_webp=True,
            dry_run=dry_run,
            force=force,
            stats=stats,
            label=f"hub {dest.relative_to(ROOT)}",
        )

    return errors


def sync_topic_og(
    manifest: dict, dry_run: bool, force: bool, stats: SyncStats
) -> list[str]:
    errors: list[str] = []
    topic_map = manifest.get("topic_og_images") or {}
    rows = {r.get("category_slug"): r for r in manifest.get("category_og") or []}

    for slug, dest_rel in topic_map.items():
        row = rows.get(slug)
        if not row:
            errors.append(f"No category_og row for topic slug: {slug}")
            continue
        src = MASTERS / Path(str(row["source"]).replace("\\", "/"))
        if not src.is_file():
            errors.append(f"Missing category OG source for {slug}: {row['source']}")
            continue
        dest = ROOT / "content" / Path(str(dest_rel).replace("\\", "/"))
        sync_dest(
            src,
            dest,
            write_webp=False,
            dry_run=dry_run,
            force=force,
            stats=stats,
            label=f"topic og {dest.relative_to(ROOT)}",
        )

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true", help="Ignore stamps and re-encode")
    parser.add_argument("--id", help="Sync single illustration id")
    args = parser.parse_args()

    manifest = _load_manifest()
    rows = manifest.get("illustrations", [])
    if args.id:
        rows = [r for r in rows if r["id"] == args.id]
        if not rows:
            print(f"Unknown id: {args.id}", file=sys.stderr)
            return 1

    stats = SyncStats()
    all_errors: list[str] = []
    print("Syncing article heroes...")
    for row in rows:
        all_errors.extend(sync_article_row(row, args.dry_run, args.force, stats))

    print("Syncing hub images...")
    all_errors.extend(sync_hub(manifest, args.dry_run, args.force, stats))

    print("Syncing topic OG images...")
    all_errors.extend(sync_topic_og(manifest, args.dry_run, args.force, stats))

    if all_errors:
        for e in all_errors:
            print(f"  ERROR: {e}", file=sys.stderr)
        return 1

    print(
        f"Done: {len(rows)} article row(s). skipped {stats.skipped}, wrote {stats.wrote}."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
