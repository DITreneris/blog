# Prompt Anatomy — Design System

Canonical visual spec aligned with the [mother repo](https://github.com/DITreneris/promptanatomy) brand. Logo/favicon source of truth: mother `docs/design/logo-favicon.md` and `frontend/public/favicon.svg`.

## Brand feel

Expert, structured, calm, technical but readable, premium, implementation-focused. Homepage must communicate purpose in ~2 seconds.

Visual references: Linear, Stripe, enterprise SaaS docs—not colorful magazine or generic blog templates.

## Hybrid palette (blog spoke)

The blog keeps a **light reading interface** while matching the mother brand on chrome and dark bands:

| Role | Token | Hex | Usage |
|------|-------|-----|--------|
| Reading surface | `--color-surface` | `#F7F7F4` | Page background |
| Body text | `--color-text-primary` | `#111827` | Headings, body on light |
| Prose links | `--color-link` | `#2563EB` | Inline links in articles only |
| Brand dark | `--color-brand-dark` | `#0B1320` | Hero, ecosystem, newsletter, footer |
| Brand gold | `--color-brand-accent` | `#CFA73A` | Logo mark, dark-band links, accents |
| Primary CTA | `--color-cta-gradient` | gold gradient | `.btn--primary` only |

**Rule:** Gold = logo, CTAs, and dark sections. Blue = long-form prose links only.

## Colors (full token set)

See `theme/promptanatomy/static/css/tokens.css`.

| Token | Hex | Usage |
|-------|-----|--------|
| surface | `#F7F7F4` | Page background |
| surface-dark | `#0B1320` | Hero, ecosystem, newsletter, footer |
| surface-dark-card | `#111827` | Cards on dark sections |
| link | `#2563EB` | Article/prose links |
| brand-accent | `#CFA73A` | Brand chrome on dark bands |
| ecosystem-1…4 | various | Ecosystem spoke card icons |

Use accent colors sparingly.

## Typography

- Stack: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif
- Hero headline: 56–72px desktop, 40–48px tablet, 32–38px mobile
- Section heading: 36–44px desktop, 28–34px mobile
- Article title: 48–64px desktop, 34–42px mobile
- Body: 18–20px, generous line-height (~1.65)
- Metadata: 14–15px

## Spacing

- Section padding: 96px top/bottom desktop, 56px mobile
- Card padding: 24–32px
- Container max-width: 1180–1240px
- Article column max-width: 720px
- Border radius: 20–28px (cards), 8–12px (badges, buttons)

## Motion

Allowed: card hover lift, soft border highlight, opacity transitions, smooth anchor scroll, reading progress bar, sticky TOC active state.

Forbidden: parallax, heavy animation, 3D effects, distracting hovers.

Respect `prefers-reduced-motion`.

## Layout patterns

- Mostly light reading interface
- Dark premium hero, ecosystem, newsletter, and footer (`.section--dark`, `.site-footer--dark`)
- Clean cards, precise spacing, minimal decoration
- Diagrams/system visuals over stock photography

## Assets

- Favicon/logo: copied from mother repo into `theme/promptanatomy/static/`
- Wordmark: bolt icon + “Prompt” / “Anatomy” split (`partials/logo.html`)

## Avoid

Childish gradients, generic blog templates, colorful magazine style, oversized illustrations, cluttered grids, weak contrast, tiny low-contrast text. No glow on favicon-sized icons.
