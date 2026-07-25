---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-07-02
faq:
  - question: Who qualifies for free M7-9 tester access?
    answer: Core plan buyers with Modules 1-6 access on promptanatomy.app can apply by emailing info@promptanatomy.app with their purchase email and preferred locale. Starter buyers need Core first because the Data Analysis path assumes six-block fluency.
  - question: Does a Tier 3 certificate during soft launch replace governance artifacts?
    answer: No. It proves practice depth inside the training app, not workflow IDs, eval gates, RACI, or audit trails on production systems.
hero_caption: Click-and-do modules on promptanatomy.app—M7-9 adds data-analysis
  practice, gated checks, and a Core buyer tester cohort during soft launch.
hero_image: images/articles/click-and-do-data-analysis-soft-launch/hero.png
key_takeaway: Click-and-do practice on promptanatomy.app teaches analysis judgment
  in-session; certificates prove practice depth, not production governance.
slug: click-and-do-data-analysis-soft-launch
status: published
summary: Soft launch v1.4.2 ships the M7-9 Data Analysis path on promptanatomy.app—click-and-do
  practice, gated checks, and handouts instead of slide-first training; Core buyers
  can apply to test before general release.
tags:
  - prompt-systems
  - change-management
  - workflow-automation
  - context-engineering
title: "Click-and-Do Before Slide Decks: promptanatomy.app"
---

