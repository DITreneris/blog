# Prompt Anatomy Blog — Agent Instructions

## Mission

Build and maintain a lean Python (Pelican) static knowledge hub for **https://promptanatomy.blog** — an AI consulting / training brand. Premium, calm, methodological—not a hype magazine or generic article archive.

## Non-negotiables

- Content lives in `content/` as Markdown; never hardcode articles in templates.
- Run `make validate && make build` before claiming done.
- Match design tokens in `docs/DESIGN_SYSTEM.md` and `theme/promptanatomy/static/css/tokens.css`.
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

Optional: `date_modified`, `reading_time`, `featured`, `key_takeaway`, `tags`, `hero_image` (path under `content/`, e.g. `images/articles/{slug}/hero.png`)

Illustration masters live in `data/01_illustrations/`; manifest in `data/illustrations.yaml`. Sync heroes with `make sync-images`.

Categories: Prompt Systems | AI Agents | AI Governance | Implementation Notes | Case Studies | Templates | Opinion | Framework

## Agent workflows

### Add a post

1. Run `python scripts/new_post.py --title "..." --category "Framework"` (if script exists) or copy stub template
2. Edit `content/articles/<slug>.md`
3. `make validate && make serve` — check http://localhost:8000
4. Do not commit secrets or `.env`

### Change theme

- Edit only under `theme/promptanatomy/`
- Use CSS variables from `tokens.css`; no inline brand hex in templates
- Preserve semantic HTML: `header`, `nav`, `main`, `article`, `footer`
- Update `docs/COMPONENT_MAP.md` if adding/removing partials

### Deploy

- Push to `main` → Vercel builds automatically
- Never set production SITEURL in `pelicanconf.py`; use `publishconf.py` only
- After meaningful changes, ensure `CHANGELOG.md` is updated (see **q-and-a-agent**)

## Content quality

- `docs/CONTENT_STANDARDS.md` — voice, publish checklist, draft policy
- Set `body_locked: true` after manual edits so `enrich_articles_from_manifest.py` does not overwrite body copy

## References

- `docs/ARCHITECTURE.md` — build pipeline, URLs
- `docs/DESIGN_SYSTEM.md` — tokens, typography, motion
- `docs/COMPONENT_MAP.md` — brief → Jinja partial mapping
- `docs/DEPLOY.md` — GitHub → Vercel → domain
- `CHANGELOG.md` — release notes ([q-and-a-agent](.cursor/agents/q-and-a-agent.md) maintains)

## Agent roles

| Task | Agent | When |
|------|-------|------|
| Questions, docs, **CHANGELOG** | `q-and-a-agent` | Explain how things work; update `CHANGELOG.md` after meaningful changes |
| Theme / Pelican implementation | default agent | Templates, CSS, `data/*.yaml`, content |

Agent definition: `.cursor/agents/q-and-a-agent.md`

## Out of scope unless user asks

- Comments (Giscus), full-text search, newsletter backend, i18n, CMS, React/Next migration
