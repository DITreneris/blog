# Deployment — GitHub → Vercel → promptanatomy.blog

## Prerequisites

- GitHub repository with this project
- Vercel account linked to GitHub
- Domain `promptanatomy.blog` DNS access

## Vercel project setup

1. Import GitHub repo in Vercel.
2. Framework preset: **Other**
3. Build command: `bash scripts/vercel_build.sh` (see `vercel.json`; steps stay under Vercel’s 256-character limit)
4. Output directory: `output`
5. Install command: `bash scripts/vercel_install.sh` (npm + project `.venv` — PEP 668 safe)
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

**Fix:** [`scripts/vercel_install.sh`](scripts/vercel_install.sh) creates a project `.venv`; [`scripts/vercel_build.sh`](scripts/vercel_build.sh) runs Pelican and validation. Do not use bare `pip install -r requirements.txt` on the system interpreter.

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
- **Satori pipeline:** `npm run build:satori` (after `npm install` / `postinstall` fonts fetch) renders article heroes (1600×900) and `og-default.png` (1200×630) from templates in `data/og/templates/`. Masters land in `data/01_illustrations/Satori/`; committed to the repo for offline builds.
- **Fonts:** Inter WOFF from `@fontsource/inter` (OFL) copied to `data/og/fonts/` via `npm run fonts:fetch`. Do not use variable TTF — Satori requires static weights.
- **Sync:** `make sync-images` copies optimized heroes to `content/images/` (gitignored; regenerated on every `make build` / Vercel).
- **Brand assets:** `scripts/generate_brand_assets.py` — favicons + author photo only (`og-default.png` is Satori).
- **Author avatar:** commit `data/01_illustrations/author.jpg` or `data/author/tomas-staniulis.jpg` (see [`data/author/README.md`](../data/author/README.md)). `scripts/generate_brand_assets.py` syncs to `content/images/author/` on build.
- **Verify:** `scripts/validate_satori_manifest.py` after Satori; `scripts/verify_build_assets.py` after Pelican fails if hub/article heroes, OG fallback, or favicons are missing from `output/`.

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
npm run build:satori
python scripts/validate_satori_manifest.py
python scripts/sync_illustrations.py
python scripts/generate_brand_assets.py
npm run build:analytics
python -m pelican content -s publishconf.py
python scripts/generate_sitemap.py
python scripts/verify_build_assets.py
```

## CI (optional)

GitHub Action can run `make validate && make build` on PR (includes theme token lint); Vercel handles production builds on merge to `main`.

## Secrets

None required for static Pelican build. Newsletter/forms are UI-only until a provider is integrated.
