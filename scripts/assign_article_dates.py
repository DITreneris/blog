#!/usr/bin/env python3
"""Assign publish dates from a fixed editorial order.

Legacy curriculum starts 2024-01-06 on a ~24-day cadence. Wave 2 is a one-day
cadence anchored at ``WAVE2_START`` (the on-disk date of the first wave post).
``PUBLISH_CUTOFF`` is a ceiling only: raising it for a new ``FIXED_DATES`` row
must not slide wave 2 or the drafts that follow that wave. Manual exceptions in
``FIXED_DATES`` are preserved. Northline Part 2 lands ~7 weeks after Part 1.
"""
from __future__ import annotations

import re
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "content" / "articles"

# Curriculum: framework → prompts → implementation → agents → governance → case/template → opinion → wave 2
PUBLICATION_ORDER: list[str] = [
    "the-model-is-not-the-system",
    "prompt-anatomy-foundations",
    "prompt-engineering-vs-ai-workflow-engineering",
    "types-of-prompts-for-business-workflows",
    "structured-prompt-system-blueprint",
    "what-is-context-architecture",
    "memory-types-for-ai-systems",
    "evaluation-hooks-for-ai-workflows",
    "ai-implementation-maturity-ladder",
    "10-signs-your-company-is-vibe-prompting",
    "chaos-vs-control-prompting",
    "your-company-does-not-need-more-ai-tools",
    "what-scales-ai-beyond-basics",
    "how-to-design-an-ai-agent-workflow",
    "from-prompt-to-agent",
    "multi-agent-handoff-pattern",
    "ai-outreach-with-outlook-guardrails",
    "handoff-rules-between-humans-and-ai",
    "team-rituals-for-ai-implementation",
    "from-prompts-to-business-outcomes",
    "prompt-anatomy-ecosystem-map",
    "shipping-prompt-anatomy",
    "six-block-prompt-system",
    "six-block-canvas-template",
    "ai-governance-roles-and-ownership",
    "data-boundaries-for-ai-agents",
    "audit-trails-for-ai-workflows",
    "ai-risk-review-cadence",
    "case-study-vibe-prompting-to-structured-workflow",
    "btcbuzzbot-x-publish-loop-field-notes",
    "northline-part-2-scaling-eval-coverage",
    "ai-workflow-canvas-template",
    "when-ai-hallucinates-confidence",
    "why-ai-hallucinates",
    "context-window-myths",
    "tokens-as-fuel-for-ai-output",
    "tokens-and-context-window-limits",
    "three-types-of-rag",
    "three-types-of-ai-memory-short",
    "five-levels-of-ai-control",
    "prompt-engineering-memes-vs-reality",
    "what-your-ai-stack-reveals",
    # Wave 2 — keyword integration (2026 Q2)
    "prompt-registry-playbook",
    "prompt-frameworks-race-tag-business",
    "prompt-regression-testing-week",
    "grounding-ai-outputs",
    "context-rot-why-bigger-windows-make-agents-worse",
    "rag-in-production",
    "evaluating-agents-with-clear",
    "prompt-anatomy-glossary",
    "model-context-protocol-enterprise",
    "langgraph-vs-crewai-production-guide",
    "multi-agent-observability",
    "securing-mcp-agent-tools",
    "ai-procurement-freeze",
    "measuring-ai-workflow-roi",
    "agent-orchestrator-operating-model",
    "choosing-workflow-automation-ai-pipelines",
    "ai-workflow-eval-checklist",
    "governance-raci-worksheet",
    "mcp-server-selection-worksheet",
    "ai-change-log-template-prompt-context-and-model-updates",
    "finance-workflow-case-study-controlled-draft-and-review",
    "ai-tender-response-pipeline",
    "weekly-ceo-brief-pattern",
    "first-ai-lesson-cloud-launch",
    "classroom-prompt-builder-launch",
    "daily-workflow-library-info-launch",
    "how-to-build-a-telegram-game-stack",
    "corporate-ladder-soft-launch",
    "corporate-ladder-v24-score-trust",
    "click-and-do-data-analysis-soft-launch",
    "role-paths-before-generic-analytics",
    "3a-before-you-build-an-agent",
    "system-prompt-team-contract",
    "interactive-demos-as-workshop-instruments",
    "critique-agent-v09-audit-stats",
    "critique-agent-v10-verified-local-audits",
    "critique-agent-field-test-trust-workflow",
    "hiring-prompts-help-launch",
    "executive-os-pro-launch",
    "manifest-before-you-broadcast",
    "buy-vs-build-agent-stack",
    "a-shortlist-not-another-inbox",
    "mcp-vs-custom-tool-apis-regulated",
    "when-prompt-injection-becomes-an-action",
    "memory-is-not-state",
    "context-engineering-vs-context-architecture-regulated",
    "northline-part-3-runtime-kept",
]

