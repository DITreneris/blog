# SEO / AI / GEO / Crawler Improvement Plan

**Version:** 1.0 (Draft)  
**Last reviewed:** 2026-05-28  
**Scope:** `https://www.promptanatomy.blog` — Pelican 4.x static site on Vercel  
**Code owner:** default agent (theme, scripts, config)  
**Doc owner:** [q-and-a-agent](../.cursor/agents/q-and-a-agent.md) (CHANGELOG sync, doc upkeep)

Related: [AGENTS.md](../AGENTS.md) · [ARCHITECTURE.md](ARCHITECTURE.md) · [DEPLOY.md](DEPLOY.md) · [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) · [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [VISUAL_QA.md](VISUAL_QA.md) · [CHANGELOG.md](../CHANGELOG.md)

**Status legend:** `OK` · `PARTIAL` · `FAIL`  
**Priority legend:** `P0` (release-blocking) · `P1` (high impact) · `P2` (long-term growth)

---

## 1. Executive Summary

| Item | Value |
|------|-------|
| **Overall status** | **Mostly OK** — core metadata/schema shipped; remaining gaps are FAQ coverage, production draft guards, and build-pipeline docs |
| **Biggest blocker** | Ensure every deploy runs `sync-images` + `brand-assets` + `verify_build_assets.py` (see [`Makefile`](../Makefile)); keep `data/01_illustrations/` in the repo |
| **Stack note** | Pelican + Jinja templates + Vercel — not Astro/Tailwind. All fixes target `theme/promptanatomy/templates/` and `scripts/` |

### Top 5 highest-impact improvements

1. Add a default `og:image` (1200×630) + width/height/alt in `base.html`; let articles override.
2. Inject **Organization + WebSite** JSON-LD with `sameAs` on every page (entity anchor for Google, ChatGPT, Perplexity, Claude).
3. Fix `partials/schema_breadcrumb.html` to include **Category** as position 2 for articles (matches visible breadcrumb).
4. Add `/llms.txt` and `<meta name="robots" content="noindex">` on `/design-system/`.
5. Add `<lastmod>` to `sitemap.xml` and verify all favicon / PWA icons return 200.

---

## 2. OK / FAIL Audit Table

| Area | Status | Finding | Why it matters | Recommended fix | Priority |
|------|--------|---------|----------------|-----------------|----------|
| `<title>` per page | OK | Home, article, page, category have unique titles | Click-through, Google relevance | — | — |
| Meta description | OK | Articles truncate `summary` to 160; category pages use per-topic description from `categories.yaml` | — | — | — |
| Canonical URLs | OK | All templates emit `CANONICAL_SITEURL` + path | Prevents www/apex duplicates | — | — |
| hreflang | N/A | Site is `en-US` only | — | Skip until i18n | — |
| `robots.txt` | PARTIAL | `Allow: /` + sitemap; no explicit AI-bot policy | Ambiguity for GPTBot, ClaudeBot, PerplexityBot | Add explicit allow stanzas (optional) | P2 |
| `sitemap.xml` | OK | `<lastmod>` emitted; `/design-system/` excluded | — | — | — |
| Status codes / redirects | OK | Apex→www via `publishconf.py` + Vercel | Single canonical host | — | — |
| Internal links | OK | Articles cross-link; topic clusters present | Topic authority | — | — |
| Duplicate metadata | OK | Topic pages use category-specific `og:description` and dedicated OG image | — | — | — |
| `noindex` mistakes | PARTIAL | `/design-system/` has `noindex`; production disables draft HTML via `publishconf.py` | Utility indexes disabled in production | Verify no `/drafts/` in prod `output/` | P1 |
| `og:image` (default) | OK | [`meta_og_image.html`](../theme/promptanatomy/templates/partials/meta_og_image.html) + `og-default.png`; home uses `images/hub/og.png`; articles use dedicated `og.png` when in `OG_ARTICLE_SLUGS` | — | — | — |
| `og:image:width/height/alt` | OK | 1200×630 on all social surfaces; article/topic/home alt text set | — | — | — |
| Twitter card | OK | `summary_large_image` + fallback image + `@TStaniulis_NFT` | — | — | — |
| Article JSON-LD | OK | `image`, Person author, Organization publisher | — | — | — |
| WebSite JSON-LD | OK | [`schema_site.html`](../theme/promptanatomy/templates/partials/schema_site.html) | — | — | — |
| Organization JSON-LD | OK | Same `@graph` as WebSite | — | — | — |
| BreadcrumbList JSON-LD | OK | Home → Category → Title for articles | — | — | — |
| FAQPage JSON-LD | PARTIAL | [`schema_faq.html`](../theme/promptanatomy/templates/partials/schema_faq.html); pillar article has `faq` frontmatter | Expand to more pillar posts | Add `faq` YAML on 2–3 more articles | P2 |
| `llms.txt` | OK | [`content/extra/llms.txt`](../content/extra/llms.txt) | — | — | — |
| Favicon / PWA icons | PARTIAL | `base.html` references PNGs; verify on disk | 404s visible in DevTools and crawlers | Add missing PNGs from SVG | P1 |
| HTML lang | OK | `lang="en-US"` | Locale signal | — | — |
| Atom feed | OK | Linked in head | Discoverability | — | — |
| Author E-E-A-T | PARTIAL | Person in JSON-LD; About page thin | Trust + AI citation | Expand About; add Person schema | P2 |

---

## 3. Technical SEO Findings

### Current metadata strategy

Metadata lives in Jinja blocks in [`theme/promptanatomy/templates/base.html`](../theme/promptanatomy/templates/base.html). Child templates override `title`, `description`, `canonical`, `open_graph`, `twitter`, and `structured_data`.

| Template | Title | Description | Canonical | OG | Twitter image |
|----------|-------|-------------|-----------|-----|---------------|
| `base.html` | Default | Brand description | Home | Website type | No |
| `index.html` | Brand + tagline | Brand | Home | Inherits base | No |
| `article.html` | Article + brand | Truncated summary | Article URL | Article type + hero if set | Hero if set |
| `page.html` | Page + brand | Page summary or brand | Page URL | Partial (no description) | No |
| `category.html` | Category + brand | Brand (default) | Category URL | Inherits base | No |
| `design_system.html` | Page + brand | Page summary | Page URL | Inherits base | No |

### File-level observations

**[`base.html`](../theme/promptanatomy/templates/base.html)**

- Line 7: `description` block uses `SITE_CONFIG.brand.description` — good baseline.
- Lines 11–16: Default OG block has no `og:image`.
- Lines 17–21: `twitter:card` is `summary_large_image` but no `twitter:image`.
- Lines 23–27: Favicon links reference PNGs; confirm they exist under `theme/promptanatomy/static/`.

**[`article.html`](../theme/promptanatomy/templates/article.html)**

- Lines 12, 18: `og:image` / `twitter:image` only when `article.hero_image` is set.
- Missing `og:image:width`, `og:image:height`, `og:image:alt`.

**[`page.html`](../theme/promptanatomy/templates/page.html)**

- `open_graph` block (lines 6–10) missing `og:description`.
- `description` block does not truncate to 160 characters.

**[`category.html`](../theme/promptanatomy/templates/category.html)**

- No `open_graph` or `description` override — every `/topics/<slug>/` shares brand metadata.
- Category lead text exists in template from `data/categories.yaml` but is not used in `<meta>`.

**[`design_system.html`](../theme/promptanatomy/templates/design_system.html)**

- Developer-only style guide at `/design-system/` — should be `noindex,follow`.

**[`scripts/generate_sitemap.py`](../scripts/generate_sitemap.py)**

- Emits all `index.html` paths; no `<lastmod>`.
- Does not exclude `/design-system/`.

**[`content/extra/robots.txt`](../content/extra/robots.txt)**

- `Allow: /` and sitemap URL present.
- Sitemap URL uses apex host; canonical site uses `www` — align to `https://www.promptanatomy.blog/sitemap.xml`.

**[`pelicanconf.py`](../pelicanconf.py)**

- `CANONICAL_SITEURL` from `data/site.yaml` → `https://www.promptanatomy.blog`.
- `EXTRA_PATH_METADATA` maps only `robots.txt`; add `llms.txt` when created.

---

## 4. OG / Social Preview Findings

### Current state matrix

| Page type | `og:image` | `twitter:image` | width/height | alt |
|-----------|------------|-------------------|--------------|-----|
| Home | Yes (`images/hub/og.png`) | Yes | 1200×630 | Yes (hero alt) |
| Article (published) | Yes (`og.png` via `OG_ARTICLE_SLUGS`) | Yes | 1200×630 | Yes (title) |
| Category / topic | Yes (`images/topics/{slug}/og.png`) | Yes | 1200×630 | Yes |
| Page (About, etc.) | Fallback `og-default.png` | Fallback | 1200×630 | Yes |

### Required tags (every important page)

| Tag | Value |
|-----|-------|
| `og:title` | Page-specific title |
| `og:description` | Page-specific description (≤160 chars) |
| `og:url` | Absolute canonical URL |
| `og:type` | `website` or `article` |
| `og:image` | Absolute URL to 1200×630 PNG (or article hero) |
| `og:image:width` | `1200` (or actual hero width) |
| `og:image:height` | `630` (or actual hero height) |
| `og:image:alt` | Descriptive alt text |
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Same as og:title |
| `twitter:description` | Same as og:description |
| `twitter:image` | Same as og:image |
| `twitter:image:alt` | Same as og:image:alt |
| `twitter:site` | `@TStaniulis_NFT` (from `data/site.yaml`) |
| `twitter:creator` | `@TStaniulis_NFT` |

### Fallback image spec

- **Path:** `theme/promptanatomy/static/img/og-default.png`
- **Dimensions:** 1200×630 px
- **Format:** PNG
- **Content:** Logo + tagline "Structured AI implementation for teams"
- **Colors:** Use design tokens from [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (navy background, gold accent) — no hardcoded hex in templates; asset is the exception.

### Fallback logic

1. **Default (all pages):** emit fallback OG image from `base.html`.
2. **Articles with `hero_image`:** override in `article.html` with article hero URL + article title as alt.
3. **Topic pages (optional P1):** category-specific OG using topic illustration or fallback.

---

## 5. AI / GEO Visibility Findings

### What AI systems can extract today

| Question | Status | Notes |
|----------|--------|-------|
| What is this website? | PARTIAL | Brand description in meta + footer; no JSON-LD Organization |
| Who does it help? | PARTIAL | "Teams" implied; not structured |
| Why is it credible? | PARTIAL | Author Person + LinkedIn; mailing address in footer |
| Topic associations | OK | 8 categories, internal linking, pillar articles |
| Citation-ready paragraphs | OK | Articles use declarative blocks and tables |

### Recommendations

**Entity definition (P0–P1)**

- Add Organization + WebSite JSON-LD so answer engines can anchor "Prompt Anatomy" as a named entity.
- Ensure homepage hero contains a quotable one-liner: *"Prompt Anatomy helps teams turn random AI usage into structured workflows, policies, and implementation systems."* (already in `data/site.yaml` → `brand.description`).

**`/llms.txt` (P1)**

- Ship at site root via `content/extra/llms.txt` + `EXTRA_PATH_METADATA`.
- Include: entity paragraph, pillar article URLs, topic index, About, contact.

**Content structure for AI citation (P2)**

- **Glossary page** (`/glossary/`): define prompt, context architecture, agent, evaluation hook, governance role, vibe prompting.
- **Author page** (`/author/tomas-staniulis/`): Person schema, credentials, sameAs.
- **FAQ on pillar articles:** populate `faq` frontmatter on 5–10 articles; emit FAQPage JSON-LD.

**Citation-friendly style (already in place)**

- Short declarative opening paragraphs.
- Tables for comparisons and remediation steps.
- Internal links to related pillar content.

---

## 6. Structured Data Plan

| Schema | Where | Current | Target | Priority |
|--------|-------|---------|--------|----------|
| `Organization` | `base.html` (home or global) | Missing | name, url, logo, email, sameAs | P0 |
| `WebSite` | `base.html` | Missing | name, url, inLanguage, publisher ref | P1 |
| `Article` / `BlogPosting` | `partials/schema_article.html` | Present; no `image` | Add `image`; link publisher to Org @id | P1 |
| `BreadcrumbList` | `partials/schema_breadcrumb.html` | Home → Title for articles | Home → Category → Title | P1 |
| `FAQPage` | New `partials/schema_faq.html` | Not emitted | On articles with `faq` frontmatter | P2 |
| `Person` | `/about/` or author page | Partial (in Article author) | Standalone on About | P2 |
| `CollectionPage` | `category.html` | — | Optional for topic pages | P2 |
| `SoftwareApplication` | hub `.app` site | Out of scope | Not on `.blog` | — |

### Organization + WebSite JSON-LD (add to `base.html`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.promptanatomy.blog/#organization",
      "name": "Prompt Anatomy",
      "url": "https://www.promptanatomy.blog/",
      "logo": "https://www.promptanatomy.blog/static/img/og-default.png",
      "email": "info@promptanatomy.app",
      "sameAs": [
        "https://www.linkedin.com/in/staniulis",
        "https://x.com/TStaniulis_NFT",
        "https://t.me/prompt_anatomy",
        "https://www.promptanatomy.app/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.promptanatomy.blog/#website",
      "url": "https://www.promptanatomy.blog/",
      "name": "Prompt Anatomy",
      "inLanguage": "en-US",
      "publisher": { "@id": "https://www.promptanatomy.blog/#organization" }
    }
  ]
}
```

### Article schema patch (`partials/schema_article.html`)

Add inside the JSON object:

```json
"image": ["https://www.promptanatomy.blog/{{ article.hero_image or 'static/img/og-default.png' }}"],
"publisher": { "@id": "https://www.promptanatomy.blog/#organization" }
```

### Breadcrumb fix (`partials/schema_breadcrumb.html`)

For articles, replace single position-2 item with Category (position 2) + Title (position 3) to match visible breadcrumb in `partials/breadcrumb.html`.

---

## 7. Crawler Access Checklist

| Check | Status | Action |
|-------|--------|--------|
| `robots.txt` at `/robots.txt` | OK | Mapped via `EXTRA_PATH_METADATA` |
| `sitemap.xml` at `/sitemap.xml` | OK | Post-build via `generate_sitemap.py` |
| Canonical on every page | OK | `CANONICAL_SITEURL` in templates |
| `noindex` on `/design-system/` | FAIL | Add in `design_system.html` |
| `<lastmod>` in sitemap | FAIL | Add in `generate_sitemap.py` |
| Favicon PNGs return 200 | VERIFY | Check `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` |
| PWA icons return 200 | VERIFY | Check `android-chrome-192x192.png`, `android-chrome-512x512.png` |
| OG fallback image returns 200 | FAIL | Create `static/img/og-default.png` |
| Atom feed returns 200 | VERIFY | `{{ FEED_DOMAIN }}/feeds/all.atom.xml` |
| AI bots get full HTML | OK | Static HTML; no JS gate on content |

### Optional AI-bot stanza for `content/extra/robots.txt`

```text
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://www.promptanatomy.blog/sitemap.xml
```

---

## 8. Implementation Plan

### Phase 1 — P0 (release-ready, ~2 hours)

Must be safe, small, and release-ready.

| # | Task | File(s) |
|---|------|---------|
| 1 | Create fallback OG image 1200×630 | `theme/promptanatomy/static/img/og-default.png` |
| 2 | Add fallback OG + Twitter image tags | `theme/promptanatomy/templates/base.html` |
| 3 | Add `twitter:site` / `twitter:creator` | `base.html` (from `SITE_CONFIG.social`) |
| 4 | Add Organization + WebSite JSON-LD | `base.html` (`structured_data` block) |
| 5 | Add `{% block robots %}` default + `noindex` override | `base.html`, `design_system.html` |
| 6 | Verify/add favicon and PWA PNG assets | `theme/promptanatomy/static/` |

**Validation:** Facebook Debugger + LinkedIn Inspector on `/` and one article.

### Phase 2 — P1 (~3 hours)

Important but not release-blocking.

| # | Task | File(s) |
|---|------|---------|
| 7 | Article OG override with width/height/alt | `article.html` |
| 8 | Add `image` to Article schema | `partials/schema_article.html` |
| 9 | Breadcrumb Category position fix | `partials/schema_breadcrumb.html` |
| 10 | Add `og:description` + truncate description | `page.html` |
| 11 | Per-topic description + OG override | `category.html`, `data/categories.yaml` |
| 12 | Sitemap `<lastmod>` + exclude design-system | `scripts/generate_sitemap.py` |
| 13 | Ship `/llms.txt` | `content/extra/llms.txt`, `pelicanconf.py` |
| 14 | Align robots.txt sitemap URL to www | `content/extra/robots.txt` |

**Validation:** Google Rich Results Test on home + article; GSC sitemap resubmit.

### Phase 3 — P2 (long-term)

Useful for SEO/GEO growth.

| # | Task | File(s) |
|---|------|---------|
| 15 | FAQ frontmatter on 5–10 pillar articles | `content/articles/*.md` |
| 16 | FAQPage JSON-LD partial | `partials/schema_faq.html`, `article.html` |
| 17 | Expand About + Person schema | `content/pages/about.md`, new partial |
| 18 | Glossary page | `content/pages/glossary.md` |
| 19 | Explicit AI-bot stanzas in robots.txt | `content/extra/robots.txt` |
| 20 | Switch `Article` → `BlogPosting` | `partials/schema_article.html` |
| 21 | Add social preview row to VISUAL_QA | `docs/VISUAL_QA.md` |

---

## 9. Exact Code Change Suggestions

All changes are additive in `<head>` or isolated template/script edits. No routing, layout, or design changes.

### 9.1 `base.html` — fallback OG + Twitter + robots block

Add inside default `open_graph` block (after `og:url`):

```html
<meta property="og:image" content="{{ CANONICAL_SITEURL }}/{{ THEME_STATIC_DIR }}/img/og-default.png" />
<meta property="og:image:secure_url" content="{{ CANONICAL_SITEURL }}/{{ THEME_STATIC_DIR }}/img/og-default.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Prompt Anatomy — Structured AI implementation for teams" />
```

After `twitter:card`:

```html
<meta name="twitter:site" content="@TStaniulis_NFT" />
<meta name="twitter:creator" content="@TStaniulis_NFT" />
<meta name="twitter:image" content="{{ CANONICAL_SITEURL }}/{{ THEME_STATIC_DIR }}/img/og-default.png" />
<meta name="twitter:image:alt" content="Prompt Anatomy — Structured AI implementation for teams" />
```

Before `</head>`, add robots block:

```html
{% block robots %}<meta name="robots" content="index,follow,max-image-preview:large" />{% endblock %}
```

Add Organization + WebSite JSON-LD in `{% block structured_data %}` on home (or globally once).

### 9.2 `design_system.html` — noindex

```html
{% block robots %}<meta name="robots" content="noindex,follow" />{% endblock %}
```

### 9.3 `article.html` — per-article OG override

Extend existing `open_graph` block when `article.hero_image` is set:

```html
<meta property="og:image" content="{{ CANONICAL_SITEURL }}/{{ article.hero_image }}" />
<meta property="og:image:width" content="1600" />
<meta property="og:image:height" content="1000" />
<meta property="og:image:alt" content="{{ article.title|striptags }}" />
```

Mirror in `twitter` block:

```html
<meta name="twitter:image" content="{{ CANONICAL_SITEURL }}/{{ article.hero_image }}" />
<meta name="twitter:image:alt" content="{{ article.title|striptags }}" />
```

Adjust width/height if hero aspect ratios vary; omit if inconsistent.

### 9.4 `partials/schema_article.html` — image field

```jinja
"image": ["{{ CANONICAL_SITEURL }}/{{ article.hero_image or (THEME_STATIC_DIR ~ '/img/og-default.png') }}"],
```

Update publisher to reference Organization @id:

```jinja
"publisher": { "@id": "https://www.promptanatomy.blog/#organization" }
```

### 9.5 `partials/schema_breadcrumb.html` — Category position

Replace article branch with two list items:

```jinja
{% if article %}
,{
  "@type": "ListItem",
  "position": 2,
  "name": {{ article.category.name|tojson }},
  "item": "{{ CANONICAL_SITEURL }}/{{ article.category.url }}"
},
{
  "@type": "ListItem",
  "position": 3,
  "name": {{ article.title|tojson }},
  "item": "{{ CANONICAL_SITEURL }}/{{ article.url }}"
}
```

### 9.6 `page.html` — og:description

Add to `open_graph` block:

```html
<meta property="og:description" content="{{ page.summary|default(SITE_CONFIG.brand.description)|striptags|truncate(160) }}" />
```

Truncate `description` block similarly.

### 9.7 `category.html` — per-topic metadata

Override `description` and `open_graph` using `CATEGORIES` data (pattern already used for lead text in template body).

### 9.8 `scripts/generate_sitemap.py` — lastmod + exclude

```python
from datetime import datetime, timezone

EXCLUDE = {"design-system"}

def add_url(urlset, loc, lastmod=None):
    url = SubElement(urlset, "url")
    SubElement(url, "loc").text = loc
    if lastmod:
        SubElement(url, "lastmod").text = lastmod

# In loop:
slug_root = rel.split("/", 1)[0]
if slug_root in EXCLUDE:
    continue
lastmod = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).date().isoformat()
add_url(urlset, f"{SITEURL}/{rel.removesuffix('/index.html')}/", lastmod)
```

### 9.9 `content/extra/llms.txt` — skeleton

```text
# Prompt Anatomy

> Prompt Anatomy is a structured AI implementation knowledge hub for teams turning ad-hoc AI usage into controlled prompts, workflows, agents, evaluation hooks, and governance. Authored by Tomas Staniulis (Founder, Prompt Anatomy).

## Pillar articles
- [Prompt Anatomy Foundations](https://www.promptanatomy.blog/articles/prompt-anatomy-foundations/): the 6-layer implementation stack.
- [The Model Is Not the System](https://www.promptanatomy.blog/articles/the-model-is-not-the-system/)
- [How to Design an AI Agent Workflow](https://www.promptanatomy.blog/articles/how-to-design-an-ai-agent-workflow/)
- [10 Signs Your Company Is Vibe Prompting](https://www.promptanatomy.blog/articles/10-signs-your-company-is-vibe-prompting/)

## Topics
- /topics/framework/
- /topics/ai-agents/
- /topics/ai-governance/
- /topics/implementation-notes/
- /topics/case-studies/
- /topics/templates/

## About
- /about/
- Contact: info@promptanatomy.app
```

### 9.10 `pelicanconf.py` — map llms.txt

```python
EXTRA_PATH_METADATA = {
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/llms.txt": {"path": "llms.txt"},
}
```

---

## 10. Final QA Checklist

Run before marking any phase complete.

### Build

- [ ] `make validate` passes (`validate_theme_tokens.py` + `validate_content.py`)
- [ ] `make build` produces `output/sitemap.xml` with `<lastmod>` and no `/design-system/`

### Metadata (view source)

- [ ] `/` — og:image, og:image:width/height/alt, twitter:image, canonical, Organization + WebSite JSON-LD
- [ ] `/about/` — page-specific title, description, OG tags
- [ ] `/articles/<slug>/` — article OG with hero or fallback; Article JSON-LD with `image`
- [ ] `/topics/framework/` — topic-specific description (after P1)
- [ ] `/design-system/` — `noindex,follow` only

### Assets

- [ ] `curl -I https://www.promptanatomy.blog/static/img/og-default.png` → 200
- [ ] All favicon + apple-touch + android-chrome icons → 200
- [ ] Atom feed → 200

### External validators

- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — home (Org + WebSite), article (Article + Breadcrumb)
- [ ] [Schema.org Validator](https://validator.schema.org/) — no errors
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — home + 1 article; large card renders
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — home + article
- [ ] X Card Validator or draft post — image card visible
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) Lighthouse SEO ≥ 95 on home + article

### Search consoles

- [ ] Google Search Console — resubmit `sitemap.xml`, request indexing on changed URLs
- [ ] Bing Webmaster Tools — submit sitemap

### AI crawlers (smoke test)

- [ ] `curl -A "GPTBot" https://www.promptanatomy.blog/` → 200, full HTML body
- [ ] `curl -A "PerplexityBot" https://www.promptanatomy.blog/` → 200
- [ ] `/llms.txt` → 200 with pillar links (after P1)

---

## 11. Risks and Rollback

| Risk | Mitigation |
|------|------------|
| Broken OG image URL | Test with Facebook Debugger before deploy; use absolute `CANONICAL_SITEURL` |
| Duplicate JSON-LD | Emit Org/WebSite once (home only) or use `@graph` with stable `@id` refs |
| Sitemap exclude too aggressive | Keep exclude list minimal (`design-system` only) |
| Favicon 404s | Verify PNGs exist before referencing in `base.html` |

**Rollback:** Every change is a template or script revert. OG fallback PNG can be deleted if unused. No database or routing impact.

---

## 12. References

| Document | Relevance |
|----------|-----------|
| [AGENTS.md](../AGENTS.md) | Agent workflows; content contract |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Build pipeline, URL structure |
| [DEPLOY.md](DEPLOY.md) | Vercel build, SITEURL, preview vs production |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Brand colors for OG image asset |
| [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) | Voice, FAQ frontmatter pattern |
| [VISUAL_QA.md](VISUAL_QA.md) | Add social preview check row after Phase 1 |
| [COMPONENT_MAP.md](COMPONENT_MAP.md) | Register new schema partials if added |
| [CHANGELOG.md](../CHANGELOG.md) | q-and-a-agent mirrors completed phases |

---

## 13. Progress Tracker

Update this table as phases ship. q-and-a-agent syncs to CHANGELOG.

| Phase | Status | Shipped | Notes |
|-------|--------|---------|-------|
| Phase 1 — P0 | Done | v0.4+ | OG fallback, Org/WebSite schema, design-system noindex |
| Phase 2 — P1 | Done | v0.8.0 | Article/category/home OG PNGs, breadcrumb, llms.txt, sitemap lastmod |
| Phase 3 — P2 | Partial | — | FAQPage expansion, glossary, author page |
