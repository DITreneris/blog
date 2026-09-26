---
authors: Prompt Anatomy
body_locked: true
category: Opinion
content_tier: opinion
date: 2026-09-26
faq:
- answer: A checked result of this send. A PDF preference may color the draft. Approval
    may allow the send. Neither one writes sent.
  question: What may mark the email sent?
- answer: Write the email field from this send's result before you retry or mark
    the step complete. Not sent is not proof the email never left, and an open
    step is not a reason to send again.
  question: What if the record still says not sent after a successful send?
hero_caption: Approval may allow this send. Only a checked result of the send may
  be written as done.
hero_image: images/articles/memory-is-not-state/hero.png
key_takeaway: Memory prepares the draft and approval allows the send. If the send
  result and the job record disagree, write the field from the result and do
  not send again until they match.
slug: memory-is-not-state
status: published
summary: Memory prepares the draft. Approval says whether this send may happen.
  Only a checked result of this send may be written as done.
tags:
- memory
- agents
title: Memory Is Not State
---

An agent drafting a new proposal retrieves last quarter's thread. The client thanked the team for a PDF that already went out. The agent copies that outcome onto this job and treats the email as sent. The thanks were real. They belonged to the previous proposal.

## What each field may do

These roles can live in one record. The split is use, not a second database.

| Role | Rule |
|------|------|
| Prepare | A PDF preference may color the draft. It must not mark the email sent. |
| Allow | Approval on this job may allow the send. A past thread must not allow it. |
| Complete | This send's checked result may write sent. Last quarter's thanks must not, and the job record alone must not. |

Name that gate in the path before an agent may advance the step. [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) is where it belongs.

## Permission is not proof

**Approval: approved** is not **Email: sent**. One answers whether this send may happen. The other answers whether this send went out. An approved proposal can sit beside an email field that is still open. The agent may draft and wait. It may not treat the approval as the receipt.

Retrieved memory still enters this run. It does not update the job. How you choose what to keep is covered in [Memory Types for AI Systems](/articles/memory-types-for-ai-systems/).

## Reconcile before you retry

A send can succeed while the status update fails. If the agent treats "not sent" as proof the email never left, it sends again. Compare the provider result for this message with the email field on this job. If the send result and the job record disagree, reconcile them before retrying or marking the step complete. Write the email field from this send's result, and do not send again until the field matches that result.

Name the preference that may color the draft. Name the approval that may allow the send. Write sent only from this send's checked result.
