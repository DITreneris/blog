---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-07-18
faq:
- answer: No—Corporate Ladder is a satirical Mini App on promptanatomy.lol with a Web App
    game stack. This field note is about a manifest-backed curriculum CMS; Telegram is
    one delivery adapter today. See Corporate Ladder Soft Launch and Telegram Game Stack
    for play, not this article.
  question: Is this the same as Corporate Ladder?
- answer: Only for exceptional one-offs. Routine edits go through posts.json and polls.json,
    then sync_queue_from_posts.py regenerates content.json. Hand-editing the manifest at
    scale is how queue order, poll links, and PNG paths drift apart.
  question: Should we hand-edit content.json?
hero_caption: Vercel CMS → posts.json + polls + PNG → sync queue → content.json → adapters
  (Telegram · X optional)—author once on Vercel; networks plug in, not the other way around.
hero_image: images/articles/manifest-before-you-broadcast/hero.png
key_takeaway: Prepare curriculum materials once on Vercel, sync the manifest, then broadcast
  through channel adapters—micro-lessons in daily rhythm, with a human still owning publish.
slug: manifest-before-you-broadcast
status: published
summary: Two hundred thirty-four lessons do not fail because Telegram is hard—they fail when
  copy, visuals, and quizzes live in three places. Prompt Anatomy ships a manifest-backed
  broadcast CMS on Vercel; Telegram is today's adapter, not the product.
tags:
  - prompt-systems
  - workflow-automation
  - orchestration
  - change-management
title: Manifest Before You Broadcast
---

You do not wake up needing a Telegram bot. You wake up with **234 lesson cards**, PNGs, quizzes, and a campaign order—and the quiet fear that one quick fix in the wrong file breaks tomorrow's slot. Copy in a Sheet, visuals on disk, poll ids patched by hand in a manifest row: that is how post twelve's quiz stops matching post eleven's image. Prompt Anatomy answered that problem with a **content kitchen** in the open sister repo [DITreneris/telegram](https://github.com/DITreneris/telegram)—author on Vercel, sync once, broadcast through adapters. Telegram is where learners read today; it is not the system.

This field note covers what shipped, where the work actually happens, and how broadcast delivery sits beside governed implementation content on `.blog`. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## Where the curriculum kitchen started

*The curriculum kitchen started with a personal note from founder Tomas Staniulis.*

For years I collected prompt lessons the way most operators collect tabs—Drive folders, slide decks, chat threads, a PNG here, a quiz there. Portions shipped in batches; the hard part was never writing the next card. It was keeping **materials honest** when the count crossed a hundred. LMS blocks assumed a desk and forty-five minutes. The people I wanted to reach read between meetings—morning scan, commute, end of day—when a photo, three paragraphs, and a poll fit where a course module did not.

The insight was boring and useful: **prepare once in one kitchen**, then let networks be outputs. Vercel became the workplace—edit copy, attach visuals, wire quizzes, publish when ready. The manifest became the contract. Telegram happened to be the first adapter that felt native for micro-lessons; it could have been another surface. The repo is the CMS story; the channel is proof it ships.

## What we built

We built a **Broadcast / Learn CMS**—not a channel product with a side spreadsheet.

**It is:**

