"""Image URLs pick up the sync stamp without moving the file path."""

from __future__ import annotations

import unittest

from scripts.asset_rev import asset_rev

HERO = "/images/articles/prompt-engineering-vs-ai-workflow-engineering/hero.png"
OG = "images/articles/prompt-engineering-vs-ai-workflow-engineering/og.png"


class AssetRevTests(unittest.TestCase):
    def test_stamped_hero_keeps_path_and_adds_query(self) -> None:
        url = asset_rev(HERO)
        self.assertTrue(url.startswith(HERO + "?v="))
        token = url.split("?v=", 1)[1]
        self.assertEqual(len(token), 12)
        variant = url.replace(".png", "-400.webp")
        self.assertTrue(variant.startswith(HERO.replace(".png", "-400.webp") + "?v="))
        self.assertTrue(url.replace(".png", ".webp").startswith(HERO.replace(".png", ".webp") + "?v="))

    def test_og_path_has_no_extra_slash(self) -> None:
        url = asset_rev(OG)
        self.assertTrue(url.startswith(OG + "?v="))
        self.assertFalse(url.startswith("/"))

    def test_missing_stamp_is_unchanged(self) -> None:
        bare = "/images/articles/does-not-exist/hero.png"
        self.assertEqual(asset_rev(bare), bare)

    def test_existing_query_is_left_alone(self) -> None:
        marked = HERO + "?v=already"
        self.assertEqual(asset_rev(marked), marked)

    def test_empty(self) -> None:
        self.assertEqual(asset_rev(""), "")
        self.assertEqual(asset_rev(None), "")


if __name__ == "__main__":
    unittest.main()
