# Prompt Anatomy Blog — Agent Instructions

## Mission

Build and maintain a lean Python (Pelican) static knowledge hub for **https://promptanatomy.blog** — an AI consulting / training brand. Premium, calm, methodological—not a hype magazine or generic article archive.

## Non-negotiables

- Content lives in `content/` as Markdown; never hardcode articles in templates.
- Run `make validate && make build` before claiming done (`make validate` includes `validate_theme_tokens.py`, `validate_brand_sync.py` — no hex outside `tokens.css` except `pygments.css`).
- Workflow-scoped gates and agent evidence format: [`docs/definition_of_done_system.md`](docs/definition_of_done_system.md). Full theme/Satori/release checklist: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) § Definition of Done (2.0).
- Match design tokens in `docs/DESIGN_SYSTEM.md` (version **2.0**) and `theme/promptanatomy/static/css/tokens.css`.
- US English only (`lang="en-US"`).
- Production URL: `https://promptanatomy.blog` (see `publishconf.py` SITEURL).
- Minimize scope: ship MWB before optional features (search, comments, newsletter API).

## MWB definition (done = all true)

- [x] Home lists hub sections with stub data rendering correctly
- [x] Article page: readable typography, max-width ~720px, code blocks
- [x] About page at `/about/`
- [x] RSS/Atom feed configured
- [x] `scripts/validate_content.py` passes on all posts
- [x] Vercel build succeeds; SITEURL correct in production

## Content contract (frontmatter)

Required: `title`, `slug`, `summary`, `category`, `date`, `status` (`draft` | `published`)

