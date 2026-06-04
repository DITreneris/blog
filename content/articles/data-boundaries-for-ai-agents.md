---
authors: Prompt Anatomy
body_locked: true
category: AI Governance
content_tier: playbook
date: 2026-05-28
modified: 2026-06-04
hero_image: images/articles/data-boundaries-for-ai-agents/hero.png
hero_caption: "Allow/deny matrix — explicit data and action boundaries for agent tools, enforced in the integration layer."
key_takeaway: Agents need an explicit allow list for data and actions; everything else is out of scope by default.
reading_time: 4 min read
slug: data-boundaries-for-ai-agents
status: published
summary: Allow and deny matrices for agent tools—Northline B2B filled example for CRM, KB, email, and wiki.
title: Data Boundaries for AI Agents
---

Agents that can "read everything" eventually read the wrong thing. **Data boundaries** define what an agent may retrieve, write, or infer—and what always requires a human. Prompt text alone is not enforcement; the integration layer must fail closed.

**Northline B2B** documents boundaries for `support-reply-v3` and future routing agents. See [Context Architecture](/articles/what-is-context-architecture/), [Governance Roles](/articles/ai-governance-roles-and-ownership/), [Audit Trails](/articles/audit-trails-for-ai-workflows/), and [Risk Cadence](/articles/ai-risk-review-cadence/) for the full operating loop.

## Northline allow / deny matrix (support-reply-v3)

| Resource | Read | Write | Conditions |
|----------|------|-------|------------|
| CRM (customer tier, product line) | Yes | No | Production tenant only; no bulk export |
| Ticket system (case thread) | Yes | Yes (draft note) | Current case only; no cross-customer |
| Email send | No | No | Human sends in v1 |
| KB articles tag `customer-safe` | Yes | No | Max 3 articles per run |
| Internal wiki `draft` | No | No | Always denied |
| HR / payroll | No | No | Always denied |

IT enforces via connector config: workflows without `kb_customer_safe` scope cannot mount HR indexes. Violations log as `boundary_denied` and surface in [risk forum](/articles/ai-risk-review-cadence/).

## Policy triggers (examples)

- Export-control or health-related keywords → stop, route to human.
- Request to bulk-delete records → deny tool call.
- Confidence below threshold → no write actions.
- VIP flag → read-only recommend mode; human must send.

Northline added VIP trigger after eval case #17 failed—agent suggested policy exception language not in approved pack.

## Implementation notes

- Enforce boundaries in **integration layer**, not only in prompt text.
- Log every tool call with actor, workflow version, and resource ID.
- Review boundaries when you add a model or connector—not only at launch.

When Northline piloted a **routing agent**, they cloned the matrix with `Write: ticket routing field` enabled only after fifty-case eval pass—expand allow lists with evidence.

## Tips

- Default **deny**; require workflow owner sign-off for each new row.
- Map matrix rows to [data classification](/articles/what-is-context-architecture/) classes.
- Test denial paths in eval sets—not only happy paths.

## What to do Monday

1. Copy the template; fill for one workflow with real system names.
2. Verify IT can enforce each "No" without prompt compliance alone.
3. Add one eval case that must fail when a denied resource is requested.
