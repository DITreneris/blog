#!/usr/bin/env python3
"""List published articles missing tags or content_tier."""
from __future__ import annotations

from pathlib import Path

import frontmatter

ART = Path(__file__).resolve().parents[1] / "content" / "articles"
WAVE_20 = {
    "prompt-registry-playbook",
    "rag-in-production",
    "northline-part-2-scaling-eval-coverage",
    "ai-workflow-eval-checklist",
    "grounding-ai-outputs",
    "model-context-protocol-enterprise",
    "context-rot-why-bigger-windows-make-agents-worse",
    "langgraph-vs-crewai-production-guide",
    "securing-mcp-agent-tools",
    "agent-orchestrator-operating-model",
    "evaluating-agents-with-clear",
    "choosing-workflow-automation-ai-pipelines",
    "prompt-frameworks-race-tag-business",
    "prompt-regression-testing-week",
    "ai-procurement-freeze",
    "governance-raci-worksheet",
    "multi-agent-observability",
    "measuring-ai-workflow-roi",
    "prompt-anatomy-glossary",
    "mcp-server-selection-worksheet",
}

for path in sorted(ART.glob("*.md")):
    post = frontmatter.load(path)
    meta = post.metadata
    if meta.get("status") != "published":
        continue
    slug = str(meta.get("slug") or path.stem)
    if slug in WAVE_20:
        continue
    tags = meta.get("tags") or []
    tier = meta.get("content_tier") or ""
    issues = []
    if not tags:
        issues.append("no_tags")
    if not tier:
        issues.append("no_tier")
    if issues:
        print(f"{slug}\t{meta.get('category', '')}\t{','.join(issues)}")
