# Content standards

Guidelines for articles on **promptanatomy.blog**. See also [AGENTS.md](../AGENTS.md) for frontmatter contract and [EDITORIAL_PLAN.md](EDITORIAL_PLAN.md) for category balance, backlog priority, and hub-and-spoke linking.

## Voice

- Calm, structured, expert—implementation knowledge, not hype.
- English (`en-US`); avoid repeating geography or audience labels in every paragraph.
- Write for teams adopting AI under real operational and compliance constraints.

## Before publishing (`status: published`)

- [ ] Unique body (no enrich boilerplate: “The hero diagram summarizes…”).
- [ ] `summary` is specific (not `Field notes on …`).
- [ ] `key_takeaway` states a decision, not the title or a template line.
- [ ] `reading_time` within ~2 minutes of body word count (~200 wpm).
- [ ] All `/articles/{slug}/` links resolve.
- [ ] `hero_image` exists under `content/images/articles/{slug}/`.
- [ ] Optional: `body_locked: true` after manual edit so `enrich_articles_from_manifest.py` does not overwrite.
- [ ] Run `python scripts/validate_content.py` and `make build` (or Pelican equivalent).

## Publish dates

Assign `date` (and pillar `modified` when applicable) via [`scripts/assign_article_dates.py`](../scripts/assign_article_dates.py)—add new slugs to `PUBLICATION_ORDER`, then run the script. Do not rely on `new_post.py` defaulting to today's date. **`PUBLISH_CUTOFF`** (currently `2026-05-31`) caps published dates so nothing appears dated in the future relative to the live catalog.

## Article brief (recommended structure)

