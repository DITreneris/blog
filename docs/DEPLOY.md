# Deployment — GitHub → Vercel → promptanatomy.blog

## Prerequisites

- GitHub repository with this project
- Vercel account linked to GitHub
- Domain `promptanatomy.blog` DNS access

## Vercel project setup

1. Import GitHub repo in Vercel.
2. Framework preset: **Other**
3. Build command: see `vercel.json` (sync images, `validate_theme_tokens.py`, `validate_content.py`, Pelican, sitemap)
4. Output directory: `output`
5. Install command: `pip install -r requirements.txt`
6. Python version: 3.11+ (set in Project Settings if needed)

`vercel.json` sets `"framework": null` so Vercel treats the project as a **static build** (Pelican → `output/`), not a Python serverless app. `.python-version` pins 3.11.

## Troubleshooting

### `No python entrypoint found`

Vercel tried to deploy Python **Functions** (expects `app.py` / `api/`) instead of running Pelican and serving `output/`.

**Fix:**

1. **Settings → Build and Deployment** → Framework Preset: **Other** (not Python).
2. **Output Directory:** `output`.
3. Confirm root [`vercel.json`](vercel.json) includes `"framework": null`.
4. Redeploy `main`.

Do not add `api/` or `app.py` unless you intend serverless functions.

### `externally-managed-environment` (PEP 668)

Vercel’s system Python is managed by **uv**; plain `pip install` is blocked.

**Fix:** [`vercel.json`](vercel.json) creates a project `.venv` in `installCommand` and runs the build with `.venv/bin/python`. Do not use bare `pip install -r requirements.txt` on the system interpreter.

### GitHub Pages (`*.github.io/blog`) shows 404

This repo targets **Vercel + promptanatomy.blog**. GitHub Pages is not configured unless you add a separate workflow that publishes `output/`.

## Production URL

`publishconf.py` sets:

```python
SITEURL = "https://promptanatomy.blog"
RELATIVE_URLS = False
```

Verify canonical links and feeds use this base after deploy.

## Custom domain

1. Vercel → Project → Settings → Domains → Add `promptanatomy.blog` and `www.promptanatomy.blog`
2. Configure DNS at registrar per Vercel instructions (apex A record + `www` CNAME)
3. Wait for SSL provisioning (automatic)

## Branch deploys

- `main` → production
- Other branches → preview URLs (optional); preview may need `SITEURL` override—production build uses `publishconf.py` only

## Local verification before push

```bash
make validate
make build
# Inspect output/ — open index.html or:
make serve
```

Without `make`:

```bash
python scripts/validate_theme_tokens.py
python scripts/validate_content.py
python -m pelican content -s publishconf.py
python scripts/generate_sitemap.py
```

## CI (optional)

GitHub Action can run `make validate && make build` on PR (includes theme token lint); Vercel handles production builds on merge to `main`.

## Secrets

None required for static Pelican build. Newsletter/forms are UI-only until a provider is integrated.
