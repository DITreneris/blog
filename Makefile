.PHONY: validate validate-theme validate-brand validate-satori build serve clean sync-images brand-assets analytics satori-images build-css

PYTHON ?= python
NPM ?= npm

brand-assets:
	$(PYTHON) scripts/generate_brand_assets.py

analytics:
	$(NPM) run build:analytics

build-css:
	$(PYTHON) scripts/build_css.py

satori-images:
	$(NPM) run build:satori

sync-images:
	$(PYTHON) scripts/sync_illustrations.py

validate-theme:
	$(PYTHON) scripts/validate_theme_tokens.py

validate-satori:
	$(PYTHON) scripts/validate_satori_manifest.py

validate-brand:
	$(PYTHON) scripts/validate_brand_sync.py

validate: validate-theme validate-brand
	$(PYTHON) scripts/validate_content.py

build: validate satori-images validate-satori sync-images brand-assets analytics build-css
	pelican content -s publishconf.py
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py
	$(PYTHON) scripts/validate_seo_output.py
	$(PYTHON) scripts/validate_a11y_landmarks.py
	$(PYTHON) scripts/audit_image_weights.py --warn-only

build-dev: validate satori-images validate-satori sync-images brand-assets build-css
	pelican content
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py
	$(PYTHON) scripts/validate_seo_output.py
	$(PYTHON) scripts/validate_a11y_landmarks.py
	$(PYTHON) scripts/audit_image_weights.py --warn-only

serve: build-dev
	cd output && $(PYTHON) -m http.server 8000

clean:
	$(PYTHON) -c "import shutil; shutil.rmtree('output', ignore_errors=True)"
