# Content standards

Guidelines for articles on **promptanatomy.blog**. See also [AGENTS.md](../AGENTS.md) for frontmatter contract.

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
| Diagnosing chaos | Hub “Start here” articles |
| Designing workflow | Related framework / agent articles |
| Standardizing | [Training](https://www.promptanatomy.app/anatomy/) or [pricing](https://www.promptanatomy.app/#pricing) |

## Hybrid draft policy

- Keep **high-intent** URLs published while rewriting in place.
- Set `status: draft` for low-intent or merged stubs; keep slug in repo.
- Canonical merges: one live article, drafts point to it with a short note.

## Categories

| Category | Expectation |
|----------|-------------|
| Framework | Methodology, ladders, architecture |
| Implementation Notes | Diagnostics, rituals, field notes |
| Case Studies | Problem, approach, metrics (ranges OK), lessons |
| Templates | Copy-paste canvas or checklist in-page |
| AI Governance / Agents / Prompt Systems | As titled; cross-link pillars |

## Pipeline

- `make sync-images` — heroes from [data/illustrations.yaml](../data/illustrations.yaml).
- `scripts/enrich_articles_from_manifest.py` — heroes + metadata only when `body_locked` or non-boilerplate body.
- New manifest rows default to `draft` unless `replaces_stub: true` on a finished article.
