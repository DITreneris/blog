---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: playbook
date: 2026-06-16
faq:
- answer: When code cannot leave the machine, when you need structured verdicts and
    persisted audit rows, and when aggregate pass rates matter more than chat fluency.
    A hosted API is faster to demo but weaker on accountability unless you wrap it
    yourself.
  question: When is a local code-audit agent worth building vs using a hosted API?
- answer: At minimum, verdict, confidence, file reference, retry flag, and UTC timestamp
    per accepted run. History must be stable before stats—otherwise aggregates lie
    about a moving schema.
  question: What is the minimum audit record to persist before adding /audit_stats?
hero_caption: Before/after — repo-aware critique replaces zero-context chat. v0.8 ships
  the audit loop and history; v0.9 adds /audit_stats. Context and inspect boxes on
  the hero are next, not current.
hero_image: images/articles/critique-agent-v09-audit-stats/hero.png
key_takeaway: A local critique agent becomes operational when audit results persist,
  history is retrievable, and aggregate stats expose GO/FIX mix—not when Ollama returns
  fluent chat.
reading_time: 8 min read
slug: critique-agent-v09-audit-stats
status: published
summary: Critique Agent v0.9 on Ubuntu with Ollama, Gemma 12B, and Pydantic AI — v0.8
  audit history, new /audit_stats aggregates, and an honest roadmap for repo context.
tags:
- agents
- eval
- workflow-automation
- governance
title: 'Critique Agent v0.9: Local Audit Stats'
---

Pasting a code block into a cloud chatbot is fast—and operationally hollow. The model guesses from zero project context, returns prose you cannot gate, and leaves no row Legal could replay after a near-miss. I built **Critique Agent** on Ubuntu with Ollama, Gemma 12B, and Pydantic AI to close a smaller loop first: **structured local audit, persisted history, aggregate stats**—not a ChatGPT clone.

The hero diagram frames the destination: *before*, a chatbot judges from zero context; *now*, an agent reads the repo before judging it. **v0.9 does not ship full repo context or file inspect yet.** It ships **`/audit_stats`** on top of the v0.8 audit loop. Read the five boxes on the hero as a contract—Memory, Audit, and Smart Prompting are live; Context and Inspect are next.

For the wider lesson that inference is not the system, see [The Model Is Not the System](/articles/the-model-is-not-the-system/).

## What v0.8 already closed

Before aggregate stats, I needed a **minimum useful audit loop** that could run in a real CLI session and survive pytest. v0.8 delivered that end to end:

```text
select code block → local audit → validate structured output → retry once if invalid
→ persist accepted result → retrieve recent audit history through CLI
```

Each accepted run stores a structured verdict—not free text. The enum is **`GO`**, **`GO_WITH_NOTES`**, or **`FIX`**, with confidence, file reference, retry flag, and a timezone-aware UTC timestamp. Invalid structured output triggers **one retry**; if validation still fails, the run does not land in history as a false positive.

The `/audit_history` command lists recent rows newest first. Optional limit works:

```text
/audit_history
/audit_history 5
```

A real persisted row from development looked like this:

```text
#1 | GO_WITH_NOTES | confidence: High | chat_agent.py:339-397 | retry: false | 2026-06-11T14:02:13.776796
```

That format is deliberate. [Evaluation Hooks for AI Workflows](/articles/evaluation-hooks-for-ai-workflows/) treat pass/fail gates as promotion rights; this CLI encodes the same discipline for a **single-agent code critique**—schema first, retry once, persist only accepted rows. [Audit Trails for AI Workflows](/articles/audit-trails-for-ai-workflows/) ask what you can reconstruct after an incident; here the minimum is verdict, location, confidence, retry, and timestamp—not a chat transcript.

v0.8 also hardened operator basics: stripped input before exit checks, replaced deprecated `datetime.utcnow()` with `datetime.now(UTC)`, and added regression coverage for `get_recent_audit_results`. The external `pydantic_ai` deprecation warning about event loops is noted but out of project scope.

