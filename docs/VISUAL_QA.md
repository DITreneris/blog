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

## Build

- [ ] `make validate && make build` passes
- [ ] `validate_theme_tokens.py` reports no stray hex in theme CSS

## Sign-off

| Role | Date | Notes |
|------|------|-------|
| | | |
