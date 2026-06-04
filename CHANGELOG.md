# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Maintainer:** [q-and-a-agent](.cursor/agents/q-and-a-agent.md) — update this file after every meaningful theme, config, content-contract, or deploy change. Implementation agents should leave a bullet list for Q&A to merge, or Q&A updates directly when closing a task.

## [Unreleased]

## [0.5.0] - 2026-06-04 — Satori PNG regeneration (Phase 1)

### Added

- **Satori PNG pipeline:** [`data/og/`](data/og/) — brand tokens ([`brand.mjs`](data/og/brand.mjs)), six JSX templates ([`base.mjs`](data/og/templates/base.mjs) + five article layouts + [`og-default.mjs`](data/og/templates/og-default.mjs)), [`scripts/lib/render.mjs`](scripts/lib/render.mjs) (satori + `@resvg/resvg-js`), and [`scripts/generate_satori_images.mjs`](scripts/generate_satori_images.mjs) CLI (`--slug`, `--id`, `--dry-run`).
- **Article hero templates (1600×900):** `context-architecture`, `case-study-support`, `prompt-registry`, `multi-agent-handoff`, `business-outcomes` — replace v0.2.0 borrowed Basic/Governance masters for `what-is-context-architecture`, `case-study-vibe-prompting-to-structured-workflow`, `structured-prompt-system-blueprint`, `multi-agent-handoff-pattern`, `from-prompts-to-business-outcomes`.
- **Default OG image (1200×630):** [`og-default.mjs`](data/og/templates/og-default.mjs) → [`theme/promptanatomy/static/img/og-default.png`](theme/promptanatomy/static/img/og-default.png); masters committed under [`data/01_illustrations/Satori/`](data/01_illustrations/Satori/).
- **Font bootstrap:** [`scripts/fetch_og_fonts.mjs`](scripts/fetch_og_fonts.mjs) copies static Inter WOFF from `@fontsource/inter` (OFL) to `data/og/fonts/`; runs on `npm install` via `postinstall`.
- **Satori manifest validation:** [`scripts/validate_satori_manifest.py`](scripts/validate_satori_manifest.py) — checks `generator` / `template` / master PNG presence; wired into [`Makefile`](Makefile) (`validate-satori`, `satori-images`) and [`scripts/vercel_build.sh`](scripts/vercel_build.sh).
- **npm devDependencies:** `satori`, `@resvg/resvg-js`, `js-yaml`, `@fontsource/inter`; scripts `build:satori`, `fonts:fetch`.

### Changed

- [`data/illustrations.yaml`](data/illustrations.yaml) — five slugs declare `generator: satori`, `template`, and `source: Satori/{slug}.png` (supersedes interim borrowed PNGs from v0.2.0).
- [`scripts/generate_brand_assets.py`](scripts/generate_brand_assets.py) — `og-default.png` generation removed (Satori); favicons and author photo sync unchanged.
- **Build order:** `validate → satori-images → validate-satori → sync-images → brand-assets → analytics → pelican` ([`Makefile`](Makefile), [`scripts/vercel_build.sh`](scripts/vercel_build.sh)).

### Fixed

- **Satori font parse error** — variable Inter TTF from Google Fonts crashed opentype.js (`Cannot read properties of undefined (reading '256')`); pipeline now uses static **WOFF** weights (400/700) from `@fontsource/inter`.

### Docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/DEPLOY.md`](docs/DEPLOY.md), [`data/01_illustrations/README.md`](data/01_illustrations/README.md), [`docs/VISUAL_QA.md`](docs/VISUAL_QA.md) (Satori checklist), [`AGENTS.md`](AGENTS.md) (`generator: satori` contract), [`.cursor/rules/deploy-vercel.mdc`](.cursor/rules/deploy-vercel.mdc) (intentional Node Satori step).

## [0.2.0] - 2026-06-04 — Content upgrade

### Added

