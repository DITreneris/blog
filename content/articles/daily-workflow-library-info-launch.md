---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-05-30
hero_caption: Execution agents localize UI, UX, and prompt copy across EN · ET · LV · JA ·
  LT; the learning loop turns locale QA failures into rules for the next translation pass.
hero_image: images/articles/daily-workflow-library-info-launch/hero.png
key_takeaway: A closed-loop builder system—Orchestrator plus specialist agents plus lessons
  from locale QA—ships premium multilingual copy UX without an AI runtime; org-context prompts
  still beat template depth for daily work.
reading_time: 9 min read
slug: daily-workflow-library-info-launch
status: published
summary: Field note on the May 2026 production launch of promptanatomy.info—a five-locale
  daily workflow library—and how a closed-loop agent system localized UI, UX, and prompt
  copy while hardening release gates across EN, ET, LV, JA, and LT.
tags:
  - prompt-systems
  - workflow-automation
  - change-management
  - orchestration
title: Who Orchestrates the Builders — Shipping promptanatomy.info
---

Teams that roll out prompt libraries without org context scale paste-ready mistakes faster than they scale review habits. Northline's enablement lead shipped a `.info` workflow pack to forty contributors in one week. Adoption looked strong until a client-facing email went out with an invented statistic. Nobody had run a send check because the library felt ready to paste. The product needed to exist; the **shipping discipline** needed to match.

In late May 2026, Prompt Anatomy cut over **promptanatomy.info** to Vercel production—**v1.4.0** on **2026-05-29** in the open sister repo [DITreneris/automation](https://github.com/DITreneris/automation). The **Use** spoke is a free, no-account, **five-locale** static library (LT, EN, ET, LV, JA) with eight org-analysis prompts and a copy-first journey. What made the launch repeatable was not a bigger template count—it was a **closed-loop agent system** we used while translating UI, UX, and prompt copy across locales: Orchestrator plus Content, UI, QA, and Research agents on the execution side; logs, evaluation, lessons, and rule updates on the learning side.

This article is a field note on what shipped, how the hero diagram maps to multilingual product work, and where `.info` sits beside governed implementation content on `.blog`. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/). For the **Enter** spoke—send check before depth—see [Quick Send Check First](/articles/first-ai-lesson-cloud-launch/).

## What promptanatomy.info is

promptanatomy.info is the **Use** spoke—not the knowledge hub, not training checkout, and not a vertical wedge like `.online` or `.ceo`.

**It is:**

