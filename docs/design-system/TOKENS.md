# Design tokens

Source of truth: [`theme/promptanatomy/static/css/tokens.css`](../../theme/promptanatomy/static/css/tokens.css).

**Convention:** hex/rgba only in `tokens.css`. Other CSS uses `var(--token)`.

Satori mirror: [`data/og/brand.mjs`](../../data/og/brand.mjs) — validated by `scripts/validate_brand_sync.py`.

## Brand and surfaces

See [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) token catalog tables (brand, text, borders, semantic accents).

## Breakpoints

Defined as CSS custom properties for documentation; `@media` uses matching literals (browsers do not support `var()` in media queries).

| Token | Value | Usage |
|-------|-------|--------|
| `--bp-table` | `36rem` | Newsletter form row; prose table scroll |
| `--bp-nav-max` | `47.99rem` | Mobile header CTA truncate |
| `--bp-nav` | `48rem` | Desktop nav vs mobile menu |
| `--bp-toc-max` | `63.99rem` | Collapsible TOC layout |
| `--bp-toc` | `64rem` | Sticky article TOC sidebar |

## Motion

| Token | Value |
|-------|-------|
| `--duration-fast` | `0.1s` |
| `--duration-normal` | `0.2s` |
| `--ease-standard` | `ease` |

Respect `prefers-reduced-motion` in `base.css`.

## Layout measures

| Token | Value | Intent |
|-------|-------|--------|
| `--measure-hero-headline` | `24ch` | Hero `h1` line length |
| `--measure-hero-subhead` | `42rem` | Hero subhead max width |
| `--measure-ecosystem-intro` | `40rem` | Section lead, ecosystem header |
| `--measure-newsletter-form` | `36rem` | Newsletter band |
| `--article-cta-max` | `38rem` | Article CTA lead |
| `--touch-target-min` | `2.75rem` | Nav/footer/mobile tap rows |

## Reserved semantic colors

`--color-success` and `--color-warning` — shown on `/design-system/` only; not used in production theme CSS yet.

## Grid constants (CSS, not tokens)

| Class | `minmax` |
|-------|----------|
| `.grid--2` | `280px` |
| `.grid--3` | `260px` |
| `.grid--topics` | `220px` |
| `.ecosystem__grid` | `240px` |
