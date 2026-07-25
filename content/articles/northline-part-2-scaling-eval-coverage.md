---
authors: Prompt Anatomy
body_locked: true
category: Case Studies
content_tier: playbook
date: 2025-10-02
faq:
- answer: How the composite team scaled eval coverage after the first structured workflow—more
    cases, clearer fail criteria, and promotion gates before traffic grew.
  question: What does Northline Part 2 cover?
- answer: Before widening the pilot cohort or adding auto-send—new failure modes need
    held-out cases, not only happy-path demos.
  question: When should eval coverage expand?
- answer: Part 1 established the controlled workflow; Part 2 deepens measurement so
    quality does not collapse as volume rises.
  question: How does Part 2 relate to Part 1?
hero_caption: Eval coverage expansion — from 50% shadow traffic to 80% queue coverage
  after pass rate held four weeks.
hero_image: images/articles/northline-part-2-scaling-eval-coverage/hero.png
key_takeaway: Northline increased shadow traffic only after eval pass rate held and
  override review stayed disciplined—not when leadership wanted faster ROI."
reading_time: 5 min read
slug: northline-part-2-scaling-eval-coverage
status: published
summary: How Northline B2B expanded support-assist shadow traffic from 50% to 80%
  after eval held — composite case study Part 2.
tags:
- northline
- eval
- change-management
- case-studies
title: Northline Part 2
---

*Anonymized composite (Northline B2B)—multiple implementations. [Part 1](/articles/case-study-vibe-prompting-to-structured-workflow/) covers the move from vibe prompting to structured `support-reply-v3`.*

## Situation (week 12)

Northline completed a twelve-week pilot on tier-2 support assist at **fifty percent** shadow traffic. Median handle time on the assisted queue was roughly eighteen percent lower; CSAT rose six to nine points; eval pass rate held at or above ninety-two percent on twenty-five held-out cases. Executive sponsor asked to "flip the whole queue" before quarter end. Process owner asked for evidence that eighty percent coverage would not reintroduce the policy near-misses that justified human send in v1.

The team had a working [prompt registry](/articles/prompt-registry-playbook/), [eval checklist](/articles/ai-workflow-eval-checklist/), and monthly [risk forum](/articles/ai-risk-review-cadence/) rhythm from Part 1. Part 2 is the story of **scaling coverage without scaling risk faster than governance**.

## Approach

Leadership agreed to increase shadow traffic in **two steps**—sixty-five percent, then eighty percent—only when weekly pass rate and override review met pre-declared gates. No new tools. No model swap during expansion (tempting for sponsor optics; blocked by process owner until eval set re-run).

**Eval expansion:** Held-out set grew from twenty-five to forty cases—fifteen drawn from override reasons in weeks 8–12 (VIP language, deprecated refund phrasing, wrong product SKU). Fail criteria unchanged: policy violation, wrong fact, missing escalation.

**Override review:** Support ops lead reviewed every override >2 minutes with categorization tag. Tags fed eval set within seven days per [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) discipline.

**Logging:** `policy_pack_version` and `prompt_id` version already mandatory from Part 1; added `shadow_traffic_pct` to audit rows for replay during expansion debates.

## Gate table (what had to be true)

| Gate | 50% → 65% | 65% → 80% |
|------|-----------|-----------|
| Weekly pass rate (40 cases) | ≥92% for 2 weeks | ≥92% for 3 weeks |
| Policy violations on eval | 0 | 0 |
| New override categories | Added to eval within 7 days | Same |
| Risk forum vote | Yes | Yes |
| Rollback drill | Prior registry pin <30 min | Repeated |

Forum rejected a request to skip the sixty-five percent step. That delay cost two weeks of sponsor enthusiasm—and prevented a VIP escalation miss at seventy-two percent traffic that became eval case #38.

**Failed gate (week 15):** Weekly pass rate dipped to 89% for one week at sixty-five percent traffic—below the ≥92% gate. Process owner held traffic, added twelve override-driven cases within five days, and re-ran eval before retrying. Sponsors saw a **hold decision with evidence**, not a narrative debate. Those cases fed the monthly [Measuring AI Workflow ROI](/articles/measuring-ai-workflow-roi/) scorecard: pass rate and incident rate moved together before leadership approved eighty percent coverage.

## Results (ranges)

Metrics measured on the **assisted tier-2 queue** only; unassisted queues excluded to avoid mixing effects.

| Metric | At 50% (wk 12) | At 80% (wk 20) |
|--------|----------------|----------------|
| Median handle time vs baseline | ~18% lower | ~20% lower |
| CSAT on assisted queue | +6–9 pts | +7–10 pts |
| Weekly eval pass rate | 92–94% | 91–93% |
| Policy-related escalations | down sharply | stable |
| Override rate | monitored | slight rise; reviewed |

Pass rate dipped one point at eighty percent—expected with harder case mix—not treated as failure because **zero policy violations** held and override tags explained variance (wording preference, not factual errors).

## Lessons

**Stepwise traffic beats big-bang.** Sponsors remember two extra weeks; Legal remembers zero new policy incidents.

**Override review is eval fuel.** Teams that skip categorization recreate vibe prompting through "helpful" human edits that never become cases.

**Activity metrics stayed off promotion criteria.** Drafts generated per day rose; that number was reported for transparency only.

**Registry rollback drill mattered.** Week 16 staging mistake loaded wrong hash; rollback to 1.4.2 took nine minutes because prod pins were real.

## What they would do differently

Start the forty-case eval set at week 8 instead of week 14—earlier hard cases would have surfaced VIP language gaps before sixty-five percent traffic.

Publish shadow traffic percentage in the agent UI earlier; reps trusted the system more when coverage was visible.

## What to do Monday

If you are at pilot pass rate but leadership wants full queue coverage:

1. Copy the gate table into your risk forum agenda.  
2. Add fifteen override-driven cases to eval before the next traffic bump.  
3. Run a registry rollback drill before increasing shadow percent.  
4. Block model or retrieval tier changes during expansion windows.

## Where to go next

[Part 1 case study](/articles/case-study-vibe-prompting-to-structured-workflow/) for foundation. [Prompt registry playbook](/articles/prompt-registry-playbook/) for release discipline. [RAG in Production](/articles/rag-in-production/) when retrieval tier changes are proposed during scale. [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) if side pilots reappear while you scale.
