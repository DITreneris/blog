---
authors: Prompt Anatomy
body_locked: true
category: Framework
content_tier: pillar
date: 2026-06-07
hero_image: images/articles/rag-in-production/hero.png
hero_caption: "RAG production ladder — basic lookup, smart refine, and agentic act with eval gates at each tier transition."
key_takeaway: Ship RAG as a governed retrieval tier with eval gates—not a vendor feature toggle without accountability."
reading_time: 6 min read
slug: rag-in-production
status: published
summary: Implement RAG with governance — choose basic, smart, or agentic patterns and wire eval gates before production traffic.
tags:
  - rag
  - eval
  - governance
  - context-engineering
title: "RAG in Production: Basic, Smart, and Agentic Patterns with Eval Gates"
faq:
  - question: What is the difference between basic, smart, and agentic RAG?
    answer: Basic is query-search-answer on approved docs. Smart adds refine/rerank before generation. Agentic adds planning, tools, and verification—with higher risk and audit requirements.
  - question: When should we use agentic RAG?
    answer: Only for bounded multi-source research with tool allow lists, spend caps, human send gates, and eval evidence—not because it looks more advanced on a diagram.
  - question: What eval gates are required before scaling RAG traffic?
    answer: Smoke on held-out cases, weekly pass rate during pilot, and risk forum approval for tier changes—documented in the workflow canvas and audit logs.
---

Retrieval-augmented generation is not one switch in a vendor console. In production it is a **governed retrieval tier** inside [context architecture](/articles/what-is-context-architecture/)—with chunking ownership, index versioning, denial rules, and eval gates before traffic scales. Teams that treat RAG as "turn on search" inherit fluent wrong answers, stale policy in drafts, and audit questions nobody can answer.

This pillar upgrades the visual primer [Three Types of RAG](/articles/three-types-of-rag/) (Part 1) into an implementation guide: how to choose basic, smart, or agentic patterns; what to log; when to promote tiers; and how to wire [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) and [data boundaries](/articles/data-boundaries-for-ai-agents/) before production.

## The production ladder

| Tier | Flow | Best for | Risk profile |
|------|------|----------|--------------|
| **Basic** | query → search approved docs → answer | Stable KBs, internal FAQs, support macros | Wrong chunk → fluent error; needs held-out eval |
| **Smart** | query → retrieve → refine/rerank → answer | Noisy corpora, long PDFs, mixed wikis | Extra latency/cost; prove accuracy lift |
| **Agentic** | query → plan → tools → verify → answer | Bounded research with human send gates | Tool misuse, loops, unaudited side effects |

The ladder is a **risk map**, not a maturity insult. Many workflows should stay on basic for years. Others need refinement when the corpus is noisy. Agentic patterns belong where accountability matches step count—not where leadership saw a green box on a slide.

Document the active tier in the workflow canvas (`retrieval_tier: basic|smart|agentic`) so incident reviews do not debate what production was supposed to do.

## Basic RAG — lookup before answer

Basic RAG is enough for many workflows if policy packs and denial rules are explicit. Operational hygiene still matters:

**Chunking strategy** — owned by someone, not "whatever the indexer defaulted."  
**Index refresh** — tied to document version IDs Legal recognizes.  
**Denial when confidence is low** — model must refuse or escalate, not guess.  
**Logging** — which document IDs influenced a draft; corpus version in audit row.

When Legal asks "which policy version was in context," basic tier must answer with corpus version IDs—not "the model searched Confluence."

Northline's `support-reply-v3` stayed on basic retrieval for twelve weeks because forty KB articles tagged `customer-safe` covered ninety percent of tier-2 cases. They added smart rerank only after wrong-chunk near-misses appeared in weekly override review—not because a vendor demo showed reranking.

### Basic tier eval gates

1. **Smoke:** ten held-out tickets; zero policy violations.  
2. **Pilot:** twenty-five cases; pass rate ≥92% for two weeks.  
3. **Scale:** risk forum vote; log `corpus_version_id` on every row.

