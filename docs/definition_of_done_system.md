# Definition of Done — System

Hub for **when work is complete** on the Prompt Anatomy Blog. Use this file to pick workflow-scoped gates; use [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) § Definition of Done (2.0) for the full theme/Satori/production release contract.

**Audience:** contributors, default Cursor agents, [q-and-a-agent](../.cursor/agents/q-and-a-agent.md), future `.cursor/skills/`.

## Completion rule

A task is **not complete** until:

1. Every **applicable** gate in the [workflow matrix](#workflow-matrix) passes (exit code 0 or checklist explicitly done).
2. The agent or author reports **evidence** using the [evidence format](#evidence-format-required-for-agents).
3. No secrets appear in the diff (`.env`, API keys, credentials).

**Anti-duplication:** For theme, Satori, or production releases, run [DESIGN_SYSTEM.md § Definition of Done (2.0)](DESIGN_SYSTEM.md#definition-of-done-20). This document tells you **which subset** applies; it does not copy all ten sections.

## Tier labels

Same vocabulary as Design System DoD 2.0:

| Label | Meaning |
|-------|---------|
| **(CI)** | Automated — `make validate`, `make build`, or Vercel |
| **(QA)** | Manual checklist — [VISUAL_QA.md](VISUAL_QA.md), [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) |
| **(Major)** | Required before production tag, semver cut, or GSC resubmit |

## Universal gate (always)

| Check | Command | Expect |
|-------|---------|--------|
| Validate + production build | `make validate && make build` | Exit 0 |
| No secrets | Inspect diff | No `.env` or credentials |

Without `make` (Windows): see command sequence in [DEPLOY.md](DEPLOY.md) § Local verification before push.

Pipeline overview: [ARCHITECTURE.md](ARCHITECTURE.md) (build diagram).

## Workflow matrix

Pick the row that best matches your change. Run **CI** columns before claiming done; add **QA** / **Major** when the row says so.

| Workflow | Typical paths | CI gates | QA | Major |
|----------|---------------|----------|-----|-------|
| **Any code, content, or theme** | mixed | Universal gate | — | — |
| **Add / edit article** | `content/articles/` | `make validate` (includes `validate_content.py`) | [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) § Before publishing (`status: published`) | — |
| **Editorial audit** | `content/articles/`, `docs/EDITORIAL_PLAN.md`, `data/editorial_clusters.yaml` | `make audit-content` or `python scripts/audit_content_inventory.py` | Compare report to EDITORIAL_PLAN §2; editorial-agent or editor confirms plan updates | — |
| **Theme / CSS / templates** | `theme/promptanatomy/` | DoD 2.0 §1, §4, §5 | DoD 2.0 §6 if UX-visible | DoD 2.0 §9–§10 on release |
| **Satori / illustrations / brand** | `data/og/`, `data/illustrations.yaml`, `tokens.css` + `brand.mjs` | DoD 2.0 §2–§3; `validate_brand_sync.py` if colors changed | [VISUAL_QA.md](VISUAL_QA.md) § Satori-generated heroes | Deploy smoke §8 after release |
| **Data / nav only** | `data/*.yaml` | Universal gate (output may change) | Spot-check affected URLs on `make serve` | — |
| **Docs-only** | `docs/`, `AGENTS.md`, `.cursor/` | `make validate` minimum; full `make build` if behavior or build docs changed | — | [CHANGELOG.md](../CHANGELOG.md) if meaningful |
| **Production release** | tag / `main` deploy | Full `make validate && make build` | DoD 2.0 §6–§7 | DoD 2.0 §8–§10 |

**Theme PR quick gate:** DoD 2.0 sections 1, 4, and 5 via CI; section 6 only for UX-visible changes ([DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#definition-of-done-20)).

### Workflow details

**Add / edit article**

- Check [EDITORIAL_PLAN.md](EDITORIAL_PLAN.md) for backlog priority, category rules, and internal linking (§5–§7).
- `body_locked: true` after manual body edits (see [AGENTS.md](../AGENTS.md)).
- New Satori row: `npm run build:satori`, `make sync-images` (or full `make build`).
- Publishing: zero errors from `validate_content.py`; warnings policy per content tier.

**Editorial audit**

- Run `make audit-content` or `python scripts/audit_content_inventory.py`.
- **editorial-agent** interprets report; updates EDITORIAL_PLAN §2/§5 when baseline shifts.
- q-and-a-agent updates CHANGELOG when agent system or editorial process docs change.

**Theme / CSS / templates**

- Hex only in `theme/promptanatomy/static/css/tokens.css`.
- Update [COMPONENT_MAP.md](COMPONENT_MAP.md) if partials or macros change.

**Satori / illustrations / brand**

- Edit `tokens.css` and `data/og/brand.mjs` together; run `python scripts/validate_brand_sync.py`, then regen Satori.

## Validator catalog

| Script | Makefile / when | Expect |
|--------|-----------------|--------|
| `scripts/validate_theme_tokens.py` | `make validate-theme`; `make validate` | Exit 0 |
| `scripts/validate_brand_sync.py` | `make validate-brand`; `make validate` | Exit 0 |
| `scripts/validate_content.py` | `make validate` | Exit 0; zero errors for publish |
| `scripts/audit_content_inventory.py` | `make audit-content`; editorial audit workflow | Completes; report in `docs/reports/` when `--markdown` |
| `npm run build:satori` | `make build`, `make build-dev` | Completes without error |
| `scripts/validate_satori_manifest.py` | `make validate-satori`; after Satori in `build` | Exit 0 |
| `scripts/sync_illustrations.py` | `make sync-images`; in `build` | Exit 0 |
| `scripts/generate_brand_assets.py` | `make brand-assets`; in `build` | Exit 0 |
| `npm run build:analytics` | `make analytics`; in `build` | Exit 0 |
| Pelican | `pelican content -s publishconf.py` in `make build` | Exit 0 |
| `scripts/generate_sitemap.py` | After Pelican in `build` | Exit 0 |
| `scripts/verify_build_assets.py` | After Pelican in `build` | Exit 0 |
| `scripts/validate_seo_output.py` | Post-build in `make build` / `build-dev` | Exit 0 |
| `scripts/validate_a11y_landmarks.py` | Post-build in `make build` / `build-dev` | Exit 0 |

Local dev preview: `make serve` (runs `build-dev` + HTTP server on port 8000).

## Evidence format (required for agents)

Include this block in the final message when handing off work:

```markdown
### Validation
- make validate && make build → exit _N_ (or: not run — reason)
- _other commands run_ → exit _N_

### Gaps
- _none_, or list checks not run and why
```

Do not report “should pass” without running commands or stating why they were skipped.

## Common rationalizations

| Rationalization | Reality |
|-----------------|--------|
| Small CSS tweak, skip validate | Token and SEO validators catch one-line regressions |
| `make` not available on Windows | Use [DEPLOY.md](DEPLOY.md) equivalent sequence; do not skip |
| Docs only, no build needed | If docs describe behavior, templates, or validators, run at least `make validate`; full build when unsure |
| Changelog optional | [AGENTS.md](../AGENTS.md) requires CHANGELOG after meaningful changes |
| VISUAL_QA only for major releases | Required for UX-visible theme changes and production releases (matrix above) |
| Duplicate DoD in every PR comment | Link this file + applicable DESIGN_SYSTEM sections |

## Agent roles

| Agent | Delivers | Done when |
|-------|----------|-----------|
| **Default implementation agent** | Code, content, theme, data | Workflow matrix + universal gate + evidence |
| **q-and-a-agent** | Answers, CHANGELOG, design-system docs, AGENT_SYSTEM | [Documentation Definition of Done](#documentation-definition-of-done-q-and-a-agent) |
| **editorial-agent** | Corpus audits, EDITORIAL_PLAN §2/§5 recommendations | Audit report + plan updates when baseline shifts; CHANGELOG handoff to q-and-a |

Implementation agents may leave CHANGELOG bullets for q-and-a-agent to merge.

## Documentation Definition of Done (q-and-a-agent)

When documentation is the deliverable:

- [ ] [CHANGELOG.md](../CHANGELOG.md) — entry under `## [Unreleased]` (Keep a Changelog sections; date on grouped entry when closing a task)
- [ ] Regression commands named when behavior changed (`make validate`, specific `scripts/*.py`)
- [ ] [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) / [COMPONENT_MAP.md](COMPONENT_MAP.md) / [VISUAL_QA.md](VISUAL_QA.md) updated per ownership table in [q-and-a-agent](../.cursor/agents/q-and-a-agent.md)
- [ ] Final message lists files touched — do not claim “docs synced” without names

## Release pointer

Full checklist: [DESIGN_SYSTEM.md § Definition of Done (2.0)](DESIGN_SYSTEM.md#definition-of-done-20) (sections 1–10).

| Section | Topic |
|---------|--------|
| §1 | Tokens and brand (CI) |
| §2 | Content contract (CI) |
| §3 | Satori and images (CI) |
| §4 | SEO output (CI) |
| §5 | Accessibility landmarks (CI) |
| §6 | Visual QA (QA) |
| §7 | Content standards (QA) |
| §8 | Production smoke (Major) |
| §9 | Documentation (Major) |
| §10 | Deploy (Major) |

## Related docs

| Doc | Role |
|-----|------|
| [AGENTS.md](../AGENTS.md) | Mission, workflows, non-negotiables |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Tokens, components, release DoD 2.0 |
| [VISUAL_QA.md](VISUAL_QA.md) | Manual visual and a11y checks |
| [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) | Voice, publish rules, tiers |
| [EDITORIAL_PLAN.md](EDITORIAL_PLAN.md) | Content strategy, backlog, category balance, roadmap |
| [AGENT_SYSTEM.md](AGENT_SYSTEM.md) | Agent roster, skills, delegation |
| [DEPLOY.md](DEPLOY.md) | Vercel, Windows build sequence |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Pipeline and repo layers |
| [COMPONENT_MAP.md](COMPONENT_MAP.md) | Template partial mapping |
| [CHANGELOG.md](../CHANGELOG.md) | Release notes |
| `.cursor/rules/` | File-scoped conventions (`project-core.mdc`, `design-system.mdc`, …) |
