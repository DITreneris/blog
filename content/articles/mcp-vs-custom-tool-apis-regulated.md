---
authors: Prompt Anatomy
body_locked: true
category: AI Agents
content_tier: playbook
date: 2026-09-13
status: published
faq:
- question: Does adopting MCP remove the need for custom APIs?
  answer: No. MCP standardizes how agents discover and call permissioned connectors. Custom APIs remain justified for tenancy isolation, latency-sensitive hot paths, and already-certified SOA contracts. Many regulated teams run both under one allowlist.
- question: What security controls must exist before MCP or custom tools reach production?
  answer: Workflow-scoped allowlists, least-privilege scope at call time, injection-resistant handling of tool or API returns, human send gates on high-risk actions, and audit logs that support one-hour replay. The same baseline applies to MCP servers and custom APIs.
- question: How should audit trails differ for MCP versus custom connectors?
  answer: They should not differ on required fields. Both surfaces must log workflow ID and version, actor, tool or endpoint name, argument hash, policy decision, UTC timestamp, and human override when a send gate fires.
- question: When is a hybrid connector surface the default for regulated teams?
  answer: When vendor SaaS needs standardized MCP contracts and a core system already has a certified API gateway. Use MCP for shared read paths; keep custom APIs for writes that carry tenancy or dual-control requirements.
hero_caption: "Connector-surface choice — MCP for standardized tool contracts, custom APIs where tenancy or latency dominate, hybrid under one allowlist."
hero_image: images/articles/mcp-vs-custom-tool-apis-regulated/hero.png
key_takeaway: "MCP does not replace custom APIs. Choose the connector surface per workflow; keep eval, audit fields, and send gates on every path."
slug: mcp-vs-custom-tool-apis-regulated
summary: "MCP wins for standardized tool contracts under an allowlist; custom APIs win for tenancy, latency, and certified SOA—treat both as permissioned connector surfaces."
tags:
  - mcp
  - agents
  - governance
  - prompt-injection
title: "MCP vs Custom Tool APIs for Regulated Teams"
---

MCP does not retire your custom tool APIs. It is a standardized contract for how agents discover and call permissioned connectors—useful when several models or workflows must share the same systems of record under an allowlist. Custom APIs still win when latency, tenancy isolation, or already-certified SOA contracts dominate. Regulated teams should treat either path as a connector surface with the same eval cases, audit fields, and human send gates. The choice is per workflow, not a platform religion. If the workflow, owners, and risk class are still unnamed, stop and finish agent workflow design before picking MCP or a bespoke API.

## Decision criteria: control plane vs data plane

The connector-surface choice is not a protocol debate. It is a split between the control plane and the data plane. The control plane is the allowlist, caller identity, and call-time scopes. That plane is identical for MCP and custom APIs. The data plane is what moves: MCP adds discovery, schemas, and resources; a custom API is an explicit endpoint list.

Picking MCP does not invent tenancy, eval, or a send gate. OAuth is authentication, not a control plane. If the runtime is still unchosen, that is buy-vs-build—finish that frame first. Then decide how each system of record is reached, and write [fail-closed data boundaries in the integration layer](/articles/data-boundaries-for-ai-agents/) against that surface.

| Criterion | MCP | Custom API | Hybrid |
|-----------|-----|------------|--------|
| Standardized discovery across models / IDEs | Default once a server exists | Reinvent per SDK / host | MCP for vendor SaaS; custom for core systems |
| Vendor interoperability (CRM, tickets, mail) | Wins under one allowlist | Slow; N connectors × N hosts | MCP for those vendors; do not wrap certified internals |
| Tenancy / record-level isolation | Possible; easy to miss without call-time wrappers | Strong if the gateway already injects `tenant_id` | Custom for writes that can leak tenants; MCP for scoped reads |
| Latency and token overhead | Higher (schemas, resource payloads) | Lower for thin RPCs | JIT MCP resources; custom on the hot path |
| Audit-field uniformity | Uniform *if* the server emits tool, args hash, actor, time | Varies unless a gateway schema already exists | Same **minimum** fields on both surfaces |
| Existing certified SOA / dual-control writes | Second permission surface—usually a smell | Keep; wrap, do not replace | MCP only where no certified contract |
| Change velocity (new vendor tools) | Faster onboarding after security red lines | Slow; each endpoint is a change ticket | MCP for net-new vendor reads; freeze custom writes |
| Ownership | Platform owns servers; workflow owns allowlist rows | Domain/IT owns the API; workflow owns scopes | One allowlist file covering **both** |

There is no column that skips eval or send gates. Hybrid is not "MCP lite." It is two surfaces under one permission policy.

## When MCP is the better default

MCP is the better default when several agents or models must share the same CRM, ticket, or knowledge tools without an N-by-M SDK farm. A single server contract gives one tool-name vocabulary and one place to attach OAuth scopes. That is [what MCP standardizes for enterprise agents](/articles/model-context-protocol-enterprise/)—not a primitives recap.

