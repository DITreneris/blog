# Prompt Anatomy Blog — Agent Instructions

## Mission

Build and maintain a lean Python (Pelican) static knowledge hub for **https://promptanatomy.blog** — an AI consulting / training brand. Premium, calm, methodological—not a hype magazine or generic article archive.

## Non-negotiables

- Content lives in `content/` as Markdown; never hardcode articles in templates.
- Run `make validate && make build` before claiming done (`make validate` includes `validate_theme_tokens.py` — no hex outside `tokens.css`).
- Match design tokens in `docs/DESIGN_SYSTEM.md` (version **1.0**) and `theme/promptanatomy/static/css/tokens.css`.
- US English only (`lang="en-US"`).
- Production URL: `https://promptanatomy.blog` (see `publishconf.py` SITEURL).
- Minimize scope: ship MWB before optional features (search, comments, newsletter API).

## MWB definition (done = all true)

- [ ] Home lists hub sections with stub data rendering correctly
- [ ] Article page: readable typography, max-width ~720px, code blocks
- [ ] About page at `/about/`
- [ ] RSS/Atom feed configured
- [ ] `scripts/validate_content.py` passes on all posts
- [ ] Vercel build succeeds; SITEURL correct in production

## Content contract (frontmatter)

Required: `title`, `slug`, `summary`, `category`, `date`, `status` (`draft` | `published`)

Optional: `modified` (Pelican's canonical key — `date_modified` is not parsed as a date), `reading_time`, `featured`, `key_takeaway`, `tags`, `hero_image` (path under `content/`, e.g. `images/articles/{slug}/hero.png`), `hero_caption` (figcaption under hero), `content_tier` (`pillar` | `playbook` | `template` | `opinion` | `nav`), `faq` (YAML list of `question` / `answer` — requires `FrontmatterMarkdownReader`, never duplicated in body)

Illustration masters live in `data/01_illustrations/`; manifest in `data/illustrations.yaml`. Sync heroes with `make sync-images`. **Satori rows** (`generator: satori`, `template`, `source: Satori/{slug}.png`) render via `npm run build:satori` before sync — see `data/og/templates/`. Author headshot source: `data/author/tomas-staniulis.jpg` (synced on `make brand-assets`).

Categories: Prompt Systems | AI Agents | AI Governance | Implementation Notes | Case Studies | Templates | Opinion | Framework

## Agent workflows

### Add a post

1. Run `python scripts/new_post.py --title "..." --category "Framework"` (if script exists) or copy stub template
2. Edit `content/articles/<slug>.md`
3. `make validate && make serve` — check http://localhost:8000
4. Do not commit secrets or `.env`

### Change theme

- Edit only under `theme/promptanatomy/`
- Define colors in `tokens.css` only; use `var(--token)` in other CSS files (`validate_theme_tokens.py` enforces this)
- Prefer UI macros in `theme/promptanatomy/templates/macros/ui.html` (`btn`, `card`, `section_heading`) for repeated patterns
- Preserve semantic HTML: `header`, `nav`, `main`, `article`, `footer`
- Follow `docs/DESIGN_SYSTEM.md` (v1.0) and run `docs/VISUAL_QA.md` before major theme releases
- Update `docs/COMPONENT_MAP.md` if adding/removing partials; ask **q-and-a-agent** to sync `DESIGN_SYSTEM.md` / `CHANGELOG.md`

### Deploy

- Push to `main` → Vercel builds automatically
- Never set production SITEURL in `pelicanconf.py`; use `publishconf.py` only
- After meaningful changes, ensure `CHANGELOG.md` is updated (see **q-and-a-agent**)

## Content quality

- `docs/CONTENT_STANDARDS.md` — voice, publish checklist, draft policy
- Set `body_locked: true` after manual edits so `enrich_articles_from_manifest.py` does not overwrite body copy

## References

- `docs/ARCHITECTURE.md` — build pipeline, URLs
- `docs/DESIGN_SYSTEM.md` — design system v1.0 (tokens, buttons, macros, DoD)
- `docs/VISUAL_QA.md` — visual and accessibility checklist before release
- `docs/COMPONENT_MAP.md` — brief → Jinja partial mapping
- `docs/DEPLOY.md` — GitHub → Vercel → domain
- `CHANGELOG.md` — release notes ([q-and-a-agent](.cursor/agents/q-and-a-agent.md) maintains)
- Live style guide (after build): `/design-system/`

## Agent roles

| Task | Agent | When |
|------|-------|------|
| Questions, **CHANGELOG**, design-system **docs** | `q-and-a-agent` | How things work; update `CHANGELOG.md`, `DESIGN_SYSTEM.md`, `COMPONENT_MAP.md`, `VISUAL_QA.md` after meaningful theme/doc changes |
| Theme / Pelican **implementation** | default agent | Templates, CSS, `data/*.yaml`, content; leave changelog/design-doc bullets for Q&A if not updating docs inline |

Agent definition: `.cursor/agents/q-and-a-agent.md`

## Out of scope unless user asks

- Comments (Giscus), full-text search, newsletter backend, i18n, CMS, React/Next migration
