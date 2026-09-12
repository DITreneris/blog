---
authors: Prompt Anatomy
body_locked: true
category: Opinion
content_tier: opinion
date: 2026-09-12
faq:
- question: What does a hunter agent actually do?
  answer: It retrieves only the records needed for the current hunt, finds publicly
    listed business contacts that match the workflow's outreach rules, and returns
    ten to twelve rows with evidence and a verdict—GO, HOLD, or NO-GO. It does not
    send. A named human reviews, then a separate action sends.
- question: Why shouldn't a research agent also send mail?
  answer: Finding is not permission to contact. Research is reversible. A send is
    not. Keep the finder off SMTP, CRM writes, and guessed addresses. A named human
    authorizes GO, then sends.
- question: What is HOLD versus NO-GO?
  answer: GO means evidence supports personal outreach. HOLD means the person is
    technically contactable but confidence or relevance is too low—human judgment
    required, not a second click. NO-GO means policy or evidence says stop—suppression,
    explicit OUT, prestige-only, a guessed email, or no listed address.
hero_caption: Hunter finds. You send.
hero_image: images/articles/a-shortlist-not-another-inbox/hero.png
slug: a-shortlist-not-another-inbox
status: published
summary: A hunter agent finds, checks evidence, returns ten candidates, and stops.
  That stop is the product—not a smaller inbox.
tags:
- agents
- governance
- change-management
title: A Shortlist, Not Another Inbox
---

Most B2B teams do not have a CRM problem. They have a **judgment** problem.

I used to want an agent that found prospects and contacted them for me. In 2002 I had just started as a writer and project manager in a PR agency. Finding the next client sat next to the writing. I wanted a hunter so I could write. That hunter would have burned the channel.

Now that we can build one, I do not want that agent anymore. I want a scout. It finds. It checks. It shows its evidence. It gives me ten candidates. Then it stops. **Hunter finds. You send.** That split is the product, not a limitation.

## What Hunter actually returns

The hunt ends with a **shortlist**. Ten to twelve candidates. Each row is a named account, listed business contact details that match the outreach rules—or an honest blank—and one mark. Never a guessed `firstname.lastname@`. If listed contacts are scarce, the table is short and says why.

| Card | Meaning | Next |
|------|---------|------|
| **GO** | Evidence supports personal outreach | You may authorize a send |
| **HOLD** | Technically contactable; confidence or relevance is too low | Human judgment. Not the same send as GO |
| **NO-GO** | Policy or evidence says stop | Never |

HOLD is not two clicks. It is insufficient confidence. NO-GO is suppression, explicit OUT, prestige-only, guesswork, or no listed address. The scout retrieves only the records for this hunt. It does not load the whole pipeline into context. The hunt ends with the shortlist. It does not quietly become an outreach workflow.

## Why stopping matters

Finding is not permission to contact. “Publicly listed” is not the same as unrestricted outreach. Suppression and policy run **before** copy. A named human confirms which GO rows may proceed. Sending is a separate action, from your name. Pipeline state changes only after something actually happened—a sent letter, a reply, a lost reason—never after a model hoped.

You cannot automate a process you do not understand. That is the same order as [3A Before You Build an Agent](/articles/3a-before-you-build-an-agent/), and the same risk class as [AI Outreach with Outlook Guardrails](/articles/ai-outreach-with-outlook-guardrails/): draft, then a click. Bounded tasks still live in [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/).

More automation does not solve weak selection. It only scales it.

## Who may act

Separate the work: research → judgment → authorization → action → state update. Most demos celebrate find → write → send → update the CRM. The useful design is find → evaluate → **STOP**, and only after authorization does another workflow act.

The bottleneck is not another tool. It is **who may act**. AI agents become useful when we stop asking only what the model can do, and start defining what it is allowed to do without us.

Hunter is not a product inside Prompt Anatomy. It is an example of what the Agent path on [promptanatomy.app](https://www.promptanatomy.app/) teaches: how to decide what an agent may do, what requires review, and where it must stop. Build the decision boundary before you build the send button.
