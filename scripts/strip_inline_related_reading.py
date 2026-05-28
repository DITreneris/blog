"""One-off sweep: remove the auto-template ``## Related reading`` H2 + bullet
block from every article in ``content/articles/``.

Pelican's ``article.html`` now renders related-articles cards automatically via
``partials/related_articles.html``, so the inline H2 + bullet duplicate is
removed to keep article bodies focused on prose.

The sweep is precise: it removes only the heading + adjacent bullet list +
optional trailing blank line. Content that appears AFTER the related-reading
block (rare; one article has an Implementation checklist H2 after it) is
preserved.

Usage::

    python scripts/strip_inline_related_reading.py          # apply
    python scripts/strip_inline_related_reading.py --dry-run

Idempotent: re-running it on already-stripped files is a no-op.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ARTICLES_DIR = Path(__file__).resolve().parent.parent / "content" / "articles"

RE_RELATED_BLOCK = re.compile(
    r"^## Related reading[ \t]*\n"
    r"(?:\n)?"
    r"(?:- [^\n]*\n)+"
    r"(?:\n)?",
    re.MULTILINE,
)


def strip_block(text: str) -> tuple[str, bool]:
    new_text, n = RE_RELATED_BLOCK.subn("", text)
    if n == 0:
        return text, False
    return new_text.rstrip() + "\n", True


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Show changes without writing.")
    args = parser.parse_args()

    changed = 0
    for md_path in sorted(ARTICLES_DIR.glob("*.md")):
        original = md_path.read_text(encoding="utf-8")
        updated, did_change = strip_block(original)
        if did_change:
            changed += 1
            verb = "WOULD STRIP" if args.dry_run else "STRIPPED"
            print(f"{verb}: {md_path.name}")
            if not args.dry_run:
                md_path.write_text(updated, encoding="utf-8")

    print(f"\n{changed} file(s) {'would be' if args.dry_run else ''} changed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
