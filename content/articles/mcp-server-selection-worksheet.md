---
authors: Prompt Anatomy
body_locked: true
category: Templates
content_tier: template
date: 2026-06-16
faq:
- answer: No allowlist enforcement, no audit log for tool calls, no permission scoping,
    or no documented owner for server updates—these fail regardless of feature score.
  question: What are MCP server red lines?
- answer: IT scores security and operational fit. The workflow owner scores business
    utility and handoff requirements. Governance signs off when red lines pass.
  question: Who scores MCP servers—IT or the workflow owner?
- answer: No. A failed security or governance gate blocks selection even if the server
    leads on features or demo velocity.
  question: Can feature score override a failed security gate?
hero_image: images/articles/mcp-server-selection-worksheet/hero.png
hero_caption: "MCP server selection checklist — security, governance, and operational fit for IT teams."
howto_steps:
- name: Score security and governance criteria first
  text: Score each criterion from 1 to 5 and mark red-line failures as blockers regardless
    of total score.
- name: Attach evidence links
  text: Keep docs, test logs, and security notes in the evidence column for every scored
    row.
- name: Run the IT go/no-go checklist
  text: Confirm auth, least-privilege scopes, staging audit fields, injection tests,
    escalation rules, rollback, and RACI ownership before production write scopes.
- name: Link the worksheet to governance RACI
  text: Store the completed worksheet with the workflow RACI so incident response has
    a named owner when configuration drifts.
key_takeaway: Score MCP servers on security and governance red lines first—total feature score does not override a failed allowlist or audit test.
reading_time: 3 min read
slug: mcp-server-selection-worksheet
status: published
summary: IT-ready worksheet and checklist for selecting MCP servers with security, governance, and operational fit criteria.
title: "MCP Server Selection Worksheet"
tags:
  - templates
  - mcp
  - governance
  - prompt-injection
  - workflow-automation
---

Use this worksheet to evaluate MCP servers before connecting them to production workflows. The goal is not to find the most feature-rich server; the goal is to choose a server your IT and governance teams can safely operate.

Read this together with [Model Context Protocol for Enterprise Teams](/articles/model-context-protocol-enterprise/) so architecture and security decisions stay aligned.

## How to score

Scoring is deliberately simple so IT and governance can run the worksheet in one working session. A high total score never overrides a red-line failure—broad write scopes and missing audit fields are blockers even when demo latency looks excellent.

- Score each criterion from **1 (poor)** to **5 (strong)**.
- Mark any **red-line failures** as blockers regardless of total score.
- Keep evidence links (docs, test logs, security notes) in the final column.

## MCP server selection worksheet

Work through each row with security and governance first; integration polish matters only after allowlists, auth, and logging fields pass review. Link completed worksheets to your [governance RACI](/articles/governance-raci-worksheet/) so incident response has a named owner when configuration drifts.

| Area | Criterion | Score (1-5) | Red-line failure? | Evidence / notes |
|------|-----------|-------------|-------------------|------------------|
| Security | OAuth/OIDC or equivalent auth support | | | |
| Security | Tool-level allowlist and scope controls | | | |
| Security | Read/write separation possible | | | |
| Security | Prompt-injection sanitization strategy documented | | | |
| Governance | Audit log fields include tool, args hash, actor, timestamp | | | |
| Governance | Versioning for server config and policy mappings | | | |
| Governance | Incident response owner and escalation path defined | | | |
| Operations | SLO/SLA expectations documented | | | |
| Operations | Rate limits and retry behavior are predictable | | | |
| Operations | Monitoring hooks (errors, latency, call volume) available | | | |
| Integration | Works with required model/runtime stack | | | |
| Integration | Supports required data sources/tools with least privilege | | | |
| Cost | Pricing model matches expected call pattern | | | |
| Cost | Cost controls or quotas available | | | |
| Vendor fit | Maintenance cadence and support maturity | | | |

## IT checklist (go/no-go)

Treat unchecked items as deployment blockers for production write scopes. Staging replay drills should produce log rows that match your [audit trail](/articles/audit-trails-for-ai-workflows/) schema before pilot traffic touches customer data.

- [ ] Authentication method approved by security team.
- [ ] Least-privilege scopes mapped per workflow ID.
- [ ] Logging fields validated in a staging replay drill.
- [ ] Prompt-injection test cases passed on representative data.
- [ ] Human escalation rules defined for risky write actions.
- [ ] Rollback path tested if server is unavailable or misconfigured.
- [ ] Ownership documented in governance RACI.

## Optional weighted model

Weighted scoring helps compare two acceptable candidates when neither triggers a red line. It does not replace red-line checks—security and audit failures remain blockers regardless of total score.

If your team needs weighted scoring, use:

- Security: 35%
- Governance: 25%
- Operations: 20%
- Integration: 15%
- Cost and vendor fit: 5%

Weighted scoring helps compare candidates, but red-line failures still override total score.

## Decision log template

Paste the block into your approval ticket so procurement and security can find the same facts six months later. Link the ticket ID from your [change log template](/articles/ai-change-log-template-prompt-context-and-model-updates/) when MCP scope changes.

Copy this block into your internal approval ticket:

- **Selected server:**  
- **Workflows in scope (v1):**  
- **Approved scopes/tools:**  
- **Known constraints:**  
- **Red-line checks passed:** Yes / No  
- **Pilot start date:**  
- **Review date (30-day):**  

## Common mistakes to avoid

These mistakes recur in first MCP rollouts—especially when demos emphasize speed over allowlists. Read them as release blockers, not post-launch cleanup items.

- Selecting a server based only on demo speed.
- Enabling broad write scopes in the first rollout.
- Shipping without replayable audit evidence.
- Ignoring ownership for configuration drift and incidents.

Start with read-only or low-risk use cases, then expand scope only after eval, observability, and governance signals are stable. For security controls after selection, see [Securing MCP and Agent Tools](/articles/securing-mcp-agent-tools/).
