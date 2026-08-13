#!/usr/bin/env python3
"""Assign realistic publish dates from a fixed editorial order.

Start: 2024-01-06, ~24-day cadence (jittered) for legacy curriculum; compressed
cadence for wave-2 keyword posts ending by ``PUBLISH_CUTOFF`` (no Jun–Aug future
dates when the catalog is frozen). Manual exceptions in ``FIXED_DATES`` are
preserved. Northline Part 2 lands ~7 weeks after Part 1.
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
]

WAVE2_START_SLUG = "prompt-registry-playbook"

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
# One-day steps: 20 wave posts land May 12 → May 31 (catalog frozen 2026-06-06)
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
}

# Latest allowed publish date (3A agent field note 2026-08-13)
PUBLISH_CUTOFF = date(2026, 8, 13)

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


def _build_publication_dates() -> dict[str, date]:
    wave_idx = PUBLICATION_ORDER.index(WAVE2_START_SLUG)
    tail_start_idx = PUBLICATION_ORDER.index("prompt-engineering-memes-vs-reality")
    legacy_main = PUBLICATION_ORDER[:tail_start_idx]
    legacy_tail = PUBLICATION_ORDER[tail_start_idx:wave_idx]
    wave_slugs = [s for s in PUBLICATION_ORDER[wave_idx:] if s not in FIXED_DATES]

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

    wave_start = PUBLISH_CUTOFF - timedelta(days=len(wave_slugs) - 1)
    tail_dates = _schedule_to_end(legacy_tail, wave_start - timedelta(days=1), INTERVAL_DAYS)
    if min(tail_dates.values()) <= out["five-levels-of-ai-control"]:
        raise ValueError(
            "Legacy opinion tail overlaps five-levels; widen PUBLISH_CUTOFF or shorten legacy tail."
        )
    out.update(tail_dates)

    wave_dates = _schedule(wave_slugs, wave_start, WAVE2_INTERVAL_DAYS)
    out.update(wave_dates)
    out.update(FIXED_DATES)

    over = {s: d for s, d in out.items() if d > PUBLISH_CUTOFF}
    if over:
        raise ValueError(
            "Publish dates after PUBLISH_CUTOFF: "
            + ", ".join(f"{s}={d.isoformat()}" for s, d in sorted(over.items(), key=lambda x: x[1]))
        )
    return out


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
    last_pub = max(pub_dates.values())
    draft_start = last_pub + timedelta(days=INTERVAL_DAYS[0])
    draft_dates = _schedule(DRAFT_ORDER, draft_start, INTERVAL_DAYS)
    all_dates = {**pub_dates, **draft_dates}

    md_files = {p.stem: p for p in ARTICLES.glob("*.md")}
    missing = [s for s in all_dates if s not in md_files]
    if missing:
        print("Missing article files:", ", ".join(missing), file=sys.stderr)
        return 1

    extra = set(md_files) - set(all_dates)
    if extra:
        print("Articles not in schedule (unchanged):", ", ".join(sorted(extra)), file=sys.stderr)

    for slug in PUBLICATION_ORDER + DRAFT_ORDER:
        if slug not in all_dates:
            continue
        pub = all_dates[slug]
        path = md_files[slug]
        mod = _modified_for(slug, pub)
        new_text = _patch_frontmatter(path.read_text(encoding="utf-8"), pub, mod)
        path.write_text(new_text, encoding="utf-8")
        print(f"{pub.isoformat()}  {slug}")

    print(f"\nPublished span: {START.isoformat()} -> {last_pub.isoformat()}")
    print(f"Draft span continues -> {max(draft_dates.values()).isoformat()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
