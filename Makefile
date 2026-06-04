.PHONY: validate build serve clean sync-images brand-assets analytics satori-images

PYTHON ?= python
NPM ?= npm

brand-assets:
	$(PYTHON) scripts/generate_brand_assets.py

analytics:
	$(NPM) run build:analytics

satori-images:
	$(NPM) run build:satori

sync-images:
	$(PYTHON) scripts/sync_illustrations.py

validate-theme:
	$(PYTHON) scripts/validate_theme_tokens.py

validate-satori:
	$(PYTHON) scripts/validate_satori_manifest.py

validate: validate-theme
	$(PYTHON) scripts/validate_content.py

build: validate satori-images validate-satori sync-images brand-assets analytics
	pelican content -s publishconf.py
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py

build-dev: validate satori-images validate-satori sync-images brand-assets
	pelican content
	$(PYTHON) scripts/generate_sitemap.py
	$(PYTHON) scripts/verify_build_assets.py

serve: build-dev
	cd output && $(PYTHON) -m http.server 8000

clean:
	$(PYTHON) -c "import shutil; shutil.rmtree('output', ignore_errors=True)"
