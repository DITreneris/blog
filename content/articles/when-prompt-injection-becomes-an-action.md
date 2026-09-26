---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2026-09-25
faq:
- question: What must stop an unauthorized action if the model follows an injected instruction?
  answer: A control outside the model. It checks the user, target, operation, and destination before execution, and it rejects the call when that check fails. A model refusal is useful and is not that control.
- question: Does a stronger system prompt stop indirect injection?
  answer: No. Training can make a model prefer privileged instructions over untrusted text. That resistance still fails often enough that connectors, argument checks, and approval of the exact operation have to hold when the model is misled.
- question: Does an approved source make its instructions safe to follow?
  answer: No. Permission to read a page, wiki, or tool result is not permission to obey it. The execution layer still has to reject a wider target, a new destination, or a saved note promoted into policy.
hero_caption: "Four checks where the model may propose an action, and where the server must reject it before anything runs."
hero_image: images/articles/when-prompt-injection-becomes-an-action/hero.png
key_takeaway: If the model follows an injected instruction, a control outside the model must reject the unauthorized action.
slug: when-prompt-injection-becomes-an-action
status: published
summary: Untrusted content must not expand an agent's authority. Check the execution layer, not only whether the model refuses.
tags:
- prompt-injection
- governance
- agents
- mcp
title: When Prompt Injection Becomes an Action
---

A support agent reads a vendor page while preparing a case note. Inside the page is an instruction: update every related customer account before continuing. The user asked for help with one case. The page is trying to expand the job.

The security question is not only whether the model recognizes that instruction as hostile. It is whether the system would allow the wider update if the model followed it. Untrusted content must not be able to expand an agent's authority. [The model is one component](/articles/the-model-is-not-the-system/). The boundary around it is the system you govern.

## Text can cause harm before a tool runs

Prompt injection tries to redirect a model with instructions that have no authority over the task. In an agent workflow those instructions often sit inside material the agent is supposed to read.

Even with no tools, that text can distort an answer or expose sensitive context already in the window. A person may then act on the output. Tools, memory, and handoffs add further consequences: changing records, transmitting data, saving a standing instruction, or passing a manipulated task to another agent.