- **Release 2 pillar enforcement** in [`scripts/validate_content.py`](scripts/validate_content.py): 1,200-word minimum, `hero_caption`, and ≥2 FAQ items required for start-here slugs (`the-model-is-not-the-system`, `10-signs-your-company-is-vibe-prompting`, `how-to-design-an-ai-agent-workflow`).
- **`content_tier` frontmatter** documented in [`AGENTS.md`](AGENTS.md) and [`docs/CONTENT_STANDARDS.md`](docs/CONTENT_STANDARDS.md) (`pillar` | `playbook` | `template` | `opinion` | `nav`).
- **Category reading paths** in [`data/categories.yaml`](data/categories.yaml) for Framework, AI Agents, and AI Governance.
- **Northline B2B composite** threaded through governance playbooks (RACI, risk minutes, audit JSON sample, allow/deny matrix).
- **Filled canvas example** (`support-reply-v3`) and minimum workflow elements in [`ai-workflow-canvas-template.md`](content/articles/ai-workflow-canvas-template.md).
- **Sample eval YAML** in [`evaluation-hooks-for-ai-workflows.md`](content/articles/evaluation-hooks-for-ai-workflows.md) and **registry entry** in [`structured-prompt-system-blueprint.md`](content/articles/structured-prompt-system-blueprint.md).

### Changed

- **Pillar rewrites (1,200+ words):** [`10-signs-your-company-is-vibe-prompting.md`](content/articles/10-signs-your-company-is-vibe-prompting.md), [`how-to-design-an-ai-agent-workflow.md`](content/articles/how-to-design-an-ai-agent-workflow.md) (tier-2 routing example; prompt-to-agent merge), [`what-is-context-architecture.md`](content/articles/what-is-context-architecture.md) (spec walkthrough, prompt assembly order, context-layers merge).
- **Playbook rewrites:** Outlook outreach ([`ai-outreach-with-outlook-guardrails.md`](content/articles/ai-outreach-with-outlook-guardrails.md)), tender legal deep-dive ([`ai-tender-response-pipeline.md`](content/articles/ai-tender-response-pipeline.md)), governance quartet, case study expansion, tools opinion (internal links + anecdote), outcomes mapping (support metrics).
- **Merges → draft redirects:** `prompt-anatomy-workflow-basics` → canvas; `context-layers-in-prompt-design` → context architecture; `from-prompt-to-agent` → agent workflow guide.
- **Interim unique hero sources** in [`data/illustrations.yaml`](data/illustrations.yaml) for context architecture, case study, structured blueprint, multi-agent handoff, and business outcomes (borrowed Basic/Governance PNGs; replaced by Satori templates in v0.5.0).
- **Start-here card copy** in [`data/hub_sections.yaml`](data/hub_sections.yaml); **llms.txt** pillar list updated.
- [`prompt-anatomy-foundations.md`](content/articles/prompt-anatomy-foundations.md) trimmed to nav index.

### Fixed

- [`implementation-notes-hero-structure.md`](content/articles/implementation-notes-hero-structure.md) — removed enrich boilerplate; redirect to ecosystem map.

### Changed (prior unreleased)

- **Author avatar:** real headshots sync from [`data/author/`](data/author/) or [`data/01_illustrations/author.jpg`](data/01_illustrations/author.jpg). Brand logo placeholder no longer overwrites each build or displays in [`author_bio.html`](theme/promptanatomy/templates/partials/author_bio.html) when no photo is committed. Person `image` in Article JSON-LD when a photo exists.

## [0.4.0] - 2026-06-04

### Added

- **Blog Premium Upgrade (Release 1) — Design System v1.1 article reading experience:** [`partials/article_lead.html`](theme/promptanatomy/templates/partials/article_lead.html) (summary dek via `striptags`), optional `hero_caption` on [`partials/article_header.html`](theme/promptanatomy/templates/partials/article_header.html), `.prose > p:first-of-type` lead styling, featured-card visual frame (`contain`, max-height, border) in [`components.css`](theme/promptanatomy/static/css/components.css).
- **YAML frontmatter reader:** [`scripts/pelican_frontmatter_reader.py`](scripts/pelican_frontmatter_reader.py) + `READERS` in [`pelicanconf.py`](pelicanconf.py) — full YAML frontmatter (nested `faq` lists, dates) via `python-frontmatter`.
- **Content quality gates:** pillar minimum (1,200 words on `the-model-is-not-the-system`), Release 2 warnings for other start-here slugs, FAQ body-leak error, framework length warnings, slide-deck section heuristic in [`scripts/validate_content.py`](scripts/validate_content.py).

