---
authors: Prompt Anatomy
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-10-10
faq:
- question: What must the credit draft get right before a person posts it?
  answer: Confirm that the invoice belongs to the customer named in the draft. State the amount and the currency. Include a basis, or name the basis as missing. Do not invent one. Leave the amount unapproved when it is above the limit for that invoice.
- question: Can tests from the support job be reused on the credit draft?
  answer: Shared checks can, after the team confirms they still apply. Access, data limits, and a block on untrusted instructions are examples. Those checks do not accept the credit draft. A pass on the support job is not a pass on this one.
- question: Who posts the credit?
  answer: A person in billing, after a named approver accepts the draft. The tool that writes the draft has no post action.
hero_caption: "Illustrative test. The copied support check passed. The amount, the customer, and the basis were still wrong. The draft was held."
hero_image: images/articles/northline-part-4-second-workflow/hero.png
key_takeaway: Passing the old workflow's checks does not prove the new workflow is ready.
slug: northline-part-4-second-workflow
status: published
summary: An illustrative test shows how a copied support rule can pass a credit draft with the wrong amount, customer, and basis.
tags:
- northline
- eval
- governance
- case-studies
title: The Copied Rule Missed the Credit
---

*Northline · Part 4. Anonymized composite (Northline B2B)—several implementations, not one audited company. The credit check below is an illustration, not a ticket from one company. [Part 3](/articles/northline-part-3-runtime-kept/) kept the vendor host. This part adds a second job on that host: a draft of a credit memo. Figures from the support queue are not evidence about this job.*

## Copy the support job

The sponsor asked to clone `support-reply-v3` onto credit memos. Same written rules, same test file, new display name. The model would draft the credit. A person in billing would post it to the account.

## The rule that cannot see a credit

The process owner checked a sample draft against the copied rule.

The support rule says: do not promise a refund in the reply. That rule looks at wording. The draft has to do four things before anyone posts:

- Confirm that the invoice belongs to the customer named in the draft.
- State the amount and the currency.
- Give the basis for the credit, or name it as missing.
- Leave the amount unapproved when it is above the limit for that invoice.

Posting is a different action. The tool that writes the draft cannot post. Billing posts only after the named approver accepts that draft. Blocking the post does not tell you the draft was right.

## What can be reused

The vendor host stayed. The credit job got its own name, so a change to support replies is not a change to credit drafts.

Some tests travel, once someone checks they still fit this job. Who may call the tool. Which records it may read. That text inside a document cannot add a post action. [Evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/) are where that short run sits, on the file for the change in front of you.

A separate file is not, by itself, a good test. An inherited case is not, by itself, a bad one. The support file's refund case still belongs on support replies. It does not tell you whether a credit amount is allowed. A passing support job does not accept the credit job.

## An illustrative miss

This run is an illustration inside the composite. It is not a ticket from one company, and it is not a measured rate.

The draft asked for more credit than the invoice rule allows. The customer on the draft was not the invoice owner. The basis was blank.

The draft passed the copied support check. It did not promise a refund. Nothing in that rule compared the amount with the limit, compared the customer with the invoice owner, or noticed the blank basis.

The team added those three checks and ran the same draft again. The draft was held. The amount was not marked approved. The mismatch and the missing basis were written out, not filled in. The tool still could not post.

## Before the next copied job

Reuse the host if it still fits. Re-read shared tests and keep the ones that still apply. Write acceptance checks for what this job can get wrong. Confirm the drafting tool cannot perform the posting a person is accountable for.

Copy-paste gates for the run: [AI Workflow Eval Checklist](/articles/ai-workflow-eval-checklist/).
