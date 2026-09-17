#!/usr/bin/env python3
"""Stdlib tests for hash-stamp skip in sync_illustrations."""

from __future__ import annotations

import shutil
import tempfile
import unittest
from pathlib import Path

from scripts.sync_illustrations import (
    ENCODER_ID,
    SyncStats,
    fingerprint,
    is_fresh,
    required_outputs,
    sync_dest,
)


def _tiny_png(path: Path, color: tuple[int, int, int] = (255, 0, 0)) -> None:
    from PIL import Image

    path.parent.mkdir(parents=True, exist_ok=True)
    Image.new("RGB", (32, 24), color).save(path, format="PNG")


class SyncSkipTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = Path(tempfile.mkdtemp(prefix="sync-ill-"))
        self.src = self.tmp / "master.png"
        self.dest = self.tmp / "out" / "hero.png"
        _tiny_png(self.src)

    def tearDown(self) -> None:
        shutil.rmtree(self.tmp, ignore_errors=True)

    def test_first_sync_writes(self) -> None:
        stats = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats,
        )
        self.assertEqual(stats.wrote, 1)
        self.assertEqual(stats.skipped, 0)
        for path in required_outputs(self.dest, write_webp=True):
            self.assertTrue(path.is_file(), path)
        stamp = Path(str(self.dest) + ".stamp")
        self.assertTrue(stamp.is_file())
        self.assertEqual(stamp.read_text(encoding="utf-8").strip(), fingerprint(self.src))

    def test_second_sync_skips(self) -> None:
        stats = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats,
        )
        first_mtime = self.dest.stat().st_mtime
        stats2 = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats2,
        )
        self.assertEqual(stats2.skipped, 1)
        self.assertEqual(stats2.wrote, 0)
        self.assertEqual(self.dest.stat().st_mtime, first_mtime)
        self.assertTrue(is_fresh(self.src, self.dest, write_webp=True))

    def test_source_change_reencodes(self) -> None:
        stats = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats,
        )
        _tiny_png(self.src, color=(0, 255, 0))
        stats2 = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats2,
        )
        self.assertEqual(stats2.wrote, 1)
        self.assertEqual(stats2.skipped, 0)
        stamp = Path(str(self.dest) + ".stamp")
        self.assertEqual(stamp.read_text(encoding="utf-8").strip(), fingerprint(self.src))

    def test_missing_variant_reencodes(self) -> None:
        stats = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats,
        )
        missing = self.dest.with_suffix("").as_posix() + "-400.webp"
        Path(missing).unlink()
        stats2 = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats2,
        )
        self.assertEqual(stats2.wrote, 1)
        self.assertTrue(Path(missing).is_file())

    def test_force_reencodes(self) -> None:
        stats = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=False,
            stats=stats,
        )
        stats2 = SyncStats()
        sync_dest(
            self.src,
            self.dest,
            write_webp=True,
            dry_run=False,
            force=True,
            stats=stats2,
        )
        self.assertEqual(stats2.wrote, 1)
        self.assertEqual(stats2.skipped, 0)

    def test_fingerprint_includes_encoder_id(self) -> None:
        a = fingerprint(self.src, encoder_id=ENCODER_ID)
        b = fingerprint(self.src, encoder_id=ENCODER_ID + "-bump")
        self.assertNotEqual(a, b)


if __name__ == "__main__":
    unittest.main()
