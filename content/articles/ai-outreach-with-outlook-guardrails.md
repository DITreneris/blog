---
authors: Prompt Anatomy
body_locked: true
category: AI Agents
content_tier: playbook
date: 2024-12-31
hero_caption: Outlook draft-and-review flow — shared mailbox, human send, rate caps,
  and approved snippets only.
hero_image: images/articles/ai-outreach-with-outlook-guardrails/hero.png
key_takeaway: Outreach AI belongs in draft-and-review mode with caps, opt-out respect,
  and brand-approved snippets.
reading_time: 6 min read
slug: ai-outreach-with-outlook-guardrails
status: published
summary: Draft outreach in Microsoft Outlook with shared-mailbox workflow, rate limits,
  DLP triggers, and human send—no autonomous bulk email.
tags:
- agents
- governance
title: AI Outreach with Outlook Guardrails
---

Sales outreach plus AI tempts teams to automate sends. In Microsoft Outlook, that path leads quickly to deliverability damage, compliance complaints, and reps who no longer trust the draft. **Guardrails first** protect brand, inboxes, and auditability—then you measure whether AI saves editing time, not how many messages left the building without a human.

This playbook describes a **draft-and-review** pattern: AI writes into Outlook drafts; humans send. CRM holds segments and outcomes; Outlook is the send surface—not an autonomous mailbot. Connect logging to [audit trails](/articles/audit-trails-for-ai-workflows/), caps to [data boundaries](/articles/data-boundaries-for-ai-agents/) thinking, and policy language to [governance roles](/articles/ai-governance-roles-and-ownership/) so Rev Ops and Legal share ownership.

## Outlook workflow (v1) — draft, never auto-send

Design v1 assuming every external message has a rep's name on it and a send click in Outlook. Automation that drops messages into Outbox or schedules bulk send without review is out of scope until eval, DLP, and legal sign-off exist for a narrower template set.

**Segment in CRM first.** Reps select an approved list; suppression and opt-out flags apply before any connector runs. Export includes segment ID and policy class (marketing vs transactional) so DLP rules match message type.

**Draft folder only.** Copilot or a connected workflow creates drafts in the rep's `Drafts` folder or a shared `AI-Drafts` mail folder—never Outbox, never scheduled send rules to external domains in v1.

**Snippet injection from approved library.** Personalization pulls only from versioned fact blocks: customer name, public news cite ID, product tier from CRM. Prompts must reference `snippet_id` per factual claim—no invented awards, no fabricated "saw your post about X" without citation.

**Rep review and manual send.** Edit subject and body; confirm opt-out footer; send from Outlook with rep credentials. CRM sync records draft ID, send timestamp, override percent if body changed materially.

**Numbered path for reps:** Open CRM task → generate drafts in Outlook → review each for subject, footer, citations → send or discard → CRM logs outcome. Training should show the path once; guardrails live in connector config, not memory.

## Guardrails table (controls and owners)

| Control | Outlook / ops setting | Purpose |
|---------|----------------------|---------|
| Human send only | No auto-forward rules to external domains | Accountability |
| Daily send cap | 40 drafts generated / 25 sends per rep | Deliverability |
| Approved snippet library | SharePoint list `Outreach-Snippets-v3` | Consistent claims |
| Opt-out / suppression | CRM export filter + DLP keyword scan | Compliance |
| No fabricated references | Prompt requires citation ID per fact | Trust |
| BCC policy | Block BCC on external bulk; use CRM logging | Privacy |

Rev Ops owns caps and snippet versions; IT implements connector and DLP; Legal owns prohibited claims list. RACI should mirror [governance roles](/articles/ai-governance-roles-and-ownership/) even if workflow ID is `outreach-outlook-v1`, not support.

## Rate caps and escalation

Caps prevent "AI productivity" from becoming ISP throttling. Adjust tiers by role; log when caps hit three days running—that signals bad drafts or bad lists, not lazy reps.

| Tier | Daily draft cap | Daily send cap | Escalation |
|------|-----------------|----------------|------------|
| SDR | 40 | 25 | Manager if cap hit 3 days running |
| AE | 25 | 15 | Rev ops review |
| Shared mailbox | 100 total | N/A — no direct external send | IT alert |

If DLP flags a draft (export-control keyword, missing opt-out), route to **Legal queue folder**; block send until cleared. SLA 24 hours for flagged drafts; decision logged in CRM case note with reviewer ID.

## DLP and compliance triggers

Configure Microsoft Purview (or equivalent) to **hold** drafts when marketing class mail lacks unsubscribe block, when body matches prohibited superlatives from legal list, or when attachment types are not allow-listed. Holds are not suggestions—connector must prevent send until status cleared.

Pair DLP with eval cases: missing footer, prohibited phrase, missing citation ID. See [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) for promotion gates before expanding template coverage.

## Logging compatible with audit trails

Each send produces a row aligned with [audit trails](/articles/audit-trails-for-ai-workflows/): `workflow_id` `outreach-outlook-v1`, draft and sent timestamps, `rep_id`, `snippet_ids[]`, `override_percent`, `suppression_check` pass/fail. Without override percent, you cannot see whether AI helped or reps rewrote entirely.

## Operating outreach AI in practice

Measure reply quality and unsubscribe rate, not drafts generated. High generation with low send rate means poor drafts; high send with high unsubscribe means weak suppression or off-brand snippets.

**Subject lines:** ≤60 characters; ban ALL CAPS; A/B only through approved template pairs in library version bumps.

**Shared mailbox:** Inbound replies only in v1—outbound bulk from shared addresses confuses threading and SPF alignment.

**Monday start:** Disable auto-send rules on outreach connectors. Publish snippet library with version ID. Set per-rep caps. Run five test drafts through DLP and Legal before pilot.

Outreach AI in Outlook works when it accelerates **editing**, not **sending**.