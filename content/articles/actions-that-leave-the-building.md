---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2026-10-23
modified: 2026-10-24
faq:
- question: Can a draft or a tag run without approval?
  answer: Only when it triggers no further action. A tag that starts another workflow, or a status change that writes the customer record, is not that kind of draft.
- question: Does this workflow require approval for every external send, payment, and financial record change?
  answer: Yes. That is the policy for this workflow. Permission to use the tool is not approval for this action.
- question: Does last month's approval cover the next send?
  answer: No. Last month's credit finished on a different invoice. A thank-you in the thread records that an earlier message arrived. It does not approve the next send.
hero_caption: "The draft stayed in the ticket. The email and the credit required approval."
hero_image: images/articles/actions-that-leave-the-building/hero.png
key_takeaway: Permission to use the tool is not approval for this action.
slug: actions-that-leave-the-building
status: published
summary: For this workflow, every external send, payment, and financial record change requires approval.
tags:
- governance
- agents
title: Actions That Leave the Building
---

Northline B2B is a composite: several implementations, not one audited company. On workflow `invoice-reply-v1`, a customer asks for a copy of one invoice. For this workflow, every external send, payment, and financial record change requires approval. The agent may draft the reply and tag the case. Sending the email requires approval. A credit would be a separate action, outside the customer's request, and it requires approval too.

The billing connector can already open the invoice. Permission to use that tool is not approval for this email or this credit. [The permission sheet](/articles/if-the-agent-believes-the-document/) marks each action Allow, Block, or Review. This policy names which of those actions require approval before they run.

A draft or a tag can run without approval only when it triggers no further action. A tag that starts another workflow, or a status change that writes the customer record, is not that kind of draft.

A correction email can follow a send. The first email has still left. Whether an action can be undone is a later test.

## This action, not the last one

Last month Northline approved a credit on a different invoice. That approval finished then. A thank-you in the thread records that an earlier message arrived. It does not approve the next send.

For email, approval covers the recipient, the message, and the attachments. For a credit, approval covers the invoice, the amount, and the currency. [The check before the action runs](/articles/when-prompt-injection-becomes-an-action/) runs again when any approved detail changes.

When the mail provider reports the message sent and the ticket still says draft, write the ticket field from the provider result. Do not send again until they match.

## One workflow, four actions

The customer asked for a copy of one invoice. The draft and the tag can finish inside that request when they trigger nothing further. The email and the credit are further actions.

| Action | Where it lands | Approval required? |
| --- | --- | --- |
| Draft the reply | Inside the ticket | No |
| Tag the case | Inside the ticket | No |
| Send the email | Outside | Yes |
| Post the credit | The invoice record | Yes |

The copy can be drafted before anyone approves the send. The credit stays off the invoice until this invoice, this amount, and this currency are approved. A credit changes the invoice balance. A refund moves money. Under this policy, both require approval.

[Handoff rules](/articles/handoff-rules-between-humans-and-ai/) name the trigger, the owner, and the time. [Five levels of AI control](/articles/five-levels-of-ai-control/) is the ladder this gate sits on.

## Monday: check one gate

Pick one live workflow that can draft and can also send, pay, or change a financial record.

For each action, write three lines:

1. What does this action change?
2. Does this workflow require approval for it?
3. Which details does that approval cover?

Test one approval gate: approve an email, change its attachment, and confirm the workflow asks for approval again.

- Do not run an attack.
