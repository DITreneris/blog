---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/ai-risk-review-cadence/hero.png
hero_caption: "Standing risk forum — incidents, eval regressions, and workflow changes on a fixed agenda."
key_takeaway: Schedule risk review like any operational cadence—incidents, near-misses, and workflow changes on the agenda.
reading_time: 4 min read
slug: ai-risk-review-cadence
status: published
summary: Standing AI risk forum with sample Northline B2B meeting minutes—cadence, agenda, attendees, and decision outputs.
title: AI Risk Review Cadence
---

AI risk does not wait for annual audits. A **light, recurring forum** keeps workflows aligned with policy as tools and models change. Skipping cadence turns governance into cleanup after incidents.

**Northline B2B** runs a monthly forum for live workflows including `support-reply-v3`. This article defines cadence and includes sample minutes. Pair with [Governance Roles](/articles/ai-governance-roles-and-ownership/), [Audit Trails](/articles/audit-trails-for-ai-workflows/), and [Data Boundaries](/articles/data-boundaries-for-ai-agents/).

## Suggested cadence

| Team size | Frequency | Duration |
|-----------|-----------|----------|
| Pilot stage | Biweekly | 45 min |
| Multiple live workflows | Monthly | 60 min |
| Regulated industry | Monthly + quarterly deep dive | 90 min |

Northline (120 people, one live workflow, regulated customer data): **monthly 60 min**, plus biweekly 30-min eval check-ins during model vendor trials.

## Standing agenda

1. New or changed workflows since last meeting (scope, data, owners).
2. Eval regressions or incident summaries.
3. Open items from legal / security.
4. Approvals: promote, pause, or retire workflows.
5. Actions with owners and due dates.

## Sample meeting minutes (Northline — 2026-05-15)

**Attendees:** VP CS (sponsor), Support ops (owner), IT lead, Legal counsel (30 min), Ops analyst

**1. Changes since April:** Policy pack bumped to `support-policy-2026-04`; no new tools.

**2. Eval / incidents:** Pass rate 93.1% (target ≥92%). One near-miss: draft cited deprecated refund rule—caught by checker; no customer send. Root cause: KB article not re-tagged after legal edit.

**3. Legal open items:** None.

**4. Decisions:** Promote shadow traffic from 50% to 80% of tier-2 queue; IT to add log field `policy_pack_version` by May 22.

**5. Actions:** Support ops — retag KB articles (due May 19). IT — log field (due May 22).

Minutes stored in risk register with link to [audit sample](/articles/audit-trails-for-ai-workflows/) for ticket #4821.

## Attendees

Executive sponsor (optional monthly), process owners for live workflows, IT representative, legal/compliance as needed, ops lead for metrics.

## Outputs

- Updated risk register (workflow × risk × mitigation).
- Decision log linked to audit trails.
- Changes to context packs or boundaries—not slide decks only.

## Tips

- Cap demos at five minutes; prioritize decisions and actions.
- Track **mean time to process update** after incidents—governance velocity matters.
- Pause promotion votes when eval sample size is below agreed threshold.

## What to do Monday

1. Schedule the next 60-minute slot before leaving the current meeting.
2. Copy the sample minutes format into your wiki.
3. Require one metric and one decision per session.