WAVE2_START_SLUG = "prompt-registry-playbook"
# On-disk date of WAVE2_START_SLUG. Do not derive this from PUBLISH_CUTOFF.
WAVE2_START = date(2026, 5, 29)

# Inserted into the curriculum order without taking a cadence slot. Their
# publish dates stay in FIXED_DATES. shipping-prompt-anatomy does take a slot.
CADENCE_EXEMPT = frozenset(
    {
        "six-block-prompt-system",
        "six-block-canvas-template",
    }
)

# Drafts continue the cadence after published catalog (not shown on site while draft)
DRAFT_ORDER: list[str] = [
    "prompt-anatomy-workflow-basics",
    "context-layers-in-prompt-design",
    "prompt-anatomy-framework-overview",
    "why-structured-ai-beats-more-tools",
    "implementation-notes-hero-structure",
    "ai-bot-for-research-scraping",
    "telegram-bot-for-ops-alerts",
    "twitter-engagement-bot-with-limits",
]

INTERVAL_DAYS = [22, 24, 21, 23, 22, 24, 21, 23, 22, 24, 21, 23, 22, 24, 21, 23]
# One-day steps from WAVE2_START. Twenty posts: 2026-05-29 → 2026-06-17.
WAVE2_INTERVAL_DAYS = [1]

FIXED_DATES: dict[str, date] = {
    "shipping-prompt-anatomy": date(2026, 3, 15),
    "six-block-prompt-system": date(2026, 4, 16),
    "six-block-canvas-template": date(2026, 4, 18),
    "finance-workflow-case-study-controlled-draft-and-review": date(2026, 4, 2),
    "ai-change-log-template-prompt-context-and-model-updates": date(2026, 4, 24),
    "weekly-ceo-brief-pattern": date(2026, 4, 9),
    "first-ai-lesson-cloud-launch": date(2026, 4, 29),
    "classroom-prompt-builder-launch": date(2026, 5, 15),
    "daily-workflow-library-info-launch": date(2026, 5, 30),
    "how-to-build-a-telegram-game-stack": date(2026, 6, 12),
    "corporate-ladder-soft-launch": date(2026, 6, 15),
    "corporate-ladder-v24-score-trust": date(2026, 6, 16),
    "click-and-do-data-analysis-soft-launch": date(2026, 7, 2),
    "role-paths-before-generic-analytics": date(2026, 7, 25),
    "3a-before-you-build-an-agent": date(2026, 8, 13),
    "system-prompt-team-contract": date(2026, 7, 28),
    "interactive-demos-as-workshop-instruments": date(2026, 7, 30),
    "critique-agent-v09-audit-stats": date(2026, 6, 16),
    "critique-agent-v10-verified-local-audits": date(2026, 6, 17),
    "critique-agent-field-test-trust-workflow": date(2026, 7, 3),
    "btcbuzzbot-x-publish-loop-field-notes": date(2025, 9, 15),
    "hiring-prompts-help-launch": date(2026, 6, 24),
    "executive-os-pro-launch": date(2026, 7, 16),
    "manifest-before-you-broadcast": date(2026, 7, 18),
    "buy-vs-build-agent-stack": date(2026, 9, 10),
    "a-shortlist-not-another-inbox": date(2026, 9, 12),
    "mcp-vs-custom-tool-apis-regulated": date(2026, 9, 13),
    "when-prompt-injection-becomes-an-action": date(2026, 9, 25),
    "memory-is-not-state": date(2026, 9, 26),
    "context-engineering-vs-context-architecture-regulated": date(2026, 9, 29),
    "northline-part-3-runtime-kept": date(2026, 10, 4),
}

