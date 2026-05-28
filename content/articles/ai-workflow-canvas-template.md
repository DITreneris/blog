---
authors: Prompt Anatomy
body_locked: true
category: Templates
date: 2026-05-28
hero_image: images/articles/ai-workflow-canvas-template/hero.png
key_takeaway: Fill the canvas before selecting tools or writing prompts—gaps here become incidents later.
reading_time: 1 min read
slug: ai-workflow-canvas-template
status: published
summary: A one-page canvas to define outcome, steps, context, gates, eval, and ownership before you build.
title: AI Workflow Canvas (Template)
---

Copy this canvas into your wiki or ticket. Complete it with process owner + IT before pilot launch.

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

## Release checklist

- [ ] Context spec reviewed ([architecture guide](/articles/what-is-context-architecture/))
- [ ] Boundaries documented ([data boundaries](/articles/data-boundaries-for-ai-agents/))
- [ ] Eval smoke passed
- [ ] Risk forum aware ([cadence](/articles/ai-risk-review-cadence/))

## Practice

Walk the canvas with [Workflow Basics](/articles/prompt-anatomy-workflow-basics/) and implement in [training](https://www.promptanatomy.app/) when you need hands-on exercises.

## Tips

- Revisit the canvas when you change models, connectors, or policy packs.
- Store completed canvases next to eval results so reviewers see intent and evidence together.
- One canvas per workflow—avoid mega-documents that mix unrelated processes.