#!/usr/bin/env bash
# Generate only missing Satori PNG masters. Full regen: FORCE_SATORI=1.
#
# FORCE_SATORI=1  — always regenerate (template / brand work).
# Default: generate only assets that --check would report missing.
set -euo pipefail

if [[ "${FORCE_SATORI:-}" == "1" ]]; then
  echo "FORCE_SATORI=1 — running full Satori generation."
  npm run build:satori
  exit 0
fi

node scripts/generate_satori_images.mjs --missing-only
