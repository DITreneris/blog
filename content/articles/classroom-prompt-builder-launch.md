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
slug: classroom-prompt-builder-launch
status: published
summary: A polished lesson prompt still fails when mode and output contract are mixed—or
  when teachers paste unreviewed AI output in front of students. Classroom Prompt Builder
  at promptanatomy.online separates assembly from execution with teacher-in-the-loop guardrails.
tags:
  - prompt-systems
  - templates
  - change-management
title: Classroom Prompt Builder Launch
---

A polished lesson prompt still fails in the classroom when mode, grade, and output contract are mixed—or when teachers paste unreviewed AI output in front of students. In mid-May 2026, Prompt Anatomy shipped **Classroom Prompt Builder** at [promptanatomy.online](https://www.promptanatomy.online/)—a free, no-account web app for US K–12 teachers, never calling an AI API. Source lives in the open sister repo [DITreneris/teacher](https://github.com/DITreneris/teacher); optional PDF guides ship through Stripe-hosted checkout.

This field note covers what shipped, which prompt-system patterns we reused from enterprise work, and where `.online` sits beside governed implementation content on `.blog`. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

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

The live product follows one loop—**Mode → Form → classroom-ready prompt → external AI tool**:

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

## Builder patterns (for implementers)

The same assembly≠execution stack shipped earlier on [The Weekly CEO Brief Pattern](/articles/weekly-ceo-brief-pattern/) (`DITreneris/ceo`); CPB reuses it for K–12. Three patterns worth copying:

- **SOT-first copy** — `config/sot.json` owns modes, library prompts, and commerce metadata; treat it as a lightweight prompt registry for product copy—the same idea as versioned packs in [Structured Prompt System Blueprint](/articles/structured-prompt-system-blueprint/).
- **Assembly ≠ execution** — the site constructs text; generation happens under teacher review in a tool the teacher controls—the K–12 version of [handoff rules between humans and AI](/articles/handoff-rules-between-humans-and-ai/).
- **Same-host fulfillment** — Stripe checkout, webhook, and `SITE_URL` must all belong to `promptanatomy.online`. A production incident occurred when the webhook pointed at `.app` while buyers returned to `.online`—payment succeeded but fulfillment lookup was empty.

Deploy checklists and operator runbooks stay in the sister repo (`DEPLOY.md`, `AGENTS.md`)—not duplicated here.

## Launch guardrails

**Product trust** (documented in sister Terms and Privacy):

- Verify AI output before classroom use; outputs are not for high-stakes decisions without human review
- No student PII collected through the prompt-building workflow
- Optional PDFs carry a Classroom License and 14-day refund policy

**For `.blog` readers:**

- CPB usage or PDF sales do not prove enterprise AI implementation maturity—the same category error as citing [Corporate Ladder](/articles/corporate-ladder-soft-launch/) engagement in a procurement deck
- Do not paste builder copy into governance forums as if it were eval evidence; link relevant playbooks and cite pass rate, cycle time, or incident cost on real workflows per [AI Procurement Freeze](/articles/ai-procurement-freeze/)

promptanatomy.online gives teachers a structured front door. The job of this blog remains turning curiosity into repeatable, owned AI workflows—and `.app` into team practice when you are ready to standardize.
