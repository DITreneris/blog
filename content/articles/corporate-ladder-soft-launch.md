---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: opinion
date: 2026-06-15
hero_caption: Promo card — dodge meetings, climb the org chart, play free on Telegram via
  @CorporateLadder_bot.
hero_image: images/articles/corporate-ladder-soft-launch/hero.png
key_takeaway: Corporate Ladder is live as optional brand play on promptanatomy.lol; tApps
  listing validates distribution, but game engagement is not implementation maturity.
reading_time: 4 min read
slug: corporate-ladder-soft-launch
status: published
summary: Soft-launch field note on Corporate Ladder—now live on Telegram and listed on
  tApps Center—with how to play, what shipped, and why it stays separate from governed
  AI workflows.
tags:
  - workflow-automation
title: "Corporate Ladder Soft Launch"
---

Prompt Anatomy's first Telegram mini app, **Corporate Ladder**, soft-launched on **2026-06-15**. The game is playable at [promptanatomy.lol](https://www.promptanatomy.lol/) and through [@CorporateLadder_bot](https://t.me/corporateladder_bot). The same week, Corporate Ladder appeared on [tApps Center](https://tapps.center/application/corporateladder)—Telegram's mini-app directory and community discovery surface—tagged *"Lumberjack meets Office life."*

This is a **soft launch**: the bot, leaderboards, and Web App are live; polish, load tuning, and scoring-rule hardening continue. This article is a field note on what shipped, how play feels, and where the game sits relative to governed AI work on `.blog`.

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

## What shipped (surfaces)

| Surface | URL |
|---------|-----|
| **Mini App** | [promptanatomy.lol](https://www.promptanatomy.lol/) |
| **Bot** | [@CorporateLadder_bot](https://t.me/corporateladder_bot) |
| **API** | [ladder-production-642d.up.railway.app/health](https://ladder-production-642d.up.railway.app/health) |

Builders who want repo layout, CI, and local dev commands should use the sister repo [DITreneris/ladder](https://github.com/DITreneris/ladder) (TypeScript/Vite/Tailwind mini app on Vercel; Python FastAPI API and aiogram bot on Railway; Supabase Postgres for users and scores). **Architecture depth**—the six-layer boundary model from GitHub through Telegram—stays in [Telegram Game Stack](/articles/how-to-build-a-telegram-game-stack/); this post does not duplicate that playbook.

The tApps Center listing matters for distribution, not for stack design. It places Corporate Ladder where Telegram users already browse mini apps, alongside community news and catalog search—validation that the Web App URL, bot registration, and store metadata are coherent enough for external discovery.

## Soft-launch guardrails

Treat `.lol` engagement as **optional play**, not proof of AI implementation maturity:

- Do not cite game MAUs or leaderboard rank in procurement or governance decks; redirect sponsors to pass rate, cycle time, and incident cost on real workflows.
- Soft launch is not a freeze on scoring rules—tag releases when player-visible math changes, same as any production API.
- Satire stays on-brand; still avoid harassment patterns in copy or user-generated hooks if you extend social features later.

Corporate Ladder demonstrates that the same **boundary discipline** we recommend for AI workflows—thin client, authoritative API, persistent store, separate deploy surfaces—applies to a two-minute consumer game. The game is live; the core Prompt Anatomy job remains structured implementation on `.blog` and practice on `.app`.