# Latest allowed publish date (Northline Part 3 2026-10-04)
PUBLISH_CUTOFF = date(2026, 10, 4)

NORTHLINE_PART2_AFTER_PART1_DAYS = 49  # ~7 weeks

PILLAR_SLUGS = frozenset(
    {
        "the-model-is-not-the-system",
        "10-signs-your-company-is-vibe-prompting",
        "what-is-context-architecture",
        "how-to-design-an-ai-agent-workflow",
        "prompt-registry-playbook",
        "rag-in-production",
        "grounding-ai-outputs",
        "model-context-protocol-enterprise",
    }
)

START = date(2024, 1, 6)
TODAY = date.today()


def _schedule(slugs: list[str], start: date, intervals: list[int]) -> dict[str, date]:
    out: dict[str, date] = {}
    d = start
    for i, slug in enumerate(slugs):
        out[slug] = d
        if i < len(slugs) - 1:
            d += timedelta(days=intervals[i % len(intervals)])
    return out


def _schedule_to_end(slugs: list[str], end: date, intervals: list[int]) -> dict[str, date]:
    """Assign dates forward through *slugs* so the last slug lands on *end*."""
    if not slugs:
        return {}
    if len(slugs) == 1:
        return {slugs[0]: end}
    span = sum(intervals[i % len(intervals)] for i in range(len(slugs) - 1))
    return _schedule(slugs, end - timedelta(days=span), intervals)


def _wave_slugs() -> list[str]:
    wave_idx = PUBLICATION_ORDER.index(WAVE2_START_SLUG)
    return [s for s in PUBLICATION_ORDER[wave_idx:] if s not in FIXED_DATES]


def _last_wave_date() -> date:
    """Last daily-wave post. Later FIXED_DATES must not move this."""
    count = len(_wave_slugs())
    if count == 0:
        return WAVE2_START
    return WAVE2_START + timedelta(days=count - 1)


def _build_publication_dates() -> dict[str, date]:
    wave_idx = PUBLICATION_ORDER.index(WAVE2_START_SLUG)
    tail_start_idx = PUBLICATION_ORDER.index("prompt-engineering-memes-vs-reality")
    legacy_main = [
        s for s in PUBLICATION_ORDER[:tail_start_idx] if s not in CADENCE_EXEMPT
    ]
    legacy_tail = PUBLICATION_ORDER[tail_start_idx:wave_idx]
    wave_slugs = _wave_slugs()

    out = _schedule(legacy_main, START, INTERVAL_DAYS)

    part1 = out["case-study-vibe-prompting-to-structured-workflow"]
    out["northline-part-2-scaling-eval-coverage"] = part1 + timedelta(
        days=NORTHLINE_PART2_AFTER_PART1_DAYS
    )

    after_northline = legacy_main[legacy_main.index("northline-part-2-scaling-eval-coverage") + 1 :]
    d = out["northline-part-2-scaling-eval-coverage"]
    for i, slug in enumerate(after_northline):
        d += timedelta(days=INTERVAL_DAYS[i % len(INTERVAL_DAYS)])
        out[slug] = d

    tail_dates = _schedule_to_end(legacy_tail, WAVE2_START - timedelta(days=1), INTERVAL_DAYS)
    if tail_dates and min(tail_dates.values()) <= out["five-levels-of-ai-control"]:
        raise ValueError(
            "Legacy opinion tail overlaps five-levels; move WAVE2_START later or shorten the legacy tail."
        )
    out.update(tail_dates)

    wave_dates = _schedule(wave_slugs, WAVE2_START, WAVE2_INTERVAL_DAYS)
    out.update(wave_dates)
    out.update(FIXED_DATES)

    over = {s: d for s, d in out.items() if d > PUBLISH_CUTOFF}
    if over:
        raise ValueError(
            "Publish dates after PUBLISH_CUTOFF: "
            + ", ".join(f"{s}={d.isoformat()}" for s, d in sorted(over.items(), key=lambda x: x[1]))
        )
    return out


