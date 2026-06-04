---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2025-06-29
hero_image: images/articles/audit-trails-for-ai-workflows/hero.png
hero_caption: "Minimum log fields — inputs, context versions, outputs, overrides, and retention for accountable AI workflows."
key_takeaway: If you cannot reconstruct a case from logs, you do not have an operational workflow—only a demo.
reading_time: 6 min read
slug: audit-trails-for-ai-workflows
status: published
summary: What to log for AI-assisted workflows—with sample JSON for Northline B2B ticket 4821.
title: Audit Trails for AI Workflows
---

Audit trails turn AI from a black box into an **accountable process**. Regulators, customers, and your own teams ask the same questions after a near-miss: what was sent, on what basis, which policy version applied, and who approved it? If answers require reconstructing someone's chat history, you have a demo—not a workflow ready for scale.

**Northline B2B** logs every `support-reply-v3` run. This article lists minimum fields, explains why each matters, provides a sample JSON row for ticket **#4821**, and connects retention and review cadence to [governance roles](/articles/ai-governance-roles-and-ownership/) and [risk review](/articles/ai-risk-review-cadence/). Prompt text in a wiki is not proof; logs with hashes and versions are. When retrieval tiers change, align logging with the pattern in [Three Types of RAG](/articles/three-types-of-rag/).

## Minimum log fields (design once, enforce in IT)

Compare your current logs to this set before buying another observability tool. Gaps here are gaps in accountability.

| Field | Why it matters |
|-------|----------------|
| Workflow ID + version | Reproduce behavior after prompt or context changes |
| User / service identity | Accountability for human vs automated actors |
| Input snapshot or hash | Evidence of what the model saw without storing excess PII |
| Context sources retrieved | Explainability when output cites or implies facts |
| Model + parameters | Regression analysis when vendors update |
| Raw model output | Compare to what was actually sent |
| Human override flag | Prove review happened before customer-facing send |
| Timestamp (UTC) | Ordering across CRM, ticket, and log systems |
| Policy / context pack version | Tie language to Legal-approved library state |

Northline added `policy_pack_version` after a near-miss discussed in [risk forum](/articles/ai-risk-review-cadence/)—plan for schema evolution in your registry, not as a one-off firefight.

Optional but valuable: `checker_result`, `eval_gate` (smoke/pilot/prod), `boundary_denied` events, `template_hash` from [structured prompt system](/articles/structured-prompt-system-blueprint/).

<figure class="prose-figure">
  <img src="/images/articles/audit-trails-for-ai-workflows/figures/ops-alert-agent.png"
       alt="Ops alert bot diagram showing required audit log fields for automated notifications"
       width="1600" height="900" loading="lazy" decoding="async" />
  <figcaption>Ops and alert bots must emit the same minimum log fields—not chat notifications alone.</figcaption>
</figure>

## Sample log row (ticket #4821)

The JSON below is representative of a governed assist run—use it in replay drills with process owners and Legal.

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

Reviewers confirmed the agent edited before send, policy pack matched active legal library, and retrieved KB IDs were customer-safe tags only—aligned with [data boundaries](/articles/data-boundaries-for-ai-agents/). Without `sent_text` vs `raw_output`, override discipline is invisible.

## Retention and storage classes

Do not invent a shorter window for "AI logs" if customer contracts require seven years for support correspondence. Align AI audit classes with existing records policy—Legal owns the mapping, IT implements immutability where required.

**Compliance logs** — durable, access-controlled, indexed by `workflow_id` and `case_id`. Northline: seven years per contract.

**Debug logs** — verbose prompts, retrieval traces; shorter TTL (e.g., thirty days). Never the only evidence for customer sends.

Separate classes prevent cost-driven deletion of evidence you will need in a dispute. Document retention in the same wiki page as the context spec in [context architecture](/articles/what-is-context-architecture/).

## Review cadence tied to logs

Logging without review is storage expense. **Monthly**, process owners sample high-risk cases—overrides, VIP flags, checker failures. **After every prompt or policy pack change**, spot-check ten cases against [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) pass artifacts.

**Replay drills** quarterly: pick a ticket ID, reconstruct from logs alone, compare to ground truth in CRM. If drill fails, forum action owns schema fix—not "train agents better."

Northline links drill results to forum minutes; failed drills block shadow traffic increases until IT closes gaps.

## Operating audit trails in practice

Store **hash** of inputs when full snapshot is too large—but keep retrieval IDs so humans can rebuild context. Index logs for common incident queries: workflow version changes on a date range, overrides by reason code, `boundary_denied` spikes.

When integrators add tools, extend schema before launch—retrofit is painful under audit pressure. Include denial events even when no model call occurred; they prove [boundaries](/articles/data-boundaries-for-ai-agents/) work.

**Monday start:** Gap-analysis workshop—nine minimum fields vs current export. One replay drill on a real or synthetic case. Add `policy_pack_version` or equivalent before the next context change ships.

If you cannot reconstruct a case from logs, pause promotion until you can. Accountability is the product—not the model summary.
