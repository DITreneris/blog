# Visual & Accessibility QA Checklist

Run before major theme releases or production deploys. Maintainer: [q-and-a-agent](../.cursor/agents/q-and-a-agent.md). Spec: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

Use local `make serve` (or `python -m http.server` in `output/`) and check `http://localhost:8000`.

## Pages to verify

- [ ] Home `/`
- [ ] One long article with TOC (headings generate sidebar)
- [ ] Category `/topics/{slug}/` (e.g. Framework)
- [ ] About `/about/`
- [ ] Style guide `/design-system/`

## Accessibility

- [ ] Skip link focuses and jumps to `#main-content`
- [ ] Landmarks: `banner`, `main`, `contentinfo`
- [ ] Every `aria-labelledby` has matching heading `id` (`validate_a11y_landmarks.py` on build)
- [ ] FAQ `<details>`: keyboard open/close; focus visible on summary
- [ ] Mobile menu (`<details>`): keyboard open/close, links reachable at 375px width
- [ ] Desktop nav visible at ≥48rem (768px); mobile menu hidden
- [ ] `:focus-visible` on links, buttons, `.card`, `.topic-card`, `.ecosystem-card`
- [ ] Newsletter band shows “Coming soon” + disclaimer (no disabled form)
- [ ] Article hero `alt` matches title when image present
- [ ] Footer: tab through Explore / Product / Connect `<nav>` columns; link rows ≥44px tall on mobile
- [ ] Footer: `info@promptanatomy.app` mailto and multi-line address (Prompt Anatomy, 1311 Park St, Alameda)
- [ ] Footer: `/#ecosystem` jumps to ecosystem section on home

## Contrast (spot-check)

- [ ] `--color-text-on-dark-muted` on `--color-brand-dark` (footer, hero subhead)
- [ ] `--color-text-secondary` on `--color-surface` (body prose)
- [ ] Gold CTA text (`--color-brand-dark`) on gradient button

## Visual regression (no intentional change)

- [ ] Hybrid palette: light reading surface, dark hero/ecosystem/newsletter/footer
- [ ] Gold primary CTAs; blue links only in article prose
- [ ] Card hover lift unchanged
- [ ] Reading progress bar on articles

## Article surface (UX Hardening v1.1)

- [ ] Breadcrumb visible above article header (`Home › Category › Title`)
- [ ] Article hero shows full asset — no clipped title or `promptanatomy.app` watermark
- [ ] Key takeaway block aligns its left edge with the prose column (not the wider container)
- [ ] Tables in prose have a styled header background and 1px row borders (not browser default)
- [ ] TOC sidebar on desktop has a 1px left rule + padding (frame, not floating nav)
- [ ] End-of-article CTA renders as dark band with gold primary button before related articles
- [ ] Author bio shows no gray-disc placeholder when avatar is not configured
- [ ] Featured card on homepage: title is plain text, gold "Read the framework" button is the only clickable conversion
- [ ] Meta line dates show as `Month YYYY` (e.g. "May 2026"), with `Updated Month YYYY` when modified > published
- [ ] No article body contains an inline `## Related reading` H2 (auto-rendered as cards below)

## Article reading experience (v1.1)

- [ ] Flagship article: summary renders as `.article-lead` below hero, not duplicated as raw FAQ bullets in prose
- [ ] Hero `figcaption` visible when `hero_caption` is set
- [ ] First prose paragraph uses lead styling; body sections read as essay, not slide bullets only
- [ ] Featured article: FAQ accordion appears above dark ArticleCTA band
- [ ] Featured homepage card: poster hero `object-fit: contain`, max-height, light border frame

## Build

- [ ] `validate_theme_tokens.py` reports no stray hex in theme CSS
- [ ] `make validate && make build` passes
- [ ] `validate_brand_sync.py` passes
- [ ] `validate_a11y_landmarks.py` passes on `output/`
- [ ] `npm run build:satori` succeeds; `validate_satori_manifest.py` OK

## Satori-generated heroes (Phase 1+)

- [ ] Title readable at 1600×900 and when center-cropped to 1200×630 (social safe zone)
- [ ] Category badge uses gold on dark (`--color-brand-accent` on `--color-brand-dark`); `category-default` uses per-category accent tints
- [ ] Hero file size &lt; 250 KB; `og-default.png` &lt; 150 KB; dedicated `og.png` &lt; 120 KB
- [ ] Side-by-side with `/design-system/` brand bands — palette matches tokens
- [ ] Playground: `npm run build:satori -- --slug SLUG --dry-run` before committing new templates
- [ ] Pillar articles with `usage: [hero, og]` serve dedicated 1200×630 OG (not hero crop) in meta tags
- [ ] **Social preview smoke (v0.8.0):** [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) on `/` and one pillar; [Twitter Card Validator](https://cards-dev.twitter.com/validator) or equivalent; LinkedIn Post Inspector on `/topics/framework/`

## Homepage & ecosystem (Phase D)

- [ ] Home `/`: split hero — copy left, diagram right; `hero.image_alt` matches diagram content
- [ ] Hub hero sourced from Satori `homepage-hero-frame` + embedded `h1.png` raster
- [ ] Ecosystem map (`Ecosystem2.png`) centered in `#ecosystem`; spoke cards keyboard-reachable
- [ ] `make sync-images` succeeds with `h1.png` present in `data/01_illustrations/`

## Sign-off

| Role | Date | Notes |
|------|------|-------|
| DS v2.0.0 | 2026-06-04 | G.1–G.7: related-heading a11y, brand sync CI, tokens, article_card macro, doc split, style guide parity |
| Production smoke | 2026-06-04 | sitemap + Atom 200; pillar/home/topic `og.png` 200; og meta clean (no URL whitespace) |
| Breakpoint QA v2.0.0 | 2026-06-04 | Release gate: `validate_a11y_landmarks.py` (41 files), `validate_seo_output.py`, `verify_build_assets.py`; manual 375/768/1280 spot-check on `/`, pillar article, `/topics/framework/`, `/about/`, `/design-system/` |
