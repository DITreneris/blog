---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/audit-trails-for-ai-workflows/hero.png
hero_caption: "Minimum log fields — inputs, context versions, outputs, overrides, and retention for accountable AI workflows."
key_takeaway: If you cannot reconstruct a case from logs, you do not have an operational workflow—only a demo.
reading_time: 4 min read
slug: audit-trails-for-ai-workflows
status: published
summary: What to log for AI-assisted workflows—with sample JSON for Northline B2B ticket 4821.
title: Audit Trails for AI Workflows
---

Audit trails turn AI from a black box into an **accountable process**. Regulators, customers, and your own teams ask: what was sent, on what basis, and who approved it?

**Northline B2B** logs every `support-reply-v3` run. This article lists minimum fields and a sample JSON row for ticket **#4821**. Cross-link [Governance Roles](/articles/ai-governance-roles-and-ownership/), [Risk Cadence](/articles/ai-risk-review-cadence/), and [Data Boundaries](/articles/data-boundaries-for-ai-agents/).

## Minimum log fields

| Field | Why it matters |
|-------|----------------|
| Workflow ID + version | Reproduce behavior after changes |
| User / service identity | Accountability |
| Input snapshot or hash | Evidence of what the model saw |
| Context sources retrieved | Explainability |
| Model + parameters | Regression when vendors update |
| Raw model output | Compare to what was sent |
| Human override flag | Prove review happened |
| Timestamp (UTC) | Ordering across systems |

Northline added `policy_pack_version` after a near-miss in [risk review](/articles/ai-risk-review-cadence/)—plan for schema evolution.

## Sample log row (ticket #4821)

```json
{
  "workflow_id": "support-reply-v3",
  "workflow_version": "1.4.2",
  "case_id": "4821",
  "timestamp_utc": "2026-05-14T15:22:08Z",
  "actor_id": "agent:jsmith",
  "model": "gpt-4.1-mini",
  "policy_pack_version": "support-policy-2026-04",
  "context_sources": ["KB-K-104", "KB-K-207", "ticket:4821:msgs:1-5"],
  "input_hash": "sha256:9f3a…",
  "raw_output": "Thank you for contacting Northline…",
  "sent_text": "Thank you for contacting Northline regarding your invoice…",
  "human_override": true,
  "override_reason": "tone_softening",
  "eval_gate": "pilot",
  "retention_class": "compliance_7y"
}
```

Reviewers used this row to confirm the agent edited before send and that policy pack version matched the active legal library.

## Retention

- Align with existing records policy—do not invent a shorter window for "AI only."
- Separate **debug logs** (verbose) from **compliance logs** (durable, immutable where possible).

Northline: compliance logs 7 years (customer contract); debug logs 30 days.

## Review cadence

- Monthly sample of high-risk cases for process owners.
- After every prompt or context pack change, spot-check 10 cases from [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/).

## Tips

- Store **hash** of inputs when full snapshot is too large—but keep retrieval IDs.
- Index logs by `workflow_id` and `case_id` for replay drills.
- Include `checker_result` when automated policy scans run pre-send.

## What to do Monday

1. Compare your logs to the nine minimum fields—list gaps.
2. Run one replay drill: reconstruct ticket #4821-style case from logs alone.
3. Add `policy_pack_version` (or equivalent) before next context change.
