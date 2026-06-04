# Prompt Anatomy — Design System

**Version:** 2.0 — see [Definition of Done](#definition-of-done-20).

**Maintainer (documentation):** [q-and-a-agent](../.cursor/agents/q-and-a-agent.md) — keeps this file, child docs, `COMPONENT_MAP.md`, `VISUAL_QA.md`, and `CHANGELOG.md` aligned with theme changes. **Implementation:** default coding agent under `theme/promptanatomy/`.

**Living examples:** build the site and open `/design-system/` (see [content/pages/design-system.md](../content/pages/design-system.md)).

## Documentation index

| Doc | Contents |
|-----|----------|
| [design-system/TOKENS.md](design-system/TOKENS.md) | Token catalog, breakpoints, motion, measures |
| [design-system/COMPONENTS.md](design-system/COMPONENTS.md) | Macros, card interaction models, partials |
| [design-system/LAYOUT.md](design-system/LAYOUT.md) | Grids, breakpoints, article layout |
| [design-system/MOTION.md](design-system/MOTION.md) | Allowed / forbidden motion |
| [design-system/BRAND_EXCEPTIONS.md](design-system/BRAND_EXCEPTIONS.md) | Logo SVG, favicon, CSS/Satori dual maintenance |
| [COMPONENT_MAP.md](COMPONENT_MAP.md) | Brief → template lookup |

## Versioning (semver)

| Bump | When |
|------|------|
| **Patch** | CSS fix, no API change |
| **Minor** | New token or component; backward compatible |
| **Major** | Breaking class or HTML renames |

Theme PR checklist: `make validate && make build`; update `COMPONENT_MAP.md` if partials change; run `VISUAL_QA.md` before major theme releases.

**Color change workflow:** `tokens.css` → `brand.mjs` → `validate_brand_sync.py` → `npm run build:satori` → `make sync-images`.

Canonical visual spec aligned with the [mother repo](https://github.com/DITreneris/promptanatomy) brand. Logo/favicon source of truth: mother `docs/design/logo-favicon.md` and `frontend/public/favicon.svg`.

## Brand feel

Expert, structured, calm, technical but readable, premium, implementation-focused. Homepage must communicate purpose in ~2 seconds.

Visual references: Linear, Stripe, enterprise SaaS docs—not colorful magazine or generic blog templates.

## Hybrid palette (blog spoke)

The blog keeps a **light reading interface** while matching the mother brand on chrome and dark bands:

| Role | Token | Hex | Usage |
|------|-------|-----|--------|
| Reading surface | `--color-surface` | `#F7F7F4` | Page background |
| Elevated surface | `--color-surface-elevated` | `#FFFFFF` | Cards, topic cards, template band |
| Body text | `--color-text-primary` | `#111827` | Headings, body on light |
| Prose links | `--color-link` | `#2563EB` | Inline links in articles only |
| Brand dark | `--color-brand-dark` | `#0B1320` | Hero, ecosystem, newsletter, footer |
| Brand gold | `--color-brand-accent` | `#CFA73A` | Logo wordmark, dark-band links, accents |
| Primary CTA | `--color-cta-gradient` | gold gradient | `.btn--primary` only |

**Rule:** Gold = logo, CTAs, and dark sections. Blue = long-form prose links only.

## Token catalog

Source of truth: [`theme/promptanatomy/static/css/tokens.css`](../theme/promptanatomy/static/css/tokens.css).  
**Convention:** Define hex/rgba only in `tokens.css`. Other theme CSS files use `var(--token)` only.

### Brand and surfaces

| Token | Allowed in |
|-------|------------|
| `--color-brand-dark` | Dark bands, primary button text, theme-color meta |
| `--color-brand-accent` | Logo anatomy, dark links, progress bar, focus accents |
| `--color-brand-accent-hover` | Dark-band link hover |
| `--color-cta-gradient` | `.btn--primary` background only |
| `--color-cta-border` | `.btn--primary` border |
| `--color-cta-shadow` | `.btn--primary` box-shadow |
| `--color-surface` | `body` background |
| `--color-surface-elevated` | `.card`, `.topic-card`, `.template-band`, `.author-bio` |
| `--color-surface-dark` | `.section--dark` (alias of brand dark) |
| `--color-surface-dark-card` | Cards on dark sections, `.btn--secondary` |
| `--color-surface-glass` | `.ecosystem-card`, `.hero-diagram__card` (with `@supports` blur) |
| `--color-hero-bg` | `.hero.section--dark` background |
| `--color-hero-diagram-glow` | `.hero-diagram__glow` (engine only) |
| `--color-hero-diagram-line` | Pipeline arrows, connector SVGs |
| `--color-hero-diagram-engine-ring` | `.hero-diagram__engine` focus ring |
| `--color-hero-diagram-surface` | Diagram card fallback (reduced transparency) |
| `--color-hero-diagram-border` | Diagram card border |
| `--shadow-hero-diagram` | Diagram card depth |
| `--color-header-scrim` | Sticky `.site-header` |

### Text and borders

| Token | Allowed in |
|-------|------------|
| `--color-text-primary` | Body, headings on light |
| `--color-text-secondary` | Card desc, prose body, nav links |
| `--color-text-muted` | Meta lines, TOC labels |
| `--color-text-on-dark` | Text on dark bands |
| `--color-text-on-dark-muted` | Subheads on dark, footer |
| `--color-border` | Light UI borders |
| `--color-border-strong` | `.card:hover` border |
| `--color-border-dark` | Dark section borders |
| `--color-border-glass` | Ecosystem cards |
| `--color-link` / `--color-link-hover` | Prose links, badges on light, takeaway box |
| `--color-on-accent` | Text on colored icon badges |

### Semantic and accents

| Token | Allowed in |
|-------|------------|
| `--color-badge-link-bg` | `.badge` on light sections |
| `--color-badge-accent-bg` | `.badge` on dark sections |
| `--color-takeaway-bg` | `.takeaway-box` |
| `--color-code-inline-bg` | Inline `code` in prose |
| `--color-code-text` | `pre` text on dark block |
| `--color-placeholder-gradient` | Article diagram placeholder |
| `--color-card-visual-gradient` | Featured card visual placeholder |
| `--color-ecosystem-glow` | `.ecosystem__glow` |
| `--color-ecosystem-hover-border` | `.ecosystem-card:hover` |
| `--color-ecosystem-1` … `4` | Ecosystem icon backgrounds |
| `--color-accent` / `--color-accent-hover` | Legacy aliases → brand gold |
| `--color-success` / `--color-warning` | Reserved (not used in theme CSS yet) |

### Typography tokens

| Token | Value / role |
|-------|----------------|
| `--font-sans` | Inter stack |
| `--font-mono` | Code blocks |
| `--text-hero` | Hero `h1` (clamp) |
| `--text-section` | Section `h2` |
| `--text-article-title` | Article `h1` |
| `--text-featured-title` | `.card--featured .card__title` (`h2`) |
| `--text-body` | `1.125rem` (18px) body |
| `--text-small` | Buttons, card desc, topic card titles |
| `--text-card-title` | `.card__title` (listing cards) |
| `--text-badge` | `.badge`, `.card__icon-badge` |
| `--text-meta` | Metadata, labels |
| `--text-prose-h2` | Article `.prose h2` |
| `--text-prose-h3` | Article `.prose h3` |
| `--leading-body` | 1.65 |
| `--leading-tight` | Headings |

### Spacing, layout, effects

| Token | Role |
|-------|------|
| `--space-xs` … `--space-2xl` | Component gaps and padding |
| `--section-padding` | `.section` vertical padding (clamp) |
| `--container-max` | `75rem` (~1200px) |
| `--article-max` | `45rem` (720px) prose column |
| `--radius-sm` … `--radius-xl` | Cards, buttons, badges |
| `--shadow-sm` / `--shadow-md` / `--shadow-card-hover` / `--shadow-featured-visual` / `--shadow-ecosystem-card` | Elevation |
| `--z-header` / `--z-progress` | Sticky chrome |

## Typography

- Stack: `--font-sans` (Inter self-hosted woff2 in `theme/promptanatomy/static/fonts/` via `fonts.css`; copied on `npm install` from `@fontsource/inter`)
- Hero headline: `--text-hero` (clamp ~32px–72px)
- Section heading: `--text-section`
- Article title: `--text-article-title`
- **Body:** `--text-body` = **18px** (`1.125rem`), line-height `--leading-body` (~1.65)
- Metadata: `--text-meta` (14px)

## Buttons

Base class: `.btn`. Variants:

| Class | Use | Context |
|-------|-----|---------|
| `.btn--primary` | Main CTA | Gold gradient; dark text; header, hero, featured, templates, ecosystem |
| `.btn--ghost` | Secondary action | Light border on light; light border on `.section--dark` |
| `.btn--secondary` | Muted action on dark | Navy card background; newsletter (when enabled) |

**Rules:**

- Only `.btn--primary` uses `--color-cta-gradient`.
- On `.section--dark`, inline links (not buttons) use `--color-brand-accent`, not `--color-link`.
- Prefer `btn()` macro from `macros/ui.html` for consistent markup.
- Header may use shorter `cta.header_label` (e.g. “Plans”) while hero keeps `cta.label`.

## Cards

- Default `.card` — title link optional via `card()` macro.
- `.card--linked` — full-card hit target via `.card__stretched-link` when `href` is passed to `card()` (Start here cards).
- `.card--featured` — homepage flagship for the article with `featured: true`; **single click target**: gold `btn--primary` only (`h2.card__title` at `--text-featured-title`, gold category badge, `.card__visual-frame` for hero poster). Section intro uses `hub_sections.featured.lead` as the section `h2` when `title` is empty (no “Featured” magazine label). `.stack` uses `align-items: flex-start` so badge and CTA stay content-width.
- **Listing cards** — `article_card(article)` macro: decorative thumb link + title link (see [COMPONENTS.md](design-system/COMPONENTS.md)).
- Newsletter form uses `.newsletter--placeholder` when signup is disabled (visible "Coming soon" badge).

### Card interaction models

| Variant | Template | Click model |
|---------|----------|-------------|
| `card--linked` | `start_here_cards` / `card()` | Stretched link |
| `card` + thumb | `article_card()` | Thumb decorative + title link |
| `card--featured` | `featured_article.html` | Gold `btn--primary` only |
| `topic-card` | `topic_cluster_grid.html` | Full-card link |
| `ecosystem-card` | `ecosystem_spoke.html` | Full-card external link |

## Article components

### Article lead (v1.1)

`partials/article_lead.html` — renders `article.summary` as an editorial dek (`.article-lead`) below the header and above the key takeaway. Constrained to `--article-max`, centered. Keeps the summary out of duplicate H1 context while giving a Stripe-docs-style intro line above the fold.

### Hero caption (v1.1)

Optional frontmatter `hero_caption` renders as `<figcaption class="article-header__caption">` under the hero diagram in `partials/article_header.html`. Use to connect poster-style assets to the prose framework.

### Prose lead paragraph (v1.1)

`.prose > p:first-of-type` uses slightly larger type and `--color-text-primary` so the opening body paragraph reads as the essay lead (distinct from `.article-lead` summary).

### Featured / pillar FAQ placement (v1.1)

When `featured: true`, `partials/faq.html` renders **above** `partials/article_cta.html` (end-of-article conversion). Non-featured articles keep FAQ after the author bio. FAQPage JSON-LD unchanged.

### Breadcrumb

`partials/breadcrumb.html` — `Home › {Category} › {Title}` rendered above `article_header`. Uses `--text-meta` + `--color-text-muted`; current page uses `--color-text-secondary`. Complements the existing `partials/schema_breadcrumb.html` structured data.

### Tables in prose

`.prose table` — methodology tables (e.g. "Worked example" layer/choice tables) get a styled header on `--color-surface-elevated`, 1px `--color-border` row borders, and small body type (`--text-small`). Mobile (`<36rem`): the table becomes `display: block; overflow-x: auto;` for graceful horizontal scroll.

### Key takeaway

`partials/key_takeaway.html` — `.takeaway-box` is constrained to `--article-max` (~720px) and centered, so its left edge aligns with the prose column below. Uses `--color-link` left border + `--color-takeaway-bg`.

### Article CTA

`partials/article_cta.html` — end-of-article conversion block. Dark band (`.section--dark`), centered `section_heading`, lead copy on `--color-text-on-dark-muted`, single `btn--primary` to `SITE_CONFIG.hub.training_url`. Copy from `HUB_SECTIONS.article_cta` in `data/hub_sections.yaml` so editors can override per deploy. The bare-sentence "training link at end of article" pattern is forbidden (see `docs/CONTENT_STANDARDS.md`).

### Article hero image

`.article-header__diagram` uses `aspect-ratio: 16/10` + `object-fit: contain` + `max-height: 28rem` over `--color-surface-elevated`. This preserves in-asset typography (titles, watermarks) instead of cover-cropping them. Featured-card hero uses the same 16/10 ratio for visual consistency.

**Display delivery (v2.1 perf):** templates use `responsive_hero_img()` in `macros/ui.html` — `<picture>` with WebP `srcset` at 400/800/1600w and PNG fallback. Sync pipeline writes `hero.webp` and `hero-{400,800,1600}.webp` alongside `hero.png` (`scripts/sync_illustrations.py`). **Open Graph / Twitter / JSON-LD always reference PNG** (`og.png` or `hero.png`); never WebP in social meta.

### Author bio

`partials/author_bio.html` — avatar `<img>` only when `SITE_CONFIG.author.avatar` is set **and** a headshot exists under `data/author/` (`AUTHOR_HAS_PHOTO` at build time). No brand-logo placeholder in the bio when the photo is missing. When `SITE_CONFIG.author.linkedin` is set, the author name is wrapped in `.author-bio__name-link` (color: inherit; underline on hover) pointing to the LinkedIn profile with `rel="noopener noreferrer me" target="_blank"`. Schema.org Article author is rendered as `Person` (using `SITE_CONFIG.author.name`) with publisher as `Organization` (using `SITE_CONFIG.brand.name`).

### TOC sidebar

Desktop (`≥64rem`): TOC is sticky (`top: 6rem`) and framed with a 1px left rule + `--space-md` left padding, so it reads as a designed sidebar rather than a floating nav.

### `meta_line` date format

`meta_line(article)` macro in `macros/ui.html` formats dates as `%b %Y` (e.g. "May 2026"). When `article.modified > article.date`, surfaces as `Updated May 2026`. Never use `%Y` alone — strips recency signal.

## Layout primitives

CSS-only (see [`layout.css`](../theme/promptanatomy/static/css/layout.css)):

| Class | Role |
|-------|------|
| `.container` | Centered max-width column |
| `.section` | Vertical section padding |
| `.section--dark` | Dark band background + link colors |
| `.grid`, `.grid--2`, `.grid--3`, `.grid--topics` | Responsive grids |
| `.stack` | Vertical flex gap |
| `.cluster` | Horizontal wrap (hero CTAs) |
| `.article-layout`, `.article-layout--with-toc` | Article + sidebar TOC |

### Breakpoints

CSS vars in `tokens.css` mirror `@media` literals — see [TOKENS.md](design-system/TOKENS.md).

| Width | Behavior |
|-------|----------|
| `< 36rem` (`--bp-table`) | Prose table horizontal scroll |
| `< 48rem` (`--bp-nav-max`) | Desktop nav hidden; mobile `<details>` menu |
| `≥ 48rem` (`--bp-nav`) | Desktop `.nav` flex; hero split grid |
| `≥ 64rem` (`--bp-toc`) | Article TOC sticky sidebar |
| `< 64rem` (`--bp-toc-max`) | TOC in collapsible `<details>` above prose |

## Spacing

- Section padding: `--section-padding` (clamp ~56px–96px)
- Card padding: `--space-lg` to `--space-xl` for featured
- Container: `--container-max` (75rem)
- Article column: `--article-max` (45rem / 720px)
- Border radius: `--radius-xl` cards, `--radius-md` buttons

## Motion

Allowed: card hover lift, soft border highlight, opacity transitions, smooth anchor scroll, reading progress bar, sticky TOC active state.

Forbidden: parallax, heavy animation, 3D effects, distracting hovers.

Respect `prefers-reduced-motion` (`base.css`).

## Layout patterns

- Mostly light reading interface
- Dark premium hero, ecosystem, newsletter, and footer (`.section--dark`, `.site-footer--dark`)
- Clean cards, precise spacing, minimal decoration
- Diagrams/system visuals over stock photography

## Brand exceptions

See [design-system/BRAND_EXCEPTIONS.md](design-system/BRAND_EXCEPTIONS.md) for logo bolt `#fbd304` vs `--color-brand-accent`, theme-color meta, and CSS/Satori sync.

## Assets

- Favicon/logo: `theme/promptanatomy/static/` (synced from mother repo)
- Wordmark: [`partials/logo.html`](../theme/promptanatomy/templates/partials/logo.html) — bolt SVG + split text

## Images

| Context | `alt` rule |
|---------|------------|
| Article hero (`article_header.html`) | Article title — required when image present |
| Article card thumbnail | Empty `alt` OK — title is adjacent in link text |
| Featured card image | Empty `alt` OK — title and summary adjacent |
| Hub hero diagram | `hero_architecture_diagram.html`: horizontal pipeline (Input → Context → Reasoning → Output) → central engine (Prompt Anatomy + subtitle) → foundation row (Quality, Workflow); vertical stem + branch SVG connectors + glass card (`--color-hero-diagram-*`, `--shadow-hero-diagram`); hero band `--color-hero-bg`. Copy from `data/hub_sections.yaml` (`visual: diagram`, `diagram.pipeline` / `diagram.center` / `diagram.foundation`). No in-page raster hub hero. |
| Hub ecosystem map | `ecosystem_spoke.html`; `image_alt` in `data/ecosystem.yaml` |
| Logo SVG | `aria-hidden="true"` in header/footer |

## Footer (dark band)

Source: [`partials/footer.html`](../theme/promptanatomy/templates/partials/footer.html), [`components.css`](../theme/promptanatomy/static/css/components.css) (`.site-footer*`), [`data/site.yaml`](../data/site.yaml).

**Columns (v0.7.4):** Product · Resources · Company. Company renders `links` → `social.links` (if `use_social`) → `trailing_links` (Atom feed).

| Tier | Token / rule |
|------|----------------|
| Column titles | `--color-text-on-dark`, `--text-small`, uppercase, `letter-spacing: 0.06em` |
| Nav links | `--color-text-on-dark-muted`; hover/focus `--color-brand-accent`; `min-height: 2.25rem` (footer exception vs global `--touch-target-min`) |
| Brand tagline + CTAs | Tagline `--text-small`; CTAs `.site-footer__cta` + `link--on-dark` (not `.btn--primary`) |
| Legal / address | `--text-meta`, muted; compact `mailing_address` one line |
| Spacing | Outer `padding-block: --space-lg`; grid `max-width: 68rem`, `1.25fr repeat(3, minmax(0, 1fr))`; `.site-footer__bar` groups legal + company |

Social and `twitter_handle` live in `site.yaml`; Organization `sameAs` in [`schema_site.html`](../theme/promptanatomy/templates/partials/schema_site.html) is built from `social.links` and `hub.site_url`.

## Composition

| Layer | When to use |
|-------|-------------|
| **UI macros** (`macros/ui.html`) | Repeated atoms: section titles, buttons, start-here cards, badges, meta lines, `article_card` |
| **Partials** (`partials/*.html`) | Page sections with data wiring (hero, ecosystem, article card, footer) |
| **Layout CSS** | Structure only — no content |

See [`docs/COMPONENT_MAP.md`](COMPONENT_MAP.md) for brief → template mapping.

## Avoid

Childish gradients, generic blog templates, colorful magazine style, oversized illustrations, cluttered grids, weak contrast, tiny low-contrast text. No glow on favicon-sized icons.

## Definition of Done (2.0)

Release contract for theme, Satori, and deploy changes. Labels: **(CI)** = automated in `make validate` / `make build` / Vercel; **(QA)** = manual checklist; **(Major)** = required before production tag or GSC resubmit.

### 1. Tokens and brand (CI)

- [ ] No hardcoded hex in theme CSS except [`tokens.css`](../theme/promptanatomy/static/css/tokens.css) — `python scripts/validate_theme_tokens.py`
- [ ] CSS brand colors match [`data/og/brand.mjs`](../data/og/brand.mjs) — `python scripts/validate_brand_sync.py`
- [ ] Breakpoint, motion, and measure tokens documented in [`docs/design-system/TOKENS.md`](design-system/TOKENS.md)

### 2. Content contract (CI)

- [ ] All published articles pass frontmatter and body rules — `python scripts/validate_content.py` (warnings OK; zero errors)

See publish checklist in [`docs/CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md).

### 3. Satori and images (CI)

- [ ] Satori PNGs regenerate cleanly — `npm run build:satori`
- [ ] Manifest rows match templates and sources — `python scripts/validate_satori_manifest.py`
- [ ] Heroes and OG sync to `content/images/` — `python scripts/sync_illustrations.py`
- [ ] Required paths exist in `output/` after Pelican — `python scripts/verify_build_assets.py`

Playground workflow: [`docs/VISUAL_QA.md`](VISUAL_QA.md) § Satori-generated heroes.

### 4. SEO output (CI)

- [ ] Single-line OG/Twitter image URLs, Article JSON-LD without HTML in `description`, sitemap exclusions — `python scripts/validate_seo_output.py` (post-build)

### 5. Accessibility landmarks (CI)

- [ ] Every `aria-labelledby` target has a matching heading `id` — `python scripts/validate_a11y_landmarks.py` (post-build)

Keyboard and contrast spot-checks: [`docs/VISUAL_QA.md`](VISUAL_QA.md) § Accessibility.

### 6. Visual QA (QA)

Run [`docs/VISUAL_QA.md`](VISUAL_QA.md) on local `make serve` before a **Major** release:

- [ ] Home `/`, one long article with TOC, `/topics/{slug}/`, `/about/`, `/design-system/`
- [ ] Spot-check at 375px, 768px, and 1280px (nav, footer tap targets, article measure, TOC sidebar)
- [ ] Hybrid palette, gold CTAs, blue prose links unchanged unless intentional

### 7. Content standards (QA)

Before publishing or bulk content edits:

- [ ] Voice, structure, and link rules in [`docs/CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md) — publish checklist + `body_locked` after manual edits

### 8. Production smoke (Major)

After deploy to `https://www.promptanatomy.blog`:

- [ ] `/sitemap.xml` and `/feeds/all.atom.xml` return 200
- [ ] Pillar article `og:image` URL returns 200 (dedicated 1200×630 `og.png`, not hero crop)
- [ ] Home and topic OG assets return 200
- [ ] Social debuggers on `/` and one pillar show correct image (Facebook, X/Twitter, LinkedIn)

### 9. Documentation (Major)

- [ ] [`CHANGELOG.md`](../CHANGELOG.md) entry for the release
- [ ] [`docs/COMPONENT_MAP.md`](COMPONENT_MAP.md) updated if partials or macros changed
- [ ] [`todo.md`](../todo.md) checkboxes and baseline line updated

### 10. Deploy (Major)

- [ ] `make validate && make build` passes locally (or equivalent Windows command sequence in [`docs/DEPLOY.md`](DEPLOY.md))
- [ ] Vercel build green on `main`
- [ ] Git tag when semver warrants (e.g. `v2.0.0` for DS major)
- [ ] Google Search Console sitemap resubmitted after URL or sitemap logic changes

**Quick gate (every theme PR):** sections 1, 4, and 5 via CI; section 6 only for UX-visible changes.

## Definition of Done (1.0) — historical

- [x] All tokens documented in this file and defined in `tokens.css`
- [x] No hardcoded hex in theme CSS except `tokens.css` (enforced by `validate_theme_tokens.py`)
- [x] UI macros documented; hub sections use `section_heading` with `heading_id`
- [x] Mobile primary nav works below 48rem
- [x] `docs/VISUAL_QA.md` checklist available (run before each major release)
- [x] `/design-system/` style guide page live
- [x] `make validate && make build` passes