### Changed

- **Flagship rewrite:** [`the-model-is-not-the-system.md`](content/articles/the-model-is-not-the-system.md) — ~1,400 words, prose-first framework essay, four internal links, `8 min read`, `hero_caption`, updated `summary` / `modified` (2026-06-04).
- **Featured FAQ placement:** [`article.html`](theme/promptanatomy/templates/article.html) — `featured: true` articles render FAQ above [`partials/article_cta.html`](theme/promptanatomy/templates/partials/article_cta.html); non-featured keep FAQ after author bio.
- **Homepage featured lead:** [`data/hub_sections.yaml`](data/hub_sections.yaml) aligned with expanded framework promise.

### Fixed

- **FAQ metadata leaking into article HTML** — Pelican’s default `markdown.extensions.meta` reader treated nested `faq` YAML as body content (`question:` / `answer:` bullets in `.prose`). Replaced with `FrontmatterMarkdownReader`.

### Docs

- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) v1.1 (article lead, hero caption, prose lead, pillar FAQ placement).
- [`docs/COMPONENT_MAP.md`](docs/COMPONENT_MAP.md), [`docs/CONTENT_STANDARDS.md`](docs/CONTENT_STANDARDS.md) (content tiers), [`docs/VISUAL_QA.md`](docs/VISUAL_QA.md) (v1.1 checklist), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) (frontmatter reader in pipeline), [`AGENTS.md`](AGENTS.md) (`hero_caption`, `faq` contract).

## [0.3.0] - 2026-05-28

### Added

- **Frontend audit implementation (build + SEO + polish).**
  - [`Makefile`](Makefile) — `sync-images` before Pelican on `build` / `build-dev`; [`scripts/verify_build_assets.py`](scripts/verify_build_assets.py) post-build smoke check.
  - [`data/01_illustrations/README.md`](data/01_illustrations/README.md) — masters layout; [`docs/DEPLOY.md`](docs/DEPLOY.md) illustration pipeline section; `content/images/` gitignored (generated).
  - [`publishconf.py`](publishconf.py) — production disables draft HTML and Pelican utility index pages (`DRAFT`, `ARCHIVES`, `AUTHORS`, `AUTHOR`, `CATEGORIES`, `TAGS`).
  - [`scripts/generate_brand_assets.py`](scripts/generate_brand_assets.py) — generates branded author placeholder JPG at `content/images/author/tomas-staniulis.jpg`.
  - [`partials/schema_faq.html`](theme/promptanatomy/templates/partials/schema_faq.html) — FAQPage JSON-LD when `article.faq` is set; pillar FAQs on [`the-model-is-not-the-system.md`](content/articles/the-model-is-not-the-system.md).
  - Start-here [`card()`](theme/promptanatomy/templates/macros/ui.html) icon badges from `hub_sections.yaml` `icon` keys.
- **SEO P0 + P1 (metadata, schema, crawlers).** Social previews and structured data hardening across the static site:
  - [`scripts/generate_brand_assets.py`](scripts/generate_brand_assets.py) — Pillow build step generates `static/img/og-default.png` (1200×630) plus favicon/PWA PNGs (16, 32, 180, 192, 512) from brand colors. Wired into `make brand-assets`, [`Makefile`](Makefile) `build` / `build-dev`, and [`vercel.json`](vercel.json).
  - [`partials/meta_og_image.html`](theme/promptanatomy/templates/partials/meta_og_image.html) — shared `og:image` / `twitter:image` tags with `meta_scope` (`og` | `twitter`) to avoid duplicate head tags.
  - [`partials/schema_site.html`](theme/promptanatomy/templates/partials/schema_site.html) — global Organization + WebSite JSON-LD (`@graph`, stable `#organization` / `#website` `@id`s, `sameAs`, logo).
  - [`content/extra/llms.txt`](content/extra/llms.txt) — curated site map for AI crawlers (pillar articles, topics, about, contact); deployed via `EXTRA_PATH_METADATA` in [`pelicanconf.py`](pelicanconf.py).
  - [`data/site.yaml`](data/site.yaml) `social.twitter_handle` (`@TStaniulis_NFT`) for `twitter:site` / `twitter:creator` in [`base.html`](theme/promptanatomy/templates/base.html).
  - Default `{% block robots %}` in `base.html` (`index,follow,max-image-preview:large`); `noindex,follow` override on [`design_system.html`](theme/promptanatomy/templates/design_system.html).
