---
authors: Prompt Anatomy
body_locked: true
category: Framework
content_tier: nav
date: 2026-06-05
hero_image: images/articles/prompt-anatomy-glossary/hero.png
hero_caption: "Glossary as a routing map — Context, Eval, Agents, Governance clusters to canonical playbooks."
key_takeaway: Shared vocabulary speeds design reviews—link terms to canonical playbooks instead of redefining them in every meeting.
reading_time: 6 min read
slug: prompt-anatomy-glossary
status: published
summary: Shared definitions for core Prompt Anatomy terms, from MCP and RAG tiers to context rot, CLEAR, and prompt registry operations.
title: "Prompt Anatomy Glossary"
tags:
  - context
  - context-engineering
  - mcp
  - prompt-systems
  - geo
---

Teams lose weeks arguing over terms that sound familiar but mean different things in daily operations. This glossary gives one shared vocabulary for design reviews, governance forums, and rollout decisions. Use it as a routing page to deeper playbooks.

## A

Terms in this section cover agent design and accountable logging—the two places teams most often confuse "the model answered" with "the workflow ran."

**Agent workflow**  
A bounded process where a model can call tools, pass work across steps, and escalate to humans under explicit rules. Start with [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/).

**Audit trail**  
A replayable record of inputs, versions, actions, and approvals for each workflow run. See [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/).

## C

Context terms describe what the model may see and how quality decays when windows grow without discipline.

**CLEAR (Cost, Latency, Efficacy, Assurance, Reliability)**  
A practical evaluation lens for deciding if an AI workflow should scale. CLEAR helps prevent "fast but unsafe" launches by balancing quality and economics. See [Evaluating Agents with CLEAR](/articles/evaluating-agents-with-clear/) and [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/).

**Context architecture**  
How you structure instructions, retrieval, policy, and memory layers so the model sees the right information at the right moment. See [What Is Context Architecture](/articles/what-is-context-architecture/).

**Context rot**  
Performance decay caused by oversized or stale context: relevant facts get diluted, conflicts increase, and outputs look confident but degrade. Playbook: [Context Rot: Why Bigger Windows Make Agents Worse](/articles/context-rot-why-bigger-windows-make-agents-worse/). Nearby reading: [Context Window Myths](/articles/context-window-myths/) and [Tokens as Fuel for AI Output](/articles/tokens-as-fuel-for-ai-output/).

## D

Data boundaries are enforcement mechanisms—not prompt instructions alone.

**Data boundary**  
A formal allow/deny definition of what each workflow can read or write. Prompt instructions alone are not a boundary; connector and policy enforcement are. See [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/).

## E

Eval vocabulary separates demo quality from promotion rights.

**Eval gate**  
A release checkpoint where changes must pass predefined test criteria before promotion. Use [AI Workflow Eval Checklist](/articles/ai-workflow-eval-checklist/) for a copy-paste implementation.

## G

Governance and discovery terms show up in steering meetings and procurement decks—define them once here.

**GEO (Generative Engine Optimization)**  
Content strategy for visibility in AI-generated answers (citations and synthesized responses), not only traditional search ranking. For implementation context, see the decision-oriented framing in [From Prompts to Business Outcomes](/articles/from-prompts-to-business-outcomes/).

**Governance RACI**  
Role mapping for who is responsible, accountable, consulted, and informed for workflow launches, changes, and incidents. Core guide: [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/). Template: [Governance RACI Worksheet](/articles/governance-raci-worksheet/).

## H

Handoff terms matter when work crosses agents or humans under time pressure.

**Handoff contract**  
A structured payload that explains what one agent passes to another, under which conditions, and with which expected output format. See [Multi-Agent Handoff Pattern](/articles/multi-agent-handoff-pattern/).

**Human send gate**  
A required human approval before customer-facing or system-of-record actions. Common in v1 deployments where quality is improving but not fully automated.

## M

MCP and memory terms anchor integration and retention decisions.

**MCP (Model Context Protocol)**  
An open protocol that standardizes how models discover and use tools, resources, and prompts. It reduces custom integration overhead while improving governance consistency. Read [Model Context Protocol for Enterprise Teams](/articles/model-context-protocol-enterprise/) and implement with [MCP Server Selection Worksheet](/articles/mcp-server-selection-worksheet/).

