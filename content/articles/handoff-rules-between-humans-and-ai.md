---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
date: 2026-05-28
hero_image: images/articles/handoff-rules-between-humans-and-ai/hero.png
key_takeaway: Handoffs need triggers, owners, and SLAs—same as human-to-human process design.
reading_time: 1 min read
slug: handoff-rules-between-humans-and-ai
status: published
summary: Define when AI drafts, when humans decide, and when work returns to the queue—with SLAs and evidence.
title: Handoff Rules Between Humans and AI
---

Blurry handoffs create silent risk: the model assumed someone would check; the human assumed the model was sure.

## Handoff table (template)

| Trigger | AI stops | Human action | SLA |
|---------|----------|--------------|-----|
| Low confidence | Draft only | Review all fields | 4h business |
| Policy keyword | No send | Legal review | 1 business day |
| Customer tier A | Suggest | Account owner approves | 2h |
| Eval failure on deploy | Block release | Owner + IT | Immediate |

## Evidence

Log handoff reason in the same store as [audit trails](/articles/audit-trails-for-ai-workflows/).

- [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/)
