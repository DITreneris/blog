---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-05-15
hero_caption: Mode → form → classroom-ready prompt → copy to ChatGPT, Claude, or Gemini—the
  chain CPB encodes without calling an AI API.
hero_image: images/articles/classroom-prompt-builder-launch/hero.png
key_takeaway: Separate prompt assembly from AI execution, centralize copy in a SOT registry,
  and keep fulfillment on one production host—CPB is a vertical wedge, not a substitute
  for governed enterprise workflows.
reading_time: 5 min read
slug: classroom-prompt-builder-launch
status: published
summary: Field note on the May 2026 launch of promptanatomy.online—a free K–12 prompt builder
  with mode-separated templates, teacher-in-the-loop guardrails, and optional PDF commerce—and
  what enterprise teams can borrow from the architecture.
tags:
  - prompt-systems
  - templates
  - change-management
title: Classroom Prompt Builder Launch
---

In mid-May 2026, Prompt Anatomy shipped **Classroom Prompt Builder** at [promptanatomy.online](https://www.promptanatomy.online/)—a free, no-account web app that helps US K–12 teachers assemble structured prompts for ChatGPT, Claude, and Gemini without the site ever calling an AI API. Source and deploy details live in the open sister repo [DITreneris/teacher](https://github.com/DITreneris/teacher): a static Vercel root plus lightweight serverless routes for optional PDF checkout. The US MVP landed **2026-05-15**; paid fulfillment, buyer-confidence UX, and SEO hardening shipped through **v1.1.2** on **2026-05-20**.

This article is a field note on what shipped, which prompt-system patterns we reused from enterprise work, and where `.online` sits beside governed implementation content on `.blog` and team practice on `.app`. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## What Classroom Prompt Builder is

Classroom Prompt Builder is a **vertical try surface** for teachers—not a knowledge hub and not corporate training checkout.

**It is:**

- A free, no-account, single-page prompt builder for US K–12
- Five modes—**LESSON**, **ASSESSMENT**, **TASKS**, **PRESENTATION**, **STRATEGY**—each with mode-specific form fields (defined in sister [`config/sot.json`](https://github.com/DITreneris/teacher/blob/main/config/sot.json))
- Grade 1–12 context, six library templates, and optional saved sessions in browser localStorage
- Optional paid PDF guides (Beginners $4.99 · Advanced $9.99) sold separately through Stripe

**It is not:**

- An AI runtime—the product never calls an AI API
- An LMS, student data store, or enterprise workflow platform
- Proof of corporate AI maturity for procurement decks

That separation mirrors a rule we repeat on `.blog`: the builder is not the execution environment. See [The Model Is Not the System](/articles/the-model-is-not-the-system/). Teachers paste prompts into external tools; ops teams paste registry artifacts into governed agent stacks—the architecture lesson is the same.

## The four-step workflow

The live product follows one loop:

1. **Select a mode** tab (lesson plan, assessment, tasks, presentation, or teaching strategy).
2. **Pick a grade** and fill mode-specific fields—topic, duration, goals, constraints, or the main question for the AI.
3. **Read the generated prompt** in the output panel; it updates as the form changes.
4. **Copy** and paste into ChatGPT, Claude, or Gemini—the site offers deep links to each tool.

Saved sessions stay in localStorage with a cap—no account required. That is intentional trust posture: the builder workflow does not collect student PII or transmit prompt text to Prompt Anatomy servers.

## Five lesson-quality principles

The product ships five **quality rules** in SOT—not as footer disclaimers but as design constraints baked into how modes and library templates are written:

| Principle | Enterprise parallel |
|-----------|---------------------|
| Every prompt leads to a classroom-ready outcome | Task prompt with a clear output contract |
| Clarity beats complexity: one mode, one goal | No mega-prompt drift across workflow steps |
| Activities should be doable in your classroom | Scope constraints in task templates |
| Define assessment criteria up front | Checker framing before generation |
| Presentation mode returns a text outline—bring it to your slides tool | Transformation step, not the final artifact |

Mode separation is the same discipline we teach for business workflows: match prompt type to step, not one growing system message. See [Types of Prompts for Business Workflows](/articles/types-of-prompts-for-business-workflows/).

## Architecture lessons for implementers

Builders evaluating a similar wedge product—or auditing how Prompt Anatomy extends the brand—should note six patterns from the sister repo's [`gold_legacy_standard.md`](https://github.com/DITreneris/teacher/blob/main/gold_legacy_standard.md). The same assembly≠execution pattern shipped earlier on [The Weekly CEO Brief Pattern](/articles/weekly-ceo-brief-pattern/) (April 2026, `DITreneris/ceo`); CPB reuses the stack for K–12:

1. **SOT-first copy** — `config/sot.json` owns modes, library prompts, commerce copy, buyer FAQ, and legal metadata; [`generator.js`](https://github.com/DITreneris/teacher/blob/main/generator.js) hydrates the page at runtime. Treat it as a lightweight prompt registry for product copy—the same idea as versioned packs in [Structured Prompt System Blueprint](/articles/structured-prompt-system-blueprint/).
2. **Prompt assembly ≠ AI execution** — the site constructs text; execution happens in a tool the user controls. Teacher-in-the-loop verification before classroom use is the K–12 version of [handoff rules between humans and AI](/articles/handoff-rules-between-humans-and-ai/).
3. **Static checkout fallbacks** — live `buy.stripe.com` hrefs ship in HTML before JavaScript hydrates from SOT, so checkout works when JS fails or SOT fetch is slow.
4. **Same-host fulfillment** — Stripe Payment Link success URL, webhook endpoint, Redis store, and `SITE_URL` must all belong to `promptanatomy.online`. A production incident occurred when the webhook pointed at `.app` while buyers returned to `.online`—payment succeeded but fulfillment lookup was empty.
5. **Repo boundary** — product UI and PDF fulfillment stay in `teacher`; school outreach (Railway, Supabase, marketing email on `news.promptanatomy.online`) lives in sibling `cpb-school-outreach`. Do not mix outreach logic into `api/**` fulfillment routes.
6. **Quality gates in CI** — `npm run test:mixed` covers structure, smoke at 320/375/768 px, core e2e, and pa11y; fulfillment changes add `npm run check:fulfillment`.

Deploy checklists, webhook env tables, and operator runbooks stay in the sister repo (`DEPLOY.md`, `AGENTS.md`, `memo_pdf.md`)—not duplicated here.

## What shipped (surfaces)

| Surface | URL |
|---------|-----|
| **Product** | [promptanatomy.online](https://www.promptanatomy.online/) |
| **Repository** | [github.com/DITreneris/teacher](https://github.com/DITreneris/teacher) |
| **Parent brand / training** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Optional PDFs** | Beginners $4.99 · Advanced $9.99 |

The stack is intentionally thin: Vercel static root, serverless `api/*` for Stripe webhook and signed PDF delivery, no build command. Design System 2.0 lives in sister `docs/STYLEGUIDE.md`.

## Read the hero diagram

The launch hero encodes the product chain: **Mode → Form → Classroom-ready prompt → External AI tool**.

Random chat produces inconsistent lesson plans and unclear ownership. **Mode** picks the workflow step. **Form** fields supply context, grade, and constraints. **Classroom-ready prompt** is the copy-paste artifact. **External AI tool** is where generation happens—under teacher review, not inside Prompt Anatomy infrastructure.

That chain parallels the marketing-site hero (*Random Prompt → Logic Layer → Team Workflow → Repeatable Output*) described in [Prompt Anatomy Marketing Site Launch](/articles/prompt-anatomy-marketing-site-launch/)—except CPB stops before "team workflow" because **the teacher owns the workflow**. Discover the brand on `.site`; try the K–12 wedge on `.online`; read depth on `.blog`.

## Launch guardrails

**Product trust** (documented in sister Terms and Privacy):

- Verify AI output before classroom use; outputs are not for high-stakes decisions without human review
- No student PII collected through the prompt-building workflow
- Optional PDFs carry a Classroom License and 14-day refund policy

**For `.blog` readers:**

- CPB usage or PDF sales do not prove enterprise AI implementation maturity—the same category error as citing [Corporate Ladder](/articles/corporate-ladder-soft-launch/) engagement in a procurement deck
- Do not paste builder copy into governance forums as if it were eval evidence; link relevant playbooks and cite pass rate, cycle time, or incident cost on real workflows per [AI Procurement Freeze](/articles/ai-procurement-freeze/)

promptanatomy.online gives teachers a structured front door. The job of this blog remains turning curiosity into repeatable, owned AI workflows—and `.app` into team practice when you are ready to standardize.
