#!/usr/bin/env python3
"""Published case studies name a composite, or they are first-party builds."""

from __future__ import annotations

import unittest

from scripts.audit_content_inventory import (
    COMPOSITE_MARKERS,
    FIRST_PARTY_CASE_SLUGS,
    _load_articles,
)


class CaseStudyDisclosureTests(unittest.TestCase):
    def test_published_case_studies_disclose_or_are_first_party(self) -> None:
        missing: list[str] = []
        for row in _load_articles():
            if row["status"] != "published" or row["category"] != "Case Studies":
                continue
            if row["slug"] in FIRST_PARTY_CASE_SLUGS:
                continue
            if not COMPOSITE_MARKERS.search((row["body"] or "")[:800]):
                missing.append(row["slug"])
        self.assertEqual(missing, [])


if __name__ == "__main__":
    unittest.main()
