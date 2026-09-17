.PHONY: validate validate-theme validate-brand validate-satori validate-satori-quality validate-llms-citations validate-hub-chrome audit-content audit-prose build build-dev preview serve clean sync-images brand-assets analytics satori-images build-css

ifeq ($(OS),Windows_NT)
  VENV_PY := .venv/Scripts/python.exe
else
  VENV_PY := .venv/bin/python
endif
ifneq ($(wildcard $(VENV_PY)),)
  PYTHON ?= $(VENV_PY)
else
  PYTHON ?= python
endif
NPM ?= npm

brand-assets:
	$(PYTHON) scripts/generate_brand_assets.py

analytics:
	$(NPM) run build:analytics

build-css:
	$(PYTHON) scripts/build_css.py

satori-images:
	bash scripts/ensure_satori_assets.sh

sync-images:
	$(PYTHON) scripts/sync_illustrations.py

validate-theme:
	$(PYTHON) scripts/validate_theme_tokens.py

validate-satori:
	$(PYTHON) scripts/validate_satori_manifest.py
	$(PYTHON) scripts/validate_satori_og_layout.py

validate-brand:
	$(PYTHON) scripts/validate_brand_sync.py

validate: validate-theme validate-brand validate-content validate-hub-chrome validate-satori-quality validate-satori validate-llms-citations

validate-llms-citations:
	$(PYTHON) scripts/sync_llms_citations.py --check

validate-satori-quality:
	$(PYTHON) scripts/validate_satori_quality.py

validate-content:
	$(PYTHON) scripts/validate_content.py

validate-hub-chrome:
	$(PYTHON) scripts/validate_hub_chrome.py

audit-content:
	$(PYTHON) scripts/audit_content_inventory.py --markdown

audit-prose:
	$(PYTHON) scripts/audit_prose_style.py --markdown

# Hash-stamped dests live in content/images/ (tracked). Sync skips unchanged rows.
build: satori-images validate-satori sync-images brand-assets analytics build-css validate-theme validate-brand validate-content validate-hub-chrome validate-satori-quality
	$(PYTHON) -m pelican content -s publishconf.py
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py
	$(PYTHON) scripts/validate_seo_output.py
	$(PYTHON) scripts/validate_a11y_landmarks.py
	$(PYTHON) scripts/audit_image_weights.py --warn-only

build-dev: satori-images validate-satori sync-images brand-assets build-css validate-theme validate-brand validate-content validate-hub-chrome validate-satori-quality
	$(PYTHON) -m pelican content
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py
	$(PYTHON) scripts/validate_seo_output.py
	$(PYTHON) scripts/validate_a11y_landmarks.py
	$(PYTHON) scripts/audit_image_weights.py --warn-only

preview: build-css
	$(PYTHON) -m pelican content
	cd output && $(PYTHON) -m http.server 8000

serve: build-dev
	cd output && $(PYTHON) -m http.server 8000

clean:
	$(PYTHON) -c "import shutil; shutil.rmtree('output', ignore_errors=True)"
