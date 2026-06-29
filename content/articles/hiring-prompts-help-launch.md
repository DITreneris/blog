---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-06-24
hero_caption: Six hiring steps—diagnose, define role, source, interview, offer, onboard—route
  through one AI Hiring Prompt System that returns a structured hiring plan.
hero_image: images/articles/hiring-prompts-help-launch/hero.png
key_takeaway: Hiring is a sensitive-data workflow first and a prompt workflow second—structure
  the recruiter prompt, keep candidate PII out of the builder, and let a human own the
  decision before any AI output touches a real applicant.
slug: hiring-prompts-help-launch
status: published
summary: A recruiting prompt that reads well can still leak candidate PII or produce a verdict
  nobody owns. Ten structured US hiring prompts at promptanatomy.help keep role-level fields
  only and put guardrails before template depth.
tags:
  - prompt-systems
  - templates
  - governance
title: Hiring Prompts Without the Data Leak
---

A recruiting prompt that reads well can still leak candidate PII, produce a biased screen, or leave a verdict nobody owns. In late June 2026, Prompt Anatomy shipped the **Hire** spoke at [promptanatomy.help/en/](https://promptanatomy.help/en/)—a free, EN-only static site with ten structured hiring prompts, never calling an AI API itself. Source and deploy details live in the open sister repo [DITreneris/personalas](https://github.com/DITreneris/personalas). Optional PDF guides ship through Stripe-hosted checkout.

This field note covers what shipped, why hiring forced a **guardrails-before-depth** order we did not need on lighter wedges, and where `.help` sits beside governed implementation content on `.blog`. If you are mapping properties for the first time, start with [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

## Where the Hire spoke started

*The Hire spoke started with a personal note from founder Tomas Staniulis.*

In 2013, at an HR conference in Vilnius, I gave a lecture on organizational culture. The room wanted something they could use on Monday—hiring steps, criteria, boundaries. I led with Kierkegaard's existentialism and Alfred Adler's individual psychology. The miscommunication was mine: it read as academic, not operable. Culture still mattered; philosophy without a loop did not land.

What stuck was simpler. HR audiences want **criteria, steps, and boundaries** before worldview. Culture talk without a system is noise—the fix is structure, not another slide deck. I still believe that. It does not mean people stop mattering; it means you stop outsourcing judgment to theater or to an ungoverned model.

promptanatomy.help is that lesson shipped: ten hiring prompts and the six-step loop on the launch hero—structure first, copy into external AI, **human still decides**. The central system on the hero assembles criteria, not verdicts; the recruiter owns the call.

Northline's talent lead piloted structured interview prompts across six open roles. The prompts were good; the failure was procedural—an interviewer pasted a candidate's full resume into a personal chat to "save time," outside any data agreement. Nothing about the prompt caused it; the **absence of a boundary** did. The fix was the same one `.help` encodes in its form: describe the role, never the person, and keep the decision with a named human. That is why guardrails come before template depth below.

## What promptanatomy.help is

promptanatomy.help is a **hiring try surface** for recruiters and people managers—not an applicant-tracking system and not a candidate data store.

**It is:**

- A free, EN-only, single-page set of **ten hiring prompts** (sourcing, screening, structured interviews, scorecards, offer and rejection messaging)
- A copy-first journey: pick a hiring step, fill a few fields, copy the prompt into ChatGPT, Claude, or Gemini
- Optional paid PDF guides—**Beginner $5.99 · Advanced $11.99**—sold through Stripe-hosted checkout and delivered by signed email link
- SOT-driven copy in sister [`config/sot.json`](https://github.com/DITreneris/personalas/blob/main/config/sot.json)

**It is not:**

- An AI runtime—the site never sends prompt text or candidate data to a Prompt Anatomy server
- An ATS, HRIS, or any system of record for applicants
- A compliance artifact—copying a screening prompt does not make a hiring process defensible

That separation mirrors a rule we repeat on `.blog`: the builder is not the execution environment. See [The Model Is Not the System](/articles/the-model-is-not-the-system/). Recruiters paste prompts into external tools under their own review; ops teams paste registry artifacts into governed agent stacks—the architecture lesson is the same.

## The hiring workflow

The live product follows one loop, deliberately scoped to keep raw applicant data out of it:

1. **Pick a hiring step**—source, screen, interview, score, or communicate a decision.
2. **Fill role-level fields**—seniority, must-have skills, interview focus, tone—not names, resumes, or protected attributes.
3. **Read the generated prompt** in the output panel; it updates as the form changes.
4. **Copy** into ChatGPT, Claude, or Gemini, then **edit with real context yourself**—under recruiter review, in a tool the employer controls.

The field set is intentionally role-shaped, not candidate-shaped. You describe the *job and the bar*, not the *person*. That is the first guardrail, encoded in the form itself.

## Why hiring puts guardrails before depth

Most ecosystem wedges can lead with template depth. Hiring cannot. A recruiting prompt that reads well can still produce a biased screen, an illegal question, or a confident summary of an applicant the model never actually saw. So `.help` front-loads three constraints:

| Hiring guardrail | What it prevents | Blog parallel |
|------------------|------------------|---------------|
| Role fields only—no candidate PII in the builder | Sending applicant data to a tool with no owner | [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/) |
| Prompts ask for criteria and structure, not verdicts | "AI said reject" with no human accountable | [Handoff rules between humans and AI](/articles/handoff-rules-between-humans-and-ai/) |
| Recruiter edits and verifies before any candidate sees output | Invented qualifications or unfair phrasing shipped at scale | [The Model Is Not the System](/articles/the-model-is-not-the-system/) |

## Builder patterns (for implementers)

The same assembly≠execution stack shipped earlier on [Classroom Prompt Builder Launch](/articles/classroom-prompt-builder-launch/) (May 2026, `DITreneris/teacher`); `.help` reuses it for recruiting. Three patterns worth copying:

- **SOT-first copy** — `config/sot.json` owns prompts, marketing copy, and legal metadata; treat it as a lightweight prompt registry for product copy—the same idea as versioned packs in [Structured Prompt System Blueprint](/articles/structured-prompt-system-blueprint/).
- **Same-host fulfillment** — Stripe checkout, the webhook, and `SITE_URL` must all belong to `promptanatomy.help`. Cross-host webhooks are how payments succeed while fulfillment lookups come back empty.
- **Public brand vs repo name boundary** — the repo is `personalas`, but **"Prompt Anatomy" is the only name allowed on shipped HTML**. Internal labels never leak to customer-facing surfaces.

Deploy checklists, webhook env tables, and the PDF pipeline stay in the sister repo (`DEPLOYMENT.md`, `docs/AGENT_SOT.md`)—not duplicated here.

## Launch guardrails

**Product trust** (documented in sister Terms and Privacy):

- Verify every AI output before it reaches a candidate; outputs are not hiring decisions
- No candidate PII is collected through the prompt-building workflow—keep it that way in your own use
- Optional PDFs carry a standard license and refund policy

**For `.blog` readers:**

- Using `.help` or buying a PDF does not make a hiring process compliant or bias-free—structure the workflow with owners and review, per [AI Governance Roles and Ownership](/articles/ai-governance-roles-and-ownership/)
- Treat AI-assisted screening as a drafting aid behind a human gate, not an automated filter

promptanatomy.help gives recruiters a structured, boundary-aware front door. The job of this blog remains turning that structure into repeatable, owned AI workflows—with data boundaries, human review gates, and audit trails that survive the next model swap.
