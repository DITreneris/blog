---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: opinion
date: 2026-03-15
modified: 2026-06-29
hero_caption: Plans → checkout → magic link → module progress — the hub chain promptanatomy.app
  ships.
hero_image: images/articles/shipping-prompt-anatomy/hero.png
key_takeaway: promptanatomy.app is the conversion and training hub; depth stays on .blog, discovery
  on .site — not three copies of the same product.
reading_time: 5 min read
slug: shipping-prompt-anatomy
status: published
summary: Field note on shipping the Prompt Anatomy hub — bilingual landing, Stripe lifetime
  access, six-module training, and where it sits in the ecosystem beside .blog and .site.
tags:
  - prompt-systems
  - workflow-automation
  - change-management
title: Shipping Prompt Anatomy
---

In mid-March 2026, Prompt Anatomy shipped **Platform HQ** at [promptanatomy.app](https://www.promptanatomy.app/)—the bilingual conversion and training hub for the brand. Source and deploy details live in the open mother repo [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy); the interactive course ships as a git submodule from [DITreneris/inzinerija](https://github.com/DITreneris/inzinerija), built into the same Vercel deploy under `frontend/dist/anatomy/`.

This article is a field note on what shipped, how the hub differs from the blog and marketing site, and what counts as proof of implementation maturity versus product engagement. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## What promptanatomy.app is

promptanatomy.app is **Platform HQ**—not the knowledge hub and not the discover-and-try demo.

**promptanatomy.blog** (this site) publishes free frameworks, governance playbooks, templates, and case studies. Read here when you need RACI worksheets, eval gates, or audit trail patterns.

**promptanatomy.site** (launched 2025-04-12) is discover-and-try: ecosystem journey map, five-part Anatomizer, 60-second maturity quiz. See [Prompt Anatomy Marketing Site Launch](/articles/prompt-anatomy-marketing-site-launch/).

**promptanatomy.app** is where reading becomes **repeatable drills**: six training modules, the 6-block prompt system, knowledge checks, business scenarios, context engineering, and a capstone project. Conversion and [plans and pricing](https://www.promptanatomy.app/#pricing) live on the hub root—not on deep training routes.

The hub fills the gap between "I understand the framework on the blog" and "my team executes the same steps under feedback."

## Three "Anatomies" readers confuse

Prompt Anatomy uses "anatomy" at three layers. Mixing them causes teams to buy training when they need governance—or paste Anatomizer exports into production without owners.

| Layer | Where | What it teaches |
|-------|-------|-----------------|
| **6-block prompt system** | Training app (post-purchase, `/anatomy/` path) | How to *write* structured prompts—Meta, Input, Output, Reasoning, Quality, Advanced |
| **5-part Anatomizer** | `.site` | Persona, Context, Variables, Instructions, Constraints—discover and demo |
| **6-layer implementation stack** | `.blog` [Foundations](/articles/prompt-anatomy-foundations/) | Outcome → workflow → context → model → eval → governance—how teams *operate* |

All three are intentional: write prompts in training, discover structure on `.site`, operate workflows on `.blog`. For the founder essay on why an operating system beats a chatbox, see [Beyond the Chatbox on Medium](https://medium.com/@tomas.staniulis76/beyond-the-chatbox-mastering-the-prompt-anatomy-ai-operating-system-ad955724804e).

## Six modules and pricing

| Module | What learners do |
|--------|------------------|
| 1 | 6-block system — theory and workflow patterns |
| 2 | Knowledge check — certificate path from 70% |
| 3 | Six business scenarios — step-by-step practice |
| 4 | Context engineering — RAG, token economics, verification |
| 5 | Presentation sprint — timed draft + comprehension check |
| 6 | Capstone — one integrated project using all six blocks |

**Starter (39 EUR)** unlocks modules 1–3. **Core (99 EUR)** unlocks the full path including context engineering and project work. Both are one-time, lifetime access—no subscription expiry. See [plans and pricing](https://www.promptanatomy.app/#pricing) on the hub.

Access is email-based: checkout through Stripe, then magic-link entry from the Pricing section—no separate password account. The interactive course lives at the `/anatomy/` path on the same domain **after purchase**; from this blog, start at the hub root or pricing section, not a gated deep link.

Progress persists locally; the app includes glossary, tools catalog, and a prompt library with copy actions. Community support runs through the public [Telegram group](https://t.me/prompt_anatomy).

## Hub stack and deploy shape

| Surface | URL / repo |
|---------|------------|
| **Hub** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Training SPA** | `/anatomy/` on same domain (post-purchase) |
| **Mother repo** | [github.com/DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy) |
| **Training submodule** | [github.com/DITreneris/inzinerija](https://github.com/DITreneris/inzinerija) |

**Hub frontend:** Vite + React, Tailwind, LT/EN locale routing (`/`, `/en`, `/lt`), SEO head per route.

**Commerce backend:** FastAPI—`create-checkout-session`, Stripe webhooks, `GET /api/access` by email, magic-link redirect into training. Supabase `user_access` stores highest plan per purchaser.

**Deploy:** Single Vercel project—landing at root, training SPA under `/anatomy/`, legacy `/anatomija/` 301. CI "Golden Legacy" builds frontend + submodule with production `VITE_*` parity and runs backend pytest.

**Intentional thin scope:** No CMS on the hub. Training content ships as versioned JSON (`modules.json`, `glossary.json`, `promptLibrary.json`)—content edits do not require React refactors.

## From checkout to owned workflow

The launch hero encodes the hub chain: **Plans → checkout → magic link → module progress → governed workflow on `.blog`**.

Random chat produces enthusiastic individuals. Structured blocks produce **designed artifacts**. Training produces **repeatable drills**. The blog produces **owned workflows** with eval gates and RACI. Sponsors fund the last step—not the first demo. The hub is not the runtime—see [The Model Is Not the System](/articles/the-model-is-not-the-system/). Checkout and module progress live on `.app`; governed workflows live on `.blog`.

That progression mirrors how we write on `.blog`: diagnose with [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/), design on the [AI Workflow Canvas](/articles/ai-workflow-canvas-template/), gate with [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/).

## Launch guardrails

Treat `.app` completion as **practice and purchase**, not proof of enterprise implementation maturity:

- A certificate or finished Module 3 does not replace a documented workflow ID, RACI, or eval gate pack on your side.
- Do not paste hub or training copy into procurement decks; link the relevant playbook on `.blog` and cite pass rate, cycle time, or incident cost on real workflows.
- Free ecosystem spokes (`.cloud`, `.info`, `.space`, `.help`, `.ceo`, `.pro`, `.lol`) complement daily work; they do not replace paid training when you need the full six-module path. For the **Enter** spoke—first AI lesson and quick send check—see [Quick Send Check First](/articles/first-ai-lesson-cloud-launch/); for the **Use** spoke—five-locale daily org-context library—see [Who Orchestrates the Builders](/articles/daily-workflow-library-info-launch/); for the **Manage** spoke—weekly CEO brief pattern and AI Operations Center—see [The Weekly CEO Brief Pattern](/articles/weekly-ceo-brief-pattern/); for the **Play** spoke—optional brand game on Telegram—see [Corporate Ladder Soft Launch](/articles/corporate-ladder-soft-launch/).

We learned this on sister properties: [Classroom Prompt Builder](/articles/classroom-prompt-builder-launch/) had a webhook pointed at `.app` while buyers returned to `.online`—payment succeeded, fulfillment failed. **Same-host checkout, webhook, and success URL** is a launch guardrail, not an implementation detail.

promptanatomy.app gives practitioners a structured front door into training. The job of this blog remains turning that practice into repeatable, owned AI workflows—with owners, eval gates, and audit trails that survive the next model swap.
