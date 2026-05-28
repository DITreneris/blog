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

`vercel.json` in repo root mirrors these settings.

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
