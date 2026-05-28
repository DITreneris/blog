#!/usr/bin/env bash
set -euo pipefail
npm ci
python -m venv .venv
.venv/bin/python -m pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
