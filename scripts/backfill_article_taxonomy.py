#!/usr/bin/env python3
"""Backfill missing tags and content_tier on published articles (editorial audit wave 2)."""

from __future__ import annotations

from pathlib import Path

import frontmatter

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "content" / "articles"

# slug -> (content_tier, tags) — only applied when field is missing
TAXONOMY: dict[str, tuple[str, list[str]]] = {
    "10-signs-your-company-is-vibe-prompting": (
        "pillar",
        ["change-management", "governance", "eval"],
    ),
    "ai-governance-roles-and-ownership": ("playbook", ["governance"]),
    "ai-implementation-maturity-ladder": ("playbook", ["change-management", "framework"]),
    "ai-outreach-with-outlook-guardrails": ("playbook", ["agents", "governance"]),
    "ai-risk-review-cadence": ("playbook", ["governance", "eval"]),
    "ai-tender-response-pipeline": ("playbook", ["agents", "northline"]),
    "ai-workflow-canvas-template": ("template", ["templates", "workflow-automation"]),
    "audit-trails-for-ai-workflows": ("playbook", ["governance", "mcp"]),
    "case-study-vibe-prompting-to-structured-workflow": (
        "playbook",
        ["northline", "change-management", "eval"],
    ),
    "chaos-vs-control-prompting": ("opinion", ["prompt-systems", "context"]),
    "context-window-myths": ("opinion", ["context", "context-engineering"]),
    "data-boundaries-for-ai-agents": ("playbook", ["governance", "agents", "mcp"]),
    "evaluation-hooks-for-ai-workflows": ("playbook", ["eval", "governance"]),
    "five-levels-of-ai-control": ("opinion", ["context", "governance"]),
    "from-prompt-to-agent": ("nav", ["agents", "prompt-systems"]),
    "from-prompts-to-business-outcomes": ("playbook", ["change-management", "benchmarks"]),
    "handoff-rules-between-humans-and-ai": ("playbook", ["workflow-automation", "governance"]),
    "how-to-design-an-ai-agent-workflow": ("pillar", ["agents", "orchestration"]),
    "memory-types-for-ai-systems": ("playbook", ["memory", "context"]),
    "multi-agent-handoff-pattern": ("playbook", ["agents", "orchestration"]),
    "prompt-anatomy-ecosystem-map": ("nav", ["prompt-systems"]),
    "prompt-anatomy-foundations": ("nav", ["prompt-systems", "context"]),
    "prompt-engineering-memes-vs-reality": ("opinion", ["prompt-systems"]),
    "prompt-engineering-vs-ai-workflow-engineering": (
        "pillar",
        ["prompt-systems", "workflow-automation", "context-engineering"],
    ),
    "structured-prompt-system-blueprint": ("playbook", ["prompt-systems", "governance"]),
    "team-rituals-for-ai-implementation": ("playbook", ["change-management"]),
    "the-model-is-not-the-system": ("pillar", ["framework", "governance"]),
    "three-types-of-ai-memory-short": ("opinion", ["memory"]),
    "three-types-of-rag": ("opinion", ["rag"]),
    "tokens-and-context-window-limits": ("opinion", ["context", "context-engineering"]),
    "types-of-prompts-for-business-workflows": ("playbook", ["prompt-systems"]),
    "what-scales-ai-beyond-basics": ("opinion", ["change-management"]),
    "when-ai-hallucinates-confidence": ("opinion", ["context", "eval"]),
    "your-company-does-not-need-more-ai-tools": (
        "opinion",
        ["change-management", "workflow-automation"],
    ),
    "why-ai-hallucinates": ("opinion", ["context", "eval"]),
    "tokens-as-fuel-for-ai-output": ("opinion", ["context", "context-engineering"]),
    "what-is-context-architecture": ("pillar", ["context", "context-engineering"]),
    "what-your-ai-stack-reveals": ("opinion", ["change-management", "workflow-automation"]),
    "why-structured-ai-beats-more-tools": ("opinion", ["change-management"]),
    "implementation-notes-hero-structure": ("nav", ["change-management"]),
}


def main() -> int:
    updated = 0
    for slug, (tier, tags) in TAXONOMY.items():
        path = ART / f"{slug}.md"
        if not path.is_file():
            print(f"skip missing: {slug}")
            continue
        post = frontmatter.load(path)
        meta = post.metadata
        if meta.get("status") != "published":
            continue
        changed = False
        if not meta.get("content_tier"):
            meta["content_tier"] = tier
            changed = True
        if not meta.get("tags"):
            meta["tags"] = tags
            changed = True
        if changed:
            meta["body_locked"] = True
            path.write_text(frontmatter.dumps(post), encoding="utf-8")
            print(f"updated: {slug}")
            updated += 1
    print(f"Done. Updated {updated} file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
