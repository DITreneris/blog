---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-05-28
hero_image: images/articles/ai-workflow-canvas-template/hero.png
hero_caption: "Copy-paste template — fill the canvas before selecting tools or writing prompts."
key_takeaway: Fill the canvas before selecting tools or writing prompts—gaps here become incidents later.
reading_time: 3 min read
slug: ai-workflow-canvas-template
status: published
summary: A one-page canvas to define outcome, steps, context, gates, eval, and ownership before you build.
title: AI Workflow Canvas (Template)
---

Copy this canvas into your wiki or ticket. Complete it with process owner + IT before pilot launch.

## Minimum workflow elements

Before you fill the full canvas, confirm five elements exist. Predictable AI outputs come from **repeatable workflows**, not luck with phrasing.

1. **Trigger** — what starts the run (ticket opened, form submitted).
2. **Steps** — including where the model runs vs where humans act.
3. **Context sources** — allow list only.
4. **Review gate** — who can send to customers or systems of record.
5. **Metric** — one primary business measure.

If any element is blank, pause tool selection until it is named. See [What Is Context Architecture](/articles/what-is-context-architecture/) for context design and [Evaluation Hooks](/articles/evaluation-hooks-for-ai-workflows/) for test gates.

## AI workflow canvas

| Section | Your answer |
|---------|-------------|
| **Workflow name** | |
| **Business outcome (1 sentence)** | |
| **Primary metric** | |
| **Process owner** | |
| **Executive sponsor** | |
| **Trigger** | |
| **Steps (human / model / both)** | 1. … 2. … 3. … |
| **Allowed context sources** | |
| **Denied data** | |
| **Human review gate** | Who? When? |
| **Eval cases (count)** | |
| **Pass threshold** | |
| **Audit log location** | |
| **Target pilot end date** | |

## Filled example: support-reply-v3

| Section | Example answer |
|---------|----------------|
| **Workflow name** | support-reply-v3 |
| **Business outcome (1 sentence)** | Suggest compliant tier-2 replies faster without increasing escalations |
| **Primary metric** | Median handle time on assisted queue; CSAT on assisted tickets |
| **Process owner** | Support ops lead |
| **Executive sponsor** | VP Customer Success |
| **Trigger** | Tier-2 ticket status → "awaiting agent" |
| **Steps** | 1. Pull last 5 messages + KB 2. Model drafts reply 3. Checker flags unsupported claims 4. Agent edits 5. Agent sends |
| **Allowed context sources** | 40 KB articles tagged `customer-safe`; ticket thread |
| **Denied data** | HR records; unreleased roadmap; other customers' tickets |
| **Human review gate** | Agent must send; no auto-send in v1 |
| **Eval cases (count)** | 25 held-out tickets |
| **Pass threshold** | ≥92% pass; 0 policy violations on eval set |
| **Audit log location** | CRM case note + workflow log index |
| **Target pilot end date** | 12 weeks from kickoff |

## Release checklist

- [ ] Context spec reviewed ([architecture guide](/articles/what-is-context-architecture/))
- [ ] Boundaries documented ([data boundaries](/articles/data-boundaries-for-ai-agents/))
- [ ] Eval smoke passed
- [ ] Risk forum aware ([cadence](/articles/ai-risk-review-cadence/))

## Tips

- Revisit the canvas when you change models, connectors, or policy packs.
- Store completed canvases next to eval results so reviewers see intent and evidence together.
- One canvas per workflow—avoid mega-documents that mix unrelated processes.

For hands-on exercises, use [training on promptanatomy.app](https://www.promptanatomy.app/) after the canvas is complete.
