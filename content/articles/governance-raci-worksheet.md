---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-07-25
hero_image: images/articles/governance-raci-worksheet/hero.png
hero_caption: "Copy-paste RACI worksheet — accountable owners for AI workflow changes, releases, and incidents."
key_takeaway: Fill this RACI before pilot traffic scales—incident response depends on named owners, not shared responsibility.
reading_time: 3 min read
slug: governance-raci-worksheet
status: published
summary: Copy-paste RACI worksheet to assign accountable owners for AI workflow changes, releases, and incidents.
title: "Governance RACI Worksheet (Template)"
tags:
  - templates
  - governance
  - change-management
  - workflow-automation
---

Use this worksheet when your team says "we have AI governance" but cannot name who is accountable when a workflow changes or fails. Copy it into your wiki, ticket, or runbook. Fill every cell with a person or role before promotion from pilot to broader traffic.

This template complements the full playbook in [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/). Start small: one workflow, one page, one accountable owner for each critical activity.

## How to use

1. Pick one workflow ID (for example `support-reply-v3`).
2. Name real people/roles for each RACI column.
3. Fill the activity rows without leaving blanks.
4. Review during monthly risk forum and after each major workflow release.

RACI key: **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed.

## Copy-paste worksheet table

| Activity | Exec Sponsor | Process Owner | IT / Platform | Legal / Compliance | Ops / QA Lead |
|----------|--------------|---------------|---------------|--------------------|---------------|
| Approve workflow launch scope | | | | | |
| Approve prompt/policy release | | | | | |
| Maintain eval set and thresholds | | | | | |
| Enforce data boundaries / tool allowlists | | | | | |
| Own incident triage and escalation | | | | | |
| Approve rollback / kill switch use | | | | | |
| Maintain audit log retention and access | | | | | |
| Monthly risk review reporting | | | | | |

## Optional notes block

Use this section under the table in your internal docs:

- **Workflow ID:**  
- **Current release version:**  
- **Policy pack version:**  
- **Escalation channel:**  
- **Next review date:**  

## Quick quality checks

- No row has more than one **A**.
- Every row has at least one **R**.
- Owner names are current (not former roles).
- Rollback authority is explicit before incidents happen.

Governance becomes operational only when ownership is visible in the workflow itself. If this table is complete and reviewed regularly, incident response is faster, releases are cleaner, and accountability no longer depends on memory.
