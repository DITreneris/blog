---
authors: Prompt Anatomy
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-04-02
faq:
- answer: AI drafts inside approved context; humans review and send; eval catches
    policy and number errors before broader use.
  question: What is the controlled draft-and-review pattern in finance?
- answer: Material misstatements and policy breaches are high cost—auto-send is not
    a v1 default for controller-facing outputs.
  question: Why keep humans in the finance send path?
- answer: Held-out eval pass rate, named owners, and audit fields for prompt/context
    versions on each draft.
  question: What evidence did the pilot need before scaling?
hero_caption: Finance close assist — draft variance narratives from approved GL extracts,
  mandatory controller review before any external send.
hero_image: images/articles/finance-workflow-case-study-controlled-draft-and-review/hero.png
key_takeaway: Finance AI works when drafts pull from signed GL extracts and controllers
  sign every variance narrative before it leaves the building.
reading_time: 5 min read
slug: finance-workflow-case-study-controlled-draft-and-review
status: published
summary: How Northline B2B piloted AI-assisted variance narratives for month-end close—with
  signed GL extracts, controller review gates, and audit rows tied to registry pins.
tags:
- northline
- governance
- change-management
title: Finance Workflow Case Study
---

*Anonymized composite (Northline B2B)—multiple implementations.*

## Situation

After the support queue pilot succeeded, Northline's finance team asked whether AI could shorten month-end variance narratives—the paragraphs controllers attach to GL line items when actuals diverge from forecast. Controllers spent four to six hours each close rephrasing the same explanations: FX movement, timing on vendor invoices, headcount reclasses. Junior staff pasted numbers into chat tools and produced fluent narratives that sometimes cited the wrong period or wrong cost center because the model never saw the signed extract.

Leadership wanted speed; the controller wanted **evidence**. The team scored the effort against [implementation maturity](/articles/ai-implementation-maturity-ladder/) at Level 2—repeatable workflow design, not yet eval-gated production. They agreed to treat finance as a **second vertical proof** with stricter boundaries than support: no model sees raw bank feeds; no auto-post to the ERP; every narrative requires controller sign-off before export to the board pack.

## Approach

The program cloned the support pattern—canvas, registry, eval—but tightened data boundaries per [data boundaries for AI agents](/articles/data-boundaries-for-ai-agents/). Workflow ID `finance-variance-v1` pulled only from **controller-signed GL extracts** (CSV export tagged `finance-close-2026-03`, hash logged). Prompt assembly followed [context architecture](/articles/what-is-context-architecture/) rules: static policy (rounding, materiality thresholds) separated from dynamic line-item context.

**Draft step:** model produced variance narrative per line item above materiality threshold. **Checker step:** rule engine verified period, cost center, and currency matched extract metadata. **Human gate:** controller edited or rejected each narrative; rejections fed the eval set within forty-eight hours. **Audit:** every row logged prompt version, extract hash, and controller ID per [audit trails for AI workflows](/articles/audit-trails-for-ai-workflows/).

Governance followed existing RACI from [roles and ownership](/articles/ai-governance-roles-and-ownership/)—Finance ops accountable, IT responsible for extract pipeline, Legal consulted on retention. Monthly [risk forum](/articles/ai-risk-review-cadence/) reviewed override reasons; no traffic increase until pass rate held.

## Eval and change control

Finance could not reuse support's twenty-five ticket eval set. The team built **eighteen held-out variance scenarios** with known-good narratives—fail on wrong period, immaterial line promoted, or missing FX disclosure. Smoke gate: ten scenarios, one hundred percent pass before any controller used AI drafts in production close.

**Change log discipline** mattered: when GL mapping changed or a new materiality rule shipped, Finance updated the [prompt registry](/articles/prompt-registry-playbook/) row and re-ran smoke before the next close. Controllers refused "silent upgrades" after a near-miss where an overnight model swap changed rounding language. The team adopted the change log template in [AI Change Log Template](/articles/ai-change-log-template-prompt-context-and-model-updates/) for every prompt, context, and extract version bump.

## Results (ranges)

Metrics focused on **controller hours on narrative drafting** and **rework rate** (narratives sent back for factual correction)—not drafts generated.

| Metric | Before (3 closes avg) | After (4 closes pilot) |
|--------|----------------------|------------------------|
| Controller hours on narratives | baseline | ~25% lower |
| Rework rate (factual correction) | moderate | down ~40% |
| Time-to-first-draft per material line | manual | ~60% faster |
| Audit replay success | ad hoc | 100% on sample drill |

Activity metrics (tokens, drafts) were reported but **excluded from promotion decisions**—aligned with [measuring AI workflow ROI](/articles/measuring-ai-workflow-roi/) guidance.

## Lessons

Finance proved the support playbook **transfers across verticals** when boundaries tighten rather than loosen. Signed extracts beat "upload the spreadsheet to chat." Controller sign-off remained non-negotiable—AI shortened first drafts, not accountability. Linking registry pins to board-pack footnotes reduced audit friction in quarter two.

The team would have moved faster with the change log template from week one; ad hoc Slack announcements of prompt updates eroded trust. Starting eval scenarios before the first close workshop would have caught period-mismatch failures earlier.

## What they would do differently

Involve controllers in eval case authoring in week one—not week four after the first wrong-period narrative. Pre-wire extract hash validation before any model call; retrofits cost a full close cycle. Assign a finance deputy owner before year-end close overlapped the pilot.

## Next step for readers

If month-end narratives consume controller time but your data boundaries are unclear, pause tool trials, map allow/deny for GL exports, and run smoke eval on held-out scenarios before the next close. Support queue proof: [From Vibe Prompting to a Structured Support Workflow](/articles/case-study-vibe-prompting-to-structured-workflow/). Tender pipeline variant: [AI Tender Response Pipeline](/articles/ai-tender-response-pipeline/).