**Memory tiers**  
Different retention layers (session, workflow, long-term system memory) with distinct governance implications. See [Memory Types for AI Systems](/articles/memory-types-for-ai-systems/).

## P

Prompt-system terms describe versioning and operating layers—not single chat messages.

**Prompt registry**  
A controlled catalog of prompt versions, ownership, release notes, and rollback history. Core guide: [Prompt Registry Playbook](/articles/prompt-registry-playbook/). Complementary architecture: [Structured Prompt System Blueprint](/articles/structured-prompt-system-blueprint/).

**Prompt system**  
The broader operating layer around prompt text: versions, context dependencies, eval, and governance. Primer: [Prompt Engineering vs AI Workflow Engineering](/articles/prompt-engineering-vs-ai-workflow-engineering/).

## R

Retrieval terms distinguish maturity levels; treat tier jumps as governance events, not feature toggles.

**RAG (Retrieval-Augmented Generation)**  
A pattern where models fetch relevant external data before generating output. Treat RAG as an architectural choice with quality and governance tradeoffs, not a magic accuracy switch.

**RAG tiers**  
Practical maturity levels for retrieval systems:

1. **Basic RAG** - simple retrieval + generation, minimal controls.
2. **Smart RAG** - improved retrieval quality, ranking, and filtering.
3. **Agentic RAG** - orchestration across tools/steps with stronger guardrails.

Read [Three Types of RAG](/articles/three-types-of-rag/) and [RAG in Production](/articles/rag-in-production/).

### RAG tier comparison

| Tier | Controls | Typical failure | Promote when |
|------|----------|-----------------|--------------|
| **Basic** | Allowlisted index, chunk IDs in logs | Wrong chunk, fluent error | Pass rate stable on held-out set |
| **Smart** | Rerank, freshness rules, deny lists | Latency/cost without accuracy lift | Smart beats basic on same eval cases |
| **Agentic** | Tool allow list, spend caps, human send | Loops, unaudited side effects | Forum approves after bounded pilot |

**Eval gate types**  
Release checkpoints that gate prompt, context, retrieval, or model changes:

| Gate | When | Minimum evidence | Owner |
|------|------|------------------|-------|
| **Smoke** | Every change in CI | 10 held-out cases, 0 policy violations | Engineering |
| **Pilot** | Before production traffic | 20+ cases, pass rate held 2 weeks | Process owner |
| **Scale** | Before traffic or tier bump | Risk forum vote + rollback drill | Governance + sponsor |

Details: [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/) and [AI Workflow Eval Checklist](/articles/ai-workflow-eval-checklist/). Stack index: [Prompt Anatomy Foundations](/articles/prompt-anatomy-foundations/).

**Risk review cadence**  
A recurring forum where teams review incidents, drift signals, and release decisions. See [AI Risk Review Cadence](/articles/ai-risk-review-cadence/).

## T

Token vocabulary connects cost, latency, and silent context loss.

**Token budget**  
The practical limit of how much context and output you can afford per task without degrading latency or cost. Foundations: [Tokens as Fuel for AI Output](/articles/tokens-as-fuel-for-ai-output/).

## V

Diagnostic terms name failure modes before tool purchases.

**Vibe prompting**  
Unstructured, improvisational prompting without version control, defined ownership, or eval discipline. Diagnostic guide: [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/).

## Suggested reading paths

- **For operators:** [From Prompt to Agent](/articles/from-prompt-to-agent/) -> [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) -> [Multi-Agent Observability](/articles/multi-agent-observability/)
- **For governance leads:** [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/) -> [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/) -> [AI Risk Review Cadence](/articles/ai-risk-review-cadence/)
- **For architecture teams:** [What Is Context Architecture](/articles/what-is-context-architecture/) -> [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/) -> [Model Context Protocol for Enterprise Teams](/articles/model-context-protocol-enterprise/)

When a term is unclear during a project review, link the word directly to the relevant article and make the definition part of your workflow docs. Shared language reduces rework and keeps decisions comparable across teams.
