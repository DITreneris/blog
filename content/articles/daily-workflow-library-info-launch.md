---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-05-30
modified: 2026-09-02
hero_caption: Execution agents localize UI, UX, and prompt copy across EN · ET · LV · JA ·
  LT; the learning loop turns locale QA failures into rules for the next translation pass.
hero_image: images/articles/daily-workflow-library-info-launch/hero.png
key_takeaway: A closed-loop builder system—Orchestrator plus specialist agents plus lessons
  from locale QA—ships premium multilingual copy UX without an AI runtime; org-context prompts
  still beat template depth for daily work.
slug: daily-workflow-library-info-launch
status: published
summary: Org-context prompts must come before daily template depth—otherwise paste-ready libraries
  ship invented facts at scale. promptanatomy.info v1.4.0 ships eight prompts across five locales
  with EN-canonical release gates, not a bigger template count.
tags:
  - prompt-systems
  - workflow-automation
  - change-management
  - orchestration
title: Who Orchestrates the Builders — Shipping promptanatomy.info
---

Teams that roll out prompt libraries without org context scale paste-ready mistakes faster than they scale review habits. Northline's enablement lead shipped a `.info` workflow pack to forty contributors in one week. Adoption looked strong until a client-facing email went out with an invented statistic. Nobody had run a send check because the library felt ready to paste. The product needed to exist; the **shipping discipline** needed to match.

