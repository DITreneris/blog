---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-06-16
faq:
- answer: Fast legal runs could fail API plausibility checks—rung-rate caps misaligned
    with the 120ms tap floor, unix-second buckets too tight, or missing run_duration_ms
    before v2.4.0. Rejected submits never reached Supabase, so the leaderboard looked
    empty even when the client showed a strong run.
  question: Why did high scores fail to file before v2.4?
- answer: No. v2.4 changes validation rules and filing UX; existing daily and weekly
    rows stay unless you beat your personal best on a new run.
  question: Does v2.4 reset daily or weekly leaderboards?
hero_caption: Level 6 Angel Investor—funding, ego, exit; same two-button loop, late-game
  satire after CEO.
hero_image: images/articles/corporate-ladder-v24-score-trust/hero.png
key_takeaway: Leaderboard rows are trustworthy only after the API accepts a run under
  a documented plausibility contract—not when the Web App alone says you climbed.
slug: corporate-ladder-v24-score-trust
status: published
summary: A leaderboard that rejects legal runs destroys trust faster than no leaderboard.
  Corporate Ladder v2.4 closes soft-launch scoring gaps with run_duration_ms plausibility,
  filing UX, and extended ranks through Angel Investor.
tags:
- workflow-automation
- change-management
title: "Corporate Ladder v2.4: Score Trust After Soft Launch"
---

A leaderboard that rejects legal runs destroys trust faster than no leaderboard. [Corporate Ladder Soft Launch](/articles/corporate-ladder-soft-launch/) went live on **2026-06-15** on [promptanatomy.lol](https://www.promptanatomy.lol/). The one-thumb loop was already clear—tap left or right, dodge meetings, climb Career Years. What followed was a sprint on UI, UX, visuals, and algorithm until scores behaved under real Telegram traffic. We tagged **`v2.4.0`** in [DITreneris/ladder](https://github.com/DITreneris/ladder) when filing trust caught up to the loop.

The game borrows the same instinct as a one-beat timing climb—one wrong side and the run ends—but the trust problem is eval-gate discipline, not nostalgia. Stack depth stays in [Telegram Game Stack](/articles/how-to-build-a-telegram-game-stack/); here we document the **trust layer** players and operators feel after soft launch.

## What soft launch did not guarantee

Soft launch was honest about open work: polish, load tuning, and **scoring-rule hardening** continued, with tagged releases when player-visible math changed. The live field note stopped the rank ladder at **CEO (35y)**; v2.4 extends through **Board Member (50y)** and **Angel Investor (75y)**, with scores filing up to **100y**—late-game satire on the hero, same binary loop, new hazards (**Quorum**, **Runway**) without new UI chrome per beat. Full rank milestones live in the soft-launch post and [open repo README](https://github.com/DITreneris/ladder).

Worse for trust: power-user runs could **400** on submit despite legal play. The Web App showed a strong run; Supabase never got a row. Daily and weekly boards looked thinner than they were—a leaderboard that lies by omission is worse than no leaderboard. v2.4 fixes the definition of **accepted** before persist, the same discipline we encode in [Critique Agent v1.0](/articles/critique-agent-v10-verified-local-audits/) for local audits.

## The plausibility sprint (`run_duration_ms`)

Plausibility was the hardest line item. The client throttles taps at **120ms**; the API must decide whether a submitted run could have happened in true elapsed time—not just whether the years number looks impressive. Before v2.4, caps tied to unix seconds alone rejected **legal fast runs** at Manager and Director bands. Hours of device replay, prod logs, and freeze-and-watch passes followed: align rung-rate with the tap floor, add **+2s second-bucket slack**, then require **`run_duration_ms`** (true play time in milliseconds) on every `POST /runs`.

At **v2.4.0**, [SECURITY.md](https://github.com/DITreneris/ladder/blob/v2.4.0/SECURITY.md) documents the contract:

| Check | What it blocks |
|-------|----------------|
| Session window (`run_started_at` vs Telegram `auth_date`) | Idle-forge and stale initData |
| Tap density vs `run_duration_ms` (120ms floor → ~16.7 rungs/s cap) | Tap-bot density and impossible climb speed |
| Minimum duration floor (`rungs × 120ms × 0.85`) | Packed rungs inside too few milliseconds |
| ms vs unix-second consistency (+2s slack) | Forged long duration inside a short session |

End-to-end flow:

```text
Player tap loop → Mini App records run_duration_ms
  → POST /runs (Railway API)
  → plausibility gate (session + density + consistency)
  → accepted: Supabase row + leaderboard refresh + best_score to client
  → rejected: 400 + HR audit toast (no silent drop)
```

Getting those three clocks—client throttle, unix seconds, true milliseconds—to agree was not a one-line fix. It was the sprint.

## What v2.4 ships (player-visible)

**Filing UX.** Post-run **sync chip** and **`best_score`** on the API response so you see filing state instead of guessing. Rejected submits return **400 + HR audit toast**—no silent drop.

**Visuals and endgame.** Progressive **corp-env ghost** backdrops shift per floor band without competing with obstacles. **Board Member** and **Angel Investor** bands reuse the same left/right discipline; the hero promo card shows Level 6 satire—funding, ego, exit—not a new control scheme. Production friction (CSP, ad hosts, marquee ticker) shipped in the same tag but does not change the trust contract—see the sister repo release notes.

## Deploy discipline

Three surfaces must stay aligned when scoring rules change:

- **Railway (API)** is the authoritative gate—it validates plausibility, writes only accepted runs, and returns structured errors the client can show. Deploy **API before mini-app** when scoring rules change.
- **Supabase** holds run rows and leaderboard RPCs—one meaning per schema version.
- **Bot** stays thin: distribution and Web App chrome, not game rules trapped in aiogram. Stable deep links must point at the current Vercel bundle.

We **freeze a commit**, run Tier A–C gates in [SHIP_GATES.md](https://github.com/DITreneris/ladder/blob/main/SHIP_GATES.md), update the prod bundle anchor, then cut **`v2.4.0`**. Same promotion discipline as [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/) on `.blog`: define accepted, then persist.

Corporate Ladder v2.4 applies the same **boundary discipline** we recommend in [The Model Is Not the System](/articles/the-model-is-not-the-system/)—thin client, authoritative API, persistent store, separate deploy surfaces. The mini-app displays a run; only the API decides what counts.

## Guardrails

`.lol` engagement remains **optional play**, not proof of AI implementation maturity. Do not cite game MAUs or leaderboard rank in procurement decks—redirect sponsors to pass rate and incident cost per [AI Procurement Freeze](/articles/ai-procurement-freeze/). For where play fits among Prompt Anatomy properties, see [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## Play and share

Corporate Ladder is playable at [promptanatomy.lol](https://www.promptanatomy.lol/) and through [@CorporateLadder_bot](https://t.me/corporateladder_bot); it is listed on [tApps Center](https://tapps.center/application/corporateladder). **v2.4.0** is the tag where leaderboard filing earned trust—share a run, challenge a colleague, rematch from the bot deep link. That is the live loop; the core Prompt Anatomy job on `.blog` remains structured implementation, not high scores in a satirical office game. The same monorepo later served as the cross-repo target for [Critique Agent: Field Test](/articles/critique-agent-field-test-trust-workflow/)—local audits on `packages/api` run-submit paths, with one finding turned into regression tests instead of a risky refactor.
