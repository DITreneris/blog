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
5. Install command: see `vercel.json` (project `.venv` — PEP 668 safe)
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

`publishconf.py` sets `CANONICAL_SITEURL = "https://www.promptanatomy.blog"` for canonical links and feeds (matches Vercel **www** production). Theme CSS/images use **root-relative** paths (`/static/…`, `/images/…`) so they work on `www`, apex redirect, and preview. **`SITEURL`** is resolved at build time for og tags:

| Build context | `SITEURL` (assets, nav, images) |
|---------------|----------------------------------|
| Local `publishconf` | `https://www.promptanatomy.blog` |
| Vercel preview (`*.vercel.app`) | `https://<VERCEL_URL>` |
| Vercel production | `VERCEL_PROJECT_PRODUCTION_URL` or canonical fallback |

Without root-relative assets, a **www** visit can still request CSS from apex `promptanatomy.blog` (broken while apex DNS is pending).

### Unstyled site on `www` or `*.vercel.app`

Open DevTools → Network. CSS must be **`/static/css/…`** on the same host (200), not `https://promptanatomy.blog/static/…` when apex DNS is not live. Redeploy after root-relative asset paths land on `main`.

## Custom domain

1. Vercel → Project → Settings → Domains → Add `promptanatomy.blog` and `www.promptanatomy.blog`
2. Configure DNS at registrar per Vercel instructions (apex A record + `www` CNAME)
3. Wait for SSL provisioning (automatic)

## Branch deploys

- `main` → production
- Other branches → preview URLs; `SITEURL` follows `VERCEL_URL` automatically

## Illustration masters and images

- **Masters:** `data/01_illustrations/` (see [`data/01_illustrations/README.md`](../data/01_illustrations/README.md) and [`data/illustrations.yaml`](../data/illustrations.yaml)).
- **Sync:** `make sync-images` copies optimized heroes to `content/images/` (gitignored; regenerated on every `make build` / Vercel).
- **Author avatar:** `scripts/generate_brand_assets.py` writes `content/images/author/tomas-staniulis.jpg` until you replace it with a real photo.
- **Verify:** `scripts/verify_build_assets.py` runs after Pelican and fails if hub/article heroes, OG fallback, or favicons are missing from `output/`.

Deploy requires `data/01_illustrations/` in the repository (use Git LFS if the tree is large).

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
