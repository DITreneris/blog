# Component Map — Brief → Jinja

Maps product brief names to theme files. When adding or renaming partials, update this file and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (maintainer: [q-and-a-agent](../.cursor/agents/q-and-a-agent.md)).

| Brief component | Template path | Data source |
|-----------------|---------------|-------------|
| Header | `partials/header.html` | `SITE_CONFIG` (from `data/site.yaml`) |
| Logo | `partials/logo.html` | `SITE_CONFIG.brand` |
| Footer | `partials/footer.html` | `SITE_CONFIG.footer` (Explore from `hub.*_url`, Connect from `social.links` + column links), `SITE_CONFIG.organization` (structured address) |
| Layout primitives | CSS classes in `static/css/layout.css` (`.container`, `.section`, `.grid`, `.stack`, `.cluster`) | — |
| UI macros | `macros/ui.html` | `section_heading`, `category_badge`, `meta_line`, `hero_image_url`, `btn`, `card`, `nav_aria_current` |
| BlogHero | `partials/blog_hero.html` | `HUB_SECTIONS.hero` (copy, images, `cta_primary` / `cta_secondary`); header Plans CTA stays `SITE_CONFIG.cta` |
| FeaturedArticle | `partials/featured_article.html` | Pelican article with `featured: true` |
| StartHereCards | `partials/start_here_cards.html` | `HUB_SECTIONS.start_here` |
| TopicClusterGrid | `partials/topic_cluster_grid.html` | `CATEGORIES` |
| EcosystemSpoke | `partials/ecosystem_spoke.html` | `ECOSYSTEM` (`data/ecosystem.yaml`) |
| TemplateDownloadSection | `partials/template_download.html` | `HUB_SECTIONS.templates` |
| ArticleCard | `partials/article_card.html` | Article object |
| NewsletterCTA | `partials/newsletter_cta.html` | `HUB_SECTIONS.newsletter` |
| ArticleHeader | `partials/article_header.html` | `article`, `article.hero_image`, optional `article.hero_caption` |
| ArticleLead | `partials/article_lead.html` | `article.summary` |
| Article hero image | `content/images/articles/{slug}/hero.png` | `data/illustrations.yaml` + `scripts/sync_illustrations.py` |
| Hub hero / ecosystem art | `blog_hero.html`, `ecosystem_spoke.html` | Split hero: copy + CTAs left, diagram right (`hero__grid`); `images/hub/hero.png` from `data/01_illustrations/h1.png`; `ECOSYSTEM.image` |
| KeyTakeawayBox | `partials/key_takeaway.html` | `article.key_takeaway` |
| Breadcrumb | `partials/breadcrumb.html` | `article`, `article.category` (renders Home › Category › Title) |
| TableOfContents | `partials/toc.html` + `toc-active.js` | Article headings (JS scan); `<details class="toc-collapsible">` on mobile |
| ReadingProgress | `partials/reading_progress.html` + `reading-progress.js` | Article pages only |
| ArticleCTA | `partials/article_cta.html` | `HUB_SECTIONS.article_cta` + `SITE_CONFIG.hub.training_url`; dark band, gold primary button |
| RelatedArticles | `partials/related_articles.html` | Same category, exclude current |
| FAQBlock | `partials/faq.html` | `article.faq` metadata |
| AuthorBio | `partials/author_bio.html` | `SITE_CONFIG.author` (avatar block hidden when `author.avatar` unset) |
| Schema Article | `partials/schema_article.html` | `article` |
| Schema Breadcrumb | `partials/schema_breadcrumb.html` | Page context |

## Page templates

| Page | Template | Sections |
|------|----------|----------|
| Hub home | `index.html` | Header → Hero → Featured → Start Here → Topics → Templates → Latest → Ecosystem → Newsletter → Footer |
| Article | `article.html` | Progress → Breadcrumb → Header → Lead → Takeaway → Prose (+ TOC) → [FAQ if featured] → ArticleCTA → Related → Author → [FAQ if not featured] |
| Static page | `page.html` | Header → Page title → Prose |
| Category | `category.html` | Header → Title → ArticleCard grid |
| Design system (style guide) | `design_system.html` + `partials/style_guide.html` | Static page `content/pages/design-system.md` |
