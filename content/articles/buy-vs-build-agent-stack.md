---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-09-10
status: published
modified: 2026-09-10
faq:
- question: When is building an agent stack the wrong first move?
  answer: When you lack a named workflow, owners, and eval cases—building then
    recreates vendor lock-in inside your own repo. Buy or borrow a runtime until
    those artifacts exist.
- question: Does buying a platform replace evaluation and RACI?
  answer: No. A purchased orchestrator still needs pass/fail eval, a human send
    gate on external actions, and named owners for context and audit fields.
- question: What must be true before a hybrid stack goes to production?
  answer: Bought runtime plus owned policy packs and eval sets, an allowlisted
    connector surface, and a promotion gate that can reject a prompt or tool
    change without freezing the whole pipeline.
hero_caption: "Do not buy a chat window — buy the runtime; own policy packs, eval hooks, and audit fields."
hero_image: images/articles/buy-vs-build-agent-stack/hero.png
key_takeaway: Buy when time-to-governed pilot is the bottleneck; build when data boundaries, eval, and audit fields are the product; hybrid is the default for regulated teams.
reading_time: 4 min read
slug: buy-vs-build-agent-stack
summary: Buy the runtime when connectors exist; own policy packs, eval hooks, and audit fields when those are the differentiator—hybrid is the default for regulated teams.
tags:
  - agents
  - governance
  - procurement
  - implementation
title: "When to Buy vs Build an Agent Stack"
---

Buy when the bottleneck is **time-to-a-governed pilot** and the connectors already exist. Build when **data boundaries, eval hooks, and audit fields** are the product differentiator—not a hobby framework bake-off. For regulated teams the default is hybrid: purchase the runtime, own the policy packs and eval sets.

This is a procurement decision, not a developer-preference contest. If tool sprawl is already the problem, freeze net-new buys first—see [The AI Procurement Freeze](/articles/ai-procurement-freeze/). If the workflow is still unnamed, stop here and finish [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) before either path.

## Decision frame

Name three things on one page before anyone opens a vendor deck or a repo:

1. **Outcome** — which business step the agent changes, and the metric that proves it.
2. **Risk class** — internal assist vs customer-facing send vs money/movement in a system of record.
3. **Ownership** — who owns context, eval cases, and the audit log when a run is wrong.

Northline B2B (composite) treated “build vs buy” as a risk-class question. A renewal-draft assistant with a human send gate could sit on a vendor runtime in thirty days. A claims classifier that had to replay every tool call for audit could not: the audit fields *were* the product, so they owned that slice even when the orchestrator was purchased.

If you cannot fill those three lines, you are not choosing a stack. You are shopping for a demo.

## Buy when

Buy the runtime when delay costs more than license fees **and** you can put your own gates around the vendor:

- Connectors you need are already certified (identity, ticketing, mail) and writing them would delay the pilot past the decision window.
- You can attach **your** eval set and a human send gate; the vendor is not the policy owner.
- Uptime, regional residency, and vendor SLA matter more than owning every orchestration primitive.
- Your team can operate the platform’s logs well enough to replay a failed run.

Do not buy because the demo was fast. Fast demos hide missing [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/). Score the vendor on whether you can reject a prompt or tool change without a support ticket.

## Build when

Build (or keep a thin internal orchestrator) when the control plane *is* the differentiator:

- Data boundaries, tenancy isolation, or existing SOA contracts dominate latency and residency.
- Audit fields, promotion gates, and rollback are what Legal will ask for—not a chatbot UI.
- You already run [CLEAR](/articles/evaluating-agents-with-clear/) (cost, latency, efficacy, assurance, reliability) as an operating cadence, not a slide.
- A vendor’s tool protocol would become a second permission surface you cannot allowlist.

Building first is the wrong move when you have no workflow canvas, no owners, and no eval cases. That path recreates vendor lock-in inside your own git history.

## Hybrid pattern

Regulated default: **bought runtime + owned context/eval**.

| Layer | Buy | Own |
|-------|-----|-----|
| Runtime / schedulers | Vendor orchestrator or agent host | — |
| Connectors | Vendor or MCP allowlist | Permission policy and secret handling |
| Policy packs | — | Versioned system/policy; changelog |
| Eval sets | — | Pass/fail cases; promotion hooks |
| Audit | Vendor export if complete | Fields Legal actually queries |

MCP can be the connector contract on either path; it does not replace eval or RACI. Pair this table with [Model Context Protocol for enterprise](/articles/model-context-protocol-enterprise/) when the question is protocol vs custom APIs—not when you still lack owners.

Northline bought the host, kept policy packs and eval YAML in a repo they promoted like application code, and refused production until a failed eval could block a release.

## 30-day procurement gate

Nothing ships to production—bought, built, or hybrid—until all of the following exist:

1. One named workflow with a metric and a risk class.
2. RACI for context, eval, and incident replay.
3. An allowlisted connector surface (MCP or custom) with injection and logging checks.
4. Eval cases that can fail a change; a human send gate on external actions.
5. A written hybrid split: what the vendor runs vs what you version.

If a vendor cannot meet items 3–4, you are not buying a stack. You are buying a chat window. Keep the freeze until the canvas is real.

After this gate, the next comparison is usually protocol-level: MCP vs custom tool APIs. That playbook is queued; do not start it until this decision frame is in use.
