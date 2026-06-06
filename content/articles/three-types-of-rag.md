---
authors: Prompt Anatomy
body_locked: true
category: Opinion
content_tier: opinion
date: 2026-01-17
hero_caption: Three RAG patterns — basic lookup, smart refine, and agentic act — as
  increasing control, not one feature toggle.
hero_image: images/articles/three-types-of-rag/hero.png
key_takeaway: Pick the RAG tier that matches risk — lookup for FAQs, refine for drafts,
  agentic only with tools and eval gates.
reading_time: 4 min read
slug: three-types-of-rag
status: published
summary: Basic, smart, and agentic RAG differ in steps and risk — match the pattern
  to workflow tier, not vendor marketing.
tags:
- rag
title: Three Types of RAG
---

*Part 1 primer — for production implementation with eval gates, see [RAG in Production](/articles/rag-in-production/).*

The hero breaks retrieval into three patterns: **basic** (lookup), **smart** (refine), **agentic** (plan, tools, verify). Vendors often sell “RAG” as one switch. Operators need the distinction because **each tier adds steps, latency, and failure modes** — and because audit questions change when tools enter the loop.

The poster is a risk ladder, not a maturity insult. Many workflows should stay on basic lookup for years. Others need refinement when the corpus is noisy. Agentic patterns are for bounded research tasks with spend caps and human send gates — not for every copilot because the diagram’s third box looks advanced.

## Basic RAG — lookup before answer

Flow: query → search approved docs → answer.  
Best for: stable knowledge bases, internal FAQs, support macros with citations.  
Risk profile: wrong chunk still produces fluent answers — you need held-out eval cases and versioned indexes.  
This tier is enough for many workflows if policy packs and denial rules are explicit.

Basic RAG still requires **operational hygiene**: chunking strategy owned by someone, index refresh tied to doc versions, and denial when retrieval confidence is low. Log which document IDs influenced a draft so reviewers can spot stale policy. In forums, basic tier is the right default for tier-1 macros and internal wikis with quarterly Legal review — not a stepping stone you must escape in ninety days.

When Legal asks “which policy version was in context,” basic tier must answer with corpus version IDs — not “the model searched Confluence.”

## Smart RAG — refine before generate

Flow: query → retrieve → **refine/rerank** → answer.  
Best for: noisy corpora, long PDFs, mixed-quality wikis.  
Why it matters: first-pass retrieval often returns “related but wrong.” Refinement reduces obvious misses without full agent autonomy.  
Cost: extra model calls — justify with measured accuracy lift, not intuition.

Smart tier is where teams should **prove ROI**: compare pass rate on a held-out set with and without rerank. Document latency impact on SLA. If refinement only helps 3% of cases, stay on basic and fix chunking first. When refinement wins, version the rerank prompt like any other template and add near-misses from wrong-chunk wins to the eval set — those failures are subtle and expensive.

Support leads often feel smart tier is “just better search.” Frame it as **quality gates on evidence** before generation — same accountability as checkers, different placement in the pipeline.

## Agentic RAG — act with verification

Flow: query → plan → tools → verify → answer.  
Best for: multi-source investigations, tender research, complex ops tasks — **with** human gates on send and spend.  
Risk profile: tool misuse, runaway loops, unaudited side effects. Requires [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/) and [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/) before production.

Agentic retrieval implies **tool allow lists**, per-run budgets, and logs that capture plan steps — not only final text. Humans remain accountable for external commitments in v1. Pair with [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) when orchestration spans multiple systems. If audit asks “what did the system do,” a chat transcript is not enough; you need structured traces aligned with [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/).

## Choosing a tier

| Situation | Start here |
|-----------|------------|
| Single approved KB, low external risk | Basic |
| Retrieval quality inconsistent | Smart |
| Multi-step research, controlled tools | Agentic + governance |

Do not deploy agentic RAG because the diagram’s green box looks “most advanced.” Deploy it when **accountability** matches the step count.

Revisit tier choice when the corpus, regulations, or channel changes. A workflow that was basic can move to smart after repeated wrong-chunk near-misses; it should not jump to agentic because leadership saw a demo. Risk forum should sign tier changes the same way they sign data boundary expansions — with eval evidence and named owners.

Document the active tier in the workflow canvas footer (`retrieval_tier: basic|smart|agentic`) so incident reviews do not debate what production was supposed to be doing.

## Go deeper

Retrieval sits inside [context architecture](/articles/what-is-context-architecture/), not instead of it. For the full production guide with tier promotion and eval gates, see [RAG in Production](/articles/rag-in-production/). For accountable logging when tiers change, see [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/). For the broader control ladder that ends at RAG, see [Five Levels of AI Control](/articles/five-levels-of-ai-control/).