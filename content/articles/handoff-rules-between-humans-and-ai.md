---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
date: 2025-02-15
hero_image: images/articles/handoff-rules-between-humans-and-ai/hero.png
hero_caption: "Explicit triggers and owners for when AI drafts, when humans decide, and when work returns to the queue."
key_takeaway: Handoffs need triggers, owners, and SLAs—same as human-to-human process design.
reading_time: 5 min read
slug: handoff-rules-between-humans-and-ai
status: published
summary: Define when AI drafts, when humans decide, and when work returns to the queue—with SLAs and evidence.
title: Handoff Rules Between Humans and AI
faq:
  - question: What makes a human-AI handoff rule operational?
    answer: Each rule needs a trigger, what the AI stops doing, the human action required, an owner role, and an SLA—logged in audit trails like any other workflow step.
  - question: Is "human in the loop" enough without triggers?
    answer: No. Without explicit triggers and SLAs, reviewers guess when to intervene and automation silently ships risky outputs under queue pressure.
---

Blurry handoffs create silent risk: the model assumed someone would check; the human assumed the model was sure; the queue shows "waiting on AI" while customers wait. Handoff rules are the same discipline you use between shifts in operations—**triggers, owners, SLAs, and evidence**—not hope that reviewers "usually catch issues."

Define rules per workflow ID on the [workflow canvas](/articles/ai-workflow-canvas-template/), log reasons in [audit trails](/articles/audit-trails-for-ai-workflows/), and review overrides in [risk forum](/articles/ai-risk-review-cadence/). Agent orchestration from [multi-agent handoff pattern](/articles/multi-agent-handoff-pattern/) still ends in human gates for customer commitments in v1. Context overflow often breaks handoffs silently — see [Tokens and Context Window Limits](/articles/tokens-and-context-window-limits/).

## Why explicit triggers beat generic "human in the loop"

"In the loop" without triggers means everyone loops differently. Triggers make automation **stop** at known boundaries: confidence score, policy keyword, customer tier, eval failure on deploy, boundary denial. Each trigger maps to **AI stops**, **human action**, and **SLA** so capacity planning is possible.

Northline `support-reply-v3` blocks auto-send always—trigger is every customer reply. Tender pipeline blocks PDF export until Legal reviewer ID on indemnity sections—different trigger, same discipline.

## Handoff table (template)

Copy into your canvas wiki page; fill with real roles and times, not placeholders.

| Trigger | AI stops | Human action | SLA |
|---------|----------|--------------|-----|
| Low confidence | Draft only | Review all fields | 4h business |
| Policy keyword | No send | Legal review | 1 business day |
| Customer tier A | Suggest | Account owner approves | 2h |
| Eval failure on deploy | Block release | Owner + IT | Immediate |
| Boundary denied | No tool call | IT + owner triage | 4h business |
| VIP flag | Suggest only | Named approver send | 2h |

**Low confidence** thresholds must be calibrated on eval—do not set once and forget after model swap. **Policy keyword** lists come from Legal and version with policy pack. **Eval failure on deploy** connects to [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) smoke in CI—human action is rollback, not debate in chat.

External-facing automation—social replies, outreach drafts, engagement bots—needs the same trigger table: human send gates, rate limits, and logged overrides before anything reaches customers or public channels.
## Evidence and queue discipline

Handoff rules fail when CRM or ticket queues hide **why** work paused. Log handoff reason in the same store as [audit trails](/articles/audit-trails-for-ai-workflows/): `handoff_trigger`, `assigned_role`, `resolved_at`, and link to `workflow_version` so replay shows which prompt and policy pack applied. Queues should display human-readable states—`legal_review`, `eval_blocked`, `vip_approval`—not generic "pending" that forces operators to open five tools.

When work returns to queue, preserve case ID and prior draft hash so humans do not restart from zero unless intentional reset. Re-opening without context duplicates model calls and erodes trust in assist features. Northline stores `override_reason` on send; clustering reasons monthly in [risk forum](/articles/ai-risk-review-cadence/) drove template fixes faster than anecdotal complaints.

Override reasons are product signal: if `tone_softening` dominates, fix task template; if `policy_fix` dominates, fix context pack or Legal tags; if `confidence_hold` dominates, recalibrate thresholds on eval set. Without coded reasons, teams debate whether AI "helped" based on memory, not data.

## Aligning with agent and multi-step workflows

Multi-step and multi-agent setups multiply handoff points—each boundary needs the same trigger discipline as human-AI boundaries. Per-step handoffs use JSON payload `open_questions`: empty means proceed; non-empty blocks until a named human answers. Orchestrator code must not auto-clear questions to "keep flow moving"; that recreates vibe prompting with extra latency.

Checker steps between agents are handoffs too: draft agent to policy agent to human send. Skipping checker because the orchestrator "trusts" the draft agent treats agent chain as proof, which it is not. [Multi-agent handoff pattern](/articles/multi-agent-handoff-pattern/) defines payload shape; this article defines **who** acts when a step pauses and how long they have.

[How to design an AI agent workflow](/articles/how-to-design-an-ai-agent-workflow/) maps business tasks to steps; handoff tables belong on the canvas next to RACI. Tender pipelines add Legal reviewer handoff on indemnity sections; support workflows add mandatory agent send—the triggers differ, the logging requirements do not.

## Operating handoffs Monday morning

Start with one live workflow that already touched a customer last month. Interview three operators: when did they last override AI, and what did they assume about review? List three triggers from incidents and near-misses—even if informal. Add rows to the handoff table with real names, not role titles alone. Verify staging logs capture `handoff_trigger` codes IT can query.

Run ten-case override sample before next [risk forum](/articles/ai-risk-review-cadence/); bring patterns to forum as actions, not discussion topics. Schedule thirty-day review to calibrate confidence thresholds after any model vendor change. Handoffs only work when triggers are exercised in drills, not only documented after an audit finding.

Handoffs need triggers, owners, and SLAs—the same way human-to-human process design works when you mean it.
