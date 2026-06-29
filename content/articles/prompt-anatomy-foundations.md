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
- answer: Six ordered layers—business outcome, workflow, context architecture, model
    step, evaluation, and governance—with the model as one step inside the system,
    not the whole product.
  question: What is the Prompt Anatomy implementation stack?
- answer: Start with 10 Signs and the stack scorecard, then AI Procurement Freeze
    before new tool trials; finance teams can follow the finance workflow case study
    after the canvas template.
  question: Which article should procurement or finance leads read first?
hero_caption: Implementation stack — outcome, workflow, context, model step, evaluation,
  governance.
hero_image: images/articles/prompt-anatomy-foundations/hero.png
key_takeaway: 'Implementation stacks layers in order: outcome, workflow, context,
  model step, evaluation, governance.'
reading_time: 2 min read
slug: prompt-anatomy-foundations
status: published
summary: Implementation stack index—six layers from outcome to governance, with role-based
  paths into diagnostics, agents, eval, and procurement playbooks.
tags:
- prompt-systems
- context
- governance
- eval
- geo
title: Prompt Anatomy Foundations
---

Prompt Anatomy is a **methodology for predictable AI operations**, not a collection of clever prompts. This page routes you into the blog by job-to-be-done. If you need to know which property to use first—blog, training app, or marketing site—read the [Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/) before picking a path below.

## The stack

The stack is the reading order for implementation—not a shopping list of models and copilots. Outcome and workflow come first; the model step sits inside context, eval, and governance. Skipping layers produces demos that cannot survive audit or scale.

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

Use the table as a routing index by job-to-be-done. Pick one row, finish that playbook, then return here—foundations is a hub, not a reading assignment for every stakeholder on day one.

| If you are… | Start with |
|-------------|------------|
| Diagnosing chaos | [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) |
| Designing agents | [Agent workflow guide](/articles/how-to-design-an-ai-agent-workflow/) — path visual: [From Prompt to Agent](/articles/from-prompt-to-agent/) |
| Designing context | [Context architecture](/articles/what-is-context-architecture/) |
| Setting ownership | [Governance roles](/articles/ai-governance-roles-and-ownership/) |
| Planning a pilot | [AI Workflow Canvas](/articles/ai-workflow-canvas-template/) |
| Freezing tool spend | [AI Procurement Freeze](/articles/ai-procurement-freeze/) |
| Proving ROI | [Measuring AI Workflow ROI](/articles/measuring-ai-workflow-roi/) |
| Running eval gates | [Evaluation Hooks](/articles/evaluation-hooks-for-ai-workflows/) + [Eval Checklist](/articles/ai-workflow-eval-checklist/) |
| Picking automation | [Workflow automation selection](/articles/choosing-workflow-automation-ai-pipelines/) |

## First 30 days

Follow this sequence once—not every playbook on day one.

1. **Diagnose** with [10 Signs](/articles/10-signs-your-company-is-vibe-prompting/) and the [stack scorecard](/articles/what-your-ai-stack-reveals/).
2. **Design** one workflow on the [AI Workflow Canvas](/articles/ai-workflow-canvas-template/).
3. **Gate** changes with [Evaluation Hooks](/articles/evaluation-hooks-for-ai-workflows/) before pilot scale.
4. **Standardize** on [training at promptanatomy.app](https://www.promptanatomy.app/) when the team repeats the same steps.

For outcome framing before you buy anything, read [From Prompts to Business Outcomes](/articles/from-prompts-to-business-outcomes/).

### By persona

**Operations or enablement (diagnose first).** You need a shared vocabulary for what is broken before anyone buys another copilot. Start with [10 Signs](/articles/10-signs-your-company-is-vibe-prompting/) and the [15-minute stack scorecard](/articles/what-your-ai-stack-reveals/); use [Glossary](/articles/prompt-anatomy-glossary/) terms in steering meetings so “eval” and “workflow ID” mean the same thing to IT and the business. When tool trials are the blocker, read [AI Procurement Freeze](/articles/ai-procurement-freeze/) before the next vendor demo.

**Architecture or engineering (design the system).** Map one workflow on the [canvas](/articles/ai-workflow-canvas-template/), wire [Evaluation Hooks](/articles/evaluation-hooks-for-ai-workflows/) before connectors, then read [Grounding AI Outputs](/articles/grounding-ai-outputs/) and [RAG in Production](/articles/rag-in-production/). Agent paths: [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) and [MCP for enterprise](/articles/model-context-protocol-enterprise/). For maturity framing, see the [AI Implementation Maturity Ladder](/articles/ai-implementation-maturity-ladder/).

**Governance or risk (control change).** Pair [Governance roles](/articles/ai-governance-roles-and-ownership/) with the [Governance RACI Worksheet](/articles/governance-raci-worksheet/), [Audit trails](/articles/audit-trails-for-ai-workflows/), and [Risk review cadence](/articles/ai-risk-review-cadence/). Prompt and context changes ship through the [Prompt Registry Playbook](/articles/prompt-registry-playbook/)—not shared docs.

## Templates and proof

Templates and case studies turn methodology into artifacts auditors and sponsors can inspect. Copy them into your wiki with workflow IDs filled in—empty templates in a shared drive do not count as governance.

- **Templates** — [Eval checklist](/articles/ai-workflow-eval-checklist/), [RACI worksheet](/articles/governance-raci-worksheet/), [change log template](/articles/ai-change-log-template-prompt-context-and-model-updates/)
- **Case studies** — [Northline Part 1](/articles/case-study-vibe-prompting-to-structured-workflow/) (diagnostic arc); [finance workflow](/articles/finance-workflow-case-study-controlled-draft-and-review/) for controlled draft and review
- **Browse all** — [Templates](/topics/templates/) and [Case Studies](/topics/case-studies/)

Training and hands-on drills: [promptanatomy.app](https://www.promptanatomy.app/). Term definitions: [Glossary](/articles/prompt-anatomy-glossary/).

Framework overview article retired—this page is the single framework index.
