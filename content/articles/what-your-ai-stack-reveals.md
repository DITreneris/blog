---
authors: Prompt Anatomy
body_locked: true
category: Opinion
content_tier: opinion
date: 2026-05-27
hero_image: images/articles/what-your-ai-stack-reveals/hero.png
hero_caption: AI Truth Mirror — buzzword cloud versus structured flowchart; score your
  stack in 15 minutes with the rubric below.
key_takeaway: Score your stack on owners, eval, and traceability — performative AI
  buys logos; operational AI ships workflow IDs and pass rates.
reading_time: 5 min read
slug: what-your-ai-stack-reveals
status: published
summary: A 15-minute performative-vs-operational stack audit — 10-item scorecard with
  interpretation bands and a worked example.
tags:
  - change-management
  - governance
  - workflow-automation
title: "What Your AI Stack Reveals"
---

The poster asks a uncomfortable question: **AI exposes shallow experts.** Two figures look credible outside the mirror; inside, one reflects buzzwords, the other a flowchart — objective, inputs, analysis, decision, outputs. Your **stack** (tools, integrations, prompts, forums, logs) is which reflection you are building.

**This article is a scorecard, not a symptom list.** [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) names organizational patterns; this audit scores **artifacts you can verify in fifteen minutes**—owners, eval sets, replay logs—before a steering meeting or renewal.

*Scorecard companion — for procurement rules see [Your Company Does Not Need More AI Tools](/articles/your-company-does-not-need-more-ai-tools/).*

This audit scores **rituals and artifacts**, not vendor logos. Complete it before the next steering meeting or tool renewal.

## Performative vs operational (quick read)

| Signal | Performative | Operational |
|--------|--------------|-------------|
| What changed last month? | New tool trial | Prompt/context version with eval diff |
| Who answers “why did we send that?” | Unclear | Owner + log fields |
| Quality measure | Anecdotes | Held-out pass rate |

Performative is not stupidity — it is **unstructured confidence**. Operational is boring on slides and valuable in audits. [Data boundaries](/articles/data-boundaries-for-ai-agents/) and [AI risk review cadence](/articles/ai-risk-review-cadence/) are operational markers when minutes tie to version bumps.

## 10-item scorecard (0–2 each)

Score **0** = absent, **1** = partial/ad hoc, **2** = documented and owned.

| # | Item | 0 | 1 | 2 |
|---|------|---|---|---|
| 1 | Named workflow owner for highest-risk AI assist | | | |
| 2 | Workflow ID on canvas for that flow | | | |
| 3 | Held-out eval set with pass-rate trend | | | |
| 4 | Prompt/context version in registry or changelog | | | |
| 5 | Sample incident replay (inputs + output + versions) | | | |
| 6 | Retrieval allow/deny documented | | | |
| 7 | Tool allow list if agents/connectors exist | | | |
| 8 | Risk forum cadence with decisions logged | | | |
| 9 | Failures become new eval cases within a week | | | |
| 10 | Sponsor metric tied to workflow (not “usage”) | | | |

**Total /20**

| Band | Score | Interpretation |
|------|-------|----------------|
| Performative | 0–8 | Tools and decks outrun architecture — freeze sprawl |
| Transitional | 9–14 | One workflow maturing — double down before expanding |
| Operational | 15–20 | Ready to expand scope with forum approval |

## Worked example — composite team at 8/20

A mid-market ops team scored **8**: they had copilots in support and sales, quarterly “AI council” slides, and high license adoption. They lacked workflow IDs, eval sets, and replay logs. Owners were “everyone and no one.”

**90-day plan they adopted:**

| Weeks | Action | Owner | Exit criteria |
|-------|--------|-------|---------------|
| 1–2 | One workflow on [AI workflow canvas](/articles/ai-workflow-canvas-template/) — `support-reply-v3` only | Support ops | Canvas complete, denied data named |
| 3–4 | Twenty held-out cases; smoke gate in CI | Engineering + ops | Baseline pass rate recorded |
| 5–8 | No net-new tools; registry row for task framing | Process owner | Prod pin + changelog |
| 9–12 | Risk forum promote/hold on metric + eval | Governance | Re-score target **14+** on this rubric |

Week 6 checkpoint: if pass rate below 85%, pause expansion and add override-driven eval cases—same discipline as [Northline Part 2](/articles/northline-part-2-scaling-eval-coverage/). Week 12: tie sponsor deck to [Measuring AI Workflow ROI](/articles/measuring-ai-workflow-roi/) scorecard rows, not license counts.

Re-score at day 90. Target **14+** before second workflow or agent tooling.

## What to do with the score

**0–8:** Run [10 Signs](/articles/10-signs-your-company-is-vibe-prompting/) with leadership; invoke [procurement freeze](/articles/ai-procurement-freeze/) if sign count ≥7.  
**9–14:** Do not buy net-new tools; invest in registry, eval, and boundaries for the workflow you have.  
**15–20:** Expand scope with evidence — [The Model Is Not the System](/articles/the-model-is-not-the-system/) for architecture, [Measuring AI Workflow ROI](/articles/measuring-ai-workflow-roi/) for sponsor decks.

Architecture beats another logo. Honest scores hurt once; vague scores hurt every quarter.
