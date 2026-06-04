# Performance Baseline — promptanatomy.blog

**Captured:** 2026-06-04 (post load-speed optimization, local build)  
**Environment:** Local `make build` output verified; production PSI scores pending next deploy.

## URLs measured

| URL | Purpose |
|-----|---------|
| `/` | Homepage — SVG hero, latest cards (12 visible + load-more) |
| `/articles/the-model-is-not-the-system/` | Article — WebP hero LCP candidate |

## Post-optimization architecture (2026-06-04)

| Signal | Value | Source |
|--------|-------|--------|
| Blocking CSS files | 1 (`site.min.css`); + `article.min.css` on article/category/design-system | `base.html`, `build_css.py` |
| Third-party fonts | None — self-hosted Inter woff2 | `fonts.css` |
| Article hero format | WebP `<picture>` + PNG fallback; preload on LCP | `responsive_hero_img`, `article.html` |
| Runtime JS | Vercel analytics (prod) + reading progress / TOC / load-more | `theme/static/js/` |
| Cache headers | `max-age=31536000, immutable` on `/static/` and `/images/` | `vercel.json` |
| Branded 404 | `output/404.html` | `content/extra/404.html` |

## Pre-optimization architecture (historical)

| Signal | Value | Source |
|--------|-------|--------|
| Blocking CSS files | 5 (`tokens`, `base`, `layout`, `components`, `article`) | `base.html` (before minify) |
| Third-party fonts | Google Fonts Inter 400–700 | `base.html` (removed) |
| Article hero format | PNG max 1600px, `loading="eager"` | before WebP pipeline |
| Cache headers | None explicit in `vercel.json` | before 2026-06-04 |

## Lab metrics (fill after production PSI run)

Run [PageSpeed Insights](https://pagespeed.web.dev/) on production after deploy.

| Metric | Home mobile | Home desktop | Article mobile | Article desktop | Target post-opt |
|--------|-------------|--------------|----------------|-----------------|-----------------|
| LCP | _pending deploy_ | _pending deploy_ | _pending deploy_ | _pending deploy_ | ≤ 2.0 s |
| INP | _pending deploy_ | _pending deploy_ | _pending deploy_ | _pending deploy_ | ≤ 150 ms |
| CLS | _pending deploy_ | _pending deploy_ | _pending deploy_ | _pending deploy_ | ≤ 0.05 |
| TTFB | _pending deploy_ | _pending deploy_ | _pending deploy_ | _pending deploy_ | ≤ 600 ms |
| FCP | _pending deploy_ | _pending deploy_ | _pending deploy_ | _pending deploy_ | ≤ 1.5 s |
| Performance score | _pending deploy_ | _pending deploy_ | _pending deploy_ | _pending deploy_ | ≥ 85 |

## Network checklist (DevTools, throttled 4G)

- [x] One render-blocking stylesheet on `/` (`site.min.css`)
- [x] No requests to `fonts.googleapis.com` / `fonts.gstatic.com` (local build)
- [ ] Article hero transfer size (WebP KB) — verify on production
- [ ] Total first-party JS bytes — verify on production

## After Phase 1–3 (implemented 2026-06-04)

| Change | Expected effect |
|--------|-----------------|
| Self-hosted Inter + `site.min.css` | No Google Fonts requests; one blocking CSS file on most pages |
| `article.min.css` conditional | Homepage/about skip article/TOC CSS |
| WebP `<picture>` + preload | Smaller LCP on article pages |
| Homepage 12 + load-more | Reduced initial visible card count |
| `vercel.json` cache headers | Long-cache static assets |
| Lighthouse CI | PR performance regression warnings |
| GitHub CI = `make build` | Same gate as Vercel |

Re-run PSI on production after deploy and replace `_pending deploy_` in the lab metrics table.
