---
authors: Prompt Anatomy
body_locked: true
category: Opinion
content_tier: opinion
date: 2026-03-31
hero_caption: Short (session), long (profile), and system memory — mapped to production
  session, episodic, and organizational layers with TTL and owners.
hero_image: images/articles/three-types-of-ai-memory-short/hero.png
key_takeaway: Poster terms map to production memory types — conflating them creates
  retention risk and unauditable defaults.
reading_time: 5 min read
slug: three-types-of-ai-memory-short
status: published
summary: Session, profile, and system memory explained — with a mapping table to production
  session, episodic, and organizational design.
tags:
- memory
title: Three Types of AI Memory
---

The hero card stack is simple: **short** (session), **long** (profile), **system** (controls behavior). “Remembers now / remembers you / controls output” is consumer language — useful only when you translate it into **retention rules, TTL, and owners** before production.

*Primer — for operational detail see [Memory Types for AI Systems](/articles/memory-types-for-ai-systems/).*

Northline B2B scoped assistant memory to **ticket thread context only**, with explicit TTL and no cross-customer profile blending, before expanding to renewal workflows. The poster’s three cards became three storage decisions with different audit questions — not one “memory” toggle in a vendor console.

## Short — session memory

Session memory is **this thread or run**: recent turns, tool results, temporary scratch context. It should expire when the case closes. It should not silently become the policy record or training corpus.

Support workflows fail when “what worked yesterday in chat” cannot be reproduced because session state lived in one agent’s sidebar. Session data belongs in logs tied to `case_id` and `tenant_id` — not in a shared doc titled “good prompts.”

**Production mapping:** session and **working (in-prompt)** memory in the playbook — assembled for one invocation, deleted or archived on case close.

## Long — profile memory

Profile memory is **persistent facts about a user or account** — preferences, tier, locale, open tickets, escalation history. It needs consent, correction paths, and deletion when customers churn.

Profile data is where GDPR and contract questions actually live — not in generic “we use AI” statements. Silent profile injection is how Customer A’s issue appears in Customer B’s draft.

**Production mapping:** **episodic** memory — human-visible summaries, tenant-scoped, refreshable on a schedule documented in the workflow record.

## System — behavioral control

System memory is **instructions and configuration**: prompts, tool allow lists, model routing, safety rules. It is not “more history.” It is how the product behaves across every run.

Changes here are **releases** — version, review, eval — not casual edits in a shared chat. Yesterday’s experiment must not become today’s default because nobody versioned the system prompt.

**Production mapping:** **organizational** configuration plus registry rows — versioned policy packs, approved corpora mounts, routing rules owned by governance.

## Mapping poster terms to production design

Use this table in design reviews so poster language and playbook vocabulary stay aligned.

| Poster term | Production term | TTL example | Owner |
|-------------|-----------------|-------------|-------|
| Short (session) | Session / working | End of thread or case | Ops lead |
| Long (profile) | Episodic / profile | Account lifecycle; delete on churn | Privacy + product |
| System | Organizational config | Release-versioned; eval on change | Governance + IT |

If a vendor feature does not map to a row, treat it as **unscoped persistence** until an owner and TTL exist on the canvas.

## Do not merge the cards

Teams that dump everything into “memory” get unauditable behavior: session experiments become defaults, profile bleed crosses tenants, system prompts drift without changelog entries.

Separate storage, TTL, and access controls per card — then wire retrieval and boundaries in [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/). Who may change system-level configuration belongs in [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/).

When agents promote from assist to tool use, memory scope should shrink before it expands — Northline refused profile blending until ticket-only session memory held pass rate for thirty days on held-out cases.
