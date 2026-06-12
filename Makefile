.PHONY: validate validate-theme validate-brand validate-satori validate-satori-quality validate-llms-citations audit-content build serve clean sync-images brand-assets analytics satori-images build-css

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

validate-brand:
	$(PYTHON) scripts/validate_brand_sync.py

.validate: validate-theme validate-brand validate-content validate-satori-quality validate-satori validate-llms-citations

validate: validate-theme validate-brand validate-content validate-satori-quality validate-satori validate-llms-citations

validate-llms-citations:
	$(PYTHON) scripts/sync_llms_citations.py --check

validate-satori-quality:
	$(PYTHON) scripts/validate_satori_quality.py

validate-content:
	$(PYTHON) scripts/validate_content.py

audit-content:
	$(PYTHON) scripts/audit_content_inventory.py --markdown

# Sync heroes before validate-content — content/images/ is gitignored (generated at build).
build: satori-images validate-satori sync-images brand-assets analytics build-css validate-theme validate-brand validate-content validate-satori-quality
	$(PYTHON) -m pelican content -s publishconf.py
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py
	$(PYTHON) scripts/validate_seo_output.py
	$(PYTHON) scripts/validate_a11y_landmarks.py
	$(PYTHON) scripts/audit_image_weights.py --warn-only

build-dev: satori-images validate-satori sync-images brand-assets build-css validate-theme validate-brand validate-content validate-satori-quality
	$(PYTHON) -m pelican content
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py
	$(PYTHON) scripts/validate_seo_output.py
	$(PYTHON) scripts/validate_a11y_landmarks.py
	$(PYTHON) scripts/audit_image_weights.py --warn-only

serve: build-dev
	cd output && $(PYTHON) -m http.server 8000

clean:
	$(PYTHON) -c "import shutil; shutil.rmtree('output', ignore_errors=True)"
