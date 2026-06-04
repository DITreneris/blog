---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/ai-governance-roles-and-ownership/hero.png
hero_caption: "RACI for AI workflows — named owners for outcomes, context, changes, and incidents."
key_takeaway: Governance works when every workflow has a named owner for outcomes, context, changes, and incidents.
reading_time: 4 min read
slug: ai-governance-roles-and-ownership
status: published
summary: RACI for AI workflows using Northline B2B support-assist example—sponsor, process owner, IT, legal, and ops.
title: AI Governance Roles and Ownership
---

AI governance is not a policy PDF in a drawer. It is **clear ownership** for how workflows change, what data they touch, and who answers when something goes wrong. Without RACI-style clarity, "everyone owns AI" becomes "no one owns incidents."

This guide uses **Northline B2B**, a 120-person services firm, and their live workflow `support-reply-v3` (tier-2 assist). The same pattern applies to other workflows—adjust names, not structure. See also [AI Risk Review Cadence](/articles/ai-risk-review-cadence/), [Audit Trails](/articles/audit-trails-for-ai-workflows/), and [Data Boundaries](/articles/data-boundaries-for-ai-agents/) for the rest of Northline's operating loop.

## RACI for support-reply-v3 (Northline)

| Activity | Exec sponsor (VP CS) | Process owner (Support ops) | IT | Legal | Ops lead |
|----------|----------------------|----------------------------|-----|-------|----------|
| Approve customer-facing workflow | A | R | C | C | C |
| Maintain context / policy packs | I | C | R | A | C |
| Integrations and secrets | I | C | A/R | C | I |
| Eval set and release gate | I | A | R | C | C |
| Incident review | I | C | R | A | R |

*R = responsible, A = accountable, C = consulted, I = informed*

Northline's VP Customer Success **accountable** for go-live but does not edit prompts daily. Support ops **owns** eval pass rate and override review. Legal **accountable** for policy pack `support-policy-2026-04`; IT **implements** retrieval boundaries so HR data never mounts on this workflow ID.

## Minimum viable governance

1. **One executive sponsor** for AI operating priorities—not every tool decision.
2. **Process owner per workflow** who can say no to scope creep.
3. **IT** owns integrations, logging, and access; not business wording of prompts alone.
4. **Legal** owns policy context and prohibited uses—not daily prompt tweaks.

At Northline, the sponsor blocked a second copilot purchase until `support-reply-v3` hit ninety-two percent eval pass for four consecutive weeks—a governance decision, not a technical one.

## Anti-patterns

- "Everyone owns AI" → no one owns incidents.
- IT writes all prompts without process owners → misaligned outcomes.
- Legal only engaged after a breach → governance as cleanup.

## Tips

- Publish RACI in the same wiki page as the [workflow canvas](/articles/ai-workflow-canvas-template/).
- Revisit RACI when a workflow moves from pilot to production—not annually only.
- Name **deputy owners** for vacation coverage on high-risk workflows.

## What to do Monday

1. Pick one live or pilot workflow.
2. Fill RACI with real names, not role titles alone.
3. Confirm Legal and IT know their **A** vs **R** lines.
4. Link RACI from the risk register entry in your next [risk forum](/articles/ai-risk-review-cadence/).