- A **Vercel-hosted content kitchen**—`web/`, `posts.json`, poll sync, and `api/publish` where operators edit before anything sends
- A **234-post curriculum** collected in one repo—lesson copy, PNG paths, `topic_key`, and linked quizzes
- A **manifest sync pipeline** (`posts.json`, `polls.json` → sync → `content.json`) with photo → text → poll items per lesson
- **Channel adapters**—Telegram ([@prompt_anatomy](https://t.me/prompt_anatomy)) in production; optional X mirror; other networks as homework
- A bridge back to `.blog` via [`data/blog_crosswalk.json`](https://github.com/DITreneris/telegram/blob/main/data/blog_crosswalk.json) for curated deep-read CTAs

**It is not:**

- Training checkout on `.app`, the enter lesson on `.cloud`, or satirical play on `.lol`
- An AI tutor runtime, LMS, or adaptive model inside a chat app
- An omnichannel CMS with Facebook, LinkedIn, and Discord already wired—those are **adapter homework** (API tiers, dev mode, media rules)
- Proof of enterprise AI maturity for procurement decks

That separation mirrors a rule we repeat on `.blog`: the kitchen is not the execution environment for your company's workflows. See [The Model Is Not the System](/articles/the-model-is-not-the-system/). Learners consume micro-lessons; implementers paste registry artifacts into governed stacks on their side—the architecture lesson is the same.

## Northline and three-place drift

Northline's enablement lead piloted a forty-item prompt curriculum to skip LMS rollout friction. Adoption looked strong until week two: post copy lived in a Sheet, someone renamed a PNG on disk, and a poll id was patched by hand in the manifest. Post twelve's quiz no longer matched post eleven's image. The prompts were fine; **three-place drift** was not. The fix was the same one the sister repo encodes: author on the Vercel path, sync the queue, never treat `content.json` as the editing surface at scale.

## Where the work happens (Vercel)

If you only open Telegram, you see the feed. If you operate the product, you live on **Vercel**.

| Surface on Vercel | Job |
|-------------------|-----|
| **`web/` + `posts.json`** | Lesson copy, visuals paths, topic keys—the editing surface |
| **Poll sync** | `data/polls.json` → web build payload; quizzes stay linked to posts |
| **`api/publish`** | Push a prepared item when the operator says go—not paste in chat |
| **Deploy** | Static UI and API ship together; the kitchen stays one URL |

Routine workflow: edit posts and polls in the repo kitchen, run sync, deploy Vercel, let adapters read the manifest. Copy edits trapped in chat logs or DMs are how teams lose the single source of truth before they lose the channel.

## Manifest pipeline

Treat the repo like a lightweight **prompt registry for curriculum**—same discipline as [Prompt Registry Playbook](/articles/prompt-registry-playbook/): single source of truth before anything sends.

| Artifact | Role |
|----------|------|
| [`web/public/posts.json`](https://github.com/DITreneris/telegram/blob/main/web/public/posts.json) | Lesson copy, `topic_key`, PNG paths |
| [`data/polls.json`](https://github.com/DITreneris/telegram/blob/main/data/polls.json) | Quiz bank linked by `related_post_id` |
| [`scripts/sync_queue_from_posts.py`](https://github.com/DITreneris/telegram/blob/main/scripts/sync_queue_from_posts.py) | Regenerate manifest—avoid hand-editing `content.json` |
| [`data/content.json`](https://github.com/DITreneris/telegram/blob/main/data/content.json) | Delivery manifest—photo, text, document, poll items |
| [`state_store.py`](https://github.com/DITreneris/telegram/blob/main/state_store.py) | Atomic queue progress—use `QUEUE_STATE_PATH` on Railway volume |
| [`data/post_journey_order.json`](https://github.com/DITreneris/telegram/blob/main/data/post_journey_order.json) | Optional curated deck order vs greedy interleaving |

Routine edits: change posts and polls, run sync, deploy. CI runs `audit_posts_png_quizzes.py` so PNG, post, and poll coverage stay aligned—registry thinking for a broadcast product.

## Habit-shaped learning

Most LMS blocks assume a desk and forty-five minutes. This curriculum assumes **micro-moments**—morning scan, commute, between meetings, end of day—when a photo card, three paragraphs, and a poll fit where a course module does not.

Each lesson item follows **photo → text → poll**: visual anchor, copy-ready teaching, retrieval practice. That order is the pedagogical argument—the same habit-before-scale instinct as [Quick Send Check First](/articles/first-ai-lesson-cloud-launch/) on `.cloud`: build the check (poll recall) into the delivery rhythm, not as an afterthought deck.

This is **not** [Telegram Game Stack](/articles/how-to-build-a-telegram-game-stack/)—that article documents a Web App game with Supabase scores and six deploy layers on `.lol`. Here the stack is a **curriculum kitchen and manifest**, with Telegram as one broadcast adapter—not a one-thumb reaction loop.

## Plug in the network

Author once on Vercel; attach channel plugins when the manifest is honest.

| Network | Status in sister repo | Operator note |
|---------|----------------------|---------------|
| **Telegram** | Production—[@prompt_anatomy](https://t.me/prompt_anatomy) | First adapter; native polls; via Railway queue worker |
| **X (Twitter)** | Partial—`x_poster.py`, OAuth env vars | Rate limits, media crop, post-only guardrails—compare [BTC Buzz Bot](/articles/btcbuzzbot-x-publish-loop-field-notes/) |
| **Facebook / LinkedIn / Discord** | Not shipped | API approval, dev mode, page tokens—inspiration for v2 adapters, not claims |

Omnichannel marketing fails when each network owns a different spreadsheet. The fix is the manifest row, not a bigger bot script.

## When Telegram teaches a boundary

Telegram is a useful adapter because it forced one discipline early: **the public feed is not the operator console**.

| Surface | Job | Failure if conflated |
|---------|-----|----------------------|
| **Public channel** (`@prompt_anatomy`) | Subscriber-facing feed—photo, text, poll | Lessons trapped in operator DM |
| **Admin queue bot** (same token, `ADMIN_CHAT_ID`) | Orchestrator—`/next`, schedule, status | Subscribers expect bot commands that do not exist |
| **`SCHEDULE_TARGET_CHAT_ID`** | Delivery target for cron and publish API | Scheduled posts to wrong chat |
| **Railway worker** | Long-poll worker + optional schedule | Ephemeral queue index after deploy |

The hero diagram's spine is **Vercel CMS → manifest → adapters**. Telegram belongs in the last box—not the title of the kitchen.

## Governance

Outbound curriculum still needs owners:

- **Admin gate**—only `ADMIN_CHAT_ID` runs `/next` and schedule controls
- **Persisted state**—queue index survives deploys when `QUEUE_STATE_PATH` points at durable storage
- **One primary CTA**—almost every post closes to [promptanatomy.app](https://promptanatomy.app); module and `.blog` links are rare and thematic per [BRAND_ECOSYSTEM.md](https://github.com/DITreneris/telegram/blob/main/docs/BRAND_ECOSYSTEM.md)
- **Human owns publish**—automation proposes slots; an operator still answers "what went out?"—see [Handoff Rules Between Humans and AI](/articles/handoff-rules-between-humans-and-ai/)

Runbooks, env tables, and BotFather copy stay in the sister repo ([docs/RUNBOOK.md](https://github.com/DITreneris/telegram/blob/main/docs/RUNBOOK.md), [AGENTS.md](https://github.com/DITreneris/telegram/blob/main/AGENTS.md))—not duplicated here.

Prepare on Vercel, sync the manifest, then broadcast. `.blog` holds the frameworks behind the lessons; `.app` is where teams practice the same steps under feedback. Manifest before you broadcast—that is how the surfaces stay aligned without copying each other's job.
