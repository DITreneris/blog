---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-04-18
modified: 2026-07-25
faq:
  - question: How is this different from the AI Workflow Canvas?
    answer: The workflow canvas defines the operating page—outcome, steps, gates, and owners. This six-block canvas defines how you write one prompt artifact. Fill the workflow canvas first for the process; use this canvas when drafting or revising the prompt text itself.
  - question: Does filling this canvas replace training certificates on promptanatomy.app?
    answer: No. A filled canvas is a wiki artifact. Practice certificates prove drills inside training. Production still needs a registry ID, eval cases, and owners on your systems.
  - question: Do we need a Prompt ID and owner before production?
    answer: Yes. Fill Meta through Advanced first, then attach a Prompt ID, owner, and eval cases before you pin. Blank Quality or Input blocks are ship risk, not polish later.
hero_caption: Blank six-block prompt canvas—Meta through Advanced plus prompt ID and owner—ready to paste into a wiki.
hero_image: images/articles/six-block-canvas-template/hero.png
key_takeaway: Fill Meta through Advanced before chat experiments; attach a registry ID and eval cases before production.
slug: six-block-canvas-template
status: published
summary: Copy-paste six-block prompt canvas—blank grid plus a filled Northline support-reply example for wiki and registry drafts.
tags:
  - templates
  - prompt-systems
  - workflow-automation
title: Six-Block Prompt Canvas
---

Copy this canvas into your wiki or ticket before a chat draft becomes customer-facing language. Gaps in Meta, Input, or Quality become review failures: wrong voice, invented facts, or confident answers with no refuse rules. For why the six blocks exist, read [The Six-Block Prompt System](/articles/six-block-prompt-system/). This page is the pasteable artifact—not a playbook.

Use the [AI Workflow Canvas](/articles/ai-workflow-canvas-template/) for the operating page (outcome, steps, gates). Use **this** canvas when you are writing or revising the prompt text itself.

## How to use

1. Pick one **prompt ID** tied to a workflow (`support-reply-v3`).
2. Fill all six blocks—no blank Quality or Input constraints.
3. Attach the row to your [prompt registry](/articles/prompt-registry-playbook/) with owner and environment pin.
4. Link [eval cases](/articles/ai-workflow-eval-checklist/) before promotion to production.

A Prompt ID before chat lets reviewers reject by named block and attach the row to the registry later—without hunting an unlabeled paste. Treat the canvas as a draft. Update when policy, sources, or Output shape change—not when chat rewrites the wording.

## Six-block canvas (blank)

| Field | Your answer |
|-------|-------------|
| **Prompt ID** | |
| **Owner** | |
| **Workflow ID** (optional) | |
| **Meta** | Role · situation · purpose |
| **Input** | Facts · sources · constraints the model may use |
| **Output** | Format · sections · length · delivery shape |
| **Reasoning** | Steps or checks before the final answer |
| **Quality** | Pass/fail criteria · what to refuse |
| **Advanced** | Settings or modes that change behavior |

Store completed canvases next to registry rows and eval results. One canvas per prompt ID—avoid mixing unrelated prompts.

## Weak vs strong fill

Weak rows look finished in chat demos and fail under review. Use this table before you pin an environment—not after a customer-facing miss.

| Signal | Weak | Strong |
|--------|------|--------|
| Meta | “Helpful assistant” | Named role, situation, and one purpose |
| Input | “Use context” | Named sources + explicit denied facts |
| Output | “Write a good reply” | Sections, length, and artifact type |
| Quality | “Be accurate” | Refuse rules and measurable pass checks |
| Advanced | Blank or “default” | Settings that matter for this task |

If more than two rows look weak, pause production pin until fixed. Weak Meta or Input is enough reason alone to hold traffic.

## Filled example: support-reply-v3 (Northline)

Use as a check—not as copy-paste values for your brand.

| Field | Example answer |
|-------|----------------|
| **Prompt ID** | support-reply-v3 |
| **Owner** | Support ops lead |
| **Workflow ID** | support-assist-tier2 |
| **Meta** | Senior support writer for Northline B2B; calm, precise; goal is a customer-ready email |
| **Input** | Ticket summary, product tier, known outage window from the status page; do not invent dates |
| **Output** | Subject line + three short paragraphs + one CTA bullet; no marketing upsell |
| **Reasoning** | Confirm tier → check status facts → draft → self-check against Quality |
| **Quality** | No invented SLAs; tier name exact; one CTA only; if facts missing, ask one clarifying question |
| **Advanced** | Prefer deterministic drafting; no web browse unless status URL is in Input |

Northline treated the filled canvas as the draft that reviewers could reject for a named block—then pinned the approved text in the registry with eval cases before traffic.

## Guardrails

- A filled canvas is **not** a training certificate and does not replace drills on [promptanatomy.app](https://www.promptanatomy.app/) when the team needs shared practice.
- Completing the canvas does **not** replace workflow IDs, RACI, or eval gates on your systems.
- Do not paste canvas text into procurement decks; cite owned metrics and pass rates.
- Plans for team practice: [promptanatomy.app/#pricing](https://www.promptanatomy.app/#pricing).

Fill the write layer here. Operate the workflow on the [AI Workflow Canvas](/articles/ai-workflow-canvas-template/). Release through the registry and eval checklist—not through an unlabeled chat win.
