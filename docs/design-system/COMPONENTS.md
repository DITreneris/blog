# Components and macros

Live reference: `/design-system/` after build. Lookup table: [`COMPONENT_MAP.md`](../COMPONENT_MAP.md).

## UI macros (`macros/ui.html`)

| Macro | Use |
|-------|-----|
| `section_heading(title, lead, heading_id)` | Section titles; **always** pass `heading_id` when parent has `aria-labelledby` |
| `btn(href, label, variant, external)` | Primary / ghost / secondary CTAs |
| `card(title, description, href, …)` | Start-here linked cards |
| `article_card(article)` | Article listing cards (thumb + title link) |
| `category_badge`, `meta_line`, `hero_image_url`, `article_og_image_path` | Atoms |

## Card interaction models

| Variant | Template | Click model | Preserve |
|---------|----------|-------------|----------|
| `card--linked` | `start_here_cards` / `card()` | Stretched link + `aria-labelledby` | Yes |
| `card` + thumb | `article_card()` | Thumb decorative (`tabindex="-1"`) + title link | Yes |
| `card--featured` | `featured_article.html` | **Gold `btn--primary` only** | Yes |
| `topic-card` | `topic_cluster_grid.html` | Full-card link | Yes |
| `ecosystem-card` | `ecosystem_spoke.html` | Full-card external link | Yes |

**Do not** merge featured card into generic `card()` — single gold CTA is intentional.

## Partials

Page sections with data wiring live under `theme/promptanatomy/templates/partials/`. `article_card.html` is a thin wrapper around `article_card()` for includes.

## Dark-band links

- Prose in dark sections: `.section--dark .prose a`
- Utility: `.link--on-dark`
- Card types (`.topic-card`, `.ecosystem-card`, `.card`) excluded from generic gold link rule
