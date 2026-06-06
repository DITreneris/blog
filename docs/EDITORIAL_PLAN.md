# Editorial Plan

**Version:** 1.2  
**Last reviewed:** 2026-06-06 (post content wave + prose depth pass)  
**Scope:** Content strategy, category balance, backlog, and internal linking for [promptanatomy.blog](https://www.promptanatomy.blog)  
**Owner:** content/editorial (human); **editorial-agent** maintains §2/§5 and audit reports; **q-and-a-agent** syncs CHANGELOG when process or agent docs change

Related: [AGENTS.md](../AGENTS.md) · [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) · [definition_of_done_system.md](definition_of_done_system.md) · [data/categories.yaml](../data/categories.yaml) · [SEO_improvement.md](SEO_improvement.md)

---

## 1. Editorial mission

Prompt Anatomy Blog is a **structured AI implementation knowledge hub** — not a hype magazine or generic prompt archive.

**Spine:** Prompts → Workflows → Agents → Business Outcomes

**Audience:** Operations leaders, enablement teams, and practitioners adopting AI under operational and compliance constraints.

**Blog vs product:** Free frameworks, field notes, templates, and case studies live on `.blog`; paid training and pricing live on [promptanatomy.app](https://www.promptanatomy.app/). See [About](/about/) and [The Prompt Anatomy Ecosystem Map](/articles/prompt-anatomy-ecosystem-map/).

---

## 2. Baseline inventory (2026-06-06, post content wave)

| Metric | Value |
|--------|------:|
| Total article files | 68 |
| Published | 60 |
| Draft redirects (merged stubs) | 8 |
| Avg word count (published) | ~780 |
| Tags in use | Full corpus (`content_tier` + tags on all published) |
| Orphans (zero inbound) | 0 |
| Cluster hub link gaps | 0 |

**Editorial audit (2026-06-06):** Keyword wave (20 slugs) + legacy taxonomy backfill + P3 finance case study + change log template + prose depth pass on 11 playbooks. Report: [`docs/reports/editorial-status-2026-06-06.md`](reports/editorial-status-2026-06-06.md).

**Publish dates:** Curriculum `date` values are assigned by [`scripts/assign_article_dates.py`](../scripts/assign_article_dates.py) (`PUBLICATION_ORDER` + ~21–24 day jitter from 2024-01-06). Wave-2 keyword posts stagger across 2026 Q2—not bulk same-day. Homepage `#latest` sorts by `date` desc, then title asc.

### Published posts by category

| Category | Count | Tier | Editorial status |
|----------|------:|------|------------------|
| Opinion | 13 | Moderate share | Funnel; spokes wired to pillars |
| Framework | 11 | Strong | Grounding, RAG, CLEAR, glossary shipped |
| Implementation Notes | 9 | Strong | Procurement, ROI, orchestrator, platform selection |
| AI Agents | 7 | Strong | MCP pillar, framework guide, observability, outreach |
| AI Governance | 5 | Strong | MCP security + existing cluster |
| Prompt Systems | 6 | Strong | Registry pillar + blueprint + frameworks + regression |
| Templates | 5 | Strong | Eval, RACI, MCP worksheets, canvas, change log |
| Case Studies | 4 | Strong | Northline Part 1 + 2, finance, tender pipeline |

### Pillar articles (start-here / flagship)

| Slug | Category | Min words | Status |
|------|----------|----------:|--------|
| `the-model-is-not-the-system` | Framework | 1,200+ | ✓ |
| `10-signs-your-company-is-vibe-prompting` | Implementation Notes | 1,200+ | ✓ |
| `how-to-design-an-ai-agent-workflow` | AI Agents | 1,200+ | ✓ |
| `what-is-context-architecture` | Framework | 1,200+ | ✓ |
| `prompt-registry-playbook` | Prompt Systems | 1,200+ | ✓ (keyword P1) |
| `rag-in-production` | Framework | 1,200+ | ✓ (keyword P1) |
| `grounding-ai-outputs` | Framework | 1,200+ | ✓ (keyword P1) |
| `model-context-protocol-enterprise` | AI Agents | 1,200+ | ✓ (keyword P1 weeks 5–6) |

---

## 3. Category rules

Use these boundaries when assigning `category` and planning new posts.

| Category | Publish when… | Do not use for… |
|----------|---------------|-----------------|
| **Framework** | Methodology, architecture, maturity, eval design | Meme-backed one-screen primers |
| **Prompt Systems** | Prompt types, registry, testing, release ops | Generic workflow design (→ Framework) |
| **AI Agents** | Agent design, orchestration, vertical playbooks | Governance-only policy (→ AI Governance) |
| **AI Governance** | RACI, audit, boundaries, risk cadence | Prompt syntax tips (→ Prompt Systems) |
| **Implementation Notes** | Diagnostics, rituals, outcomes, procurement | Deep architecture (→ Framework) |
| **Templates** | Copy-paste canvas, checklist, worksheet in-page | Long prose playbooks |
| **Case Studies** | Problem → approach → metrics (ranges OK) → lessons | Opinion without narrative arc |
| **Opinion** | Illustration-first primers, thought leadership | Playbooks that need Satori governance heroes |

### `content_tier` signals

| Tier | Use for | Min words (published) |
|------|---------|----------------------|
| `pillar` | Start-here / flagship | 1,200+; `faq` ≥ 2; `hero_caption` |
| `playbook` | Operational how-to with example | 600+ target |
| `template` | In-page copy-paste asset | 150+ (see `validate_content.py`) |
| `opinion` | Short illustration-first primer | 150–600; link to deeper playbook |
| `nav` | Hub/routing page | Exempt from Framework 900w min |

**Illustration-first vs caption-first:** See [CONTENT_STANDARDS.md § Illustration-first](CONTENT_STANDARDS.md#illustration-first-vs-caption-first-v070).

### Recommended tags (apply on new posts and when editing)

`context` · `context-engineering` · `eval` · `governance` · `agents` · `rag` · `memory` · `mcp` · `orchestration` · `prompt-injection` · `change-management` · `northline` · `templates` · `prompt-systems` · `geo` · `benchmarks` · `workflow-automation`

---

## 4. Strategic gaps (prioritized)

### Missing or underdeveloped (post keyword wave)

1. **GEO distribution** — YouTube pillar explainers and off-site citations not started; glossary and decision playbooks ready for citation.
2. **Playbook prose rhythm** — keyword-wave playbooks expanded (2026-06-06); monitor new posts for slide-deck rhythm at ship time.
3. **Case study vertical breadth** — four case studies (support, eval scale, tender, finance); consider ops/HR vertical only if search demand appears.
4. **Hero weight audit** — legacy PNG heroes exceed 400 KB on several slugs; WebP variants help LCP but masters may need recompression.

### Shipped (no longer gaps)

Registry ops, RAG/MCP pillars, context rot cluster, procurement/ROI decision content, template pack (5 templates), hub-and-spoke anchors, full taxonomy, orphan-free linking, Framework `reading_path` pillars, in-place cross-links (context rot, MCP, CLEAR, handoffs).

### Do not expand (low ROI)

- Additional bot stub articles (keep draft redirects).
- More meme Opinion without a distinct lesson.
- Generic “AI trends” or tool roundups.
- Consumer creative AI keywords (AI video/photo editors, Midjourney prompts, viral festival prompts).
- Uncensored chatbot / Character.AI content.
- Generic “best 20 tools” listicles (use criteria-based decision playbooks instead).

### §4.5 GEO and citation strategy

Keyword research (2026) shows informational “what is” queries suffer severe CTR loss in AI Overviews; **citation inside synthesized answers** drives brand visibility (+35% organic clicks when cited). Editorial policy:

1. **Do not publish thin definitional Opinion as standalone SEO** — spokes must link up to a pillar with `faq` ≥ 2, tables, and clear entity definitions.
2. **Favor decision-stage content** — comparisons, procurement criteria, “X vs Y for regulated teams” (Implementation Notes / Framework playbooks).
3. **Use long-tail qualified titles** — e.g. “with eval gates”, “for enterprise teams”, “under compliance constraints”.
4. **Structure for citation** — declarative openings, comparison tables, numbered checklists; align with [SEO_improvement.md](SEO_improvement.md) GEO guidance.
5. **Off-site authority** — one short YouTube explainer per shipped pillar linking to canonical URL; guest posts on ops/dev forums where appropriate.
6. **Glossary as GEO anchor** — ship P3 glossary nav page with MCP, context rot, CLEAR, and core Prompt Anatomy terms.

---

## 5. Backlog — prioritized posts

Ship in priority order unless a release theme overrides. Check this table before proposing net-new topics.

**Shipped (2026-06-06 keyword integration):** P1 wave + MCP pillar + P2 keyword backlog + P3 glossary/MCP worksheet — see [research/keyword-to-backlog-map.md](research/keyword-to-backlog-map.md) for slug mapping.

| P | Proposed title | Category | Tier | Status |
|---|----------------|----------|------|--------|
| **P1** | The Prompt Registry Playbook | Prompt Systems | pillar | ✓ `prompt-registry-playbook` |
| **P1** | RAG in Production | Framework | pillar | ✓ `rag-in-production` |
| **P1** | Northline Part 2 | Case Studies | playbook | ✓ `northline-part-2-scaling-eval-coverage` |
| **P1** | AI Workflow Eval Checklist | Templates | template | ✓ `ai-workflow-eval-checklist` |
| **P1** | Grounding AI Outputs | Framework | pillar | ✓ `grounding-ai-outputs` |
| **P1** | MCP for Enterprise Teams | AI Agents | pillar | ✓ `model-context-protocol-enterprise` |
| **P2** | Context Rot | Framework | playbook | ✓ `context-rot-why-bigger-windows-make-agents-worse` |
| **P2** | LangGraph vs CrewAI vs MS Agent Framework | AI Agents | playbook | ✓ `langgraph-vs-crewai-production-guide` |
| **P2** | Securing MCP and Agent Tools | AI Governance | playbook | ✓ `securing-mcp-agent-tools` |
| **P2** | Agent Orchestrator Operating Model | Implementation Notes | playbook | ✓ `agent-orchestrator-operating-model` |
| **P2** | Evaluating Agents with CLEAR | Framework | playbook | ✓ `evaluating-agents-with-clear` |
| **P2** | Workflow Automation Selection | Implementation Notes | playbook | ✓ `choosing-workflow-automation-ai-pipelines` |
| **P2** | Prompt Frameworks RACE/TAG | Prompt Systems | playbook | ✓ `prompt-frameworks-race-tag-business` |
| **P2** | Prompt Regression Testing | Prompt Systems | playbook | ✓ `prompt-regression-testing-week` |
| **P2** | AI Procurement Freeze | Implementation Notes | playbook | ✓ `ai-procurement-freeze` |
| **P2** | Governance RACI Worksheet | Templates | template | ✓ `governance-raci-worksheet` |
| **P2** | Multi-Agent Observability | AI Agents | playbook | ✓ `multi-agent-observability` |
| **P2** | Measuring AI Workflow ROI | Implementation Notes | playbook | ✓ `measuring-ai-workflow-roi` |
| **P3** | Glossary | Framework | nav | ✓ `prompt-anatomy-glossary` |
| **P3** | MCP Server Selection Worksheet | Templates | template | ✓ `mcp-server-selection-worksheet` |
| **P2** | Tender Response Pipeline Case Study | Case Studies | playbook | ✓ `ai-tender-response-pipeline` |
| **P3** | Finance Workflow Case Study | Case Studies | playbook | ✓ `finance-workflow-case-study-controlled-draft-and-review` |
| **P3** | AI Change Log Template | Templates | template | ✓ `ai-change-log-template-prompt-context-and-model-updates` |

### Remaining backlog

| P | Proposed title | Category | Tier | Intent | Why |
|---|----------------|----------|------|--------|-----|
| — | *No P1–P3 net-new slugs queued* | — | — | — | Next: GEO distribution + optional vertical case studies on demand |

### In-place updates (completed 2026-06-06)

| Slug | Status |
|------|--------|
| `your-company-does-not-need-more-ai-tools` | ✓ 700w+; procurement checklist |
| `team-rituals-for-ai-implementation` | ✓ Sample agendas |
| `from-prompt-to-agent` | ✓ Expanded prose depth |
| `prompt-anatomy-ecosystem-map` | ✓ 500w+ |
| `structured-prompt-system-blueprint` | ✓ Prompt registry alignment |
| `prompt-engineering-vs-ai-workflow-engineering` | ✓ Context engineering in summary |
| Framework `reading_path` | ✓ Pillars added |
| `what-is-context-architecture` | ✓ Context rot subsection |
| `data-boundaries-for-ai-agents` | ✓ MCP cross-links |
| `evaluation-hooks-for-ai-workflows` | ✓ CLEAR dimensions |
| `multi-agent-handoff-pattern` | ✓ Framework + observability links |
| 11 keyword-wave playbooks | ✓ Slide-deck rhythm prose pass |

---

## 6. Concept clusters (hub-and-spoke)

Do **not** delete short primers. Link them to a pillar or playbook.

**Source of truth:** [data/editorial_clusters.yaml](../data/editorial_clusters.yaml) — spokes, hub slugs, and target pillar backlog titles for audit scripts and editorial-agent.

| Cluster | Spoke primers (summary) | Target hub |
|---------|-------------------------|------------|
| Context engineering / tokens | `context-window-myths`, token posts, `five-levels-of-ai-control` (partial) | **Grounding AI Outputs** (P1) + `what-is-context-architecture` |
| Context rot | `context-window-myths`, `tokens-and-context-window-limits` | `what-is-context-architecture` + **Context Rot** (P2) |
| Hallucination | `why-ai-hallucinates`, `when-ai-hallucinates-confidence` | Same grounding pillar |
| RAG | `three-types-of-rag` | **RAG in Production** (P1) |
| Memory | `three-types-of-ai-memory-short` | `memory-types-for-ai-systems` |
| Tool sprawl | `your-company-does-not-need-more-ai-tools`, `what-your-ai-stack-reveals` | `10-signs-…` + procurement playbook (P2) |
| MCP integration | MCP pillar + security playbook live | `model-context-protocol-enterprise`, `data-boundaries-for-ai-agents`, `securing-mcp-agent-tools` |
| Orchestration frameworks | `multi-agent-handoff-pattern`, `from-prompt-to-agent` | `how-to-design-an-ai-agent-workflow` + **LangGraph vs CrewAI** (P2) |
| Workflow platforms | `your-company-does-not-need-more-ai-tools`, `what-your-ai-stack-reveals` | `10-signs-…`, `the-model-is-not-the-system` + **platform selection** (P2) |

---

## 7. Internal linking rules

Every published post should:

1. Include **2–4 topic-specific in-body links** ([CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) — not a standalone Related H2).
2. Link **up** to the cluster hub or pillar when the post is a spoke primer.
3. Link **laterally** across categories when workflows touch governance or eval.
4. When shipping the **MCP pillar**, link from `data-boundaries-for-ai-agents`, `how-to-design-an-ai-agent-workflow`, and `audit-trails-for-ai-workflows`; forward-link to **Securing MCP and Agent Tools** (P2).

### Orphans to fix

**None** as of 2026-06-06 audit. Re-check after every 5 published posts.

### Northline composite

Reuse **Northline B2B** as the anonymized composite in playbooks; disclose composite status in case studies. Do not imply a single real customer without consent.

---

## 8. Roadmap

### Next 30 days

| Week | Focus |
|------|-------|
| 1 | Production deploy of content wave; GSC sitemap resubmit |
| 2 | YouTube explainer (first pillar: prompt registry or MCP) |
| 3 | Off-site citation (ops/dev forum guest post or answer) |
| 4 | Editorial audit refresh; hero PNG weight review |

### Next 90 days

| Month | Focus |
|-------|--------|
| 1 | GEO distribution (YouTube + GSC + one off-site authority link per pillar) |
| 2 | Monitor search console; deepen highest-traffic playbooks if needed |
| 3 | Quarterly editorial audit; reprioritize only on search/analytics signal |

---

## 9. Growth readiness

| Surface | Ready to promote? | Notes |
|---------|-------------------|-------|
| Four pillars + governance playbooks | **Yes** | Strongest authority |
| Agent design cluster | **Yes** | MCP + orchestration + observability shipped |
| Opinion primers | **No** (as SEO landing) | Use as top-of-funnel only |
| Prompt Systems queries | **Yes** | Registry + frameworks + regression shipped |
| Proof / templates | **Yes** | 4 case studies + 5 templates |
| MCP queries | **Yes** | MCP pillar + security playbook shipped |
| GEO / citation | **Partial** | Glossary + decision playbooks ready; YouTube not started |
| YouTube distribution | **Not started** | One explainer per shipped pillar; resubmit GSC sitemap after deploy |

**Before a broad SEO push:** ship YouTube explainers for top pillars, resubmit GSC sitemap, secure one off-site citation per flagship URL.

---

## 10. Agent workflow — plan a new post

1. Check **§5 backlog** — prefer next P1/P2 item over ad hoc topics.
2. Confirm category per **§3**; set `content_tier`; add tags.
3. Follow [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) article brief and publish checklist.
4. Wire internal links per **§6–§7** (hub-and-spoke + 2–4 in-body links).
5. Update `data/categories.yaml` `reading_path` if the post belongs in a curated path.
6. `make validate && make build` before claiming done ([definition_of_done_system.md](definition_of_done_system.md) *Add / edit article*).
7. After shipping a backlog item, note in PR; **editorial-agent** refreshes EDITORIAL_PLAN §2/§5; **q-and-a-agent** updates CHANGELOG when process changes.

### When to refresh this document

- After every **5 published posts** or **quarterly**, whichever comes first.
- Run `make audit-content` (or `python scripts/audit_content_inventory.py`) — see [`docs/reports/`](reports/) for latest report.
- Update §2 baseline table and §5 backlog (move shipped items to CHANGELOG; reprioritize).
- **Owner:** editorial-agent recommends; human/editor confirms large reprioritization.

---

## 11. Related docs

| Doc | Role |
|-----|------|
| [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) | Voice, tiers, illustration tracks, forbidden patterns |
| [data/categories.yaml](../data/categories.yaml) | Category descriptions and `reading_path` |
| [data/editorial_clusters.yaml](../data/editorial_clusters.yaml) | Hub-and-spoke cluster definitions |
| [docs/AGENT_SYSTEM.md](AGENT_SYSTEM.md) | Agent roster, skills, delegation |
| [docs/reports/](reports/) | Generated editorial status reports (`make audit-content`) |
| [data/hub_sections.yaml](../data/hub_sections.yaml) | Homepage start-here cards |
| [SEO_improvement.md](SEO_improvement.md) | Technical SEO / GEO (glossary, llms.txt) |
| [research/ai-keyword-research-trends-2026.txt](research/ai-keyword-research-trends-2026.txt) | Enterprise keyword research baseline (2026) |
| [research/keyword-to-backlog-map.md](research/keyword-to-backlog-map.md) | Keyword themes → shipped slugs + GEO actions |
| [AGENTS.md](../AGENTS.md) | Agent workflows and frontmatter contract |
