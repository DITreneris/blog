---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-06-17
faq:
- answer: Seven ordered sections starting with Bottom line, no forbidden phrases such
    as Self-Correction, one automatic repair retry maximum, and reject-without-persist
    if validation still fails.
  question: What must validate before an audit row is saved?
- answer: '/audit_stats summarizes accepted rows only. v1.0 defines what accepted
    means—the seven-section contract passes before SQLite persist.'
  question: How does v1.0 relate to v0.9 /audit_stats?
hero_caption: Select → local audit → seven-section validate → SQLite → history/stats;
  invalid → retry once → reject (not stored). Process pipeline, not the repo-brain
  poster.
hero_image: images/articles/critique-agent-v10-verified-local-audits/hero.png
key_takeaway: A local audit is operational when output passes a seven-section contract
  before SQLite persist—not when the model returns fluent critique.
reading_time: 8 min read
slug: critique-agent-v10-verified-local-audits
status: published
summary: Critique Agent v1.0 on Ubuntu/Ollama — seven-section validation gate, one
  repair retry, reject-without-persist, SQLite rows; v1.1 function audit and v1.2
  shared runner noted as follow-ups.
tags:
- agents
- eval
- workflow-automation
- governance
title: 'Critique Agent v1.0: Verified Local Code Audits'
---

[Critique Agent v0.9](/articles/critique-agent-v09-audit-stats/) made aggregate pass rates visible—`/audit_history` for drill-down rows, `/audit_stats` for the weekly headline. That only helps when saved rows mean the same thing run to run. v1.0 is the gate before persist: **verified local code audits** where output must pass a seven-section contract before SQLite accepts it. The v0.9 hero was a destination poster (`repo_brain.png`); this hero is the mechanism (`v01.png`)—select, audit, validate, save, review. Building block by block made the pipeline obvious—each CLI command snaps to one spine once you stop adding features sideways. For the wider lesson that fluent inference is not the system, see [The Model Is Not the System](/articles/the-model-is-not-the-system/).

## What v0.9 did not guarantee

v0.8 closed the minimum loop: run local audit, validate structured output, retry once, persist accepted results, list history. v0.9 added aggregates on top. Neither version fully documented **what** “validated output” meant for a code-segment audit before v0.6–v1.0 work landed. A verdict enum alone can pass while sections are missing, misordered, or padded with generic approval. Gemma could return readable critique that failed the contract—or soft `GO` prose when practical risks were visible. Stats on bad rows lie with the same confidence as stats on good ones. v1.0 fixes the definition of **accepted** before `/audit_stats` earns trust.

## The v1.0 pipeline (walk the hero)

The hero diagram reads left to right. Each box is a CLI stage you can replay after a near-miss:

```text
Select Code → Local Audit → Validate Output → Save Result → Review History
         Invalid ↓ Retry Once (repair) ↓ Still invalid → Reject (not stored)
```

**Select code** — `/audit_lines <path> <start> <end>` sends only the chosen line range (max 200 lines), with path traversal blocked and end lines capped safely. **Local audit** — Ollama runs Gemma with audit rules (`think: false`, low temperature) via a native chat path, not a cloud API. **Validate output** — `audit_validator.py` checks the seven-section contract; this is the glowing gate on the hero. **Save result** — accepted runs land in `audit_results` inside `memory.db` via `memory_store.py`. **Review history** — `/audit_history` and `/audit_stats` from v0.9 read only persisted rows.

Invalid output triggers **one repair retry** through `audit_runner.py`; if validation still fails, the run is **rejected and not stored**—no false-positive row for Legal to misread later. Prompting was improvisation; seven sections with one retry is the branch tree you can pytest. That is the same promotion discipline as workflow eval: [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/) treat pass/fail gates as release rights; here the gate is a single-agent CLI audit before SQLite.

## Seven-section contract

The validator enforces a fixed markdown contract aligned with `prompt_builder.py` and `audit_runner.py`. Checks include: response starts with **`1. Bottom line`**; all seven numbered headings present, in order, non-empty; forbidden phrases such as **`Self-Correction`** rejected; no unexpected content before section 1; response ends after section 7.

| # | Section | Validator intent | Typical failure |
|---|---------|------------------|-----------------|
| 1 | Bottom line | One-paragraph summary tied to the provided code only | Generic praise with no code reference |
| 2 | Verified defects | Concrete, visible runtime/security/workflow defects | Invented missing functions or theoretical bugs |
| 3 | Non-blocking risks | Practical risks that do not block ship today | Stylistic noise reported as defects |
| 4 | Assumptions | Dependencies the audit inferred from visible code | Claims about files not in the segment |
| 5 | Future improvements | Optional hardening—not mixed into verdict | Disguised defects labeled as “nice to have” |
| 6 | Verdict | `GO`, `GO_WITH_NOTES`, or `FIX` (persisted enum) | Wrong enum or verdict contradicting section 2 |
| 7 | Confidence | High / Medium / Low for the verdict | Missing or empty confidence line |