- A free, no-account static library at [promptanatomy.info/en/](https://www.promptanatomy.info/en/) with paths for **LT, EN, ET (Estonian), LV (Latvian), and JA (Japanese)**
- **Eight org-analysis prompts** with bullet-proof META / INPUT / OUTPUT blocks per [BULLET_PROOF_PROMPTS](https://github.com/DITreneris/automation/blob/main/docs/BULLET_PROOF_PROMPTS.md)
- A **copy → mark done → next prompt** journey with progress in browser localStorage
- **Assembly only**—the library never calls an AI API; visitors paste into ChatGPT, Claude, or Gemini

**It is not:**

- An agent runtime, LMS, or enterprise workflow registry
- Proof of corporate AI maturity for procurement decks

That separation mirrors a rule we repeat on `.blog`: the library is not the execution environment. See [The Model Is Not the System](/articles/the-model-is-not-the-system/). The agent loop in the hero diagram runs on the **builder side**—localizing and hardening the product—not inside the user's chat session.

## Read the hero diagram

The launch hero encodes a **closed-loop agent learning system**—not a production multi-agent graph customers run.

| Diagram block | Multilingual shipping on `.info` |
|---------------|----------------------------------|
| **Orchestrator** (plan · route · retry · track) | Repo Orchestrator role—CI parity, locale gates, `generate:et-lv` diff checks, release coordination per [AGENTS.md](https://github.com/DITreneris/automation/blob/main/AGENTS.md) |
| **Content agent** | Microcopy and prompt bodies per locale—`library.js` (EN canonical), `library.lt.js`, `library.ja.js`, generated ET/LV |
| **UI agent** | DS v2.0 tokens, `library.css`, lang dropdown (hero + footer), collapsible prompts 2–8, mobile-first polish |
| **QA agent** | `structure.test.js` (five-locale asserts), pa11y on `/en/`, `/et/`, `/lv/`, `/ja/`, `lint:html` across 11 HTML pages |
| **Research agent** | [MULTILINGUAL_STRUCTURE.md](https://github.com/DITreneris/automation/blob/main/docs/MULTILINGUAL_STRUCTURE.md), hreflang rules, locale path parity |
| **Skills** | `npm test`, `validate:tokens`, `lint:design-tokens`, `generate:et-lv`, SEO head constants |
| **Output** | Shipped library—all five locales live at `promptanatomy.info` |
| **Learning loop** | [lessons/LESSONS.md](https://github.com/DITreneris/automation/blob/main/lessons/LESSONS.md)—EN leaks, generator drift, hreflang bugs, `serve -s` trap—fed back into rules and skills |

Contrast with [Agent Orchestrator Operating Model](/articles/agent-orchestrator-operating-model/): that article defines the **production org role** for multi-agent workflows in your company. This diagram shows the **builder system** that localized UI/UX and prompt copy while keeping five locales aligned—execution on the left, improvement on the right.

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

Translating that curriculum into five locales forced the agent loop to treat **prompt semantics** and **UI microcopy** as one surface—change EN copy, regenerate ET/LV, manually sync LT/JA, rerun pa11y. A library that reads premium in EN but leaks English into ET footer links fails the same way a support agent leaks the wrong disclaimer: users trust the wrong layer. See [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) when copy-paste feels ship-ready without review.

## Premium SaaS craft without a backend

v1.4.0 shipped Design System v2.0 and interaction patterns that feel like a hosted product—without databases or inference:

- **Token SSOT** — `css/tokens.css` only; semantic layers for link, action, focus, motion
- **Progressive disclosure** — prompt 1 always open; prompts 2–8 collapsible with `#blockN` deep links
- **Copy journey** — Copy CTA sits above "Before using"; successful copy auto-marks done and advances progress
- **Mobile-first** — lang dropdown opens down in hero, up in footer; hover transforms only at `@media (hover: hover)`; toast respects `safe-area-inset`
- **Self-hosted assets** — Lucide bundled locally; branded `404.html`; OG pipeline from `assets/img/og/`
- **GEO** — `llms.txt`, `sitemap.xml`, hreflang + JSON-LD on library pages

Premium feel here comes from **interaction design plus test gates**, not from calling an API. The builder agents earned that quality locale by locale—not in one EN-only sprint.

## Architecture patterns for implementers

Builders evaluating a similar multilingual library—or auditing how Prompt Anatomy extends the brand—should note seven patterns from the sister repo:

1. **EN canonical + locale generator** — edit EN first; `npm run generate:et-lv` for ET/LV; LT/JA manual with parity asserts
2. **Prompt text SOT** — per-locale `library.*.js` modules; bullet-proof META/INPUT/OUTPUT; copy payload excludes instructional chrome
3. **Assembly ≠ execution** — library constructs text; external tools run inference under user control
4. **Locale preview rule** — never `serve -s` on this stack; locale paths are real directories
5. **Product vs course hosts** — library at `promptanatomy.info/en/`; course CTA to `promptanatomy.app/en`—never merge in badges or checkout
6. **Vercel hardening** — `.vercelignore`, cache headers, 301 redirects for legacy icon/OG paths per DEPLOYMENT.md
7. **CI as Orchestrator** — `npm test` bundles structure, tokens, HTML lint, ESLint; pa11y runs per locale URL list

Deploy checklists, locale rules, and operator runbooks stay in the sister repo—[AGENTS.md](https://github.com/DITreneris/automation/blob/main/AGENTS.md), [CONTRIBUTING.md](https://github.com/DITreneris/automation/blob/main/CONTRIBUTING.md)—not duplicated here.

## What shipped (surfaces)

| Surface | URL |
|---------|-----|
| **Library (EN)** | [promptanatomy.info/en/](https://www.promptanatomy.info/en/) |
| **Library (LT / ET / LV / JA)** | `/lt/`, `/et/`, `/lv/`, `/ja/` on same host |
| **Repository** | [github.com/DITreneris/automation](https://github.com/DITreneris/automation) |
| **Training / pricing** | [promptanatomy.app/en](https://www.promptanatomy.app/en) |
| **Ecosystem map** | [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/) |

The stack stays thin: plain HTML, vanilla JS, Vercel static deploy, no backend and no AI API. Post-launch orchestrator hygiene—lean `AGENTS.md`, Cursor skills, `lessons/audit-patterns.md`—continues the learning loop through June 2026 without changing the user-facing contract.

## Launch guardrails

Treat `.info` completion as **orientation and daily habit**, not proof of enterprise implementation maturity:

- Finishing eight prompts in five languages does not replace a documented workflow ID, RACI, or eval gate pack on your side.
- Do not paste library copy into procurement decks; link the relevant playbook on `.blog` and cite pass rate, cycle time, or incident cost per [AI Procurement Freeze](/articles/ai-procurement-freeze/).
- Library host (`.info`) and course host (`.app`) must stay distinct in analytics and CTAs—the same class of mistake as cross-domain webhook mismatches in [Classroom Prompt Builder Launch](/articles/classroom-prompt-builder-launch/).

Free ecosystem spokes complement training; they do not replace the full six-module path on `.app`. See [Shipping Prompt Anatomy](/articles/shipping-prompt-anatomy/) for hub access and where **Enter** (`.cloud`) and **Manage** (`.ceo`) fit.

promptanatomy.info gives practitioners **org-aware daily prompts in five locales**. The job of this blog remains turning that curiosity into repeatable, owned AI workflows—with owners, eval gates, and audit trails that survive the next model swap.
