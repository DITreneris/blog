---
authors: Prompt Anatomy
body_locked: true
category: Opinion
content_tier: opinion
date: 2026-03-07
hero_caption: Short (session), long (profile), and system memory — different lifetimes,
  not one chat history.
hero_image: images/articles/three-types-of-ai-memory-short/hero.png
key_takeaway: Session, profile, and system memory serve different jobs — conflating
  them creates retention and consistency risk."
reading_time: 3 min read
slug: three-types-of-ai-memory-short
status: published
summary: Session, profile, and system memory explained — and when each belongs in
  governed AI design.
tags:
- memory
title: Three Types of AI Memory
---

The hero card stack is simple: **short** (session), **long** (profile), **system** (controls behavior). “Remembers now / remembers you / controls output” is consumer language — useful if you translate it into **retention rules and owners** before production.

## Short — session memory

Session memory is **this thread or run**: recent turns, tool results, temporary scratch context. It should expire. It should not silently become the policy record. Support workflows fail when “what worked yesterday in chat” cannot be reproduced because session state lived in one agent’s sidebar.

## Long — profile memory

Profile memory is **persistent facts about a user or account** — preferences, tier, locale, open tickets. It needs consent, correction paths, and deletion when customers churn. Profile data is where GDPR questions actually live — not in generic “we use AI.”

## System — behavioral control

System memory is **instructions and configuration**: prompts, tool allow lists, model routing, safety rules. It is not “more history.” It is how the product behaves. Changes here are **releases** — version, review, eval — not casual edits.

## Do not merge the cards

Teams that dump everything into “memory” get unauditable behavior: yesterday’s experiment becomes today’s default. Separate storage, TTL, and access controls per card — then align with the routing diagram in [Memory Types for AI Systems](/articles/memory-types-for-ai-systems/).

## Go deeper

Memory without boundaries is liability. [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/) names allow/deny for tools; [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/) names who may change system-level configuration.