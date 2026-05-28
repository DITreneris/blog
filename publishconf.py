"""Pelican settings — production (Vercel)."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pelicanconf import *  # noqa: F401,E402

SITEURL = "https://promptanatomy.blog"
RELATIVE_URLS = False
DELETE_OUTPUT_DIRECTORY = True

# Production feeds use absolute URLs
FEED_DOMAIN = SITEURL
