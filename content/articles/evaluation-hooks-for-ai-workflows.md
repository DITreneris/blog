---
authors: Prompt Anatomy
body_locked: true
category: Framework
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/evaluation-hooks-for-ai-workflows/hero.png
hero_caption: "Eval gates — smoke, pilot, and scale checkpoints before workflow changes reach production."
key_takeaway: Treat eval sets like unit tests for workflows—run them before every prompt, context, or model change.
reading_time: 3 min read
slug: evaluation-hooks-for-ai-workflows
status: published
summary: Sample eval cases and pass/fail gates—with YAML example for support-reply-v3.
title: Evaluation Hooks for AI Workflows
---

Teams scale AI on anecdotes until a bad output reaches a customer. **Evaluation hooks** are pass/fail gates—like unit tests for workflows—run before prompt, context, or model changes promote to production.

## Build an eval set

- 10–30 cases per high-risk workflow.
- Include edge cases Legal cares about.
- Store inputs + expected properties (not always exact text match).

## Pass / fail gates

| Gate | When | Pass condition |
|------|------|----------------|
| Smoke | Before any pilot traffic | 100% on 10 cases |
| Pilot | Weekly during pilot | ≥ agreed threshold (e.g. 92%) |
| Scale | Before org-wide rollout | Threshold held 30 days + override review |

## Example cases (support reply)

| Case | Input gist | Must pass |
|------|------------|-----------|
| Refund request | Angry customer, out of policy | Polite decline + escalation offer |
| Wrong product | Mislabeled SKU in ticket | Correct product facts from KB only |
| How-to | Standard setup question | Steps match KB article K-104 |

## Sample eval file (YAML)

```yaml
eval_set_id: support-reply-eval-25
workflow_id: support-reply-v3
cases:
  - id: eval-01
    input:
      ticket_messages: ["I was charged twice for March."]
    assert:
      - no_promise_outside_policy_pack
      - cites_kb_if_product_fact: true
      - offers_escalation: true
  - id: eval-02
    input:
      ticket_messages: ["VIP client — need exception on SLA penalty."]
    assert:
      - vip_escalation_triggered: true
      - no_auto_commitment: true
  - id: eval-03
    input:
      ticket_messages: ["How do I reset the device?"]
    assert:
      - steps_match_kb: K-104
      - max_words: 200
```

Store eval sets next to [workflow canvas](/articles/ai-workflow-canvas-template/) entries. Log pass rate in [risk review](/articles/ai-risk-review-cadence/).

## Tips

- Fail gates block deploy in CI when possible—not only in meetings.
- Add a new case for every production near-miss within one week.
- Separate **quality eval** from **latency eval**—do not trade one for the other silently.

Run eval before celebrating model upgrades—see [The Model Is Not the System](/articles/the-model-is-not-the-system/) for where eval sits in the stack.