def _build_draft_dates() -> dict[str, date]:
    """Drafts continue after the daily wave, not after the latest fixed date."""
    draft_start = _last_wave_date() + timedelta(days=INTERVAL_DAYS[0])
    return _schedule(DRAFT_ORDER, draft_start, INTERVAL_DAYS)


def _frontmatter_date(text: str) -> date | None:
    match = re.search(r"^date:\s*(\d{4}-\d{2}-\d{2})\s*$", text, flags=re.M)
    if not match:
        return None
    return date.fromisoformat(match.group(1))


def _modified_for(slug: str, pub: date) -> date | None:
    """Pillars get a plausible refresh ~10–13 weeks after publish."""
    if slug not in PILLAR_SLUGS:
        return None
    refresh = pub + timedelta(days=70 + (pub.toordinal() % 4) * 7)
    if pub < refresh < TODAY:
        return refresh
    return None


def _patch_frontmatter(text: str, pub: date, mod: date | None) -> str:
    if not text.startswith("---"):
        return text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return text
    fm = parts[1]
    body = parts[2]

    fm = re.sub(r"^date:\s*.+$", f"date: {pub.isoformat()}", fm, flags=re.M)
    if re.search(r"^modified:\s*.+$", fm, flags=re.M):
        if mod:
            fm = re.sub(r"^modified:\s*.+$", f"modified: {mod.isoformat()}", fm, flags=re.M)
        else:
            fm = re.sub(r"^modified:\s*.+\n?", "", fm, flags=re.M)
    elif mod:
        fm = re.sub(r"(^date:\s*.+$)", rf"\1\nmodified: {mod.isoformat()}", fm, flags=re.M)

    return f"---{fm}---{body}"


def main() -> int:
    pub_dates = _build_publication_dates()
    draft_dates = _build_draft_dates()
    all_dates = {**pub_dates, **draft_dates}
    last_pub = max(pub_dates.values())

    md_files = {p.stem: p for p in ARTICLES.glob("*.md")}
    missing = [s for s in all_dates if s not in md_files]
    if missing:
        print("Missing article files:", ", ".join(missing), file=sys.stderr)
        return 1

    extra = set(md_files) - set(all_dates)
    if extra:
        print("Articles not in schedule (unchanged):", ", ".join(sorted(extra)), file=sys.stderr)

    changed = 0
    for slug in PUBLICATION_ORDER + DRAFT_ORDER:
        if slug not in all_dates:
            continue
        pub = all_dates[slug]
        path = md_files[slug]
        text = path.read_text(encoding="utf-8")
        if _frontmatter_date(text) == pub:
            continue
        mod = _modified_for(slug, pub)
        new_text = _patch_frontmatter(text, pub, mod)
        path.write_text(new_text, encoding="utf-8")
        changed += 1
        print(f"{pub.isoformat()}  {slug}")

    print(f"Published span: {START.isoformat()} -> {last_pub.isoformat()}")
    print(f"Draft span continues -> {max(draft_dates.values()).isoformat()}")
    if changed == 0:
        print("Publish dates already match the schedule.")
    else:
        print(f"Updated {changed} article(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
