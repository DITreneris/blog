---
authors: Prompt Anatomy
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-10-04
faq:
- answer: The renewal after Part 2. Northline kept the vendor host and the right
    to withhold the production pin the host runs. A failed smoke job stops the
    merge that would move that pin.
  question: What does Northline Part 3 cover?
- answer: One console for policy packs, eval cases, and the audit export, run by
    the vendor. The demo could not tie a known-bad run to a policy pack version,
    and rejecting a prompt change opened a ticket. That missed their bar for
    blocking a pin themselves.
  question: What did they refuse at renewal?
- answer: The playbook names the split. This case says what "own the eval" has
    to mean in practice. Git holds the case file and the pin. The audit log holds
    the run. The smoke job stops the merge.
  question: How does this relate to buy versus build?
hero_caption: Renewal split — the vendor host stays; a failed smoke job holds
  the production pin.
hero_image: images/articles/northline-part-3-runtime-kept/hero.png
key_takeaway: Northline renewed the vendor host and kept the right to withhold
  the production pin. A failed smoke job stops the merge. The eval file in git
  does not stop the vendor by itself.
slug: northline-part-3-runtime-kept
status: published
summary: Northline renewed the vendor host and kept the right to withhold the
  production pin.
tags:
- northline
- eval
- governance
- case-studies
title: "They Renewed the AI Platform—and Kept Release Control"
---

*Northline · Part 3. Anonymized composite (Northline B2B)—several implementations, not one audited company. The bands below are illustrative ranges carried from [Part 2](/articles/northline-part-2-scaling-eval-coverage/). Handle time there is the assisted queue, where a person still sent the reply. Shadow percent is how much of that queue the draft ran on. Neither figure is a new measurement for this renewal.*

## Renewal quarter

The quote arrived while that assisted queue was still on the Part 2 pattern: drafts on most of the queue, a person still sending, pass rate in the same band. The sponsor wanted the host for another year. The account team added a governance module that would hold policy packs, eval cases, and the audit export in the vendor tenant.

The offer was concrete. One console, operated by the vendor, would have spared Legal the join between a git pin and a log row. The question they actually had to answer was narrower. Could they still withhold a production pin without opening a ticket?

## What the module could not show

In the demo, rejecting a prompt change opened a vendor ticket. The export of the deprecated-refund near-miss returned the model text and a timestamp. It had no `policy_pack_version`, so the row could not be tied to a pack. The module missed their requirement to block a pin themselves. That is a miss against their bar. It is not evidence that every governance console fails this way.

Keeping the bar had a cost they were already paying. IT runs smoke on prompt and context pull requests. Support ops runs the full case set each week. They still own the log schema. Moving those into the module would have handed that calendar to the vendor. They declined the line item. The host stayed on the quote.

## What blocks the pin

Git and the audit log are different stores.

Git holds the policy pack, the prompt pin, and the eval file. The [audit log](/articles/audit-trails-for-ai-workflows/) holds the run. A row carries workflow id, pack version, prompt pin, actor, and UTC time. Reading the row reconstructs what was live. It does not run the model again.

The host executes the production pin they have promoted. The block is the smoke job in [evaluation hooks](/articles/evaluation-hooks-for-ai-workflows/): ten cases, all must pass, on pull requests that touch prompt or context files. A failed smoke stops that merge. The process owner withholds promotion. If a pin has already shipped, IT rolls it back. The YAML is the case file the job runs. A file in a repository does not stop a vendor scheduler.

## The split they kept

The exhibit is the hybrid from [When to Buy vs Build an Agent Stack](/articles/buy-vs-build-agent-stack/):

| Layer | Vendor host | Their side |
|-------|-------------|------------|
| Runtime | Renewed | — |
| Connectors already live | Stay | Permission policy stays with the workflow |
| Policy packs and prompt pins | — | Git; Legal bumps the pack |
| Eval file | — | Git; the smoke job stops the merge |
| Run record | Export when the row is complete | Audit log, pointing at pack version and pin |

Human send on customer replies stayed. The renewal added no second workflow.

## One near-miss, two checks

They used the deprecated-refund run from the Part 2 window, caught before send.

Reconstructing the run meant reading the log row and checking that `policy_pack_version` named a pack still in git. The module export could have matched two packs, because the version was missing. Their row named one.

Re-running the case is the other check. The next prompt change had to pass smoke before the pin moved. The forum withheld that pin for about a week. Treat the week like the ranges above: an illustration of the hold inside the composite, not a clock from one contract. The host renewal went through. Handle time on the assisted queue stayed in the Part 2 band. That is the result. Control survived the quote. The queue did not get a new gain.

## On a renewal call

1. Write the split: what the vendor runs, and which pin you promote.
2. Reconstruct one known-bad run from the log row. Require `policy_pack_version`.
3. Confirm a failed smoke job stops the merge that would move the pin, with no vendor ticket on that path.
4. Renew the host after those two checks exist.

Copy-paste gates for the job: [AI Workflow Eval Checklist](/articles/ai-workflow-eval-checklist/).