Optional: `modified` (Pelican's canonical key — `date_modified` is not parsed as a date), `reading_time`, `featured`, `key_takeaway`, `tags`, `hero_image` (path under `content/`, e.g. `images/articles/{slug}/hero.png`), `hero_caption` (figcaption under hero), `content_tier` (`pillar` | `playbook` | `template` | `opinion` | `nav`), `faq` (YAML list of `question` / `answer` — requires `FrontmatterMarkdownReader`, never duplicated in body).

Illustration masters live in `data/01_illustrations/`; manifest in `data/illustrations.yaml`. Sync heroes with `make sync-images` (PNG + WebP variants at 400/800/1600px for display; OG stays PNG). **Fonts:** self-hosted Inter via `npm run fonts:fetch` → `theme/promptanatomy/static/fonts/`; no Google Fonts at runtime. **Satori rows** (`generator: satori`, `template`, `source: Satori/{slug}.png`) render via `npm run build:satori` before sync — see `data/og/templates/` (`category-default`, `governance-raci`, `governance-audit-log`, `governance-eval-gates`, …). New CLI posts append a `category-default` Satori row by default (`--no-satori` to skip). Meme/training-slide PNGs belong on **Opinion** posts whose body matches the image—not on playbooks (`docs/CONTENT_STANDARDS.md`, v0.7.0). Rows with `usage: [hero, og]` also generate `Satori/{slug}-og.png` for social cards. **Brand colors:** edit `tokens.css` + `data/og/brand.mjs` together; run `python scripts/validate_brand_sync.py` then regen Satori if colors changed. Author headshot source: `data/author/tomas-staniulis.jpg` (synced on `make brand-assets`).

Categories: Prompt Systems | AI Agents | AI Governance | Implementation Notes | Case Studies | Templates | Opinion | Framework

## Agent workflows

### Add a post

1. Check [`docs/EDITORIAL_PLAN.md`](docs/EDITORIAL_PLAN.md) — prefer next P1/P2 backlog item; confirm category and `content_tier` per plan §3
2. Run `python scripts/new_post.py --title "..." --category "Framework"` (if script exists) or copy stub template
3. Edit `content/articles/<slug>.md`; add `tags`; wire hub-and-spoke links per plan §6–§7
4. Update `data/categories.yaml` `reading_path` when the post belongs in a curated series
5. `make validate && make serve` — check http://localhost:8000
6. Do not commit secrets or `.env`

**Done when:** [`definition_of_done_system.md`](docs/definition_of_done_system.md) row *Add / edit article* — `make validate` exit 0; [CONTENT_STANDARDS](docs/CONTENT_STANDARDS.md) if publishing; backlog item noted if shipping from [EDITORIAL_PLAN](docs/EDITORIAL_PLAN.md).

### Change theme

- Edit only under `theme/promptanatomy/`
- Define colors in `tokens.css` only; use `var(--token)` in other CSS files (`validate_theme_tokens.py` enforces this)
- Prefer UI macros in `theme/promptanatomy/templates/macros/ui.html` (`btn`, `card`, `section_heading`) for repeated patterns
- Preserve semantic HTML: `header`, `nav`, `main`, `article`, `footer`
- Follow `docs/DESIGN_SYSTEM.md` (v2.0) and run `docs/VISUAL_QA.md` before major theme releases
- Update `docs/COMPONENT_MAP.md` if adding/removing partials; ask **q-and-a-agent** to sync `DESIGN_SYSTEM.md` / `CHANGELOG.md`

**Done when:** [`definition_of_done_system.md`](docs/definition_of_done_system.md) row *Theme / CSS / templates* — DoD 2.0 §1, §4, §5 (CI); §6 if UX-visible; §9–§10 on release.

### Deploy

- Push to `main` → Vercel builds automatically
- Never set production SITEURL in `pelicanconf.py`; use `publishconf.py` only
- After meaningful changes, ensure `CHANGELOG.md` is updated (see **q-and-a-agent**)

**Done when:** [`definition_of_done_system.md`](docs/definition_of_done_system.md) row *Production release* — DoD 2.0 §8–§10; Vercel green on `main`.

## Content quality

- `docs/EDITORIAL_PLAN.md` — category balance, prioritized backlog, hub-and-spoke clusters, 30/90-day roadmap
- `docs/CONTENT_STANDARDS.md` — voice, publish checklist, draft policy
- Set `body_locked: true` after manual edits so `enrich_articles_from_manifest.py` does not overwrite body copy

## References

- `docs/AGENT_SYSTEM.md` — agent roster, skills, delegation
- `docs/EDITORIAL_PLAN.md` — content strategy, backlog, category rules, internal linking
- `docs/ARCHITECTURE.md` — build pipeline, URLs
- `docs/definition_of_done_system.md` — workflow-scoped completion gates and validator catalog
- `docs/DESIGN_SYSTEM.md` — design system v2.0 (tokens, buttons, macros, DoD); child docs in `docs/design-system/`
- `docs/VISUAL_QA.md` — visual and accessibility checklist before release
- `docs/COMPONENT_MAP.md` — brief → Jinja partial mapping
- `docs/DEPLOY.md` — GitHub → Vercel → domain
- `CHANGELOG.md` — release notes ([q-and-a-agent](.cursor/agents/q-and-a-agent.md) maintains)
- Live style guide (after build): `/design-system/`

## Agent roles

| Task | Agent | When |
|------|-------|------|
| Questions, **CHANGELOG**, design-system **docs**, **AGENT_SYSTEM** | `q-and-a-agent` | How things work; update `CHANGELOG.md`, `DESIGN_SYSTEM.md`, `COMPONENT_MAP.md`, `VISUAL_QA.md`, `AGENT_SYSTEM.md` after meaningful changes |
| **Editorial audit**, taxonomy, **EDITORIAL_PLAN** §2/§5 refresh | `editorial-agent` | Corpus health, consistency, credibility report, backlog status; run `make audit-content` |
| Theme / Pelican **implementation**, content | default agent | Templates, CSS, `data/*.yaml`, articles; use project skills below; leave CHANGELOG bullets for q-and-a |

### Project skills (`.cursor/skills/`)

| Skill | Use when |
|-------|----------|
| `add-article` | New or edited article |
| `editorial-audit` | Editorial inventory / plan refresh |
| `theme-release` | Theme, CSS, templates |
| `production-release` | Deploy, production release |

Full routing: [`docs/AGENT_SYSTEM.md`](docs/AGENT_SYSTEM.md)

Agent definitions: [`.cursor/agents/q-and-a-agent.md`](.cursor/agents/q-and-a-agent.md) · [`.cursor/agents/editorial-agent.md`](.cursor/agents/editorial-agent.md)

## Out of scope unless user asks

- Comments (Giscus), full-text search, newsletter backend, i18n, CMS, React/Next migration
