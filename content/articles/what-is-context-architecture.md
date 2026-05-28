---
authors: Prompt Anatomy
body_locked: true
category: Framework
date: 2026-05-18
hero_image: images/articles/what-is-context-architecture/hero.png
key_takeaway: Context architecture controls task, operational, policy, and memory layers—not stuffing the prompt window.
reading_time: 2 min read
slug: what-is-context-architecture
status: published
summary: How teams decide what models see, when, and why—with a context spec template and data classification.
title: What Is Context Architecture?
---

**Context architecture** is the discipline of deciding what information a model receives, in what order, with what authority—and what must never be included.

## Layers to design

- **Task context:** goal, constraints, and output contract.
- **Operational context:** CRM fields, tickets, or docs the workflow may pull.
- **Policy context:** red lines, jurisdictions, and retention rules.
- **Memory strategy:** what persists across sessions vs what must be forgotten.

## Context spec (template)

| Field | Example |
|-------|---------|
| Workflow ID | `support-reply-v3` |
| Allowed sources | KB articles tagged `customer-safe`, last 5 ticket messages |
| Denied sources | HR records, unreleased roadmap |
| Max tokens per source | 2k per article, 1k ticket window |
| Refresh trigger | On ticket status change |
| Retention | Discard session memory after case closed |

## Data classification

| Class | In model context? | Example |
|-------|-------------------|---------|
| Public | Yes | Marketing FAQ |
| Internal | Yes with role check | Playbooks |
| Confidential | Redacted or human-only | Pricing bands |
| Regulated | Policy-controlled retrieval | Health or payment data |

## Failure modes

Kitchen-sink retrieval, stale policy packs, and cross-tenant data bleed cause more harm than a smaller, governed context.

Read [Memory Types for AI Systems](/articles/memory-types-for-ai-systems/) and [Context Window Myths](/articles/context-window-myths/).

- [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/)
