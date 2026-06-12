---
authors: Prompt Anatomy
body_locked: true
category: Framework
content_tier: nav
date: 2024-01-28
faq:
- answer: Start with one business outcome and workflow, then context architecture,
    then model steps—with evaluation and governance before scaling tools.
  question: Where should a team start in the Prompt Anatomy stack?
- answer: No. It is a methodology for predictable AI operations—workflow, context,
    evaluation, and governance around the model step.
  question: Is Prompt Anatomy only about writing prompts?
hero_caption: Implementation stack — outcome, workflow, context, model step, evaluation,
  governance.
hero_image: images/articles/prompt-anatomy-foundations/hero.png
key_takeaway: 'Implementation stacks layers in order: outcome, workflow, context,
  model step, evaluation, governance.'
reading_time: 3 min read
slug: prompt-anatomy-foundations
status: published
summary: Entry point for the Prompt Anatomy stack—where to start by role and reading
  path.
tags:
- prompt-systems
- context
title: Prompt Anatomy Foundations
---

Prompt Anatomy is a **methodology for predictable AI operations**, not a collection of clever prompts. This page routes you into the blog by job-to-be-done.

## The stack

```text
Business outcome
  → Workflow (steps, owners, handoffs)
    → Context architecture (what the model may see)
      → Model step (generation where it adds leverage)
        → Evaluation (pass/fail before scale)
          → Governance (who may change what)
```
Deep dive: [The Model Is Not the System](/articles/the-model-is-not-the-system/).

## Where to go next

| If you are… | Start with |
|-------------|------------|
| Diagnosing chaos | [10 Signs of vibe prompting](/articles/10-signs-your-company-is-vibe-prompting/) |
| Designing agents | [Agent workflow guide](/articles/how-to-design-an-ai-agent-workflow/) — path visual: [From Prompt to Agent](/articles/from-prompt-to-agent/) |
| Designing context | [Context architecture](/articles/what-is-context-architecture/) |
| Setting ownership | [Governance roles](/articles/ai-governance-roles-and-ownership/) |
| Planning a pilot | [AI Workflow Canvas](/articles/ai-workflow-canvas-template/) |

### By persona

**Operations or enablement (diagnose first).** You need a shared vocabulary for what is broken before anyone buys another copilot. Start with [10 Signs](/articles/10-signs-your-company-is-vibe-prompting/) and the [15-minute stack scorecard](/articles/what-your-ai-stack-reveals/); use [Glossary](/articles/prompt-anatomy-glossary/) terms in steering meetings so “eval” and “workflow ID” mean the same thing to IT and the business.

**Architecture or engineering (design the system).** Map one workflow on the [canvas](/articles/ai-workflow-canvas-template/), then read [Grounding AI Outputs](/articles/grounding-ai-outputs/) and [RAG in Production](/articles/rag-in-production/) before adding connectors. Agent paths: [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) and [MCP for enterprise](/articles/model-context-protocol-enterprise/).

**Governance or risk (control change).** Pair [Governance roles](/articles/ai-governance-roles-and-ownership/) with [Audit trails](/articles/audit-trails-for-ai-workflows/) and [Risk review cadence](/articles/ai-risk-review-cadence/). Prompt and context changes ship through the [Prompt Registry Playbook](/articles/prompt-registry-playbook/)—not shared docs.

Training and hands-on templates: [promptanatomy.app](https://www.promptanatomy.app/). Ecosystem map: [Prompt Anatomy properties](/articles/prompt-anatomy-ecosystem-map/). Term definitions: [Glossary](/articles/prompt-anatomy-glossary/).

Framework overview article retired—this page is the single framework index.