Uniform logs matter as much as reuse. When three hosts emit the same `tool_name`, replay does not start with a mapping spreadsheet. Read-heavy vendor SaaS is the cleanest first use: knowledge-base and ticket-thread fetch, where scoped resources map to a named data class. Net-new vendors with no certified internal contract belong here too. MCP is not the default because an IDE already listed a catalog. A laptop catalog is not a production allowlist.

## When custom tool APIs stay justified

Custom tool APIs stay justified when the service you already run is the control you cannot afford to duplicate. If an SOA gateway already injects `tenant_id`, field masks, and dual-control on writes, wrapping that gateway in MCP creates a second permission surface. Auditors then have to map two systems that can disagree. Latency is the other hard case. MCP schemas and resource payloads cost tokens and round-trips. A classifier or routing hop that must stay thin should stay on a custom RPC.

Side-effect APIs—payments, claims, customer send—often already have human dual-control inside the service. Keep that path. Do not MCP-wrap it so every host can "use the same protocol." Local CLI and repo grep stay out of this comparison. The MCP pillar already covers when a command line is enough.

## Hybrid connector surface

Hybrid is the regulated default: two permissioned surfaces, one policy pack. Northline B2B (composite) learned this on a claims write, not a demo CRM. Platform proposed exposing claims update as an MCP tool so a new agent host could call every system the same way. Staging showed a resource path that accepted a tenant filter from the model instead of the gateway-injected tenant. Isolation failed the Legal replay drill. That failure was a blocker, not a phase-two hardening item.

They kept claims writes on the already-certified custom API, with tenant injection and dual-control left in the service. They put knowledge-base and ticket-thread fetch on MCP read resources. The production allowlist listed both surfaces under one `workflow_id`. Claims write never became an MCP tool. Do not wrap a write that already has dual-control unless the MCP layer cannot widen scope. If it can, keep the custom path.

## Shared security checklist

Connectivity is not governance. MCP and custom APIs inherit the same five controls from the [production security baseline for agent tools](/articles/securing-mcp-agent-tools/). Do not copy the Northline injection near-miss from that playbook; that incident is owned there. What this page must say is narrower: the bar does not drop because one surface is "only a protocol."

Treat tool returns and API payloads as untrusted text. Sanitize both before they re-enter a prompt or a write. The allowlist is workflow-scoped, not laptop-scoped. Call-time wrappers inject tenant and case; the model does not get to widen the filter.

| Control (from securing-mcp) | Applies to MCP | Applies to custom API |
|-------------------------------|----------------|------------------------|
| Workflow-scoped allowlist | Server tool names | Endpoint + method list |
| Call-time least privilege | Wrapper injects tenant/case | Gateway injects tenant/case |
| Injection-resistant returns | Sanitize resource/tool text | Sanitize API payloads |
| Action gating / human send | Same blast-radius classes | Same |
| Replay in one hour | `mcp_server_id` + tool + args hash | Endpoint + args hash; same actor/time |

## Promotion gate: pilot to production

A pilot may use MCP reads plus a human send gate. Production write scopes require the full gate below. Missing any row is a hold. There is no urgent exception path for "the vendor demo is Friday." Name the owner before you name the server. The evidence artifact is what the promotion vote reads; slides do not count. Required [minimum audit fields that survive incident replay](/articles/audit-trails-for-ai-workflows/) apply to both surfaces—same workflow ID, actor, tool or endpoint, argument hash, and UTC time.

Score a candidate MCP server only after this surface decision is written. The selection worksheet is the next operational artifact, not a substitute for the gate.

| Gate item | Named owner | Evidence artifact |
|-----------|--------------|-------------------|
| Named workflow, metric, risk class | Workflow owner | One-pager (outcome + error tolerance) |
| Allowlist covering every MCP tool **and** custom endpoint | IT / platform | Versioned config or PR; deny-by-default |
| Data-boundary rows for this `workflow_id` | Workflow owner; Legal consult on customer-facing IO | Matrix version ID |
| Injection cases on **both** surfaces | Security + workflow owner | Staging test log (block vs leak) |
| Sample audit row (replay in one hour) | IT + governance | Staging JSON matching audit-trails minimum fields |
| Human send / dual-control on high-risk writes | Workflow owner | Gate config + override log |
| Promotion vote | Governance / risk forum | Written go/hold; no "urgent" exception path |

## Risks and anti-patterns

These are release blockers, not footnotes for a later hardening sprint. Teams that treat MCP as religion wrap a certified SOA write "for consistency" and create a second permission surface auditors cannot map. Teams that treat custom as dogma refuse MCP for vendor CRM reads and grow an N-by-M SDK farm. Both errors skip the table in the first section.

A split security bar is the quiet failure: "MCP is only transport," so injection tests apply only to REST. A desktop catalog in production is the loud one: the agent inherits every server on a developer laptop. Scoring servers before the surface is chosen is the process failure—worksheet too early. The next operational move is the allowlist and a staging replay, not a shopping list.
