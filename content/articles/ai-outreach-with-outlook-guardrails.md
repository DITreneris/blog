---
authors: Prompt Anatomy
body_locked: true
category: AI Agents
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/ai-outreach-with-outlook-guardrails/hero.png
hero_caption: "Outlook draft-and-review flow — shared mailbox, human send, rate caps, and approved snippets only."
key_takeaway: Outreach AI belongs in draft-and-review mode with caps, opt-out respect, and brand-approved snippets.
reading_time: 4 min read
slug: ai-outreach-with-outlook-guardrails
status: published
summary: Draft outreach in Microsoft Outlook with shared-mailbox workflow, rate limits, DLP triggers, and human send—no autonomous bulk email.
title: AI Outreach with Outlook Guardrails
---

Sales outreach plus AI tempts teams to automate sends. In Microsoft Outlook, that path leads quickly to deliverability damage, compliance complaints, and reps who no longer trust the draft. **Guardrails first** protect brand, inboxes, and auditability.

This playbook describes a **draft-and-review** pattern: AI writes into Outlook drafts; humans send. It assumes CRM holds segments and outcomes; Outlook is the send surface—not an autonomous mailbot.

## Outlook workflow (v1)

1. **Segment in CRM** — rep selects an approved list; suppression and opt-out flags applied before export.
2. **Draft folder** — Copilot or connected workflow creates drafts in the rep's `Drafts` folder (or a shared `AI-Drafts` mail folder), never Outbox.
3. **Snippet injection** — personalization pulls only from approved fact blocks (customer name, public news, product tier)—not invented references.
4. **Rep review** — edit subject and body; confirm BCC policy; send manually from Outlook.
5. **Log outcome** — activity synced to CRM with draft ID, send timestamp, and override flag if body changed >30%.

**Numbered UI path for reps:**

1. Open CRM task "Outreach batch — Q2 manufacturing."
2. Click "Generate drafts in Outlook" (connector creates N drafts).
3. Review draft 1: subject line, opt-out footer, snippet citations.
4. Send or discard; repeat; CRM records result.

No rules that auto-send on schedule in v1. No "send on behalf" without explicit rep action.

## Guardrails

| Control | Outlook / ops setting | Purpose |
|---------|----------------------|---------|
| Human send only | No auto-forward rules to external domains | Accountability |
| Daily send cap | 40 drafts generated / 25 sends per rep | Deliverability |
| Approved snippet library | SharePoint list `Outreach-Snippets-v3` | Consistent claims |
| Opt-out / suppression | CRM export filter + DLP keyword scan | Compliance |
| No fabricated references | Prompt requires citation ID per fact | Trust |
| BCC policy | Block BCC on external bulk; use CRM logging instead | Privacy |

## Rate caps and escalation

| Tier | Daily draft cap | Daily send cap | Escalation |
|------|-----------------|----------------|------------|
| SDR | 40 | 25 | Manager if cap hit 3 days running |
| AE | 25 | 15 | Rev ops review |
| Shared mailbox | 100 total | N/A — no direct external send | IT alert |

If DLP flags a draft (export control keyword, missing opt-out), route to **Legal queue folder**; do not allow send until cleared.

## DLP and compliance triggers

Configure Microsoft Purview (or equivalent) to hold drafts when:

- Missing unsubscribe block on marketing class mail.
- Prohibited superlatives from legal list ("guaranteed ROI," etc.).
- Attachment types not on allow list.

Human review SLA: 24 hours for flagged drafts. Log decision in CRM case note.

## Logging (link to audit trails)

Each send should produce a log row compatible with [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/):

- `workflow_id`: `outreach-outlook-v1`
- `draft_created_at`, `sent_at`, `rep_id`
- `snippet_ids[]`, `override_percent`
- `suppression_check`: pass/fail

## Tips

- **Subject lines:** Require ≤60 characters; ban ALL CAPS; A/B only through approved template pairs.
- **BCC:** Disable on external bulk; managers see metrics in CRM, not hidden copies.
- **Shared mailbox:** Use for inbound replies only in v1; do not send outbound bulk from shared address—it confuses threading and SPF alignment.

Measure reply quality and override rate, not emails generated. High generation with low send rate signals bad drafts; high send with high unsubscribe signals weak suppression.

## What to do Monday

1. Turn off any auto-send rules on outreach connectors.
2. Publish approved snippet library with version ID.
3. Set per-rep caps in connector config.
4. Run five test drafts through DLP and legal review before pilot.

Outreach AI in Outlook works when it accelerates **editing**, not **sending**.
