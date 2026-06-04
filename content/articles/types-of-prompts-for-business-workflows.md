---
authors: Prompt Anatomy
body_locked: true
category: Prompt Systems
date: 2026-05-28
hero_image: images/articles/types-of-prompts-for-business-workflows/hero.png
key_takeaway: Match prompt type to workflow step—one mega-prompt rarely covers intake, generation, and verification.
reading_time: 1 min read
slug: types-of-prompts-for-business-workflows
status: published
summary: Task, system, retrieval, and checker prompts—and where each belongs in a workflow.
title: Types of Prompts for Business Workflows
---

Business workflows need **different prompt roles**, not one growing system message.

## Types

| Type | Role | Example |
|------|------|---------|
| **System / policy** | Non-negotiable rules | “Never quote pricing not in retrieved docs.” |
| **Task** | Goal and output contract for one run | “Produce JSON with fields A–D.” |
| **Retrieval** | Query formulation for search | “Find KB articles tagged refund.” |
| **Checker** | Validate draft against rules | “List unsupported claims.” |
| **Transformation** | Format or tone adjust | “Convert bullets to executive summary.” |

## Practice

- Version each type separately.
- Do not merge policy into task prompts ad hoc—policy should be a maintained pack.
- Run checker prompts on high-risk outputs before send.

- [Context architecture](/articles/what-is-context-architecture/) — how layers combine in one run.
