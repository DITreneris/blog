.PHONY: validate build serve clean sync-images

PYTHON ?= python

sync-images:
	$(PYTHON) scripts/sync_illustrations.py

validate-theme:
	$(PYTHON) scripts/validate_theme_tokens.py

validate: validate-theme
	$(PYTHON) scripts/validate_content.py

build: validate
	pelican content -s publishconf.py
	$(PYTHON) scripts/generate_sitemap.py

build-dev: validate
	pelican content
	$(PYTHON) scripts/generate_sitemap.py

serve: build-dev
	cd output && $(PYTHON) -m http.server 8000

clean:
	$(PYTHON) -c "import shutil; shutil.rmtree('output', ignore_errors=True)"
