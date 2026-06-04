"""Markdown reader with YAML frontmatter (nested metadata such as faq lists).

Pelican's default Markdown reader uses markdown.extensions.meta, which does not
parse nested YAML and can leak list items into article HTML.
"""

from __future__ import annotations

import logging
from datetime import date, datetime

import frontmatter
from markdown import Markdown
from pelican.readers import MarkdownReader
from pelican.utils import pelican_open

logger = logging.getLogger(__name__)


class FrontmatterMarkdownReader(MarkdownReader):
    """Parse --- YAML --- bodies via python-frontmatter, then render Markdown."""

    def read(self, source_path):
        self._source_path = source_path
        with pelican_open(source_path) as text:
            post = frontmatter.loads(text)

        self._md = Markdown(**self.settings["MARKDOWN"])
        content = self._md.convert(post.content or "")

        metadata = {}
        for name, value in post.metadata.items():
            key = name.lower()
            if key in ("date", "modified") and isinstance(value, (date, datetime)):
                if isinstance(value, date) and not isinstance(value, datetime):
                    value = value.isoformat()
                else:
                    value = value.isoformat()
                metadata[key] = self.process_metadata(key, value)
                continue
            if key in self.settings.get("FORMATTED_FIELDS", ()):
                self._md.reset()
                formatted = self._md.convert(str(value))
                metadata[key] = self.process_metadata(key, formatted)
            else:
                metadata[key] = self.process_metadata(key, value)

        return content, metadata
