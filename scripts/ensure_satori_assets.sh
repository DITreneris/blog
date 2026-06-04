#!/usr/bin/env bash
# Skip full Satori PNG regen when committed masters pass --check.
# Saves Vercel build minutes on content-only deploys.
#
# FORCE_SATORI=1  — always regenerate (template / brand work).
# Default (Vercel): check first, generate only when masters are missing.
set -euo pipefail

if [[ "${FORCE_SATORI:-}" == "1" ]]; then
  echo "FORCE_SATORI=1 — running full Satori generation."
  npm run build:satori
  exit 0
fi

if node scripts/generate_satori_images.mjs --check; then
  echo "Satori assets present — skipping PNG generation."
else
  echo "Missing Satori masters — running full generation."
  npm run build:satori
fi