Prompt Anatomy cut over **promptanatomy.info** to Vercel production on **2026-05-29** (**v1.4.0** in sister repo [DITreneris/automation](https://github.com/DITreneris/automation))—a free, no-account, **five-locale** static library (LT, EN, ET, LV, JA) at [promptanatomy.info/en/](https://www.promptanatomy.info/en/) with eight org-analysis prompts and a copy-first journey. What made the launch repeatable was a **closed-loop builder system** we used while translating UI, UX, and prompt copy: Orchestrator plus Content, UI, QA, and Research agents on the execution side; logs, evaluation, lessons, and rule updates on the learning side.

This field note covers what shipped and where `.info` sits beside governed implementation content on `.blog`. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/). For the **Enter** spoke—send check before depth—see [Quick Send Check First](/articles/first-ai-lesson-cloud-launch/).

## What promptanatomy.info is

promptanatomy.info is the **Use** spoke—not the knowledge hub, not training checkout, and not a vertical wedge like `.online` or `.ceo`.

**It is:**

- A free, no-account static library with paths for **LT, EN, ET, LV, and JA**
- **Eight org-analysis prompts** with bullet-proof META / INPUT / OUTPUT blocks per [BULLET_PROOF_PROMPTS](https://github.com/DITreneris/automation/blob/main/docs/BULLET_PROOF_PROMPTS.md)
- A **copy → mark done → next prompt** journey with progress in browser localStorage
- **Assembly only**—the library never calls an AI API; visitors paste into ChatGPT, Claude, or Gemini

**It is not:**

- An agent runtime, LMS, or enterprise workflow registry
- Proof of corporate AI maturity for procurement decks

That separation mirrors a rule we repeat on `.blog`: the library is not the execution environment. See [The Model Is Not the System](/articles/the-model-is-not-the-system/). The agent loop on the hero runs on the **builder side**—localizing and hardening the product—not inside the user's chat session.

## Builder loop on the hero

The launch hero encodes a **closed-loop agent learning system**—not a production multi-agent graph customers run.

| Diagram block | Multilingual shipping on `.info` |
|---------------|----------------------------------|
| **Orchestrator** (plan · route · retry · track) | Repo Orchestrator role—CI parity, locale gates, `generate:et-lv` diff checks per [AGENTS.md](https://github.com/DITreneris/automation/blob/main/AGENTS.md) |
| **Content agent** | Microcopy and prompt bodies per locale—`library.js` (EN canonical), `library.lt.js`, `library.ja.js`, generated ET/LV |
| **UI agent** | DS v2.0 tokens, `library.css`, lang dropdown, collapsible prompts 2–8, mobile-first polish |
| **QA agent** | `structure.test.js` (five-locale asserts), pa11y on `/en/`, `/et/`, `/lv/`, `/ja/`, `lint:html` across HTML pages |
| **Research agent** | [MULTILINGUAL_STRUCTURE.md](https://github.com/DITreneris/automation/blob/main/docs/MULTILINGUAL_STRUCTURE.md), hreflang rules, locale path parity |
| **Learning loop** | [lessons/LESSONS.md](https://github.com/DITreneris/automation/blob/main/lessons/LESSONS.md)—EN leaks, generator drift, hreflang bugs—fed back into rules |

Contrast with [Agent Orchestrator Operating Model](/articles/agent-orchestrator-operating-model/): that article defines the **production org role** for multi-agent workflows in your company. This diagram shows the **builder system** that localized UI/UX and prompt copy while keeping five locales aligned.

## The locale pipeline

EN is **canonical** for shipping gates. ET and LV pages and JS generate from EN via `npm run generate:et-lv`; LT and JA stay manual but must pass the same structure and a11y asserts. After every EN edit, CI fails if generated ET/LV/LT JS diff is uncommitted—that is the Orchestrator enforcing parity, not goodwill.

| Locale | Path | Maintenance |
|--------|------|-------------|
| **EN** | `/en/` | Canonical—`en/index.html`, `js/library.js` |
| **ET** | `/et/` | Generated from EN |
| **LV** | `/lv/` | Generated from EN |
| **LT** | `/lt/` | Manual—origin tone; must stay structurally aligned |
| **JA** | `/ja/` | Manual—prompt corpus in `prompt-bodies-ja.cjs` |

Local preview uses `npx serve . -l 3000` **without** `-s`—SPA mode breaks locale paths. That rule landed in lessons after a bad preview session; the learning loop working as designed.

## Curriculum order is the lesson

The eight prompts teach **org context before daily depth**—the same sequence Northline needed after the invented-statistic incident:

| `.info` prompt | Blog parallel |
|----------------|---------------|
| DI context check | [Structured Prompt System Blueprint](/articles/structured-prompt-system-blueprint/) |
| Organization portrait | [What Is Context Architecture](/articles/what-is-context-architecture/) |
| Role + KPI | [Types of Prompts for Business Workflows](/articles/types-of-prompts-for-business-workflows/) |
| Core processes (Pareto) | [From Prompts to Business Outcomes](/articles/from-prompts-to-business-outcomes/) |
| Daily prompt library (prompt 7) | [Handoff Rules Between Humans and AI](/articles/handoff-rules-between-humans-and-ai/) |

Translating that curriculum into five locales forced the agent loop to treat **prompt semantics** and **UI microcopy** as one surface. A library that reads premium in EN but leaks English into ET footer links fails the same way a support agent leaks the wrong disclaimer. See [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) when copy-paste feels ship-ready without review.

## Premium SaaS craft without a backend

v1.4.0 shipped Design System v2.0 and interaction patterns that feel like a hosted product—without databases or inference:

- **Token SSOT** — `css/tokens.css` only; semantic layers for link, action, focus, motion
- **Progressive disclosure** — prompt 1 always open; prompts 2–8 collapsible with `#blockN` deep links
- **Copy journey** — Copy CTA sits above "Before using"; successful copy auto-marks done and advances progress
- **Mobile-first** — lang dropdown, hover transforms only at `@media (hover: hover)`; toast respects `safe-area-inset`

Premium feel here comes from **interaction design plus test gates**, not from calling an API. The builder agents earned that quality locale by locale—not in one EN-only sprint.

## Builder patterns (for implementers)

Three patterns from the sister repo; deploy checklists stay in [AGENTS.md](https://github.com/DITreneris/automation/blob/main/AGENTS.md) and [CONTRIBUTING.md](https://github.com/DITreneris/automation/blob/main/CONTRIBUTING.md):

- **EN canonical + locale generator** — edit EN first; `npm run generate:et-lv` for ET/LV; LT/JA manual with parity asserts.
- **Assembly ≠ execution** — library constructs text; external tools run inference under user control.
- **CI as Orchestrator** — `npm test` bundles structure, tokens, HTML lint, ESLint; pa11y runs per locale URL list.

## Launch guardrails

Treat `.info` completion as **orientation and daily habit**, not proof of enterprise implementation maturity:

- Finishing eight prompts in five languages does not replace a documented workflow ID, RACI, or eval gate pack on your side.
- Do not paste library copy into procurement decks; link the relevant playbook on `.blog` and cite pass rate, cycle time, or incident cost per [AI Procurement Freeze](/articles/ai-procurement-freeze/).
- Library host (`.info`) and course host (`.app`) must stay distinct in analytics and CTAs—the same class of mistake as cross-domain webhook mismatches in [Classroom Prompt Builder Launch](/articles/classroom-prompt-builder-launch/).

Free ecosystem spokes complement training; they do not replace the paid foundation path (modules 1–6) on `.app`. See [Shipping Prompt Anatomy](/articles/shipping-prompt-anatomy/) for hub access and where **Enter** (`.cloud`) and **Manage** (`.ceo`) fit.

promptanatomy.info gives practitioners **org-aware daily prompts in five locales**. The job of this blog remains turning that curiosity into repeatable, owned AI workflows—with owners, eval gates, and audit trails that survive the next model swap.
