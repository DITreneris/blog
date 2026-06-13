---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-06-13
hero_image: images/articles/ai-workflow-eval-checklist/hero.png
hero_caption: "Copy-paste eval checklist — smoke, pilot, and scale gates before AI workflow traffic increases."
key_takeaway: Run smoke, pilot, and scale gates on held-out cases before increasing traffic—not after a customer complaint."
reading_time: 4 min read
slug: ai-workflow-eval-checklist
status: published
summary: Pre-go-live eval checklist for AI workflows — smoke, pilot, and scale gates with copy-paste worksheet.
tags:
  - eval
  - templates
  - governance
title: AI Workflow Eval Checklist
---

Copy this checklist into your wiki, ticket, or risk forum agenda. Complete it with **process owner and IT** before pilot traffic increases—not after leadership asks why CSAT dropped. Gaps here become incidents: scaling without held-out cases, promoting on demo quality, or skipping override review while pass rate drifts.

The checklist implements the gates described in [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/). Pair it with the [workflow canvas](/articles/ai-workflow-canvas-template/) and [prompt registry](/articles/prompt-registry-playbook/) so eval set IDs and pass thresholds are addressable artifacts—not verbal agreements.

## Pre-flight (before any pilot traffic)

| # | Gate | Pass? | Owner | Evidence link |
|---|------|-------|-------|---------------|
| 1 | Workflow canvas complete with outcome, owner, metric | ☐ | Process owner | |
| 2 | Eval set drafted (minimum 10 smoke, 25 pilot recommended) | ☐ | Process owner | |
| 3 | Fail criteria defined (policy violation, wrong fact, missing escalation) | ☐ | Process owner + Legal | |
| 4 | Human review gate documented (who sends; no auto-send v1) | ☐ | Process owner | |
| 5 | Audit log schema includes prompt version, context version, inputs | ☐ | IT | |
| 6 | Data allow/deny matrix signed per [data boundaries](/articles/data-boundaries-for-ai-agents/) | ☐ | IT + Legal | |

**Block pilot** if any row is unchecked for customer-facing workflows.

## Smoke gate (10 cases — before staging promotion)

| # | Check | Pass? | Notes |
|---|-------|-------|-------|
| 1 | 10/10 held-out cases pass fail criteria | ☐ | |
| 2 | Zero policy violations on eval set | ☐ | |
| 3 | Prompt registry row exists with `eval_set_id` | ☐ | |
| 4 | Spot-check 3 audit rows match eval configuration | ☐ | |
| 5 | On-call owner named for release window | ☐ | |

**Rule:** 100% pass on smoke before staging or pilot traffic. No exceptions for "internal only" if content may reach customers later.

## Pilot gate (25+ cases — before shadow traffic increase)

| # | Check | Pass? | Notes |
|---|-------|-------|-------|
| 1 | Weekly pass rate ≥ threshold (e.g. 92%) for 2 consecutive weeks | ☐ | |
| 2 | Override reasons reviewed; new failures added to eval set within 7 days | ☐ | |
| 3 | Median latency within SLA | ☐ | |
| 4 | Risk forum agenda item with pass rate trend | ☐ | |
| 5 | Context pack / policy version logged on production rows | ☐ | |

Northline held ninety-two percent on twenty-five cases for four weeks before increasing shadow traffic from fifty to eighty percent—see [Northline Part 2](/articles/northline-part-2-scaling-eval-coverage/).

## Scale gate (before major traffic or tier change)

| # | Check | Pass? | Notes |
|---|-------|-------|-------|
| 1 | Risk forum vote recorded for traffic % or retrieval tier change | ☐ | |
| 2 | Eval set updated for new corpus, tools, or prompt version | ☐ | |
| 3 | Rollback procedure tested (prior registry pin restores in <30 min) | ☐ | |
| 4 | Sponsor briefed on primary metric—not activity metrics | ☐ | |
| 5 | [Audit trail](/articles/audit-trails-for-ai-workflows/) replay drill on 5 random tickets | ☐ | |

## RAG-specific add-ons

If workflow uses retrieval, add:

| # | Check | Pass? |
|---|-------|-------|
| 1 | `retrieval_tier` documented on canvas (basic/smart/agentic) | ☐ |
| 2 | `corpus_version_id` in audit logs | ☐ |
| 3 | Wrong-chunk near-misses in eval set (smart/agentic) | ☐ |
| 4 | Tool allow list signed (agentic only) | ☐ |

See [RAG in Production](/articles/rag-in-production/) for tier criteria.

## Sign-off block

| Role | Name | Date | Signature / ticket |
|------|------|------|---------------------|
| Process owner | | | |
| IT implementer | | | |
| Legal consult (if customer-facing) | | | |
| Risk forum chair (scale only) | | | |

Store completed checklists next to eval results and registry changelog entries so auditors see intent and evidence together.

## Where to go next

Define hook placement in [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/). Version prompts in the [prompt registry playbook](/articles/prompt-registry-playbook/). For CLEAR-style sponsor metrics on agents, see [Evaluating Agents with CLEAR](/articles/evaluating-agents-with-clear/).
