# Brand exceptions

Documented deviations from `tokens.css` — do not “fix” without mother repo coordination.

## Logo bolt vs CSS gold

| Asset | Color | Notes |
|-------|-------|-------|
| Logo bolt SVG (`partials/logo.html`) | `#fbd304` | Mother repo asset |
| CSS `--color-brand-accent` | `#cfa73a` | Theme chrome, Satori badges |
| Satori `brandAccentBright` | `#fbd304` | OG templates only |

Sync logo bolt with mother repo; sync CSS/Satori with [`tokens.css`](../../theme/promptanatomy/static/css/tokens.css) + [`brand.mjs`](../../data/og/brand.mjs).

## Theme color meta

- `base.html` and `site.webmanifest`: `theme-color` `#0B1320` (matches `--color-brand-dark`).

## Inline hex allowed outside token scan

| File | Reason |
|------|--------|
| `partials/logo.html` | Mother SVG bolt fill |
| `static/favicon.svg` | Mother favicon asset |

`validate_theme_tokens.py` scans `theme/**/css/*.css` only — not Jinja or SVG.

## Dual maintenance (CSS + Satori)

Until full codegen (deferred):

1. Edit [`tokens.css`](../../theme/promptanatomy/static/css/tokens.css)
2. Mirror mapped keys in [`data/og/brand.mjs`](../../data/og/brand.mjs)
3. Run `python scripts/validate_brand_sync.py`
4. If colors changed: `npm run build:satori` → `make sync-images`

## Satori-only colors

`brand.mjs` includes `brandDarkMid` and `brandAccentBright` without CSS token equivalents — intentional for OG gradient bands.
