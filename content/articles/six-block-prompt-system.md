---
authors: Prompt Anatomy
body_locked: true
category: Prompt Systems
content_tier: playbook
date: 2026-04-16
modified: 2026-07-25
faq:
  - question: Is the six-block system the same as the Prompt Anatomy implementation stack?
    answer: No. The six blocks teach how to write a structured prompt. The implementation stack on Foundations is how teams operate AI—outcome, workflow, context, model step, evaluation, and governance.
  - question: Do teams need six-block training before using free blog playbooks?
    answer: No. Read frameworks on the blog first. Use training on promptanatomy.app when the team must practice the same write-and-check loop under feedback.
  - question: When should we use six-block vs RACE or TAG?
    answer: Use six-block when the prompt needs Quality and Advanced as named contracts. Use RACE or TAG for lighter task frames—they can sit inside Meta or Output; the registry still owns production IDs and eval links.
hero_caption: Six prompt blocks—Meta, Input, Output, Reasoning, Quality, Advanced—as a worksheet for repeatable business prompts.
hero_image: images/articles/six-block-prompt-system/hero.png
key_takeaway: Use six blocks to write structured prompts; use the registry and eval gates to operate them—training drills the first, production artifacts prove the second.
slug: six-block-prompt-system
status: published
summary: The six-block prompt system—Meta, Input, Output, Reasoning, Quality, Advanced—for teams that need repeatable business prompts, not one-off chat wins.
tags:
  - prompt-systems
  - workflow-automation
  - context-engineering
title: The Six-Block Prompt System for Business Workflows
---

Unstructured chat produces drafts and inconsistent customer-facing language. Sponsors do not fund one-shots; they fund outputs that survive review, audit, and handoff. The **six-block prompt system** is how Prompt Anatomy teaches teams to *write* that structure before they argue about models or tools.

If you need the operating stack—outcome through governance—start with [Prompt Anatomy Foundations](/articles/prompt-anatomy-foundations/). If you need where reading vs practice live, see [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/). This article defines the write layer.

## The six blocks

Treat each block as a named contract, not a heading. Skip a block and you discover the gap in production review, not in the demo. Reviewers reject by missing block name—wrong voice, invented facts, or no refuse rules—instead of arguing about “tone.”

| Block | What you specify | Failure if missing |
|-------|------------------|--------------------|
| **Meta** | Role, situation, and purpose | Generic tone; wrong stakeholder voice |
| **Input** | Facts, sources, and constraints the model may use | Invented numbers; silent policy violations |
| **Output** | Format, sections, length, and delivery shape | Unusable walls of text; wrong artifact type |
| **Reasoning** | Steps or checks before the final answer | Jump-to-conclusion drafts; weak trade-offs |
| **Quality** | Pass/fail criteria and what to refuse | Confident wrong answers ship unchecked |
| **Advanced** | Tool or model settings that change behavior | Drift when temperature, tools, or modes differ |

The blocks are the anatomy of a **designed prompt artifact**. They are not a substitute for a prompt registry ID, an eval case set, or a RACI—those live in [The Prompt Registry Playbook](/articles/prompt-registry-playbook/) and governance posts.

## Northline example — support reply

Northline B2B (composite) needed a support reply that named the product tier, refused inventing SLA dates, and ended with one clear next step. A six-block draft looked like this:

- **Meta:** Senior support writer for Northline B2B; calm, precise; goal is a customer-ready email.
- **Input:** Ticket summary, product tier, known outage window from the status page; do not invent dates.
- **Output:** Subject line + three short paragraphs + one CTA bullet; no marketing upsell.
- **Reasoning:** Confirm tier → check status facts → draft → self-check against Quality.
- **Quality:** No invented SLAs; tier name exact; CTA is one action only; if facts missing, ask one clarifying question instead of guessing.
- **Advanced:** Prefer deterministic drafting; no web browse unless status URL is provided in Input.

That structure turns "write a nicer reply" into an artifact reviewers can reject for a named reason. Paste the same six fields into the [Six-Block Prompt Canvas](/articles/six-block-canvas-template/) for wiki and registry drafts. Practice loops that force fill-run-check on the same pattern live on [promptanatomy.app](https://www.promptanatomy.app/) after purchase—not as a slide deck.

## Six-block vs RACE/TAG vs registry

Teams confuse three tools. Keep their jobs separate: writing structure, lighter task frames, and production ownership are not interchangeable.

| Tool | Job | Use when |
|------|-----|----------|
| **Six-block system** | Write a complete prompt with quality and settings | Teaching structure; drills; capstone prompts |
| **RACE / TAG** | Choose a lighter frame by task shape | Communication drafts or role-action tasks—see [Prompt Frameworks for Business](/articles/prompt-frameworks-race-tag-business/) |
| **Prompt registry** | Version, own, and release production text | Live workflows with eval-linked promotion |

RACE and TAG can sit *inside* a six-block Meta/Output pair when the task is smaller. Registry rows should carry a stable ID and eval link even if the body was authored with six blocks. Do not declare a company-wide "winner" framework and skip owners.

## Where practice fits

[Shipping Prompt Anatomy](/articles/shipping-prompt-anatomy/) describes the hub: plans, checkout, and module progress on [promptanatomy.app](https://www.promptanatomy.app/). The Anatomizer on the marketing site teaches a five-part *shape*; Foundations teaches the six-layer *ops stack*; six blocks teach *writing*. Mixing those layers causes teams to buy training when they need a RACI—or to paste Anatomizer exports into production without owners.

Standardize team practice on [promptanatomy.app](https://www.promptanatomy.app/#pricing) when the same write-and-check loop is required. Keep governed workflows, eval hooks, and audit trails documented on this blog.

## Guardrails

- Completing modules or earning a practice certificate does **not** replace a workflow ID, eval gate pack, or change log on your systems.
- Do not paste training copy into procurement decks; cite pass rate, cycle time, or incident cost on owned workflows.
- Prefer one Northline-style worked example in your registry over twenty unlabeled chat wins.

Next: paste the blocks into the [Six-Block Prompt Canvas](/articles/six-block-canvas-template/). Shared drills: [promptanatomy.app/#pricing](https://www.promptanatomy.app/#pricing).