- **Vercel Web Analytics.** [`@vercel/analytics`](package.json) bundled via esbuild into [`theme/promptanatomy/static/js/vercel-analytics.js`](theme/promptanatomy/static/js/vercel-analytics.js) (`npm run build:analytics`); loaded from [`partials/vercel_analytics.html`](theme/promptanatomy/templates/partials/vercel_analytics.html) when `ENABLE_VERCEL_ANALYTICS` is true ([`publishconf.py`](publishconf.py) only). [`Makefile`](Makefile) `analytics` target; [`vercel.json`](vercel.json) runs `npm ci` + bundle step before Pelican.
- **Google Search Console verification.** [`content/extra/google7305663b2567346e.html`](content/extra/google7305663b2567346e.html) deployed at `/google7305663b2567346e.html` via `EXTRA_PATH_METADATA` in [`pelicanconf.py`](pelicanconf.py).
- **Article UX Hardening (systemic).** Two new shared partials wired into every article page:
  - [`partials/breadcrumb.html`](theme/promptanatomy/templates/partials/breadcrumb.html) — visible `Home › Category › Title` above the article header (complements existing `schema_breadcrumb.html`).
  - [`partials/article_cta.html`](theme/promptanatomy/templates/partials/article_cta.html) — end-of-article dark band with gold primary button to `SITE_CONFIG.hub.training_url`; copy editable via new `HUB_SECTIONS.article_cta` block in [`data/hub_sections.yaml`](data/hub_sections.yaml).
- **Real author bio.** [`data/site.yaml`](data/site.yaml) `author` block now identifies **Tomas Staniulis** (Founder, Prompt Anatomy) with `avatar`, `linkedin`, and `url` fields. Avatar asset at `content/images/author/tomas-staniulis.jpg` (400×400 JPG). `partials/author_bio.html` wraps the author name in a LinkedIn link when `author.linkedin` is set; `.author-bio__name-link` uses an underline-on-hover treatment (no color change). [`schema_article.html`](theme/promptanatomy/templates/partials/schema_article.html) now declares the article author as `@type: Person` (Tomas) while keeping the publisher as `Organization` (Prompt Anatomy) — better E-E-A-T signal for Google.
- **Featured card copy from data.** New `HUB_SECTIONS.featured` block (`title`, `lead`, `cta_label`) in [`data/hub_sections.yaml`](data/hub_sections.yaml) so editors can override per deploy without template edits.
- **Prose table component** in [`article.css`](theme/promptanatomy/static/css/article.css) — methodology tables now have styled headers, row borders, and mobile overflow scroll.
- **One-off sweep script** [`scripts/strip_inline_related_reading.py`](scripts/strip_inline_related_reading.py) — removes the auto-template `## Related reading` H2 + bullet block from `content/articles/*.md` (idempotent; preserves any body content after the block).

### Changed

