"""Pelican settings — local development."""

from pathlib import Path
import datetime
import yaml

BASE_DIR = Path(__file__).resolve().parent


def _load_yaml(name: str) -> dict:
    path = BASE_DIR / "data" / name
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


SITE_CONFIG = _load_yaml("site.yaml")
HUB_SECTIONS = _load_yaml("hub_sections.yaml")
CATEGORIES_DATA = _load_yaml("categories.yaml")
ECOSYSTEM = _load_yaml("ecosystem.yaml")
ILLUSTRATIONS = _load_yaml("illustrations.yaml")

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

STATIC_PATHS = ["images", "extra"]
EXTRA_PATH_METADATA = {
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/llms.txt": {"path": "llms.txt"},
    "extra/google7305663b2567346e.html": {"path": "google7305663b2567346e.html"},
}

JINJA_ENVIRONMENT = {
    "trim_blocks": True,
    "lstrip_blocks": True,
}

ENABLE_VERCEL_ANALYTICS = False

JINJA_GLOBALS = {
    "SITE_CONFIG": SITE_CONFIG,
    "HUB_SECTIONS": HUB_SECTIONS,
    "CATEGORIES": CATEGORIES_DATA.get("categories", []),
    "ECOSYSTEM": ECOSYSTEM,
    "ILLUSTRATIONS": ILLUSTRATIONS,
    "HUB_IMAGES": ILLUSTRATIONS.get("hub_images", {}),
    "CURRENT_YEAR": datetime.date.today().year,
    "ENABLE_VERCEL_ANALYTICS": ENABLE_VERCEL_ANALYTICS,
}

DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

ARTICLE_TRANSLATION_FEED = None
CATEGORY_FEED_ATOM = None
TAG_FEED_ATOM = None

def _finalize_articles(sender):
    sender.articles = [
        a
        for a in sender.articles
        if getattr(a, "status", "published") != "draft"
    ]
    for article in sender.articles:
        related = [
            a
            for a in sender.articles
            if a.category == article.category and a.slug != article.slug
        ]
        related.sort(key=lambda a: a.date, reverse=True)
        article.related_articles = related[:3]


def register():
    from pelican import signals

    signals.article_generator_finalized.connect(_finalize_articles)
