---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: opinion
date: 2026-03-15
modified: 2026-09-02
hero_caption: Plans → checkout → magic link → module progress — the hub chain promptanatomy.app
  ships.
hero_image: images/articles/shipping-prompt-anatomy/hero.png
key_takeaway: promptanatomy.app is the conversion and training hub; depth stays on .blog, discovery
  on .site — not three copies of the same product.
reading_time: 5 min read
slug: shipping-prompt-anatomy
status: published
summary: Field note on shipping the Prompt Anatomy hub — bilingual landing, Stripe lifetime
  access, and where it sits in the ecosystem beside .blog and .site.
tags:
  - prompt-systems
  - workflow-automation
  - change-management
title: Shipping Prompt Anatomy
---

Teams treat a certificate—or a “full catalog” purchase—as implementation maturity. Then they discover checkout sold the **foundation path**, not every module in the production bundle. That gap is why [promptanatomy.app](https://www.promptanatomy.app/) exists as a conversion hub, not as proof that the workflow is owned.

This field note records what the hub sells, how it differs from the blog and marketing site, and what counts as practice versus a governed workflow. Source and deploy details live in the open mother repo [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy); the interactive course ships as a git submodule from [DITreneris/inzinerija](https://github.com/DITreneris/inzinerija). If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## What promptanatomy.app is

promptanatomy.app is **Platform HQ**—not the knowledge hub and not the discover-and-try demo.

**promptanatomy.blog** (this site) publishes free frameworks, governance playbooks, templates, and case studies. Read here when you need RACI worksheets, eval gates, or audit trail patterns.

**promptanatomy.site** (launched 2025-04-12) is discover-and-try: ecosystem journey map, five-part Anatomizer, 60-second maturity quiz. See [Prompt Anatomy Marketing Site Launch](/articles/prompt-anatomy-marketing-site-launch/).

**promptanatomy.app** is where reading becomes **repeatable drills**: the 6-block prompt system, knowledge checks, business scenarios, context engineering, and a capstone. Stripe checkout sells the foundation path (modules 1–6). Later paths are operator grants. Conversion and [plans and pricing](https://www.promptanatomy.app/#pricing) live on the hub root—not on deep training routes.

The hub fills the gap between "I understand the framework on the blog" and "my team executes the same steps under feedback."

## Three "Anatomies" readers confuse

Prompt Anatomy uses "anatomy" at three layers. Mixing them causes teams to buy training when they need governance—or paste Anatomizer exports into production without owners.

| Layer | Where | What it teaches |
|-------|-------|-----------------|
| **6-block prompt system** | Training app (post-purchase, `/anatomy/` path) | How to *write* structured prompts—Meta, Input, Output, Reasoning, Quality, Advanced |
| **5-part Anatomizer** | `.site` | Persona, Context, Variables, Instructions, Constraints—discover and demo |
| **6-layer implementation stack** | `.blog` [Foundations](/articles/prompt-anatomy-foundations/) | Outcome → workflow → context → model → eval → governance—how teams *operate* |

All three are intentional: write prompts in training, discover structure on `.site`, operate workflows on `.blog`. For the founder essay on why an operating system beats a chatbox, see [Beyond the Chatbox on Medium](https://medium.com/@tomas.staniulis76/beyond-the-chatbox-mastering-the-prompt-anatomy-ai-operating-system-ad955724804e).

## What checkout sells

The production training bundle holds modules 1–12. Stripe Phase 1 does not sell that whole bundle.

| Path | Modules | How you get it |
|------|---------|----------------|
| **Starter** (39 EUR) | 1–3 | Stripe checkout |
| **Core** (99 EUR) | 1–6 | Stripe checkout |
| **Data Analysis** | 7–9 | Operator grant — not checkout |
| **Agent path** | 10–12 | Operator grant; tester cohort by email — see [3A Before You Build an Agent](/articles/3a-before-you-build-an-agent/) |
| **B2B workshop** (399 EUR) | Live session, 3 hours, ≤10 people, license excluded | Not a Stripe plan |

Core is the paid **foundation path**, not the full bundle. Starter and Core are one-time, lifetime access—no subscription expiry. See [plans and pricing](https://www.promptanatomy.app/#pricing) on the hub.

Access is email-based: checkout through Stripe, then magic-link entry from the Pricing section—no separate password account. From this blog, start at the hub root or pricing section, not a gated deep link.

Progress persists locally; the app includes glossary, tools catalog, and a prompt library with copy actions. Community support runs through the public [Telegram group](https://t.me/prompt_anatomy).

## Hub stack and deploy shape

| Surface | URL / repo |
|---------|------------|
| **Hub** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Training SPA** | `/anatomy/` on same domain (post-purchase) |
| **Mother repo** | [github.com/DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy) |
| **Training submodule** | [github.com/DITreneris/inzinerija](https://github.com/DITreneris/inzinerija) |

**Hub frontend:** Vite + React, Tailwind, LT/EN locale routing (`/`, `/en`, `/lt`), SEO head per route.

**Commerce backend:** Production checkout runs on Vercel `api/`; FastAPI is local and CI. Stripe webhooks upsert Supabase `user_access` (highest plan per purchaser). Magic-link entry follows from the Pricing section.

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
- Free ecosystem spokes (`.cloud`, `.info`, `.space`, `.help`, `.ceo`, `.pro`, `.lol`) complement daily work; they do not replace the paid foundation path on `.app`. For the **Enter** spoke—first AI lesson and quick send check—see [Quick Send Check First](/articles/first-ai-lesson-cloud-launch/); for the **Use** spoke—five-locale daily org-context library—see [Who Orchestrates the Builders](/articles/daily-workflow-library-info-launch/); for the **Manage** spoke—weekly CEO brief pattern and AI Operations Center—see [The Weekly CEO Brief Pattern](/articles/weekly-ceo-brief-pattern/); for the **Play** spoke—optional brand game on Telegram—see [Corporate Ladder Soft Launch](/articles/corporate-ladder-soft-launch/).

We learned this on sister properties: [Classroom Prompt Builder](/articles/classroom-prompt-builder-launch/) had a webhook pointed at `.app` while buyers returned to `.online`—payment succeeded, fulfillment failed. **Same-host checkout, webhook, and success URL** is a launch guardrail, not an implementation detail.

promptanatomy.app gives practitioners a structured front door into training. The job of this blog remains turning that practice into repeatable, owned AI workflows—with owners, eval gates, and audit trails that survive the next model swap.
