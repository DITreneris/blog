"""Pelican settings — local development."""

from pathlib import Path
import datetime
import yaml

BASE_DIR = Path(__file__).resolve().parent

import sys

sys.path.insert(0, str(BASE_DIR / "scripts"))
from pelican_frontmatter_reader import FrontmatterMarkdownReader  # noqa: E402
from generate_brand_assets import find_author_photo_source  # noqa: E402
from seo_plain import seo_plain  # noqa: E402

AUTHOR_HAS_PHOTO = find_author_photo_source() is not None


def _load_yaml(name: str) -> dict:
    path = BASE_DIR / "data" / name
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


SITE_CONFIG = _load_yaml("site.yaml")
HUB_SECTIONS = _load_yaml("hub_sections.yaml")
CATEGORIES_DATA = _load_yaml("categories.yaml")
EDITORIAL_CLUSTERS = _load_yaml("editorial_clusters.yaml")
ECOSYSTEM = _load_yaml("ecosystem.yaml")
ILLUSTRATIONS = _load_yaml("illustrations.yaml")

OG_ARTICLE_SLUGS = frozenset(
    row["slug"]
    for row in ILLUSTRATIONS.get("illustrations", [])
    if row.get("slug") and "og" in (row.get("usage") or [])
)

TOPIC_OG_IMAGES = ILLUSTRATIONS.get("topic_og_images", {})
HUB_OG_IMAGE = (ILLUSTRATIONS.get("hub_images") or {}).get("og")

AUTHOR = SITE_CONFIG.get("author", {}).get("name", "Prompt Anatomy")
SITENAME = SITE_CONFIG["brand"]["name"]
SITESUBTITLE = SITE_CONFIG["brand"]["tagline"]
SITEURL = ""
RELATIVE_URLS = True
CANONICAL_SITEURL = SITE_CONFIG.get("brand", {}).get(
    "site_url", "https://www.promptanatomy.blog"
)

DEFAULT_LANG = "en"
TIMEZONE = "America/New_York"

PATH = "content"
ARTICLE_PATHS = ["articles"]
PAGE_PATHS = ["pages"]
ARTICLE_EXCLUDES = []
PAGE_EXCLUDES = []

ARTICLE_URL = "articles/{slug}/"
ARTICLE_SAVE_AS = "articles/{slug}/index.html"
PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"

CATEGORY_URL = "topics/{slug}/"
CATEGORY_SAVE_AS = "topics/{slug}/index.html"

DEFAULT_CATEGORY = "Framework"
DEFAULT_METADATA = {
    "status": "published",
    "authors": AUTHOR,
}

WITH_TEMPLATE = ("draft",)

THEME = BASE_DIR / "theme" / "promptanatomy"
THEME_STATIC_DIR = "static"

PLUGIN_PATHS = []
PLUGINS = []

FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

MARKUP = ("md",)
READERS = {"md": FrontmatterMarkdownReader}
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.toc": {"permalink": False},
    },
    "extensions": [
        "markdown.extensions.extra",
        "markdown.extensions.codehilite",
        "markdown.extensions.toc",
    ],
}
PYGMENTS_STYLE = "monokai"

TYPOGRIFY = True
TYPOGRIFY_IGNORE_TAGS = ["pre", "code", "kbd", "samp", "var"]

STATIC_PATHS = ["images", "extra"]
EXTRA_PATH_METADATA = {
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/llms.txt": {"path": "llms.txt"},
    "extra/ai.txt": {"path": "ai.txt"},
    "extra/.well-known/security.txt": {"path": ".well-known/security.txt"},
    "extra/404.html": {"path": "404.html"},
    "extra/google7305663b2567346e.html": {"path": "google7305663b2567346e.html"},
}

JINJA_ENVIRONMENT = {
    "trim_blocks": True,
    "lstrip_blocks": True,
}

JINJA_FILTERS = {
    "seo_plain": seo_plain,
}

ENABLE_VERCEL_ANALYTICS = False

JINJA_GLOBALS = {
    "SITE_CONFIG": SITE_CONFIG,
    "HUB_SECTIONS": HUB_SECTIONS,
    "CATEGORIES": CATEGORIES_DATA.get("categories", []),
    "ECOSYSTEM": ECOSYSTEM,
    "ILLUSTRATIONS": ILLUSTRATIONS,
    "OG_ARTICLE_SLUGS": OG_ARTICLE_SLUGS,
    "TOPIC_OG_IMAGES": TOPIC_OG_IMAGES,
    "HUB_OG_IMAGE": HUB_OG_IMAGE,
    "HUB_IMAGES": ILLUSTRATIONS.get("hub_images", {}),
    "CURRENT_YEAR": datetime.date.today().year,
    "ENABLE_VERCEL_ANALYTICS": ENABLE_VERCEL_ANALYTICS,
    "AUTHOR_HAS_PHOTO": AUTHOR_HAS_PHOTO,
}

DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

ARTICLE_TRANSLATION_FEED = None
CATEGORY_FEED_ATOM = None
TAG_FEED_ATOM = None

def _finalize_articles(sender):
    import frontmatter

    from reading_time import (
        iso_duration,
        label_from_words,
        minutes_from_words,
        word_count,
    )
    from resolve_article_journey import attach_journey_to_articles

    sender.articles = [
        a
        for a in sender.articles
        if getattr(a, "status", "published") != "draft"
    ]
    attach_journey_to_articles(
        sender.articles,
        categories_data=CATEGORIES_DATA,
        clusters_data=EDITORIAL_CLUSTERS,
    )
    for article in sender.articles:
        cl = getattr(article, "continue_learning", None)
        pp = getattr(article, "path_position", None)
        if cl is not None:
            article.metadata["continue_learning"] = cl
        if pp is not None:
            article.metadata["path_position"] = pp

        source_path = getattr(article, "source_path", None)
        body = ""
        if source_path:
            try:
                body = frontmatter.load(source_path).content or ""
            except OSError:
                body = getattr(article, "_content", None) or ""
        else:
            body = getattr(article, "_content", None) or ""

        words = word_count(body)
        computed_mins = minutes_from_words(words)
        computed_label = label_from_words(words)
        override = article.metadata.get("reading_time")

        article.metadata["reading_time"] = override or computed_label
        article.metadata["reading_time_minutes"] = computed_mins
        article.metadata["time_required"] = iso_duration(computed_mins)
        article.reading_time = article.metadata["reading_time"]
        article.reading_time_minutes = computed_mins
        article.time_required = article.metadata["time_required"]


def register():
    from pelican import signals

    if getattr(register, "_connected", False):
        return
    signals.article_generator_finalized.connect(_finalize_articles)
    register._connected = True  # type: ignore[attr-defined]


# Pelican 4.x does not auto-call pelicanconf.register(); connect at import time.
register()
