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
- [ ] Newsletter form has visible label (`sr-only`) and `aria-describedby` on note
- [ ] Article hero `alt` matches title when image present

## Contrast (spot-check)

- [ ] `--color-text-on-dark-muted` on `--color-brand-dark` (footer, hero subhead)
- [ ] `--color-text-secondary` on `--color-surface` (body prose)
- [ ] Gold CTA text (`--color-brand-dark`) on gradient button

## Visual regression (no intentional change)

- [ ] Hybrid palette: light reading surface, dark hero/ecosystem/newsletter/footer
- [ ] Gold primary CTAs; blue links only in article prose
- [ ] Card hover lift unchanged
- [ ] Reading progress bar on articles

## Build

- [ ] `make validate && make build` passes
- [ ] `validate_theme_tokens.py` reports no stray hex in theme CSS

## Sign-off

| Role | Date | Notes |
|------|------|-------|
| | | |