## What v0.9 adds — `/audit_stats`

I added **`/audit_stats`** only after `/audit_history` stayed stable in real CLI runs and tests. Aggregates without reliable history lie about quality—you would be charting a schema still in motion.

The command answers an operator question history alone cannot: **is the agent getting stricter or sloppier over time?** Example output shape:

```text
Total audits: 12
GO: 5
GO_WITH_NOTES: 4
FIX: 3
Retries used: 2
```

Use it in weekly review the same way teams use CLEAR scorecards—[Evaluating Agents with CLEAR](/articles/evaluating-agents-with-clear/) separates efficacy from assurance and reliability. `/audit_history` is the drill-down row; `/audit_stats` is the weekly headline. If FIX counts climb after a model swap, you have a signal to freeze promotion until eval cases catch up—not a vibe in standup.

v0.9 intentionally does **not** add file filtering, pagination, embeddings, RAG, multi-agent orchestration, or dashboards. Those were explicit **do not do yet** items after v0.8; stats are the smallest next command that still teaches something about operating a local agent.

## Local stack (what runs underneath)

Before agent behavior, the inference stack has to be boring and reproducible. The in-body diagram shows the install pipeline—**not** the full capability ring around "Private AI Assistant."

![Local inference stack — Ollama, Gemma 12B, and Pydantic AI on Ubuntu](/images/articles/critique-agent-v09-audit-stats/local-stack.png)

*Figure: User → Ollama → Gemma → Pydantic AI → local assistant. Knowledge, Documents, and Analytics on the poster are deferred—not shipped in v0.9.*

| Gate | Check |
|------|-------|
| **Ollama alive** | Model pulls and responds to a one-line smoke prompt on-box |
| **Python env** | Pinned `pydantic` and `pydantic-ai` in a venv; tests pass |
| **Structured output** | Audit schema validates before any persist |
| **CLI loop** | Select block → audit → history row → stats headline |

Everything runs **100% local**—no API keys, no egress. That aligns with [Data Boundaries for AI Agents](/articles/data-boundaries-for-ai-agents/): when source code cannot leave the machine, the boundary is physical, not prompt text. The stack chapter is install discipline; the agent chapter is governance discipline.

## Hero boxes — shipped vs roadmap

The repo-brain hero lists five capabilities. Treat it as a **roadmap with honest status**, not a feature checklist.

| Hero box | Status in v0.9 |
|----------|------------------|
| **Memory** | Shipped — `memory_store`, `/audit_history` |
| **Audit** | Shipped — structured verdicts; v0.9 adds `/audit_stats` |
| **Smart Prompting** | Shipped — Pydantic AI schema + single retry on invalid output |
| **Context** | Roadmap — repo-aware context before verdict |
| **Inspect** | Roadmap — targeted file read before audit |

The `own_gpt` stack poster also shows Knowledge, Automation, Documents, and Analytics around a generic assistant. **None of that ring is v0.9 scope.** Automation here means CLI commands and tests—not workflow orchestration. Documents and analytics dashboards wait until history and stats prove stable over weeks of real use.

Next build steps follow [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/): add context and inspect as bounded tools with the same structured output and persist rules—still no RAG, still no embedding index, still no multi-agent handoffs until the single-agent audit loop is boring.

## Operating discipline (what I would not skip again)

Three decisions kept v0.9 shippable:

1. **History before stats.** `/audit_stats` came after `/audit_history` worked in CLI and pytest—not the reverse.
2. **Schema before fluency.** A chatty local model that ignores `GO` / `FIX` enums is a demo, not an agent.
3. **Defer the platform.** Embeddings, RAG, orchestration, and dashboards were written down as *do not do yet*—and v0.9 respected that list.

If you are building your own local critique agent, copy the loop, not the poster. Install Ollama, enforce structured output, persist accepted audits, list history, then aggregate. Context and repo inspect belong on the hero because they are the next chapter—not because v0.9 already shipped them.