Use the [AI workflow eval checklist](/articles/ai-workflow-eval-checklist/) for copy-paste gates.

## Smart RAG — refine before generate

Smart tier adds refine/rerank when first-pass retrieval returns "related but wrong." Teams should **prove ROI**: compare pass rate on a held-out set with and without rerank. Document latency impact on SLA. If refinement only helps three percent of cases, stay on basic and fix chunking first.

When refinement wins:

- Version the rerank prompt in the [prompt registry](/articles/prompt-registry-playbook/).  
- Add near-misses from wrong-chunk wins to the eval set—those failures are subtle and expensive.  
- Log rerank scores in audit for replay when CSAT drops.

Support leads often feel smart tier is "just better search." Frame it as **quality gates on evidence** before generation—same accountability as checkers, different placement in the pipeline.

## Agentic RAG — act with verification

Agentic retrieval implies **tool allow lists**, per-run budgets, and logs that capture plan steps—not only final text. Humans remain accountable for external commitments in v1. Pair with [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) when orchestration spans multiple systems.

If audit asks "what did the system do," a chat transcript is not enough; you need structured traces aligned with [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/).

Northline's tender research pilot (separate workflow ID) used agentic retrieval with:

- Read-only connectors on approved folders only.  
- Per-run token and tool-call budget.  
- Human send on every external document.  
- Eval set including "must refuse when source missing."

They did not merge tender agentic patterns into `support-reply-v3`—tier and risk profile differed.

### Agentic tier prerequisites

Before agentic RAG in production, confirm:

| Prerequisite | Owner |
|--------------|-------|
| Tool allow/deny matrix | IT + process owner |
| Eval set with tool-misuse cases | Process owner |
| Audit schema with plan steps | IT |
| Human send gate documented | Process owner |
| Risk forum approval for tier | Exec sponsor consult |

## Tier promotion and demotion

Revisit tier when corpus, regulations, or channel changes. Promotion requires eval evidence—not executive impatience.

**Promote basic → smart** when wrong-chunk near-misses repeat in override review and chunking fixes plateau.  
**Promote smart → agentic** only when multi-step research is bounded, funded, and governed—see agent workflow guide.  
**Demote** when cost or incident rate exceeds benefit; log demotion in changelog like any registry change.

Risk forum should sign tier changes the same way they sign data boundary expansions.

## Integration with grounding and hallucination control

RAG reduces but does not eliminate hallucination. Pair retrieval with:

- **Checker step** separate from draft generation.  
- **Policy pack version** in logs.  
- **Grounding pillar patterns** (verification before send)—see hallucination spokes [Why AI Hallucinates](/articles/why-ai-hallucinates/) and [When AI Hallucinates Confidence](/articles/when-ai-hallucinates-confidence/).

Retrieval sits inside context architecture, not instead of it. [Memory types](/articles/memory-types-for-ai-systems/) define what should not sit in every run's retrieval scope.

## Northline implementation notes

`support-reply-v3` retrieval config:

- Approved KB only; `customer-safe` tag required.  
- Denied: HR, roadmap, other customers' tickets.  
- `corpus_version_id` logged per draft.  
- Weekly eval on overrides fed back into case #17-style policy checks.

When they experimented with smart rerank, pilot pass rate rose from ninety-one to ninety-four percent on twenty-five cases—enough to justify latency cost for that queue only.

## Anti-patterns

- Deploying agentic RAG because the diagram's third box looks advanced.  
- No corpus version in logs—Legal cannot reconstruct policy context.  
- Rerank prompt living in a developer's notebook, not the registry.  
- Mixing tender research agentic tools into support reply workflow ID.  
- Scaling traffic before smoke eval passes.

## Where to go next

Start with [Three Types of RAG](/articles/three-types-of-rag/) for the visual primer. Document retrieval tier on the [workflow canvas](/articles/ai-workflow-canvas-template/). Wire [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) before pilot. For agent tool standards, see [Model Context Protocol for Enterprise Teams](/articles/model-context-protocol-enterprise/) when retrieval calls external systems through MCP servers.