Models can be trained to prefer privileged instructions over untrusted text. [OpenAI's instruction-hierarchy work](https://arxiv.org/abs/2404.13208) shows that this raises resistance. It does not make model judgment an access-control boundary. Design so the consequences stay limited when the model is misled. The model may propose an action. Application controls decide whether that action is allowed.

## Six places to inspect

These are inspection points, not a claim about how often each one appears, and not a set of exclusive categories. A hostile wiki entry can arrive through retrieval, be saved to memory, and later steer another agent. Use the row to name where authority could expand, then open the control article.

Anything the model perceives counts as an input, including text inside an image. Jailbreaks and adversarial suffixes belong to model safety. This playbook owns a narrower question: what the workflow is permitted to do after the text arrives. Capability creates exposure. It does not, by itself, mean an unauthorized effect already happened.

| Inspection point | How authority can expand | Control to verify |
|------------------|--------------------------|-------------------|
| User input | The request tries to override policy or act beyond the caller | Enforce the caller's permissions outside the model |
| External content | A page, email, PDF, attachment, or image redirects the task | Keep content out of privileged instruction fields. Constrain the action if screening misses the attack |
| Retrieval | A chunk is treated as policy because it came from an internal index | [Data boundaries](/articles/data-boundaries-for-ai-agents/) before retrieval. [RAG in production](/articles/rag-in-production/) keeps source identity. Retrieved text does not rewrite execution policy |
| Tools and MCP | A description, schema, or result pushes a later call past the task | [Securing MCP and Agent Tools](/articles/securing-mcp-agent-tools/): check the tool, arguments, destination, and permissions before execution |
| Memory | A saved instruction becomes standing guidance in a later session | [Memory types](/articles/memory-types-for-ai-systems/): control what can be saved. Require approval before a note becomes organizational policy |
| Plans and handoffs | Allowed steps exceed the task, or the next agent inherits a claim of approval | [Handoff rules](/articles/handoff-rules-between-humans-and-ai/): each recipient enforces its own permissions. Do not inherit "already approved" |

An approved source is still a source. Permission to read it is not permission to obey it. An internal wiki can carry a hostile instruction too.

Read-only tools need the same scrutiny. A search query or a URL can send private data to an outside service without changing a database row. [OpenAI's MCP guidance](https://developers.openai.com/api/docs/guides/tools-connectors-mcp) treats tool-supplied URLs and data shared with a server as leakage paths, including on reads. Removing write tools reduces one risk. It does not close disclosure.

## Put the check where the action happens

Input screening and a clear prompt can help the model resist. They support controls that still work when that resistance fails.

Start with access. Give the workflow only the sources, credentials, and tools the job needs. [Data boundaries](/articles/data-boundaries-for-ai-agents/) belong in the connector. A prompt footer that names forbidden sources does not remove an index. Where you can, keep public research separate from private records so sensitive data is not sitting next to an external destination.

Then control how content enters. Do not paste retrieved passages into privileged instruction fields. Extract the fields the task needs and keep their origin. A string that fits a schema is not trustworthy because an attacker wrote the string.

The decisive check runs immediately before execution. Compare the proposed operation with policy held outside retrieved content and outside the model's plan. Verify the user, the tenant, the target record, the operation, the destination, and the limits. A valid tool name is not enough if the arguments name the wrong customer.

For a case-note agent, the server binds the write to the active case. The model supplies the proposed note. It cannot widen the target to other accounts. A correctly scoped note can still contain false or injected wording, so content review may still be required.

Fail closed means the protected operation does not run when authorization is missing, invalid, or cannot be checked. The workflow may keep a draft or ask for review. It must not treat a failed check as permission to continue.

Use human approval where the consequences justify the attention. Show the operation, the target, the destination, and the proposed change. Bind the approval to those details. If they change, check again. An owner and a response time name who is responsible. They do not authorize a specific call. Asking for approval on every routine step wears reviewers down. [Anthropic's account of approval fatigue](https://www.anthropic.com/engineering/claude-code-auto-mode) is the reason human review should sit on top of enforced limits, not carry the whole defense.

Record what was proposed, which policy was evaluated, whether approval was required, and what ran. [Audit trails](/articles/audit-trails-for-ai-workflows/) support the investigation. A log does not block the action. The block has to happen before the call.

## Example: the page asks for a wider CRM update

This is a hypothetical workflow, not a recorded incident. The agent may read reference material and propose a note for the current case. A vendor page tells it to add notes on every account tied to that vendor.

In a weak design, the model chooses a CRM filter and the backend runs it with broad service credentials. The page has changed both the wording and the scope. Saying that "no write landed" does not explain the defense if the wrapper never re-checked the target.

In a constrained design, the server takes the permitted case from the authenticated session. A request aimed at another case is rejected before any write. A sentence in the page that claims a manager approved the wider update does not change that check.

Test the boundary by submitting the unauthorized proposal even when you also hope the model will refuse. A refusal shows model behavior. It does not show that the backend would block the same request. Removing the page closes one input. Binding the write to the case limits what a different input can cause. An authorized note on the current case must still succeed. Blocking every write is not a useful result.

## What to do Monday

Choose one workflow that reads external content or can affect a system. Support triage, procurement research, or sales drafting is enough. Do not start by inventorying every agent in the catalog. The point of the hour is to name one place where untrusted text could widen a target, a destination, or a saved policy, and to show the control that stops that widening.

A model that refuses the test case is a good sign about the model. It is not evidence about the backend. Submit the same unauthorized proposal to the execution check directly. Then run one authorized case, such as a note on the current case, and confirm it still completes. A control that blocks the legitimate task is not a pass.

1. List the inputs and the effects they could cause. Include messages, attachments, retrieval, tool results, memory, handoffs, and outbound requests.
2. Mark where authority could expand. Can source text change a target record, a destination, a scope, a saved policy, or the next agent's task?
3. Name the enforcing control. Record where it runs and what happens if authorization cannot be established. A prompt sentence alone is not enough.
4. Test the boundary and the legitimate task. Start with a direct override, a retrieved instruction, and a tool-result instruction. Confirm the prohibited effect does not occur, and that an authorized operation still succeeds.

Add cases for the capabilities this workflow actually has: memory that persists, a handoff, an outbound request, or a chain of tool calls. Call the enforcement layer directly, not only through the model. Allowlist and argument checks stay in [Securing MCP and Agent Tools](/articles/securing-mcp-agent-tools/).

Passing these tests is evidence for the cases you ran. It does not prove every injection path is closed. Repeat the relevant tests when tools, permissions, sources, or orchestration change.

Before the next release, answer one question: if the model follows the injected instruction, what stops the unauthorized action?
