"""Pelican settings — production (Vercel)."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pelicanconf import *  # noqa: F401,E402

# Canonical / feeds always use the public domain.
CANONICAL_SITEURL = "https://promptanatomy.blog"


def _https_url(host: str) -> str:
    host = host.strip().rstrip("/")
    if host.startswith("http://") or host.startswith("https://"):
        return host.rstrip("/")
    return f"https://{host}"


def _resolve_siteurl() -> str:
    """Use the deployment host on Vercel so CSS/assets work on *.vercel.app previews."""
    if not os.environ.get("VERCEL"):
        return CANONICAL_SITEURL

    if os.environ.get("VERCEL_ENV") == "production":
        prod_host = os.environ.get("VERCEL_PROJECT_PRODUCTION_URL")
        if prod_host:
            return _https_url(prod_host)
        return CANONICAL_SITEURL

    preview_host = os.environ.get("VERCEL_URL")
    if preview_host:
        return _https_url(preview_host)

    return CANONICAL_SITEURL


SITEURL = _resolve_siteurl()
RELATIVE_URLS = False
DELETE_OUTPUT_DIRECTORY = True

# Production feeds use absolute URLs on the public domain
FEED_DOMAIN = CANONICAL_SITEURL
