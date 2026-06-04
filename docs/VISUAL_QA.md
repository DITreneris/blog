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
- [ ] Footer: tab through **Product / Resources / Company** `<nav>` columns; link rows ≥36px tall (footer uses 2.25rem min-height, not global 44px)
- [ ] Footer: brand CTAs “View plans” + “Explore frameworks” visible; gold hover; no `.btn--primary` competing with header Plans
- [ ] Footer: **Frameworks** and **AI Agents** under Product; **Articles** only under Resources (not duplicated)
- [ ] Footer: legal row and founder link keyboard-focusable; compact **one-line** `mailing_address`
- [ ] Footer: density — shorter than v0.7.3; columns grouped at 1280px (68rem cap)
- [ ] Footer: column titles (`--text-small`) stronger than link text; product tagline on dark
- [ ] Footer: `/#ecosystem` under Resources; `/privacy/#cookies` opens cookies section
- [ ] Footer: X `https://x.com/promptanatom`; Atom feed last in Company column; `/feeds/all.atom.xml` returns 200 after build

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
- [ ] Featured card on homepage: `h2` title at featured scale; compact gold badge (not full-width blue bar); content-width gold CTA; section intro is `hub_sections.featured.lead` as `h2` (no "Featured" label)
- [ ] Meta line dates show as `Month YYYY` (e.g. "May 2026"), with `Updated Month YYYY` when modified > published
- [ ] No article body contains an inline `## Related reading` H2 (auto-rendered as cards below)

## Article reading experience (v1.1)

- [ ] Flagship article: summary renders as `.article-lead` below hero, not duplicated as raw FAQ bullets in prose
- [ ] Hero `figcaption` visible when `hero_caption` is set
- [ ] First prose paragraph uses lead styling; body sections read as essay, not slide bullets only
- [ ] Featured article: FAQ accordion appears above dark ArticleCTA band
- [ ] Featured homepage card: poster in `.card__visual-frame` with elevation; image `object-fit: cover` inside frame (listing thumbs unchanged)

## Build

- [ ] `validate_theme_tokens.py` reports no stray hex in theme CSS
- [ ] `make validate && make build` passes
- [ ] `validate_brand_sync.py` passes
- [ ] `validate_a11y_landmarks.py` passes on `output/`
- [ ] `npm run build:satori` succeeds; `validate_satori_manifest.py` OK

## Satori-generated heroes (Phase 1+)

- [ ] Title readable at 1600×900 and when center-cropped to 1200×630 (social safe zone); hero title **52px**, OG title **58px** per [`data/og/typography.mjs`](../data/og/typography.mjs)
- [ ] Diagram labels legible at 100% (floor **16–17px** on bespoke templates); OG subtitle ≤ **72** chars
- [ ] Category badge uses gold on dark (`--color-brand-accent` on `--color-brand-dark`); `category-default` uses per-category accent tints
- [ ] Hero file size &lt; 250 KB; `og-default.png` &lt; 150 KB; dedicated `og.png` &lt; 120 KB (some OG may exceed 120 KB after v0.7.1 typography bump — acceptable short-term)
- [ ] Side-by-side with `/design-system/` brand bands — palette matches tokens
- [ ] Playground: `node scripts/generate_satori_images.mjs --slug SLUG --dry-run` before committing new templates (`--only hero`, `--only og`, `--check`)
- [ ] **Manifest mapping (v0.7.0):** PNG headline or meme text matches article H1 / `hero_caption`; mismatched art → new Opinion slug, playbook gets Satori
- [ ] Pillar articles with `usage: [hero, og]` serve dedicated 1200×630 OG (not hero crop) in meta tags
- [ ] **Social preview smoke (v0.8.0):** [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) on `/` and one pillar; [Twitter Card Validator](https://cards-dev.twitter.com/validator) or equivalent; LinkedIn Post Inspector on `/topics/framework/`

## Homepage & ecosystem (Phase D)

- [ ] Home `/`: split hero — copy left, pipeline architecture diagram right; no poster/URL/debug labels in diagram
- [ ] Hub diagram: horizontal pipeline (Input → Context → Reasoning → Output), central engine with title + subtitle, foundation row (Quality, Workflow); visible flow arrows and vertical stem (not dimmed micro-polish bus)
- [ ] `hero.image_alt` describes pipeline flow into Prompt Anatomy engine (not radial spokes)
- [ ] Primary CTA links to `/topics/framework/`; secondary to `/#latest`
- [ ] `prefers-reduced-transparency`: diagram card and header use solid backgrounds (no blur)
- [ ] Ecosystem map (`Ecosystem2.png`) centered in `#ecosystem`; spoke cards keyboard-reachable
- [ ] `images/hub/og.png` 1200×630 with updated headline after `npm run build:satori`

## Sign-off

| Role | Date | Notes |
|------|------|-------|
| DS v2.0.0 | 2026-06-04 | G.1–G.7: related-heading a11y, brand sync CI, tokens, article_card macro, doc split, style guide parity |
| Production smoke | 2026-06-04 | sitemap + Atom 200; pillar/home/topic `og.png` 200; og meta clean (no URL whitespace) |
| Breakpoint QA v2.0.0 | 2026-06-04 | Release gate: `validate_a11y_landmarks.py` (41 files), `validate_seo_output.py`, `verify_build_assets.py`; manual 375/768/1280 spot-check on `/`, pillar article, `/topics/framework/`, `/about/`, `/design-system/` |
| Content–illustration v0.7.2 | 2026-06-04 | v0.7.1 typography regen; spot-check: `ai-governance-roles-and-ownership` (governance-raci), `prompt-anatomy-foundations` (category-default), `five-levels-of-ai-control` (meme hero + OG), `when-ai-hallucinates-confidence` (meme hero + dedicated OG); heroes &lt; 250 KB; `/topics/opinion/` reading path 12 slugs |
