"""Pelican settings — production (Vercel)."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pelicanconf import *  # noqa: F401,E402

# Public domain (www) — matches Vercel production + apex → www redirect.
CANONICAL_SITEURL = SITE_CONFIG.get("brand", {}).get(
    "site_url", "https://www.promptanatomy.blog"
)

# Apex redirects to www on Vercel; asset URLs must not point at unresolved apex.
_WWW_HOST = "www.promptanatomy.blog"
_APEX_HOST = "promptanatomy.blog"


def _https_url(host: str) -> str:
    host = host.strip().rstrip("/")
    if host.startswith("http://") or host.startswith("https://"):
        return host.rstrip("/")
    return f"https://{host}"


def _normalize_host(host: str) -> str:
    bare = host.removeprefix("https://").removeprefix("http://").rstrip("/").lower()
    if bare == _APEX_HOST:
        return _WWW_HOST
    return bare


def _resolve_siteurl() -> str:
    """Deployment host for absolute URLs (og tags). Static assets use root-relative paths."""
    if not os.environ.get("VERCEL"):
        return CANONICAL_SITEURL

    if os.environ.get("VERCEL_ENV") == "production":
        prod_host = os.environ.get("VERCEL_PROJECT_PRODUCTION_URL")
        if prod_host:
            return _https_url(_normalize_host(prod_host))
        return CANONICAL_SITEURL

    preview_host = os.environ.get("VERCEL_URL")
    if preview_host:
        return _https_url(preview_host)

    return CANONICAL_SITEURL


SITEURL = _resolve_siteurl()
RELATIVE_URLS = False
DELETE_OUTPUT_DIRECTORY = True

FEED_DOMAIN = CANONICAL_SITEURL

ENABLE_VERCEL_ANALYTICS = True
JINJA_GLOBALS["ENABLE_VERCEL_ANALYTICS"] = True

# Production: no draft HTML or Pelican utility index pages (wrong canonical / thin dupes).
DRAFT_SAVE_AS = ""
ARCHIVES_SAVE_AS = ""
AUTHORS_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
TAGS_SAVE_AS = ""
TAG_SAVE_AS = ""
TAG_URL = ""
