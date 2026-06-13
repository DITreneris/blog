---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: opinion
date: 2025-04-12
hero_caption: Random prompt → logic layer → team workflow → repeatable output — the chain
  promptanatomy.site explains in one glance.
hero_image: images/articles/prompt-anatomy-marketing-site-launch/hero.png
key_takeaway: promptanatomy.site is the discover-and-try surface; read depth on .blog and
  practice on .app.
reading_time: 4 min read
slug: prompt-anatomy-marketing-site-launch
status: published
summary: Field note on the April 2025 launch of promptanatomy.site — ecosystem map, Anatomizer,
  and maturity quiz — and where it sits beside the blog and training app.
tags:
  - prompt-systems
  - workflow-automation
title: Prompt Anatomy Marketing Site Launch
---

The Prompt Anatomy **marketing site** went live on **2025-04-12** at [promptanatomy.site](https://promptanatomy.site/). It is the official discover-and-try surface for the nine-domain AI operating system—less random prompting, more structured execution. Source and deploy details live in the open sister repo [DITreneris/site](https://github.com/DITreneris/site): a static Vite + React SPA on Vercel with no backend, auth, or CMS.

This article is a field note on what shipped, how the three interactives work, and where `.site` sits relative to governed implementation work on `.blog` and practice on `.app`.

## What promptanatomy.site is

promptanatomy.site is the **marketing and demo** layer for Prompt Anatomy. It explains the ecosystem story, lets visitors assemble a prompt in five layers, and returns a maturity tier in under a minute. It is **not** the knowledge hub—that is **promptanatomy.blog** (this site), where frameworks, governance playbooks, and templates live in long form. It is also **not** the training checkout—that is **[promptanatomy.app](https://www.promptanatomy.app/)**, where drills and methodology modules turn reading into repeatable team practice.

If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/). For Platform HQ ship details—checkout, magic-link access, and six-module training—see [Shipping Prompt Anatomy](/articles/shipping-prompt-anatomy/). The marketing site fills the gap between "what is this brand?" and "I need the RACI worksheet now"—orientation before depth.

## Three shipped interactives

The live build centers on three tabs builders and sponsors can click through in one sitting:

### Ecosystem journey map

The **Ecosystem** tab is a phase-driven map across Enter → Use → Create → Hire → Manage → Decide → Deepen → Play. Selecting a domain opens a detail panel with role, outcome, and link to the vertical product (`.cloud`, `.info`, `.space`, and the rest). The map answers "where does this URL fit?" without copying playbook prose from the blog.

### Prompt Builder (Anatomizer)

The **Prompt Builder** is an interactive five-part Anatomizer: **Persona**, **Context**, **Variables**, **Instructions**, and **Constraints**. Visitors compose layers in the browser and see how structure replaces one-shot chat. The builder teaches shape, not registry discipline—production prompts still need owners, version IDs, and eval cases documented on `.blog`.

### Team Assessment

The **Team Assessment** is a 60-second maturity quiz. It returns a tier result and a recommended domain to explore next. Useful for workshop openers and sponsor alignment; **not** a substitute for [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) or a procurement readiness review.

Together, the three surfaces give a coherent first visit: map the system, try structured prompt assembly, gauge where the team sits—then link to the article that matches the diagnosis.

## Read the hero diagram

The launch hero encodes the same chain the site sells: **Random Prompt → Logic Layer → Team Workflow → Repeatable Output**.

Random prompts produce inconsistent quality and unclear ownership. The **logic layer** is where Persona, Context, Variables, Instructions, and Constraints turn chat into a designed artifact. A **team workflow** assigns that artifact to a named process with eval gates and handoffs. **Repeatable output** is what sponsors fund—not another impressive demo.

That progression mirrors how we write on the blog: diagnose chaos, design structure, operationalize. For the blueprint behind the logic layer, see [Structured Prompt System Blueprint](/articles/structured-prompt-system-blueprint/). For outcome framing before you buy training, read [From Prompts to Business Outcomes](/articles/from-prompts-to-business-outcomes/).

## What shipped (surfaces)

| Surface | URL |
|---------|-----|
| **Marketing site** | [promptanatomy.site](https://promptanatomy.site/) |
| **Platform HQ** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Repository** | [github.com/DITreneris/site](https://github.com/DITreneris/site) |

The stack is intentionally thin for a marketing SPA: Vite 8, React 19, TypeScript, Tailwind CSS v4, and lucide-react icons. Open Graph, sitemap, and WebSite schema ship from the repo; Organization schema and pricing CTAs stay on `.app` per the sister project's SEO split. Builders who want local dev: `npm install`, `npm run dev` (port 5173), `npm run build`—details in the repo README, not duplicated here.

## Launch guardrails

Treat `.site` engagement as **discover and try**, not proof of implementation maturity:

- A quiz tier or Anatomizer export does not replace a documented workflow ID, RACI, or eval gate pack on your side.
- Do not paste marketing-site copy into procurement decks; link the relevant playbook on `.blog` and cite pass rate, cycle time, or incident cost on real workflows.
- Interactive demos are orientation; governed production still lives in registry discipline, audit trails, and the playbooks this blog publishes.

promptanatomy.site gives strangers a structured front door. The job of this blog remains turning that curiosity into repeatable, owned AI workflows—and `.app` into team practice when you are ready to standardize.
