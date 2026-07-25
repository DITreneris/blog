---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-06-15
faq:
- answer: Before pilot traffic scales and before any promotion when ownership is unclear.
    Fill one workflow first—do not wait for enterprise-wide policy to be perfect.
  question: When should we fill the governance RACI worksheet?
- answer: Prompt promotion, eval set changes, incident response, and production rollback
    each need exactly one Accountable owner—not a committee or shared inbox.
  question: Which activities must have a single Accountable owner?
- answer: This worksheet is the copy-paste RACI for one workflow. The roles playbook
    defines standing responsibilities, escalation paths, and forum cadence across
    the program.
  question: How does this worksheet relate to the AI governance roles playbook?
hero_image: images/articles/governance-raci-worksheet/hero.png
hero_caption: "Assign clear owners for AI changes, releases, and incidents before pilot traffic scales."
howto_steps:
- name: Pick one workflow ID
  text: Choose a single workflow identifier (for example support-reply-v3) so ownership
    is scoped to one production path.
- name: Name real people for each RACI column
  text: Assign Exec Sponsor, Process Owner, IT/Platform, Legal/Compliance, and Ops/QA
    Lead with people or named roles—not team labels alone.
- name: Fill every activity row
  text: Complete the core activity table without blanks; add domain rows only after
    core rows have owners.
- name: Review on cadence
  text: Revisit the table in the monthly risk forum and after each major workflow release.
key_takeaway: Fill this RACI before pilot traffic scales—incident response depends on named owners, not shared responsibility.
reading_time: 3 min read
slug: governance-raci-worksheet
status: published
summary: Copy-paste RACI worksheet to assign accountable owners for AI workflow changes, releases, and incidents.
title: "Governance RACI Worksheet"
tags:
  - templates
  - governance
  - change-management
  - workflow-automation
---

Use this worksheet when your team says "we have AI governance" but cannot name who is accountable when a workflow changes or fails. Copy it into your wiki, ticket, or runbook. Fill every cell with a person or role before promotion from pilot to broader traffic.

This template complements the full playbook in [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/). Start small: one workflow, one page, one accountable owner for each critical activity.

## How to use

Treat this worksheet as a living contract, not a one-time compliance checkbox. Governance fails when roles live only in slide decks and disappear the week after launch. Assign real people or named roles before pilot traffic increases, then revisit the table when workflow scope, policy packs, or connectors change.

1. Pick one workflow ID (for example `support-reply-v3`).
2. Name real people/roles for each RACI column.
3. Fill the activity rows without leaving blanks.
4. Review during monthly risk forum and after each major workflow release.

RACI key: **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed. If two columns show the same name for every row, you have not differentiated decision rights—you have copied a title block. Split accountability so Legal owns policy assertions, IT owns connector scope, and the process owner owns eval pass rate.

## Copy-paste worksheet table

The table below is the minimum activity set for a customer-facing or controller-facing workflow in v1. Add rows for domain-specific steps—tender legal review, finance variance sign-off—but do not delete core rows to save time. Empty cells are where incidents go to die: when audit asks who approved a prompt bump, "the team" is not an answer.

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

Paste the block below directly under the RACI table in your wiki or ticket system. These fields tie ownership to versioned artifacts—the same IDs your [audit trail](/articles/audit-trails-for-ai-workflows/) and [prompt registry](/articles/prompt-registry-playbook/) rows should reference. Update them when pins change; stale version numbers in RACI notes are a common source of replay drill failures.

Use this section under the table in your internal docs:

- **Workflow ID:**  
- **Current release version:**  
- **Policy pack version:**  
- **Escalation channel:**  
- **Next review date:**  

## Quick quality checks

Run these checks before you declare the worksheet "done." They take five minutes and prevent the most common RACI failures we see in forum prep: duplicated accountability, missing rollback authority, and names that refer to reorged roles from last quarter.

- No row has more than one **A**.
- Every row has at least one **R**.
- Owner names are current (not former roles).
- Rollback authority is explicit before incidents happen.

Governance becomes operational only when ownership is visible in the workflow itself. If this table is complete and reviewed regularly, incident response is faster, releases are cleaner, and accountability no longer depends on memory.