Teams buy "AI prompt training" and receive slide decks. On [promptanatomy.app](https://www.promptanatomy.app/), we ship the opposite: **click-and-do** modules where learners run prompts, pass checks, and earn certificates—not passive slides.

In early July 2026, Prompt Anatomy shipped **v1.4.2** on [promptanatomy.app](https://www.promptanatomy.app/)—soft-launching **M7-9**, the Data Analysis path, for Core buyers after purchase. We are also recruiting **Core** buyers who completed Modules 1-6 for free tester access while diagrams and copy harden. For hub checkout, tiers, and M1-6, see [Shipping Prompt Anatomy](/articles/shipping-prompt-anatomy/). For the property map, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## Who we need

We are recruiting a **limited tester cohort** for M7-9 during soft launch. Work through the path, try the diagrams and checks, download the handout, and tell us where it creates confidence or confusion.

**Who:** Purchasers of the **Core** plan, Modules 1-6, on [promptanatomy.app](https://www.promptanatomy.app/#pricing).

**Offer:** Free **M7-9** access during the soft-launch window. This is a tester grant, not a public price change.

**Apply:** Email [info@promptanatomy.app](mailto:info@promptanatomy.app) with subject `M7-9 tester`, your **purchase email**, and **LT or EN** locale.

**Ask:** Complete M7-9 within 30 days and reply with three bullets: what confused you, what worked, and one bug or typo. Feedback shapes the general-availability cut; it does not replace support SLAs.

Starter-tier buyers, Modules 1-3, are not in this cohort unless they upgrade to Core first. The path assumes six-block fluency before data-analysis specialization.

## Click-and-do beats slide-first

Decks teach block names; they rarely teach **when to verify a number before it reaches a client**. Analysts copy polished outputs into email and dashboards, then invent metrics at scale. That failure mode is vocabulary without judgment.

Twenty years in classrooms and enablement taught one rule: adults learn when they **do something measurable in under three minutes**, not when they admire a deck. Duolingo and Udemy get one thing right: micro-loops and gated depth. We borrowed the pattern, not the gamification: short sessions, copy-run-check, certificates at a threshold, and PDF handouts for transfer, not streaks or leaderboards as proof of maturity.

| Pattern | Learner action | Bloom level | Where in training |
|---------|----------------|-------------|-------------------|
| Micro-loop | Choose, then get immediate feedback | Remember / Understand | M2 check, quiz gate |
| Copy-and-run | Fill blocks and run in a real AI tool | Apply | M3 business scenarios |
| Branching path | Pick analytics focus and see different slides | Analyze | M7 core plus four thematic branches |
| Gated test | Reach 70% or higher to unlock certificate tier | Evaluate | M8 to Tier 3 certificate |
| Capstone | Produce a MASTER PROMPT and 8-step workflow | Create | M9 dominant path |
| Offline transfer | Download a PDF handout, not another slide | Transfer | M1, M5, M6, and M7-9 handouts |

The lesson host teaches **assembly**; ChatGPT, Claude, and Gemini execute. That wedge is the same rule as [The Model Is Not the System](/articles/the-model-is-not-the-system/): training is not your production runtime.

## What M7-9 covers

Modules 1-6 teach the **six-block prompt system**, the foundation every other path assumes. **M7-9** is the production data-analysis specialization: pipeline thinking, data preparation, visualization choices, anti-hallucination habits, and a capstone that forces an eight-step workflow instead of a one-shot summary.

**M7** opens with a focus choice: visualization, ethics-plus, technique, or strategy. Learners move through a **shared core plus thematic branches**, which creates rerun value without a second product. Interactive diagrams cover analysis types, data prep, agent triads, and the data-story cycle; static SVGs became step-navigable React diagrams in **v1.4.2**.

**M8** is the knowledge check that gates **Tier 3** certification. **M9** centers on a **MASTER PROMPT** workflow with extended scenarios for teams that want volume practice. Depth on grounding and retrieval belongs on `.blog`: see [Grounding AI Outputs](/articles/grounding-ai-outputs/) and [RAG in Production](/articles/rag-in-production/). The training app links outward through ecosystem deepen moments instead of copying those playbooks into slides.

## What soft launch does not guarantee

Soft launch acknowledges open work. **v1.4.2** is a **readability and diagram-trust sprint** on the production M1-9 bundle, not a promise that every interactive schema has passed full manual browser QA. Modules **10-12** for agent engineering remain in the **authoring catalog** only; they are not in the production build buyers receive today.

What soft launch does guarantee is a complete **M7-9** path: adaptive focus branches, an M8 knowledge check, an M9 capstone workflow, a Tier 3 certificate path at **70% or higher** on M8, and DiagramKit-style step navigation across M1-9 so diagrams behave like instruments, not wallpaper.

## What v1.4.2 changed for learners

Tag **v1.4.2** (2026-07-01) prioritized **M1-9** learner-visible polish:

- **DiagramKit** - shared step badges, explanation panels, keyboard-safe navigation, and dark-mode diagram palettes, especially for the M7-9 pipeline and data-story cycle.
- **Design system** - clearer CTA hierarchy, 44px touch targets, and less layout jump on first paint because theme and font loading stabilize before React mounts.
- **EN/LT editorial sweep on M7-9** - hybrid-language strings removed from the EN locale and Tu-form consistency tightened in LT.
- **PDF** - a two-page **Data Analysis path handout** in LT and EN on M9 completion, using the shared handout layout.

## The Northline mistake

Northline's enablement lead celebrated strong **Module 3** certificate pass rates while a regional sales deck went out with a **fabricated pipeline conversion** figure. Nobody had practiced the M7 habit: sources named, structure explicit, human verify before external send. The fix was not fewer certificates; it was making **analyze-before-create** the mandatory bridge between foundation modules and analytics work. That maps to [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) when teams treat training completion as ship-ready governance.

## Launch guardrails

Treat `.app` progress as **practice and purchase**, not proof of enterprise implementation maturity:

- A **Tier 3 certificate** or finished M9 capstone does not replace a documented workflow ID, RACI, or eval gate pack. Use [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/) on real workflows.
- Do not paste training copy into procurement decks. Cite pass rate, cycle time, or incident cost on owned workflows per [AI Procurement Freeze](/articles/ai-procurement-freeze/).
- Graded scenario answers and go-to-market experiments stay inside the app—the same boundary as governed content on `.blog`.
- Free spokes (`.cloud`, `.info`, `.site`) complement training; they do not replace Core when you need the full six-block path plus analytics depth. Enter-spoke habit-before-scale lives in [Quick Send Check First](/articles/first-ai-lesson-cloud-launch/).

The soft launch is not a victory lap. It is a request for better signals: where learners hesitate, where diagrams teach faster than prose, and where the Data Analysis path needs one more pass before general release. If you are a Core buyer and want to test M7-9, email [info@promptanatomy.app](mailto:info@promptanatomy.app) with subject `M7-9 tester`.

*Part 1 — soft launch.* What those signals produced—six org-role paths on Module 7 in v1.4.7—is in [Role Paths Before Generic Analytics](/articles/role-paths-before-generic-analytics/).
