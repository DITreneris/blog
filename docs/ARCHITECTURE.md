# Architecture — Prompt Anatomy Blog

## Overview

Static site generator: **Pelican 4.x** (Python). Output: HTML/CSS/JS in `output/`. Hosted on **Vercel** (CDN only, no Python at runtime).

```
content/*.md  →  validate_theme_tokens.py  →  validate_content.py  →  npm run build:satori  →  validate_satori_manifest.py  →  sync_illustrations.py (PNG + WebP)  →  build_css.py  →  pelican  →  output/  →  Vercel CDN
```

Markdown articles use [`scripts/pelican_frontmatter_reader.py`](../scripts/pelican_frontmatter_reader.py) (`READERS` in `pelicanconf.py`) so nested YAML (e.g. `faq` lists) is not leaked into HTML by `markdown.extensions.meta`.

## Repository layers

| Layer | Path | Role |
|-------|------|------|
| Agent / ops | `AGENTS.md`, `.cursor/rules/`, `docs/` (incl. [`definition_of_done_system.md`](definition_of_done_system.md)) | Conventions and completion gates |
| Content | `content/articles/`, `content/pages/` | Markdown + frontmatter |
| Data | `data/*.yaml` | Nav, hub copy, categories, ecosystem spokes, illustration manifest |
| Illustration masters | `data/01_illustrations/` | Source PNGs (synced, not edited in place); Satori-generated masters in `Satori/` |
| Satori templates | `data/og/` | Brand tokens, fonts, JSX templates for build-time PNG generation |
| Theme | `theme/promptanatomy/` | Jinja templates + static assets |
| Build | `Makefile`, `scripts/` | validate, build, serve |

## URL strategy

| Resource | URL pattern |
|----------|-------------|
| Home | `/` |
| Article | `/articles/{slug}/` |
| Page | `/about/`, `/design-system/`, etc. (via PAGE_SAVE_AS) |
| Category | `/topics/{slug}/` |
| Atom feed | `/feeds/all.atom.xml` |
| Sitemap | `/sitemap.xml` |

No dates in article URLs.

## Ecosystem role

`promptanatomy.blog` is the **content spoke** in the Prompt Anatomy ecosystem. Hub URLs (pricing, training, FAQ) live in `data/site.yaml` under `hub:` and point to `https://www.promptanatomy.app`. Outbound CTAs use absolute URLs so production `SITEURL` stays on `.blog`. Homepage hero CTAs are editorial in `data/hub_sections.yaml` (`hero.cta_primary` / `cta_secondary`); the global `site.yaml` `cta` block is for the header **Plans** button only.

## Environments

| Env | Config | SITEURL |
|-----|--------|---------|
| Local dev | `pelicanconf.py` | `''` + RELATIVE_URLS |
| Production | `publishconf.py` | `https://promptanatomy.blog` |

## Pelican settings of note

- Theme: `theme/promptanatomy`
- Post-build: `scripts/generate_sitemap.py` writes `output/sitemap.xml`
- Custom Jinja globals: `SITE_CONFIG`, `HUB_SECTIONS`, `CATEGORIES`, `ECOSYSTEM`, `ILLUSTRATIONS`, `HUB_IMAGES`
- Article metadata from frontmatter passed to templates (`hero_image` → header, cards, Open Graph)
- Images: `content/images/articles/{slug}/hero.png` + `hero.webp` / `hero-{400,800,1600}.webp` via `make sync-images` / `scripts/sync_illustrations.py` (Pillow resize, max width 1600px; OG PNG only)
- Satori heroes: rows with `generator: satori` in `data/illustrations.yaml` render via `npm run build:satori` → masters in `data/01_illustrations/Satori/` → sync copies to `content/images/`
- Default OG image: `theme/promptanatomy/static/img/og-default.png` (1200×630) from Satori `og-default.mjs`; favicons remain Pillow in `scripts/generate_brand_assets.py`
- Manifest: `data/illustrations.yaml` maps each master PNG to slug, category, and hub usage

## TOC strategy

Client-side: `toc-active.js` scans `article` `h2`/`h3` after load and builds sidebar; degrades gracefully if JS disabled (prose still readable).

## Design system (v2.0)

- Spec: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — tokens, buttons, macros, image policy
- CSS: build-time `site.min.css` (fonts + tokens + base + layout + components) and conditional `article.min.css` (article + pygments); source files under `theme/promptanatomy/static/css/`
- UI macros: `theme/promptanatomy/templates/macros/ui.html`
- Living examples: `/design-system/` (`design_system.html` + `partials/style_guide.html`)
- Lint: `scripts/validate_theme_tokens.py` (no hex outside `tokens.css`)
- Pre-release: [VISUAL_QA.md](VISUAL_QA.md)

## Extension points

- Add categories in `data/categories.yaml`
- Add hub copy in `data/hub_sections.yaml`
- New partial → update `docs/COMPONENT_MAP.md` and `docs/DESIGN_SYSTEM.md` if tokens or patterns change
- Optional later: Pagefind, Giscus, per-article OG PNGs (Phase 2)
