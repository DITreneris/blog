---
name: add-article
description: Add or substantially edit a Prompt Anatomy blog article. Use when creating a new post, publishing an article, or editing content/articles/*.md per EDITORIAL_PLAN backlog and CONTENT_STANDARDS.
---

# Add Article

Workflow for new or edited articles on **promptanatomy.blog**.

## Before writing

1. Read [docs/EDITORIAL_PLAN.md](../../docs/EDITORIAL_PLAN.md) §5 — prefer next **P1/P2** backlog item unless the user specifies otherwise.
2. Confirm **category** and **`content_tier`** per EDITORIAL_PLAN §3.
3. Add **`tags`** from [data/editorial_clusters.yaml](../../data/editorial_clusters.yaml) `recommended_tags`.

## Scaffold

```bash
python scripts/new_post.py --title "..." --category "Framework"
```

Or copy an existing article stub. Never hardcode articles in templates.

## Body checklist

Follow [docs/CONTENT_STANDARDS.md](../../docs/CONTENT_STANDARDS.md):

1. Outcome-led intro
2. Framework, steps, or checklist
3. One concrete example (Northline B2B composite OK for playbooks)
4. Risks/guardrails where relevant
5. **2–4 in-body** internal links (no standalone `## Related reading`)
6. Hub-and-spoke links per [data/editorial_clusters.yaml](../../data/editorial_clusters.yaml) if the post is a spoke primer

Set `body_locked: true` after manual edits.

## After writing

1. Update [data/categories.yaml](../../data/categories.yaml) `reading_path` if the post belongs in a curated series.
2. Satori/hero: `npm run build:satori` and `make sync-images` when adding manifest rows.
3. Validate:

```bash
make validate && make serve
```

Open http://localhost:8000 and check the article URL.

## Done when

[docs/definition_of_done_system.md](../../docs/definition_of_done_system.md) row **Add / edit article** — `make validate` exit 0; CONTENT_STANDARDS publish checklist if `status: published`.

## Delegation

- Editorial audit / plan refresh → **editorial-agent**
- CHANGELOG → **q-and-a-agent** (leave bullet list if shipping a backlog item)
