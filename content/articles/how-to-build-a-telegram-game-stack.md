---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-06-12
hero_caption: Six-layer pipeline from GitHub through backend, Supabase, Railway, Vercel,
  and Telegram—the stack behind Corporate Ladder (pre-launch).
hero_image: images/articles/how-to-build-a-telegram-game-stack/hero.png
key_takeaway: Ship a Telegram mini app by separating game rules on a hosted API, persistent
  scores in a managed database, and the player UI on static hosting—not by bolting logic
  into the bot script alone.
reading_time: 7 min read
slug: how-to-build-a-telegram-game-stack
status: published
summary: Pre-launch field notes on the six-service stack behind Corporate Ladder—GitHub
  through Telegram—architecture, deployment flow, and what to build in each layer.
tags:
  - workflow-automation
title: "Telegram Game Stack"
---

Prompt Anatomy's first game, **Corporate Ladder**, is a satirical office-climb mini app for Telegram—dodge meetings, climb the org chart, survive reorgs. It is **pre-launch** at [promptanatomy.lol](https://www.promptanatomy.lol/); the public bot link is not live yet. This article documents the **streamlined stack** we are shipping so you can reuse the pattern without treating Telegram as a monolith.

**Update (2026-06-15):** Corporate Ladder soft-launched on Telegram and is listed on [tApps Center](https://tapps.center/application/corporateladder). Play at [promptanatomy.lol](https://www.promptanatomy.lol/) or [@CorporateLadder_bot](https://t.me/corporateladder_bot)—see [Corporate Ladder Soft Launch](/articles/corporate-ladder-soft-launch/) for the live field note.

The hero diagram shows six boxes in order: **GitHub → Backend → Supabase → Railway → Vercel → Telegram**. That is not marketing wallpaper. Each box is a deployable boundary with a single job. Skip a boundary and you inherit the usual mini-app failures: scores that reset, logic trapped in one host, or a UI that cannot ship independently of your API.

For where play fits in the wider Prompt Anatomy properties, see [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/). Corporate Ladder is **optional brand flavor**, not an implementation path for governed AI workflows.

## What Corporate Ladder is (and is not)

Corporate Ladder is a **reaction game** inside Telegram's Web App shell. The player taps left or right to dodge "MEETING" obstacles, grab coffee power-ups, and climb rungs labeled with job titles—Intern toward Manager, measured in fictional "years" and a progress bar. Random events like **REORG INCOMING** add difficulty spikes without new UI chrome.

That design is deliberate for Telegram: **one-thumb input**, **session length under two minutes**, and **progression you can read at a glance** (title, years, energy). It does not teach prompt registry discipline or eval gates; it demonstrates that the same separation discipline we preach for AI workflows applies to a small consumer surface.

Do not confuse `.lol` engagement with implementation maturity on `.blog`. If your steering deck cites game MAUs instead of pass rate and incident cost, redirect to [Measuring AI Workflow ROI](/articles/measuring-ai-workflow-roi/).

## The six-layer architecture

Read the pipeline left to right as **ownership**, not as "install order only."

| Layer | Job | What breaks if you skip it |
|-------|-----|----------------------------|
| **GitHub** | Source of truth, PR review, CI | Undeployable hotfixes; no rollback story |
| **Backend** | Game rules, scoring, session API | Cheating, inconsistent state, fat clients |
| **Supabase** | Users, runs, leaderboard rows | Ephemeral scores; no cross-device identity |
| **Railway** | Host and scale the API | Local-only logic; no webhook endpoint |
| **Vercel** | Static game UI (HTML/JS/CSS) | Slow iteration on visuals; API mixed with assets |
| **Telegram** | Distribution, identity hint, Web App chrome | No audience; you rebuild auth and notifications |

The thin lines in the diagram—GitHub feeding every downstream box and Telegram looping back—encode **continuous delivery**: merge on `main`, CI runs tests, Railway and Vercel pick up artifacts, bot commands stay pointed at the current UI URL.

### 1. GitHub — code and workflow

Treat the repo like any production service: feature branches, PR review, lint/test in CI, tagged releases when you change scoring rules players depend on. The game client and API can live in one monorepo or two; what matters is that **both** deploy from the same commit graph so you never debug "UI v3 against API v2."

### 2. Backend — game rules and API

The backend owns **authoritative state**: run start/end, obstacle seeds, collision results, promotion thresholds, energy decay. The Telegram Web App is a **thin client** that sends intents (`tap_left`, `tap_right`) and renders frames.

Keep bot webhook handlers thin: validate `initData` from Telegram, issue a session token, redirect to the Vercel URL. Heavy logic in the bot process couples you to Telegram's process model and makes load testing painful.

### 3. Supabase — users and leaderboard

Use Postgres (via Supabase) for **identity linkage** (`telegram_user_id`), **run history**, and **leaderboard aggregates**. Row-level security policies should default deny; expose only what the API role needs.

Leaderboards are the first feature players compare across devices. If scores live in browser `localStorage`, you do not have a game—you have a demo.

### 4. Railway — API hosting

Railway (or any container/PaaS with a stable HTTPS URL) runs the Node/Python/Go API, connects to Supabase with a service role secret, and exposes REST or WebSocket endpoints the Web App calls. Environment variables hold bot token, Supabase keys, and allowed Web App origins.

Health checks and horizontal scale matter once a channel post drives a spike. Cold starts hurt reaction games; keep the API warm or accept first-tap latency in your UX copy.

### 5. Vercel — game interface

The visible ladder, meeting tiles, HUD ("Intern", "Manager in 8.0y", energy bar), and tap targets ship as a **static front end** on Vercel. Build with whatever your team already uses (Vite, Next static export, etc.); Telegram only needs a trusted HTTPS origin.

Separation here is the same lesson as [The Model Is Not the System](/articles/the-model-is-not-the-system/): the **interface is not the engine**. Designers can iterate on CSS and animation without redeploying scoring math.

### 6. Telegram — players and in-app experience

Register a bot (e.g. `@CorporateLadder_bot`), set the **Web App** menu button or `/start` inline keyboard to open your Vercel URL inside Telegram's in-app browser. Telegram supplies lightweight identity via `initData`; your backend verifies the HMAC before trusting `user.id`.

Distribution is Telegram's moat: channels, groups, and "Play free on Telegram" CTAs—like the pre-launch promo card—drive installs without an app store review cycle.

## End-to-end request flow

A single tap illustrates why the split stack exists:

1. Player opens the bot → Telegram loads the Vercel Web App with signed `initData`.
2. Web App POSTs `initData` to Railway → API verifies signature, upserts user in Supabase, returns session JWT.
3. Game loop runs client-side for frame timing; on run end, client POSTs score payload to Railway.
4. API validates score against server-side rules (timestamps, max plausible points), writes run row, refreshes leaderboard materialized view or cache.
5. Optional: bot sends a channel message with deep link for rematch—still the same Vercel URL.

If step 4 is missing, expect fabricated high scores within a week.

## Pre-launch checklist

Use this before flipping Corporate Ladder (or your clone) to public:

- [ ] **BotFather** — Web App URL points to production Vercel; test on iOS and Android Telegram clients.
- [ ] **initData verification** — reject tampered user ids; rotate bot token if leaked.
- [ ] **CORS and origins** — API allows only your Vercel domain; no wildcard with credentials.
- [ ] **Supabase migrations** — versioned in GitHub; RLS enabled on every player table.
- [ ] **CI** — tests for scoring edge cases; deploy Railway + Vercel from `main` only.
- [ ] **Observability** — structured logs on API; alert on 5xx rate during traffic spikes.
- [ ] **Content policy** — satire is on-brand; still avoid hate/harassment patterns in copy and UGC hooks.

Corporate Ladder remains **pre-launch** while we finish polish and load checks. Watch [promptanatomy.lol](https://www.promptanatomy.lol/) for the live bot link—no playable bot URL yet; this article will update when `@CorporateLadder_bot` is open.

## When this pattern is enough—and when it is not

This stack is appropriate for **casual mini apps** with leaderboard depth and a small team. Upgrade when you need real-time PvP, economies with fraud risk, or heavy server simulation—in those cases, add a dedicated game server layer and anti-cheat analytics, and treat Telegram as one client among many.

For structured AI workflows (the core of Prompt Anatomy), stay on `.blog` frameworks and `.app` practice drills. The game stack is a **field note on boundaries**, not a replacement for [Prompt Anatomy Foundations](/articles/prompt-anatomy-foundations/).
