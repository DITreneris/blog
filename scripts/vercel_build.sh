#!/usr/bin/env bash
set -euo pipefail
PY=".venv/bin/python"
npm run build:analytics
"$PY" scripts/sync_illustrations.py
"$PY" scripts/generate_brand_assets.py
"$PY" scripts/validate_theme_tokens.py
"$PY" scripts/validate_content.py
"$PY" -m pelican content -s publishconf.py
"$PY" scripts/generate_sitemap.py
"$PY" scripts/verify_build_assets.py
