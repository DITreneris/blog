---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-06-15
modified: 2026-06-29
hero_caption: Promo card — dodge meetings, climb the org chart, play free on Telegram via
  @CorporateLadder_bot.
hero_image: images/articles/corporate-ladder-soft-launch/hero.png
key_takeaway: Corporate Ladder is live as optional brand play on promptanatomy.lol; tApps
  listing validates distribution, but game engagement is not implementation maturity.
slug: corporate-ladder-soft-launch
status: published
summary: Optional brand play is not AI implementation maturity—Corporate Ladder on promptanatomy.lol
  and Telegram is satirical one-thumb engagement, listed on tApps Center, separate from governed
  workflows on .blog.
tags:
  - workflow-automation
  - change-management
title: "Corporate Ladder Soft Launch"
---

Prompt Anatomy's first Telegram mini app, **Corporate Ladder**, soft-launched on **2026-06-15**. The game is playable at [promptanatomy.lol](https://www.promptanatomy.lol/) and through [@CorporateLadder_bot](https://t.me/corporateladder_bot). The same week, Corporate Ladder appeared on [tApps Center](https://tapps.center/application/corporateladder)—Telegram's mini-app directory—tagged *"Lumberjack meets Office life."* Optional play is brand flavor, not proof of governed AI maturity on `.blog`.

The tApps tag—*"Lumberjack meets Office life"*—is lineage, not random copy. Telegram's 2016 Lumberjack, one of @gamebot's first HTML5 hits, showed that a one-thumb timing loop could live inside a chat app for tens of millions of taps. Corporate Ladder rides the same rail but swaps the axe for org-chart gaps: closer to *Jumping Jack* (1983)—climb through scrolling openings, one wrong beat and you drop—than to a lumber-yard sim.

At nine, loading *Jumping Jack* from cassette on a ZX Spectrum—beep, chirp, border colors, wait—the idea of handing a playable loop to hundreds of millions of chat users would have sounded cosmic. Bits as bird-voice noise on tape; today a commit on GitHub and a deploy on Vercel. Same urge to climb one more floor; different loader.

This is a **soft launch**: the bot, leaderboards, and Web App are live; polish, load tuning, and scoring-rule hardening continue. This field note covers how play feels and where the game sits relative to governed AI work on `.blog`. Stack depth stays in [Telegram Game Stack](/articles/how-to-build-a-telegram-game-stack/); repo layout and CI live in [DITreneris/ladder](https://github.com/DITreneris/ladder).

## What Corporate Ladder is

Corporate Ladder is a satirical **one-thumb reaction game** inside Telegram's Web App shell. The pitch is office absurdity, not productivity software: dodge calendar tiles labeled **MEETING**, grab coffee for a +25% energy bump, survive **REORG INCOMING** spikes, and climb rungs labeled with job titles while a HUD tracks fictional **Career Years** and rank progress.

The design targets Telegram constraints deliberately:

- **Session length under two minutes** — enough for a channel post click-through, not a console grind.
- **Readable progression at a glance** — Intern toward Manager with a progress bar ("Manager in 8.0y"), energy bar, and title badge.
- **No new UI chrome per hazard** — random events reuse the same tap-left/tap-right loop.

That loop is simple to learn and hard to master in short bursts, which fits commute-length play more than deep strategy. It does **not** teach prompt registry discipline, eval gates, or governance RACI. It is optional brand flavor on `.lol`, not an implementation path. For where play fits among Prompt Anatomy properties, see [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## How to play

From the live build and [open monorepo](https://github.com/DITreneris/ladder):

1. Open the bot or mini app and tap **Punch In & Climb** — the first tap starts the run.
2. Read the prompt on each rung (e.g. "Meeting on RIGHT → tap LEFT") and tap **left** or **right** for the safe side.
3. Grab **coffee** when it appears for +25% energy.
4. Survive as many **Career Years** as you can before burnout ends the run.

**Rank milestones** anchor long-term goals:

| Rank | Career Years |
|------|----------------|
| Intern | Start |
| Manager | 10y |
| Director | 20y |
| CEO | 35y |

**Daily and weekly leaderboards** give a lightweight social layer without turning the game into a economy sim. The promo hero shows the core tension clearly: org-chart grid, meeting obstacles, unstable-chart warnings, and a single decision per beat—appropriate for Telegram's in-app browser and thumb reach.

What works in review: frictionless entry from a bot deep link, immediate feedback on wrong-side taps, and satire that reads in two seconds ("dodge meetings, climb the org chart"). What it is not: training, workflow templates, or a stand-in for [Measuring AI Workflow ROI](/articles/measuring-ai-workflow-roi/).

The tApps Center listing matters for distribution—it places Corporate Ladder where Telegram users already browse mini apps, validation that Web App URL, bot registration, and store metadata are coherent enough for external discovery.

## Soft-launch guardrails

Treat `.lol` engagement as **optional play**, not proof of AI implementation maturity:

- Do not cite game MAUs or leaderboard rank in procurement or governance decks; redirect sponsors to pass rate, cycle time, and incident cost on real workflows per [AI Procurement Freeze](/articles/ai-procurement-freeze/)—the same category error as citing [Classroom Prompt Builder Launch](/articles/classroom-prompt-builder-launch/) PDF sales in a governance forum.
- Soft launch is not a freeze on scoring rules—tag releases when player-visible math changes, same as any production API. Rank ladder and scoring contract updated in [Corporate Ladder v2.4](/articles/corporate-ladder-v24-score-trust/).
- Satire stays on-brand; still avoid harassment patterns in copy or user-generated hooks if you extend social features later.

Corporate Ladder demonstrates that the same **boundary discipline** we recommend in [The Model Is Not the System](/articles/the-model-is-not-the-system/)—thin client, authoritative API, persistent store, separate deploy surfaces—applies to a two-minute consumer game. The game is live; the core Prompt Anatomy job remains structured implementation on `.blog` and practice on `.app`.
