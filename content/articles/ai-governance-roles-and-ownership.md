---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2025-05-16
faq:
- answer: The line-of-business process owner is accountable for outcomes; they maintain
    prompt templates with IT implementing integrations and Legal consulting on policy
    context.
  question: Who owns prompt templates in production?
- answer: Name an executive sponsor, process owner, IT implementer, Legal consult,
    and ops lead—with explicit accountable vs responsible rows for go-live, context,
    changes, and incidents.
  question: What is the minimum RACI for a governed AI workflow?
hero_caption: RACI for AI workflows — named owners for outcomes, context, changes,
  and incidents.
hero_image: images/articles/ai-governance-roles-and-ownership/hero.png
key_takeaway: Governance works when every workflow has a named owner for outcomes,
  context, changes, and incidents.
reading_time: 6 min read
slug: ai-governance-roles-and-ownership
status: published
summary: RACI for AI workflows using Northline B2B support-assist example—sponsor,
  process owner, IT, legal, and ops.
tags:
- governance
title: AI Governance Roles and Ownership
---

AI governance is not a policy PDF in a drawer. It is **clear ownership** for how workflows change, what data they touch, and who answers when something goes wrong. Without RACI-style clarity, "everyone owns AI" becomes "no one owns incidents"—and the first serious near-miss becomes a circular email thread instead of a process update with a due date.

This guide uses **Northline B2B**, a 120-person services firm, and their live workflow `support-reply-v3` (tier-2 assist). The same pattern applies to other workflows: adjust names and systems, not the structure of accountable vs responsible vs consulted vs informed. Pair this article with [AI risk review cadence](/articles/ai-risk-review-cadence/), [audit trails](/articles/audit-trails-for-ai-workflows/), and [data boundaries](/articles/data-boundaries-for-ai-agents/) so ownership connects to forums, logs, and enforcement—not slides alone. For a visual primer on the control ladder (tokens through RAG), see [Five Levels of AI Control](/articles/five-levels-of-ai-control/). When stakeholders confuse prompt tricks with operating discipline, [Prompt Engineering Memes vs Reality](/articles/prompt-engineering-memes-vs-reality/) names the gap governance must close.

## Why RACI matters for AI workflows

Traditional software RACI maps features to teams. AI workflows add **mutable language** (prompts), **mutable context** (policy packs, retrieval), and **probabilistic outputs** that still create customer commitments. If only IT is named, business wording drifts in chat threads. If only Legal is named, integrations never get boundary enforcement. If only a vendor is named, you cannot reconstruct ticket #4821 six months later.

RACI forces explicit answers: Who can approve customer-facing go-live? Who owns eval pass rate? Who implements deny rules in connectors? Who is accountable when a deprecated refund rule appears in a draft? Northline answered these on one wiki page linked from their risk register—before they increased shadow traffic from fifty to eighty percent.

## RACI for support-reply-v3 (Northline)

The table below is their production RACI. Copy the shape, not the names, into your first governed workflow.

| Activity | Exec sponsor (VP CS) | Process owner (Support ops) | IT | Legal | Ops lead |
|----------|----------------------|----------------------------|-----|-------|----------|
| Approve customer-facing workflow | A | R | C | C | C |
| Maintain context / policy packs | I | C | R | A | C |
| Integrations and secrets | I | C | A/R | C | I |
| Eval set and release gate | I | A | R | C | C |
| Incident review | I | C | R | A | R |

*R = responsible, A = accountable, C = consulted, I = informed*

Northline's VP Customer Success is **accountable** for go-live but does not edit prompts daily. Support ops **owns** eval pass rate and override review—they block promotion when smoke fails. Legal is **accountable** for policy pack `support-policy-2026-04`; IT **implements** retrieval boundaries so HR data never mounts on this workflow ID. Ops lead tracks override reasons and feeds the monthly [risk forum](/articles/ai-risk-review-cadence/).

When eval case #17 failed on VIP language, the **process owner** opened the ticket; **IT** updated boundary triggers; **Legal** confirmed approved phrasing; **sponsor** was informed, not surprised in a quarterly review.

## Minimum viable governance

You do not need a twenty-page policy to start. You need five roles filled with humans who accept escalation.

**Executive sponsor** sets operating priorities—which workflows matter, whether to pause tool sprawl, whether promotion requires forum vote. They are not the daily prompt editor. Northline's sponsor blocked a second copilot until pass rate held—governance as business decision.

**Process owner per workflow** can say no to scope creep and owns eval outcomes. If overrides cluster on the same clause, the owner adds cases or fixes context—they do not "train reviewers harder" indefinitely.

**IT** owns integrations, logging, secrets, and connector deny paths. Prompt text that says "do not access HR" is not enforcement; IT configuration is.

**Legal** owns policy context and prohibited uses—not casual prompt tweaks in prod. Policy pack version appears in [audit trails](/articles/audit-trails-for-ai-workflows/) so replay is possible.

**Ops or quality lead** tracks metrics, override sampling, and forum agendas. They connect RACI to [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) results leadership can read.

## Anti-patterns that look like governance

**"Everyone owns AI"** means incidents have no R line. Fix: one process owner per workflow ID on the canvas.

**IT writes all prompts without process owners** produces technically integrated but misaligned outcomes—drafts optimize for model behavior, not CSAT or policy.

**Legal only after a breach** makes governance cleanup, not design. Involve Legal when policy packs are created, not when a regulator asks for logs you do not have.

**RACI in a deck, not in the wiki** drifts within a quarter. Publish RACI next to the [workflow canvas](/articles/ai-workflow-canvas-template/) and link from the risk register.

**Deputy owners missing** means vacation stops releases or encourages shadow edits. Name backups for high-risk workflows.

## Operating RACI in practice

Publish RACI where engineers and operators already work—not only in compliance folders. Revisit when a workflow moves from pilot to production, when you add a connector, or when you split prompt IDs in the [structured prompt system](/articles/structured-prompt-system-blueprint/). Annual-only review is too slow for model vendor trials.

Link RACI lines to forum actions: "Support ops, A on eval, will post weekly pass rate." Require **one decision and one metric** per risk session so ownership stays exercised.

When Northline added a routing agent pilot, they cloned RACI with a narrower write scope—expand responsibility only after eval evidence, per [data boundaries](/articles/data-boundaries-for-ai-agents/).

**Monday start:** Pick one live or pilot workflow. Fill RACI with real names. Confirm Legal and IT know their **A** vs **R** lines. Link the page from the next risk register entry. Run one replay drill from audit logs to prove IT and process owner can reconstruct a case together.

Governance works when names are on the workflow—not when "AI" is in someone's title and everyone assumes someone else will respond.