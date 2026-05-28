# Component Map — Brief → Jinja

| Brief component | Template path | Data source |
|-----------------|---------------|-------------|
| Header | `partials/header.html` | `SITE_CONFIG` (from `data/site.yaml`) |
| Logo | `partials/logo.html` | `SITE_CONFIG.brand` |
| Footer | `partials/footer.html` | `SITE_CONFIG.footer`, `SITE_CONFIG.organization` |
| Container / Section / Grid / Card | `macros/layout.html` | CSS classes |
| BlogHero | `partials/blog_hero.html` | `HUB_SECTIONS` |
| FeaturedArticle | `partials/featured_article.html` | Pelican article with `featured: true` |
| StartHereCards | `partials/start_here_cards.html` | `HUB_SECTIONS.start_here` |
| TopicClusterGrid | `partials/topic_cluster_grid.html` | `CATEGORIES` |
| EcosystemSpoke | `partials/ecosystem_spoke.html` | `ECOSYSTEM` (`data/ecosystem.yaml`) |
| TemplateDownloadSection | `partials/template_download.html` | `HUB_SECTIONS.templates` |
| ArticleCard | `partials/article_card.html` | Article object |
| NewsletterCTA | `partials/newsletter_cta.html` | `HUB_SECTIONS.newsletter` |
| ArticleHeader | `partials/article_header.html` | `article`, `article.hero_image` |
| Article hero image | `content/images/articles/{slug}/hero.png` | `data/illustrations.yaml` + `scripts/sync_illustrations.py` |
| Hub hero / ecosystem art | `blog_hero.html`, `ecosystem_spoke.html` | `HUB_SECTIONS.hero.image`, `ECOSYSTEM.image` |
| KeyTakeawayBox | `partials/key_takeaway.html` | `article.key_takeaway` |
| TableOfContents | `partials/toc.html` + `toc-active.js` | Article headings (JS scan) |
| ReadingProgress | `partials/reading_progress.html` + `reading-progress.js` | Article pages only |
| RelatedArticles | `partials/related_articles.html` | Same category, exclude current |
| FAQBlock | `partials/faq.html` | `article.faq` metadata |
| AuthorBio | `partials/author_bio.html` | `SITE_CONFIG.author` |
| Schema Article | `partials/schema_article.html` | `article` |
| Schema Breadcrumb | `partials/schema_breadcrumb.html` | Page context |

## Page templates

| Page | Template | Sections |
|------|----------|----------|
| Hub home | `index.html` | Header → Hero → Featured → Start Here → Topics → Ecosystem → Templates → Latest → Newsletter → Footer |
| Article | `article.html` | Progress → Header → Takeaway → Prose (+ TOC) → Related → Author → FAQ |
| Static page | `page.html` | Header → Page title → Prose |
| Category | `category.html` | Header → Title → ArticleCard grid |
