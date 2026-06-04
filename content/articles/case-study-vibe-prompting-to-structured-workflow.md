---
authors: Prompt Anatomy
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/case-study-vibe-prompting-to-structured-workflow/hero.png
hero_caption: "Support queue before/after — one owned workflow with eval gates beat scattered copilot experiments."
key_takeaway: A single owned workflow with eval gates beat a year of scattered copilot experiments.
reading_time: 4 min read
slug: case-study-vibe-prompting-to-structured-workflow
status: published
summary: How Northline B2B moved from ad hoc chat to a measured support-assist workflow in twelve weeks—with eval set and context pack versioning.
title: 'Case Study: From Vibe Prompting to a Structured Support Workflow'
---

*Anonymized composite (Northline B2B)—multiple implementations.*

## Situation

A 120-person B2B company had copilots in support, sales, and marketing. Leadership saw activity metrics rise; CSAT flatlined. Support leads spent evenings fixing AI replies. The team scored **8 of 10** on the [vibe prompting diagnostic](/articles/10-signs-your-company-is-vibe-prompting/).

## Approach

1. Paused new tool trials for 90 days.
2. Selected **one workflow**: `support-reply-v3` — suggested replies on tier-2 tickets.
3. Built context from 40 KB articles tagged `customer-safe`; policy pack `support-policy-2026-04`.
4. Added checker step for unsupported claims.
5. Required human send; logged overrides per [audit trail](/articles/audit-trails-for-ai-workflows/) spec.

## Eval set and context versioning

- **Eval set:** 25 held-out tickets with known-good replies; fail on policy violation, wrong product fact, or missing VIP escalation.
- **Smoke gate:** 10/10 pass before pilot traffic.
- **Context pack:** KB tags + policy version logged on every run; Legal owns pack bumps—see [context architecture](/articles/what-is-context-architecture/).

Governance RACI in [roles guide](/articles/ai-governance-roles-and-ownership/); monthly [risk forum](/articles/ai-risk-review-cadence/) tracked promotion from 50% to 80% queue coverage.

## Results (ranges)

| Metric | Before (8 wk avg) | After (12 wk pilot) |
|--------|-------------------|---------------------|
| Median handle time | baseline | ~18% lower |
| CSAT on assisted queue | flat | +6–9 pts |
| Escalations from wrong policy | frequent | down sharply |
| Reproducibility across agents | low | high on eval set |

## Lessons

- Diagnostics focused the team on one process instead of debating tools.
- Model changes mattered less than context and eval discipline.
- Leadership protected the pilot from scope creep for ninety days.
- Eval before prompt tuning would have saved two weeks of rework.

## What they would do differently

Start with eval cases before writing prompts. Involve support leads in context tagging week one, not week six. Publish a simple change log when context packs update.

## Next step for readers

If your team mirrors this story—strong activity, weak reproducibility—run the diagnostic, pick one queue, and fill the [workflow canvas](/articles/ai-workflow-canvas-template/) before the next vendor demo.