A real persisted row from development (after validation passed) looked like this:

```text
#1 | GO_WITH_NOTES | confidence: High | chat_agent.py:339-397 | retry: false | 2026-06-11T14:02:13.776796
```

The long-form seven-section body stays in CLI output; the database row captures what [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/) need for replay—verdict, file reference, line range, confidence, retry flag, and UTC timestamp—not a chat transcript.

## v1.0 usefulness hardening

Structure without judgment still wastes operator time. v1.0 tightened `build_file_audit_prompt()` while keeping the validator enum unchanged (`GO` | `GO_WITH_NOTES` | `FIX`) to avoid compatibility risk:

- Audit **only** the provided segment—no invented defects or dependencies.
- Require **practical failure modes** for focused code audits; anti-generic approval guidance.
- Separate **verified defects**, **non-blocking risks**, **assumptions**, and **future improvements** in prose—not blended into a single vague warning block.
- Stricter **prompt-level** verdict guidance so soft `GO` answers do not slip past visible edge-case or maintainability risks.

Prompt changes are releases. Treat them like regression cases: [Prompt Regression Testing](/articles/prompt-regression-testing-week/) freezes eval sets and ties pass rate to promotion—the same discipline on a local stack when you harden audit prompts after a model swap.

## Local stack and boundaries

The inference stack is unchanged from v0.9: Ubuntu, Ollama, Gemma 12B, Pydantic AI, pinned dependencies in a venv, pytest on the audit path. Everything runs **100% local**—no API keys, no egress. When source code cannot leave the machine, the boundary is physical, not prompt text—see [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/). v1.0 adds governance at the **output** layer: validate before persist, not after the fact in a dashboard.

## Shipped vs roadmap

| Item | v1.0 | Still next |
|------|------|------------|
| Seven-section validate + retry/reject | Shipped | — |
| SQLite persist on `/audit_lines` | Shipped | — |
| `/audit_history`, `/audit_stats` | Shipped (v0.9) | — |
| Audit usefulness / anti-soft-GO prompts | Shipped (v1.0) | — |
| Repo Context / Inspect (repo-brain poster) | Roadmap | Bounded tools first |
| `/audit_file` legacy path | Unchanged | Align with shared runner later |
| RAG, embeddings, dashboards | Deferred | Same as v0.9 |

Next bounded capabilities follow [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/)—add context and inspect as tools with the same structured output and persist rules, still no embedding index until the single-agent audit loop is boring.

## What shipped after v1.0 (agent repo only)

These landed in the Critique Agent codebase after the v1.0 blog cut; no separate field note yet:

**v1.1 — function-aware chunking.** `code_chunker.py` plus `/audit_function <path> <function_name>` audits Python functions by AST range instead of manual line math. Manual line math for every function audit gets old fast—that is why v1.1 added AST ranges, not a second validator. Same validated path and SQLite persist as `/audit_lines`. Limits: top-level and async functions only; class methods and duplicate nested names out of scope.

**v1.2 — shared audit execution.** The first refactor that felt real was not rename theater—`/audit_function` had copied `/audit_lines` guts. v1.2 extracted `run_selected_code_audit()` so line and function entry points share one validate → retry → persist spine. Fork the runner and your stats lie; that is the same lesson as validate before persist, one layer down in code. Refactor only—`/audit_file` intentionally left on its legacy path. No new blog post; the point is to keep validation from forking across commands.

If you are tracing the series on `.blog`: [v0.9](/articles/critique-agent-v09-audit-stats/) established history before stats; v1.0 establishes validate before persist before stats mean anything.

## Operating discipline (what I would not skip again)

Four decisions kept v1.0 shippable:

1. **Validate before persist.** Seven-section contract gates SQLite—not the reverse.
2. **One runner before more commands.** Line and function audits must share the same validate → retry → persist path (v1.2 lesson).
3. **History before stats.** `/audit_stats` only summarizes rows that passed validation (v0.9 discipline still applies).
4. **Defer the platform.** Embeddings, RAG, orchestration, and dashboards stay on the *do not do yet* list.

I stopped adding features when duplication showed up—that was the first time the project felt like a system, not a script stack. Still fun when pytest goes green. Copy the pipeline on the hero, not the repo-brain poster. Install Ollama, enforce the seven-section contract, reject invalid output without storing, list history, then aggregate. Context and repo inspect remain the next chapter on the poster—not because v1.0 already shipped them.
