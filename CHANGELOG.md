# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Maintainer:** [q-and-a-agent](.cursor/agents/q-and-a-agent.md) — update this file after every meaningful theme, config, content-contract, or deploy change. Implementation agents should leave a bullet list for Q&A to merge, or Q&A updates directly when closing a task.

## [Unreleased]

## [0.2.0] - 2026-05-28

### Added

- **Design System 1.0:** Semantic tokens in [tokens.css](theme/promptanatomy/static/css/tokens.css); theme CSS via `var()` only. UI macros (`section_heading`, `btn`, `card`). CSS-only mobile nav. Living style guide at `/design-system/`. [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) v1.0, [docs/VISUAL_QA.md](docs/VISUAL_QA.md), [scripts/validate_theme_tokens.py](scripts/validate_theme_tokens.py) in `make validate` and [vercel.json](vercel.json).

### Changed

- **UX micro-iterations:** Newsletter placeholder (Coming soon). Header CTA `header_label: Plans` on mobile. Category descriptions from [data/categories.yaml](data/categories.yaml). Featured heading; ecosystem `target="_blank"` + screen reader hint. Prose `--text-prose-h2` / `--text-prose-h3`. Nav `aria-current`; Latest lead in [data/hub_sections.yaml](data/hub_sections.yaml). Collapsible mobile TOC; `card--linked` Start here cards. Optional `author.avatar`. `meta_line` without fake default reading time.
- **Agent docs:** [AGENTS.md](AGENTS.md), q-and-a-agent, Cursor rules aligned with DS 1.0. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/COMPONENT_MAP.md](docs/COMPONENT_MAP.md), [docs/DEPLOY.md](docs/DEPLOY.md).

## [0.1.0] - 2026-05-28

### Fixed

- **CI (2026-05-28):** `validate_content.py` hero paths on Linux; workflow uses `python -m pelican` and Node 24 action flag; article frontmatter re-dumped with safe YAML for Pelican.

### Added

- **Content remediation (2026-05-28):** Rewrote pillar and governance articles; merged tools opinion into [your-company-does-not-need-more-ai-tools](content/articles/your-company-does-not-need-more-ai-tools.md); new [memory-types-for-ai-systems](content/articles/memory-types-for-ai-systems.md), [case study](content/articles/case-study-vibe-prompting-to-structured-workflow.md), and [workflow canvas template](content/articles/ai-workflow-canvas-template.md). [docs/CONTENT_STANDARDS.md](docs/CONTENT_STANDARDS.md); stricter [scripts/validate_content.py](scripts/validate_content.py) (boilerplate, links, reading time). Enrich script respects `body_locked` and non-boilerplate bodies. Production [about](content/pages/about.md) copy. Hybrid drafts for low-intent and merged slugs.
- **Illustration library pipeline (2026-05-28):** Manifest at [data/illustrations.yaml](data/illustrations.yaml); masters in `data/01_illustrations/` (Basic, Agents, Governance, Memes, Selfpromo). Scripts: [scripts/sync_illustrations.py](scripts/sync_illustrations.py), [scripts/new_post.py](scripts/new_post.py), [scripts/scaffold_all_illustration_posts.py](scripts/scaffold_all_illustration_posts.py), [scripts/enrich_articles_from_manifest.py](scripts/enrich_articles_from_manifest.py), [scripts/fix_article_frontmatter.py](scripts/fix_article_frontmatter.py). `make sync-images` / `sync-images` target in [Makefile](Makefile).
- **35 articles** with optional `hero_image` frontmatter (one per illustration); heroes synced to `content/images/articles/{slug}/hero.png`.
- **Theme hero wiring:** Article header diagram, featured card, and article card thumbnails from `hero_image`; `og:image` and `twitter:image` on article pages. Hub visuals from Selfpromo assets via [data/hub_sections.yaml](data/hub_sections.yaml) (`hero.image`, `hero.image_secondary`) and [data/ecosystem.yaml](data/ecosystem.yaml) (`image`).
- **Pillow** in [requirements.txt](requirements.txt) for resize (max width 1600px) and PNG optimization during sync.
- **Brand alignment with mother repo (2026-05-28):** Hybrid palette — gold/navy on dark bands (hero, ecosystem, newsletter, footer); blue `--color-link` for prose only. Tokens in [theme/promptanatomy/static/css/tokens.css](theme/promptanatomy/static/css/tokens.css); rules in [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
- **Favicon and PWA assets:** Copied from [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy) `frontend/public/` — `favicon.svg`, PNG set, `noise.svg`, [site.webmanifest](theme/promptanatomy/static/site.webmanifest). Wired in [theme/promptanatomy/templates/base.html](theme/promptanatomy/templates/base.html).
- **Logo partial:** [theme/promptanatomy/templates/partials/logo.html](theme/promptanatomy/templates/partials/logo.html) — bolt icon + split wordmark (Prompt / Anatomy) in header and footer.
- **Ecosystem spoke section:** [data/ecosystem.yaml](data/ecosystem.yaml), [theme/promptanatomy/templates/partials/ecosystem_spoke.html](theme/promptanatomy/templates/partials/ecosystem_spoke.html) on homepage (after topic grid); links to `.info`, `.space`, HR legacy, `.ceo`; CTA to `promptanatomy.app/#pricing`.
- **Full footer (mother structure):** Three columns (Explore, Product, Network) + legal bar (email, Privacy, Terms, Cookies, creator, mailing address). Dark band styling. Config in [data/site.yaml](data/site.yaml).
- **Hub spoke URLs:** `hub.*` block in `site.yaml` — pricing, training, FAQ, and anchor links to `https://www.promptanatomy.app`.
- **CHANGELOG.md** and **q-and-a-agent** ownership (this file).

### Changed

- **Content contract:** Optional `hero_image` documented in [AGENTS.md](AGENTS.md); [scripts/validate_content.py](scripts/validate_content.py) checks file exists and warns when published posts lack a hero.
- **Pelican globals:** `ILLUSTRATIONS`, `HUB_IMAGES` from `data/illustrations.yaml`; `ECOSYSTEM` from `data/ecosystem.yaml` in [pelicanconf.py](pelicanconf.py).
- **Vercel build:** [vercel.json](vercel.json) runs sync, validate, Pelican, and sitemap generation in one command.
- **Header nav and CTAs:** Training + Pricing → `.app`; primary CTA **Choose a plan** → hub pricing. [theme/promptanatomy/templates/partials/header.html](theme/promptanatomy/templates/partials/header.html), [blog_hero.html](theme/promptanatomy/templates/partials/blog_hero.html).
- **Primary buttons:** Gold gradient (mother pattern) via `.btn--primary` in [components.css](theme/promptanatomy/static/css/components.css).
- **Footer:** Rewritten [footer.html](theme/promptanatomy/templates/partials/footer.html); multi-column dark layout.
- **Docs:** [docs/COMPONENT_MAP.md](docs/COMPONENT_MAP.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — illustration flow, hero images, ecosystem/hub assets.

### Notes

- Deploy requires `data/01_illustrations/` in the repo (or heroes pre-synced under `content/images/`). Vercel build calls `sync_illustrations.py` automatically.
- `.blog` is an official content spoke; hub conversion URLs are absolute (not relative to `SITEURL`).
- Optional follow-up: register `promptanatomy.blog` in mother repo `geo-manifest.js` / `ECOSYSTEM_SPOKES`; deepen article copy beyond scaffolded templates.
- Regression: `python scripts/validate_theme_tokens.py`, `python scripts/validate_content.py`, and `python -m pelican content -s publishconf.py` — 35 articles, 4 pages (includes `/design-system/`).
