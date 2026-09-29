#!/usr/bin/env python3
"""Lock publish dates to the schedule. A cutoff bump must not move them."""

from __future__ import annotations

import unittest
from datetime import timedelta

from scripts.assign_article_dates import (
    ARTICLES,
    DRAFT_ORDER,
    PUBLICATION_ORDER,
    PUBLISH_CUTOFF,
    WAVE2_START,
    _build_draft_dates,
    _build_publication_dates,
    _frontmatter_date,
    _last_wave_date,
)


class AssignArticleDatesTests(unittest.TestCase):
    def test_schedule_matches_frontmatter(self) -> None:
        scheduled = {**_build_publication_dates(), **_build_draft_dates()}
        mismatches: list[str] = []
        for slug in PUBLICATION_ORDER + DRAFT_ORDER:
            path = ARTICLES / f"{slug}.md"
            self.assertTrue(path.is_file(), slug)
            disk = _frontmatter_date(path.read_text(encoding="utf-8"))
            self.assertIsNotNone(disk, slug)
            if disk != scheduled[slug]:
                mismatches.append(
                    f"{slug} disk={disk.isoformat()} schedule={scheduled[slug].isoformat()}"
                )
        self.assertEqual(mismatches, [])

    def test_cutoff_is_a_ceiling_not_the_wave_anchor(self) -> None:
        self.assertLessEqual(max(_build_publication_dates().values()), PUBLISH_CUTOFF)
        self.assertEqual(_last_wave_date().isoformat(), "2026-06-17")
        self.assertEqual(
            (_last_wave_date() + timedelta(days=22)).isoformat(),
            "2026-07-09",
        )
        self.assertEqual(WAVE2_START.isoformat(), "2026-05-29")
        self.assertGreater(PUBLISH_CUTOFF, _last_wave_date())


if __name__ == "__main__":
    unittest.main()
