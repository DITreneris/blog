---
authors: Prompt Anatomy
body_locked: true
category: AI Agents
date: 2024-12-08
hero_image: images/articles/multi-agent-handoff-pattern/hero.png
hero_caption: "Orchestrator routes each step to a specialist agent with a minimal handoff payload and human gates on external actions."
key_takeaway: Multi-agent systems need handoff schemas and shared state—not chained prompts without ownership.
reading_time: 5 min read
slug: multi-agent-handoff-pattern
status: published
summary: How to split work across specialized agents with explicit contracts, state, and human escalation between steps.
title: Multi-Agent Handoff Pattern
faq:
  - question: When should a team split work across multiple agents?
    answer: After a single-path workflow proves value with eval and audit. Multi-agent adds coordination cost—use specialization with explicit handoff schemas, not chained prompts without ownership.
  - question: What belongs in a handoff payload between agents?
    answer: Goal, constraints, artifact references, open questions, and confidence—structured and small. Do not forward full chat history as the contract between specialists.
---

Multiple agents can work when each step has a **narrow contract**. Without that, you get expensive ping-pong—research agent asks draft agent to clarify, draft agent invents facts, checker fires late—and untraceable errors in production. The pattern is not "more agents because vendors sell orchestration." It is **specialization with explicit handoffs**, shared state, and human gates on anything that commits the business.

Use this after a single-path workflow proves value with eval and audit. Early pilots should stay one retrieval + one model call until metrics justify complexity—see [how to design an AI agent workflow](/articles/how-to-design-an-ai-agent-workflow/) and [handoff rules between humans and AI](/articles/handoff-rules-between-humans-and-ai/) before splitting agents.

## Pattern overview (orchestrator and specialists)

**Orchestrator** routes the task to a specialist step: research, draft, legal scan, formatting. It does not do everyone's job—it enforces sequence and records which step is active. Orchestrator logic should be boring state machine code where possible, not a chatty meta-model improvising process.

**Handoff payload** carries goal, constraints, artifact references, open questions, and confidence. Payloads are small and structured—not full chat history dumped forward. Each specialist trusts the contract, not the entire thread.

**Checker agent or rule engine** validates before the next step or before human send. Policy checks often belong in rules, not LLM "please verify compliance."

**Human gate** on external actions, policy hits, low confidence, and VIP flags—aligned with [data boundaries](/articles/data-boundaries-for-ai-agents/) triggers.

Northline's tender pilot uses orchestrator `tender-v2` with steps `retrieve → draft_section → legal_scan`; support-reply-v3 stayed single-path until pass rate held—do not multi-agent by default.

## Handoff schema (minimal JSON)

Store schema version with workflow ID in logs. Replay drills use payloads to reconstruct order.

```json
{
  "workflow_version": "tender-v2",
  "step": "legal_scan",
  "inputs_hash": "...",
  "artifacts": ["draft_section_3.md"],
  "open_questions": [],
  "confidence": 0.82
}
```

**`workflow_version`** ties to registry and eval set. **`artifacts`** are references, not embedded secrets. **`open_questions`** force human answer before proceed—empty array means "do not hallucinate closure." **`confidence`** below threshold routes to review per handoff table in [human-AI handoff rules](/articles/handoff-rules-between-humans-and-ai/).

Log each handoff in [audit trails](/articles/audit-trails-for-ai-workflows/) with step name and hash—multi-agent without logs is multi-blame.

## When not to use multi-agent

**Single-step generation with clear eval** — one prompt ID, one retrieval scope, smoke gate in CI. Adding agents adds latency and failure modes without benefit.

**Tasks where one retrieval + one model call suffices** — most tier-2 assists, many internal summaries. Measure handle time and pass rate before splitting.

**Early pilots** — prove outcome metric and governance artifacts first. Split only when one path hits eval ceiling or qualitatively different steps need different tools/models.

**"Because the platform supports agents"** — not a criterion. Criterion is evidence that specialization reduces overrides or legal flags while holding pass rate.

## Operating multi-agent with governance

Each specialist step needs an **owner** in RACI—who approves prompt changes for that step, which eval cases gate promotion. Forum reviews step additions like new connectors—see [risk cadence](/articles/ai-risk-review-cadence/).

Expand allow lists per step in boundary matrix; routing agent at Northline added one write row after fifty-case eval—not full CRM write because orchestrator could.

Eval sets need **per-step cases** and end-to-end cases—legal scan may pass while draft step drifts.

## Failure modes

**Chat history as handoff** — token bloat, leakage across tenants, unreproducible runs.

**No checker between draft and send** — customer sees unchecked enthusiasm.

**Orchestrator as creative writer** — process drift; keep orchestration deterministic.

**Missing human gate on external tools** — email send, portal upload, ticket close.

Multi-agent handoff pattern works when contracts are explicit and logged—not when more models talk longer.
