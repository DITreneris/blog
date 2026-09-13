---
authors: Prompt Anatomy
body_locked: true
category: Implementation Notes
content_tier: pillar
date: 2024-07-26
faq:
- answer: Related but not identical. Shadow AI is use without IT or policy awareness.
    Vibe prompting is when even approved tools produce inconsistent outcomes because
    workflow, context, and evaluation are undefined.
  question: Is vibe prompting the same as shadow AI?
- answer: If four or more signs fire on a customer-facing workflow, treat the score
    as seven or more. If seven or more fire anywhere, freeze new tool purchases until
    you can name which signs you will clear first.
  question: How many signs mean we should stop buying tools?
- answer: Start with the signs you can confirm this week without a dashboard. That
    is usually nightly rework (9) and "just ask ChatGPT" as the strategy (5). Do not
    start with the sign that needs a new vendor.
  question: What is the fastest fix?
hero_caption: Diagnostic visual — ten signs that outcomes depend on who asked and
  which tool they opened, not on documented workflow.
hero_image: images/articles/10-signs-your-company-is-vibe-prompting/hero.png
key_takeaway: If four or more signs fire on a customer-facing workflow, treat it as
  systemic and rescore the same ten after you fix the ones already costing rework.
modified: 2026-09-13
slug: 10-signs-your-company-is-vibe-prompting
status: published
summary: Ten recognizable signs that AI outcomes depend on who asked and which tool
  they opened—score them in one ops session.
tags:
- change-management
- governance
- eval
title: 10 Signs Your Company Is Vibe Prompting
---

**Vibe prompting** means outcomes depend on who asks, which tool they open, and informal know-how—not on documented workflows. The model may be capable; the organization is not operating a system.

A senior AE gets excellent proposal drafts; a new hire gets confident nonsense. Support fixes AI replies every night while leadership celebrates copilot adoption. Compliance hears about AI from a customer complaint, not a design review. Those are not talent gaps. They are the signs below.

Score the ten in a 45-minute ops and IT session. Each one is a pattern you can confirm or reject this week.

## Signs to watch for

You do not need a maturity model to start. Walk the list with people who still rewrite output after hours. They see the variance that dashboards miss.

Tick a sign only when you can name a room, a workflow, and a recent week it showed up. Partial counts are fine. If you cannot point to a case, leave it off. A yes you cannot defend is a no. The job is recognition, not a perfect score.

### 1. No shared prompt library or version control

Someone on your team has a prompt that "just works" for proposals or refunds. It lives in their chat history. When they take Friday off, the queue searches Slack for the good one and gets three stale variants. When they leave, the prompt leaves with them. You are not missing a registry product. You are running prompt ops as tribal property: quality depends on who still remembers the wording. That is vibe prompting. Do not confuse this with sign 7. That one is the facts people paste. This one is the instruction text that walks out with the person.

### 2. Success stories do not reproduce across teams

A senior AE drafts a proposal that leadership forwards as proof AI is working. A new hire, given the same brief and the same public site, produces confident nonsense. Managers credit the AE. They do not ask why the same inputs fail next door. The cost is a training myth: hire better prompt writers instead of a process anyone can run. Sign 6 is different. There you shipped a change and customers found it. Sign 10 is different too: same queue, same day, three answers. This sign is the win that will not travel across teams.

### 3. Compliance learns about AI from incidents, not design reviews

Legal's first ticket about AI is not a design review. It is a customer who received a clause nobody approved, or a prospect promised a feature your product does not have. The handbook still says nothing. Shadow use grew while the policy page stayed blank. Rework is the apology. Audit exposure is the email thread you cannot explain. Tick this when compliance learns from incidents. Do not tick it because you lack a RACI worksheet. If you already know the send happened and cannot replay it, that is sign 8. Here the tell is who got the meeting only after the damage.

### 4. Every department bought a different copilot

Sales bought one copilot. Support bought another. Marketing opened a third. CRM fields get written by three connectors with conflicting rules. Nobody owns the overlap. Next month another vendor demo is already on the calendar, because tool count looks like progress. Outcome variance rises with the subscriptions. The tell is not that you lack a planning worksheet. The tell is that who asked and which app they opened decides the answer, and IT finds out from the invoice. Confirm it this week from the invoice list and one CRM field with two writers.

### 5. "Just ask ChatGPT" is the strategy

An all-hands slide says the AI strategy is "just ask ChatGPT." Customer-facing work has no named output, no owner, and no quality bar. Enablement is a Slack thread of screenshots. New hires learn by watching who gets praised, not by a workflow they can fail. Night shifts inherit the mess. This is vibe prompting as policy: informal know-how is the operating system. You can confirm it this week by asking what "good" means for one outbound email. If the answer is a shrug or a link to a chat, the sign fires.

### 6. No evaluation set for high-risk outputs

Someone changed a prompt or a model on Friday. Quality review was one person reading one output and nodding. Monday, customers found the bad reply. There is no held-out set, so you cannot say what else broke. That is not a missing vendor product. That is shipping on vibe. Sign 2 is the hero whose win does not transfer. This sign is the change nobody could regress. If you cannot name the last AI change and the cases that should have caught it, tick this.

### 7. Context lives in people's heads, not systems