1. Outcome-led intro (problem + cost of status quo).
2. Framework, steps, or checklist with decision criteria.
3. One concrete example (anonymized composite is fine).
4. Risks or guardrails where relevant.
5. Two to four **topic-specific** internal links.
6. CTA matched to stage: next article → training/pricing on [promptanatomy.app](https://www.promptanatomy.app).

## CTA matrix

| Reader stage | CTA |
|--------------|-----|
| Homepage hero | **Start here** (`/#start-here`) + **Training** → [promptanatomy.app](https://www.promptanatomy.app/); pricing only in header **Plans** and ecosystem **Plans and access** |
| Diagnosing chaos | Hub “Start here” articles |
| Designing workflow | Related framework / agent articles |
| Standardizing | [Training](https://www.promptanatomy.app/) or [pricing](https://www.promptanatomy.app/#pricing) |

## Forbidden patterns

These patterns duplicate or conflict with template-rendered components — do not add them to article bodies.

- **No inline `## Related reading` H2 + bullet list.** The `partials/related_articles.html` template renders same-category related articles as styled cards automatically below the prose. An inline list duplicates that surface and clutters the body.
- **No bare-sentence training CTA at end of article** (e.g. `[Training](https://www.promptanatomy.app/) when you standardize…`). The `partials/article_cta.html` template renders a consistent dark-band CTA block (gold button to `SITE_CONFIG.hub.training_url`) below every article. Body CTAs read as broken design.
- **In-paragraph topic links are still required** — the "2 to 4 topic-specific internal links" rule means *links woven into body paragraphs*, not a standalone Related H2.

If body-level conversion intent is needed (e.g. for a Templates article pointing to a specific app surface), use a one-sentence link inside the relevant body section, not a trailing dangler.

## Hybrid draft policy

- Keep **high-intent** URLs published while rewriting in place.
- Set `status: draft` for low-intent or merged stubs; keep slug in repo.
- Canonical merges: one live article, drafts point to it with a short note.

## Draft disposition matrix (B.4)

Use this when a slug is thin, duplicated, or superseded. Set `body_locked: true` after editing so enrich does not overwrite.

| Disposition | When | Frontmatter | Body |
|-------------|------|-------------|------|
| **Merge redirect** | Topic fully covered by a published canonical article | `status: draft`; `summary` names canonical; optional `hero_image` | One sentence: "This article is archived…" + link to canonical |
| **Keep draft redirect** | Optional future publish or brand-specific opinion (e.g. memes-backed) | `status: draft`; pointer to best existing article | Short note + link; no publish until tier met |
| **Publish** | Unique playbook value; meets tier word mins and validator gates | `status: published`; full frontmatter | Prose-first per article brief above |
| **Kill (manifest)** | Same as merge redirect | Set `status: merged` in [`data/illustrations.yaml`](../data/illustrations.yaml) for the row | — |

**Examples (v0.6.1):** bot stubs → merge redirect to agent/governance playbooks; `prompt-anatomy-framework-overview` → foundations nav.

## Illustration-first vs caption-first (v0.7.0)

Two tracks—do not put training-slide or meme PNGs on playbooks when the headline does not match the article H1.

| Track | Hero source | Article shape |
|-------|-------------|---------------|
| **Illustration-first** | Hand PNG in `Memes/`, `Basic/`, `Governance/` (re-homed) | **Opinion** or short diagnostic; `content_tier: opinion`; body written from what the image actually says (~600+ words); `hero_caption` describes the figure, not a future playbook |
| **Caption-first** | **Satori** (`governance-raci`, `governance-audit-log`, `governance-eval-gates`, or `category-default`) | Playbooks and templates; keep existing body; `hero_caption` states the operational diagram |

**Manifest rule:** one slug per hero intent in [`data/illustrations.yaml`](../data/illustrations.yaml). When moving art off a playbook, add a new Opinion row with the original `source` path, switch the playbook row to `generator: satori`, then `npm run build:satori` and `make sync-images`.

**Do not** rewrite a RACI or audit playbook to teach unrelated poster content (e.g. “five levels of AI control”)—publish a short Opinion primer and link from the playbook intro instead.

**Merged-stub art:** when a draft redirect kept a hero PNG but the canonical article lives elsewhere, do not revive the stub URL or paste the PNG into the canonical body. Archive the master under `data/01_illustrations/`. The canonical article's hero (Satori or existing) is sufficient; publish a short Opinion primer only if the visual teaches something distinct from the hero.

## Categories

| Category | Expectation |
|----------|-------------|
| Framework | Methodology, ladders, architecture |
| Implementation Notes | Diagnostics, rituals, field notes |
| Case Studies | Problem, approach, metrics (ranges OK), lessons |
| Templates | Copy-paste canvas or checklist in-page |
| AI Governance / Agents / Prompt Systems | As titled; cross-link pillars |

## Content tiers (Release 1+)

| Tier | Rule | Min words | Structure |
|------|------|-----------|-----------|
| **Pillar** | `slug` in start-here / featured flagship | 1,200+ | Prose-first sections; `faq` in YAML frontmatter only |
| **Standard** | Default published | 600+ (target) | 2+ paragraphs per major H2 before bullets |
| **Short** | Templates, diagnostics | 150–250+ | Checklists OK (see category mins in `validate_content.py`) |
| **Nav** | `content_tier: nav` (e.g. framework index) | — | Intentional routing page; exempt from 900-word Framework minimum in `validate_content.py` |
| **Draft** | `status: draft` | — | Do not publish until tier met |

Pillar minimum (1,200 words) enforced in [`scripts/validate_content.py`](../scripts/validate_content.py) for all start-here slugs: `the-model-is-not-the-system`, `10-signs-your-company-is-vibe-prompting`, and `how-to-design-an-ai-agent-workflow` (**Release 2**, v0.2.0). Pillar articles also require `hero_caption` and at least two `faq` items in frontmatter.

**`content_tier` (optional frontmatter):** editorial signal — `pillar`, `playbook`, `template`, `opinion`, or `nav`. No template change required; use for hub curation and release checklists. **`nav`** marks a short hub/routing article (e.g. `prompt-anatomy-foundations`); validators skip the 900-word Framework minimum for that tier.

**FAQ frontmatter:** use nested YAML lists under `faq:` — Pelican reads Markdown via [`scripts/pelican_frontmatter_reader.py`](../scripts/pelican_frontmatter_reader.py) (`READERS` in `pelicanconf.py`). Do not paste FAQ Q/A into the article body.

## Reading paths by topic

Editors may curate ordered paths in [`data/categories.yaml`](../data/categories.yaml) under `reading_path` (slug list). Framework and governance paths are defined for v0.2.0; wire into category templates when ready.

## Pipeline

- `make sync-images` — heroes from [data/illustrations.yaml](../data/illustrations.yaml).
- `scripts/enrich_articles_from_manifest.py` — heroes + metadata only when `body_locked` or non-boilerplate body.
- New manifest rows default to `draft` unless `replaces_stub: true` on a finished article.
