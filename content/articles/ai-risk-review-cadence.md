---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2025-07-21
faq:
- answer: A standing forum with fixed agenda, attendees, and decision outputs that
    reviews workflow risk before traffic or privilege expands.
  question: What is an AI risk review cadence?
- answer: Clear decisions—approve, hold, or roll back—with owners and due dates, not
    open discussion without outcomes.
  question: What should every risk forum produce?
- answer: Process owner, IT/platform, and Legal/compliance for policy-bearing workflows;
    exec sponsor as needed for scope or budget calls.
  question: Who should attend the risk review?
hero_caption: Sample minutes you can paste into a wiki — decisions logged, not emailed.
hero_image: images/articles/ai-risk-review-cadence/hero.png
key_takeaway: Schedule risk review like any operational cadence—incidents, near-misses,
  and workflow changes on the agenda.
reading_time: 6 min read
slug: ai-risk-review-cadence
status: published
summary: Standing AI risk forum with sample Northline B2B meeting minutes—cadence,
  agenda, attendees, and decision outputs.
tags:
- governance
- eval
title: AI Risk Review Cadence
---

AI risk does not wait for annual audits. Models, prompts, and connectors change monthly; customer contracts still require explainability and retention. A **light, recurring forum** keeps workflows aligned with policy as the stack evolves. Skipping cadence turns governance into cleanup after incidents—and cleanup without minutes is storytelling, not operations.

**Northline B2B** runs a monthly forum for live workflows including `support-reply-v3`. This article defines cadence, standing agenda, who attends, what outputs must exist, and includes sample minutes you can paste into a wiki. Pair with [governance roles](/articles/ai-governance-roles-and-ownership/), [audit trails](/articles/audit-trails-for-ai-workflows/), and [data boundaries](/articles/data-boundaries-for-ai-agents/) so meetings change process, not only slide decks. For skills that actually scale beyond chat basics, see [What Scales AI Beyond the Basics](/articles/what-scales-ai-beyond-basics/).

## Choosing cadence and duration

Frequency should match how often you **change** production AI configuration—not how often leadership wants a dashboard.

| Team size | Frequency | Duration |
|-----------|-----------|----------|
| Pilot stage | Biweekly | 45 min |
| Multiple live workflows | Monthly | 60 min |
| Regulated industry | Monthly + quarterly deep dive | 90 min |

Northline (120 people, one live workflow, regulated customer data) runs **monthly 60 minutes**, plus biweekly 30-minute eval check-ins during model vendor trials. Pilot-stage teams need biweekly rhythm because prompts and context packs change faster than habits form; mature programs can monthly forum with weekly automated eval reports to owners.

Cap vendor demos at five minutes. The forum is for **decisions**—promote, pause, retire, or require new cases—not for model beauty contests.

## Standing agenda (every session)

Read the agenda in order so nothing chronic stays invisible. Process owners prepare sections 1–2; IT prepares log schema gaps; Legal prepares open policy items.

1. **New or changed workflows** since last meeting—scope, data classes, owners, boundary matrix updates.
2. **Eval regressions and incidents**—pass rate trend, near-misses, overrides worth pattern review.
3. **Open items from Legal / Security**—policy pack bumps, retention questions, denial-path tests.
4. **Approvals**—promote shadow traffic, pause workflow, retire prompt version, approve new connector row.
5. **Actions** with named owners and due dates—stored in risk register, not email.

Northline requires **one metric and one decision** minimum per session. If neither exists, cancel and fix preparation—not attendance.

## Sample meeting minutes (Northline — 2026-05-15)

Use this format so audit and operations see the same facts six months later.

**Attendees:** VP CS (sponsor), Support ops (owner), IT lead, Legal counsel (30 min), Ops analyst

**1. Changes since April:** Policy pack bumped to `support-policy-2026-04`; no new tools. Context spec updated with `policy_pack_version` in log schema per prior action.

**2. Eval / incidents:** Pass rate 93.1% (target ≥92%). One near-miss: draft cited deprecated refund rule—caught by checker; no customer send. Root cause: KB article not re-tagged after legal edit. New eval case eval-04 added; owner Support ops, due May 19 for KB retag.

**3. Legal open items:** None.

**4. Decisions:** Promote shadow traffic from 50% to 80% of tier-2 queue after four-week pass hold; IT to add log field `policy_pack_version` by May 22 (completed in staging).

**5. Actions:** Support ops — retag KB articles (due May 19). IT — verify log field in prod (due May 22). Ops — post override summary next session.

Minutes stored in risk register with link to [audit sample](/articles/audit-trails-for-ai-workflows/) for ticket #4821. Decisions reference registry version `1.4.2` and eval set `support-reply-eval-25`.

## Attendees and participation rules

**Executive sponsor** attends monthly or delegates with written authority—useful when promotion affects customer commitments or tool spend.

**Process owners** for each live workflow attend always; they own sections 1–2 and action lines.

**IT** attends for integrations, logging, CI smoke failures, and boundary enforcement evidence.

**Legal / compliance** attends when policy packs, retention, or customer-facing language changes—or within 24 hours async review when only eval cases changed.

**Ops or quality lead** brings metrics: pass rate, override rate, mean time to process update after incidents.

Optional guests (vendors, new team leads) do not dilute decisions—timebox Q&A to end.

## Outputs that count as governance

Slides alone are not outputs. The forum should produce durable artifacts:

**Updated risk register** — workflow × risk × mitigation × owner. Link each row to workflow ID and current registry version.

**Decision log** — promote/pause/retire with date, approver, eval evidence. Link to [structured prompt system](/articles/structured-prompt-system-blueprint/) changelog lines.

**Context and boundary changes** — policy pack version, matrix row, or retrieval tag—not "we will discuss."

**Eval case additions** from near-misses within one week—see [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/).

Northline tracks **mean time to process update** after incidents. Slow fixes mean governance theater.

## Operating the forum without fatigue

Schedule the next 60-minute slot before adjourning—empty calendars become skipped months. Use the same wiki template every time so reviewers build habit.

When eval sample size is below agreed threshold, **pause promotion votes**—decisions without data recreate vibe prompting at scale.

During model trials, biweekly eval check-ins prevent monthly surprises—forum focuses on decisions, not reading spreadsheets live.

Connect forum actions to RACI: every action line has one **R** and one due date; **A** approves closure next session.

**Monday start:** Copy the sample minutes template. Book six sessions forward. Assign one process owner to prepare section 2 next time. Link last session's actions to audit replay drill outcomes.

Risk cadence is how governance stays a verb—incidents, near-misses, and workflow changes on the agenda, every time.