- **Footer cleanup (P0–P3).** Trimmed link columns to Explore (3, hub URLs) / Product (5) / Connect (social + ecosystem map + library); removed duplicate pricing and niche ecosystem spokes. [`footer.html`](theme/promptanatomy/templates/partials/footer.html) — per-column `<nav>`, sr-only `h2`, `h3` titles, `<address>` block, founder line. [`data/site.yaml`](data/site.yaml) structured `organization.address`; Organization `PostalAddress` in [`schema_site.html`](theme/promptanatomy/templates/partials/schema_site.html). Touch targets and founder/address styles in [`components.css`](theme/promptanatomy/static/css/components.css).
- **Homepage social titles** — [`index.html`](theme/promptanatomy/templates/index.html) `og:title` / `twitter:title` match page title (brand + tagline).
- **Article social image meta** — OG/Twitter dimensions 1200×630 (display crop unchanged in CSS).
- **Newsletter band** — removed disabled email form; “Coming soon” + disclaimer only ([`newsletter_cta.html`](theme/promptanatomy/templates/partials/newsletter_cta.html)).
- **Visual / DS micro-fixes** — ecosystem map `image_alt`; topic-card hover uses brand gold; card thumbs `object-fit: contain`; featured card no hover lift; hero headline `max-width` 24ch; tokens `--text-card-title`, `--text-badge`; footer tagline aligned with brand voice.
- **Sitemap** — excludes `drafts/` slug root ([`generate_sitemap.py`](scripts/generate_sitemap.py)).
- **Fallback OG / Twitter image** on all pages via `base.html`; articles with `hero_image` override with 1200×630 meta dimensions + title alt; articles without hero fall back to `og-default.png`.
- **Article JSON-LD** ([`schema_article.html`](theme/promptanatomy/templates/partials/schema_article.html)) — adds required `image` field; publisher references Organization `@id`.
- **Breadcrumb JSON-LD** ([`schema_breadcrumb.html`](theme/promptanatomy/templates/partials/schema_breadcrumb.html)) — articles now emit Home → Category → Title (matches visible [`breadcrumb.html`](theme/promptanatomy/templates/partials/breadcrumb.html)).
- **Page metadata** ([`page.html`](theme/promptanatomy/templates/page.html)) — `og:description`, page-specific Twitter title/description, truncated meta description (160 chars).
- **Topic metadata** ([`category.html`](theme/promptanatomy/templates/category.html)) — per-topic description and OG/Twitter from [`data/categories.yaml`](data/categories.yaml).
- **Sitemap** ([`scripts/generate_sitemap.py`](scripts/generate_sitemap.py)) — `<lastmod>` from file mtime; excludes `/design-system/`; `SITEURL` read from `site.yaml`.
- **robots.txt** ([`content/extra/robots.txt`](content/extra/robots.txt)) — sitemap URL aligned to canonical host `https://www.promptanatomy.blog/sitemap.xml`.
- **Vercel build pipeline** ([`vercel.json`](vercel.json)) — adds Node/npm install alongside Python venv for analytics bundle; production builds only inject analytics script.
- **Article hero crop:** `.article-header__diagram` switched from `aspect-ratio: 21/9 + object-fit: cover + max-height 280px` to `16/10 + contain + 28rem` over `--color-surface-elevated`, so hero assets (titles, watermarks) are no longer clipped ([`article.css`](theme/promptanatomy/static/css/article.css)).
- **Featured card click model:** removed the title `<a>` link in [`featured_article.html`](theme/promptanatomy/templates/partials/featured_article.html); the gold `btn--primary` is the single click target. Reinforces "gold = CTA" rule.
- **`meta_line` date format** ([`macros/ui.html`](theme/promptanatomy/templates/macros/ui.html)) — `%Y` → `%b %Y` (e.g. "May 2026"); `Updated …` now surfaces only when `article.modified > article.date`. Restores month-level recency signal across every card and article header.
- **Key takeaway alignment:** `.takeaway-box` constrained to `--article-max` and centered so its left edge matches the prose column below ([`article.css`](theme/promptanatomy/static/css/article.css)).
- **TOC sidebar framing:** desktop `.toc-collapsible` gets a 1px `--color-border` left rule + `--space-md` padding ([`article.css`](theme/promptanatomy/static/css/article.css)).
- **Author bio placeholder:** [`partials/author_bio.html`](theme/promptanatomy/templates/partials/author_bio.html) no longer renders the gray-disc fallback `<div>` when `SITE_CONFIG.author.avatar` is unset.
- **Article template order** ([`article.html`](theme/promptanatomy/templates/article.html)): Progress → **Breadcrumb** → Header → Takeaway → Prose (+ TOC) → **ArticleCTA** → Related → Author → FAQ.
- **Frontmatter:** canonical optional key is `modified` (Pelican-native, parsed as date) — `date_modified` is silently treated as a string and will not surface `Updated …` or `schema.org/dateModified`. [`AGENTS.md`](AGENTS.md) updated; [`the-model-is-not-the-system.md`](content/articles/the-model-is-not-the-system.md) migrated to `modified`.
- Training links point to [promptanatomy.app](https://www.promptanatomy.app/) (hub root), not `/anatomy/`.
- Homepage **Hub** (ecosystem spoke) moved below Latest articles, above newsletter/footer band.
- Homepage hero CTAs: **Start here** (`/#start-here`) + **Training** (`.app`); removed **Choose a plan** from hero ([`data/hub_sections.yaml`](data/hub_sections.yaml), [`blog_hero.html`](theme/promptanatomy/templates/partials/blog_hero.html)).
- Homepage hub hero: single [`data/01_illustrations/hero.png`](data/01_illustrations/hero.png) → `content/images/hub/hero.png` (replaces dual `hero-1` / `hero-2` Selfpromo cards).
- Homepage hero **split layout**: copy/CTAs left, [`h1.png`](data/01_illustrations/h1.png) architecture diagram right (`hero__grid`, `object-fit: contain`).

### Removed

- **Inline `## Related reading` H2 + bullet blocks** from 27 articles (`content/articles/`). The auto-rendered [`partials/related_articles.html`](theme/promptanatomy/templates/partials/related_articles.html) cards replace this surface; duplicates are now forbidden by [`docs/CONTENT_STANDARDS.md`](docs/CONTENT_STANDARDS.md).
- **Bare-sentence training CTAs** at the end of `the-model-is-not-the-system.md`, `your-company-does-not-need-more-ai-tools.md`, and `implementation-notes-hero-structure.md`. Conversion intent is now centralized in `partials/article_cta.html`.

### Docs

- [`docs/CONTENT_STANDARDS.md`](docs/CONTENT_STANDARDS.md) — new "Forbidden patterns" section.
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — new "Article components" section (Breadcrumb, Tables in prose, Key takeaway, ArticleCTA, hero crop policy, author bio gating, TOC framing, `meta_line` date rule). `.card--featured` single-click-target rule documented under Cards.
- [`docs/COMPONENT_MAP.md`](docs/COMPONENT_MAP.md) — registered `Breadcrumb` and `ArticleCTA` partials; updated Article page-template row.
- [`docs/VISUAL_QA.md`](docs/VISUAL_QA.md) — new "Article surface (UX Hardening v1.1)" checklist block.
- [`docs/SEO_improvement.md`](docs/SEO_improvement.md) — SEO/GEO audit and P0–P1 implementation plan (Phases 1–2 shipped in this release).

### Fixed

- **Hub image sync on Linux/Vercel** — [`scripts/sync_illustrations.py`](scripts/sync_illustrations.py) `sync_hub()` no longer converts `/` to `\\` in destination paths (broke `content/images/hub/hero.png` on Vercel); missing hub masters now fail the sync step with a clear error.
- **Vercel `buildCommand` length** — moved install/build steps into [`scripts/vercel_install.sh`](scripts/vercel_install.sh) and [`scripts/vercel_build.sh`](scripts/vercel_build.sh); [`vercel.json`](vercel.json) now uses short `bash` commands (256-character schema limit).
- **Vercel deploy:** [`vercel.json`](vercel.json) uses `framework: null`, project `.venv` for PEP 668-safe installs, and `.venv/bin/python` for Pelican build. [`.python-version`](.python-version) pins 3.11. [docs/DEPLOY.md](docs/DEPLOY.md) troubleshooting.
- **Preview styling:** [`publishconf.py`](publishconf.py) sets `SITEURL` from `VERCEL_URL` on preview deploys; canonical/feeds use `https://www.promptanatomy.blog`.
- **Production www:** Theme uses root-relative `/static/` and `/images/` paths; apex `promptanatomy.blog` normalized to **www** for metadata so live site matches local Design System build.

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
