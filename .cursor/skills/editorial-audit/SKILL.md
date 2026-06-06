---
name: editorial-audit
description: Run editorial corpus audit — inventory, taxonomy, consistency, credibility. Use for editorial audit, quarterly refresh, orphan links, tag gaps, EDITORIAL_PLAN baseline update, or editorial status report.
---

# Editorial Audit

Corpus health workflow for **editorial-agent** and editors.

## Run audit

```bash
python scripts/audit_content_inventory.py          # stdout summary
python scripts/audit_content_inventory.py --json   # machine-readable
make audit-content                                   # writes docs/reports/editorial-status-YYYY-MM-DD.md
```

## Interpret report sections

| Section | Action |
|---------|--------|
| **Inventory** | Compare to [docs/EDITORIAL_PLAN.md](../../docs/EDITORIAL_PLAN.md) §2 baseline |
| **Taxonomy** | Flag missing `tags`, `content_tier`, broken `reading_path` slugs |
| **Consistency** | Fix orphan slugs (0 inbound); cluster hub link gaps per [data/editorial_clusters.yaml](../../data/editorial_clusters.yaml) |
| **Validity** | Resolve `validate_content.py` errors before publish |
| **Credibility** | Recommend fixes; do not auto-edit without user approval |

## Produce findings

Use the output template from [`.cursor/agents/editorial-agent.md`](../../.cursor/agents/editorial-agent.md):

```markdown
### Editorial audit (YYYY-MM-DD)
- Inventory: …
- Taxonomy: …
- Consistency: …
- Validity: …
- Credibility: …
- Recommended EDITORIAL_PLAN changes: …
- CHANGELOG handoff: …
```

## Update EDITORIAL_PLAN

When baseline shifts (every 5 published posts or quarterly):

1. Update §2 inventory table
2. Reprioritize §5 backlog (move shipped items out)
3. Keep §6 as summary + link to `data/editorial_clusters.yaml`

## Handoff

- Implementation fixes (orphans, tags, new posts) → default implementation agent + **add-article** skill
- CHANGELOG when process/baseline docs change → **q-and-a-agent**

## Phase 2 (not yet)

Popularity via manual CSV in `data/analytics/` — deferred.