A support lead answers a policy question from memory and pastes "the usual" into the model. The handbook exists. It is not what the model saw. The model saw whatever that person remembered from a Q2 thread. When two leads remember different exceptions, customers get different rules. This is not sign 1. Sign 1 is the missing prompt text. This is the missing pack of allowed facts. Tick it when the answer depends on who still has the nuance in their head.

### 8. You cannot reconstruct last week's customer send

A customer complains about Tuesday's concession email. You can see something went out. You cannot say who sent it, who approved it, or what the customer actually received. Maybe you have no agents at all. You still cannot reconstruct the week. The late rewrite happens again because there is nothing to replay. Sign 3 is how compliance first heard. Tick this when last week's send is a black box even after you know it went wrong. Do not tick it only because you lack a prompt changelog.

### 9. Executives see demos, operators see chaos

The steering deck shows seats assigned and messages generated. The board calls the pilot a success. After hours, the same operators who sat through the demo rewrite drafts that sounded fine in the room and fail on real tickets. Adoption rose. Outcome variance rose with it. Someone is still doing the night work: the person who has to unsay a confident reply before morning. Ask the people who send the mail, not the people who booked the vendor. If their week is cleanup and the dashboard is green, the sign fires.

### 10. The same question gets incompatible answers in one shift

Before lunch, three people on the same tier-2 queue answer the same customer question. The facts are identical. The replies are not. One grants a credit. One cites a policy that forbids it. One invents a workaround. Managers call it style. Customers call it the company. You can confirm it before lunch: pull three closed tickets of the same type. Sign 2 is a win that dies when it crosses a region or a seniority line. This is the same shift, same queue, with who-asked as the quality system.

## Score yourself

Count how many signs apply this week. Be honest about partial counts. Ask the people who still rewrite output, not only the people who bought the tools.

A low score on internal drafts can hide a high score on customer mail. Score those lanes separately. Four or more signs on a customer workflow should be treated as seven or more for priority. The bands below tell you which signs usually travel together, not which vendor to buy next.

| Signs present | What you are seeing | What to do first |
|---------------|---------------------|------------------|
| 0–3 | Early gaps, often 1, 5, or 7 alone | Document the one workflow those signs already touch |
| 4–6 | Operational risk; 4, 5, and 9 show up together | Freeze new tools; use the 30-day map below |
| 7–10 | Systemic vibe prompting; 2 with 6, and 3 with 8, usually travel as pairs | Treat it as one program; do not add a tool to "fix" the score |

After you have numbers, the artifact checklist is [What Your AI Stack Reveals](/articles/what-your-ai-stack-reveals/). This page names the patterns. That one scores owners, eval sets, and replay logs you can verify in fifteen minutes.

## 30-day remediation

Pick **one workflow** that already hurts—usually support assist, an RFP draft, or tier-2 routing. Do not pick "use AI more." The weeks below attack signs, not a blank program.

If you pick the flashiest demo workflow, you will spend a month on a problem nobody feels. Pick the queue that already eats nights. Week 2 is the only place a planning canvas belongs: it is the artifact for signs 7 and 8, not a tenth sign.

| Week | Signs | Deliverable | Pass criteria |
|------|-------|-------------|---------------|
| 1 | 5 and 9 | Outcome sentence and one metric that is not adoption | Leadership agrees cleanup hours beat seat counts |
| 2 | 7 and 8 | Allowed sources, a named reviewer, and one [canvas](/articles/ai-workflow-canvas-template/) for that workflow | You can say what the model may see and who can send |
| 3 | 2 and 6 | Twenty real cases; failures tagged policy, fact, or format | A new hire and a veteran produce compatible answers |
| 4 | 4, then all ten | Tool freeze still on; rescore the same ten | Steering records expand, fix, or stop |

The canvas link in week 2 is that artifact, once. Do not reopen the list to add a tool.

## Worked example: scoring 8 of 10

*Anonymized composite (Northline B2B)—multiple implementations.*

A 120-person B2B services firm scored eight. Signs present: 1, 2, 3, 4, 5, 6, 9, and 10. Signs absent: 7 (that queue already pasted from a named KB) and 8 (the ticket showed sender, timestamp, and the outgoing body). Leadership wanted another copilot. Ops wanted the night work to stop.

They started with 9 and 5 because nightly rewrites were already visible. They paused new trials and chose one workflow: suggested replies on tier-2 tickets. They tagged forty KB articles `customer-safe`, added a check for unsupported claims, required a human to send, and logged overrides. After twelve weeks, median handle time on that queue fell roughly eighteen percent. CSAT on the same queue rose six to nine points. A twenty-five-case set went from low to high agreement across agents.

The twelve-week plot is in the [case study](/articles/case-study-vibe-prompting-to-structured-workflow/). The diagnostic's job was narrower: name which eight fired, then start with the two that already cost sleep.

## What to do Monday

Bring the same ten signs back into one room with the people who still rewrite output. Do not open a new tool trial. Do not debate models. The meeting is over when you have a number for each sign and one workflow name that already costs sleep. If you leave with a vendor to evaluate, you ran the wrong meeting. Forty-five minutes is enough when the room is honest about what it already sees. Then keep that list. Do not replace it with a new deck.

1. Run the ten with ops and IT in 45 minutes.
2. Write every number, including the signs that did not fire.
3. Name the workflow that already produces the night rewrites.
4. Put a 30-day rescore on the calendar—the same list, not a new demo.

Vibe prompting is fixable when you treat it as a who-asked problem, not a talent problem. Re-score the ten until the room can reject more of them than it ticks.
