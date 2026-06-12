---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-04-24
hero_caption: Copy-paste change log — prompt, context, model, and tool rows with owners
  and rollback pins.
hero_image: images/articles/ai-change-log-template-prompt-context-and-model-updates/hero.png
key_takeaway: Log every prompt, context pack, model, and tool change with owner, eval evidence,
  and rollback pin—before production traffic moves.
reading_time: 4 min read
slug: ai-change-log-template-prompt-context-and-model-updates
status: published
summary: Copy-paste AI change log for prompt, context pack, model, and tool updates—with
  owner, eval evidence, and rollback registry pin.
tags:
- templates
- prompt-systems
- governance
- change-management
title: AI Change Log Template
---

Copy this change log into your wiki, registry repo, or ticket system. Complete a row **before** promoting any change to production traffic—not after a controller or customer reports drift. Silent upgrades destroy trust faster than model quality debates.

The template complements the [prompt registry playbook](/articles/prompt-registry-playbook/) and [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/). Pair it with the [workflow eval checklist](/articles/ai-workflow-eval-checklist/) so every change cites eval evidence. Northline finance adopted this after support learned the hard way—see [finance workflow case study](/articles/finance-workflow-case-study-controlled-draft-and-review/).

## When to log a change

Log a row when any of these change for a production workflow:

- **Prompt** text, system instructions, or output schema
- **Context pack** — KB corpus, policy PDF, retrieval tier, or extract hash
- **Model** — provider, model ID, temperature, or max tokens
- **Tools** — MCP server, API integration, or allow/deny matrix row

Do **not** log typo fixes in internal docs with zero production effect. Do log anything that could change customer-facing or controller-facing output.

## Change log table (copy-paste)

| Date | Workflow ID | Change type | From → To | Owner | Eval evidence | Rollback pin | Approved by |
|------|-------------|-------------|-----------|-------|---------------|--------------|-------------|
| YYYY-MM-DD | support-reply-v3 | Prompt | v2.1 → v2.2 | Process owner | smoke 10/10 pass | registry:v2.1 | Risk forum |
| YYYY-MM-DD | support-reply-v3 | Context | policy-2026-03 → 2026-04 | Legal + IT | pilot 25-case re-run | context:2026-03 | Process owner |
| YYYY-MM-DD | finance-variance-v1 | Model | gpt-4o → gpt-4.1 | IT | smoke 10/10 pass | model:gpt-4o-2026-03 | Controller |

**Change type** values: `Prompt` | `Context` | `Model` | `Tool` | `Eval set`

**Rollback pin** must be restorable in under thirty minutes—test quarterly per [audit trails](/articles/audit-trails-for-ai-workflows/) scale gate.

## Required fields per change type

### Prompt changes

- Registry row ID and semver bump
- Diff summary (what behavior should change)
- Smoke eval link (minimum ten cases, one hundred percent pass)
- Shadow traffic plan if pilot already live

### Context pack changes

- Corpus version ID or extract hash (before → after)
- Legal or data owner sign-off for customer-safe tags
- Re-run eval set ID and pass rate
- Note retrieval tier if RAG workflow—see [RAG in production](/articles/rag-in-production/)

### Model changes

- Provider, model ID, parameter delta
- Cost/latency note if sponsor cares—CLEAR **Cost** and **Latency** from [evaluating agents with CLEAR](/articles/evaluating-agents-with-clear/)
- Regression eval on held-out set; no "same prompt, new model" without cases

### Tool changes

- MCP server or API endpoint (before → after)
- Allow/deny matrix row updated per [securing MCP and agent tools](/articles/securing-mcp-agent-tools/)
- Sanitization rule version if tool returns enter prompt

## Sample entry (Northline support)

```yaml
date: 2026-03-14
workflow_id: support-reply-v3
change_type: Context
from: policy_pack support-policy-2026-02
to: policy_pack support-policy-2026-03
owner: Legal (A. Chen) + Support ops (M. Ortiz)
eval_evidence: eval-set-support-v3-2026-03 — 25/25 pass
rollback_pin: registry:context/support-policy-2026-02
approved_by: Monthly risk forum vote 2026-03-12
notes: Refund window language updated; KB articles 12, 44 re-tagged customer-safe
```

## Rollback drill (quarterly)

| # | Check | Pass? |
|---|-------|-------|
| 1 | Rollback pin restores prior registry row in <30 min | ☐ |
| 2 | Smoke eval passes on rolled-back pin | ☐ |
| 3 | Audit sample shows correct version after rollback | ☐ |
| 4 | Change log row marked `ROLLED BACK` with incident link | ☐ |

## Anti-patterns

- **Slack-only announcements** — not searchable, not audit-friendly
- **"Same as last month"** — extract hashes drift; log anyway
- **Promote on demo quality** — eval evidence column empty
- **Shared doc without owner** — every row needs a named approver

## Next step

Add this table to your registry repo README. Require a completed row in your release checklist before IT promotes staging to production. Governance cadence: [AI risk review cadence](/articles/ai-risk-review-cadence/).
