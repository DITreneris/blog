#!/usr/bin/env python3
"""Sync Satori row title: lines from article frontmatter without reformatting YAML."""

from __future__ import annotations

from pathlib import Path

import frontmatter

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS = ROOT / "data" / "illustrations.yaml"
ARTICLES = ROOT / "content" / "articles"

BLOCK_PATCHES = [
    (
        """  - id: satori-choosing-workflow-automation
    generator: satori
    template: platform-comparison
    source: Satori/choosing-workflow-automation-ai-pipelines.png
    slug: choosing-workflow-automation-ai-pipelines
    title: "Choosing Workflow Automation for AI Pipelines (Without Tool Sprawl)"
    category: Implementation Notes
    usage: [hero]
    status: mapped""",
        """  - id: satori-choosing-workflow-automation
    generator: satori
    template: platform-comparison
    source: Satori/choosing-workflow-automation-ai-pipelines.png
    slug: choosing-workflow-automation-ai-pipelines
    satori_title: "Workflow Automation for AI Pipelines"
    title: "Workflow Automation for AI Pipelines"
    subtitle: "Without tool sprawl — fit, control, maintainability, and operating risk."
    category: Implementation Notes
    usage: [hero]
    status: mapped""",
    ),
    (
        """  - id: satori-agent-orchestrator
    generator: satori
    template: observability-trace
    source: Satori/agent-orchestrator-operating-model.png
    slug: agent-orchestrator-operating-model
    title: "The Agent Orchestrator Role: Operating Model for a Digital Workforce"
    category: Implementation Notes
    usage: [hero]
    status: mapped""",
        """  - id: satori-agent-orchestrator
    generator: satori
    template: agent-orchestrator
    source: Satori/agent-orchestrator-operating-model.png
    slug: agent-orchestrator-operating-model
    satori_title: "Agent Orchestrator Operating Model"
    title: "Agent Orchestrator Operating Model"
    subtitle: "Route work, manage handoffs, check quality, and keep an audit trail across AI agents."
    category: Implementation Notes
    usage: [hero]
    status: mapped""",
    ),
    (
        """  - id: satori-measuring-ai-workflow-roi
    generator: satori
    template: business-outcomes
    source: Satori/measuring-ai-workflow-roi.png
    slug: measuring-ai-workflow-roi
    title: "Measuring AI Workflow ROI: Pass Rate, Time Saved, and Incident Cost"
    category: Implementation Notes
    usage: [hero]
    status: mapped""",
        """  - id: satori-measuring-ai-workflow-roi
    generator: satori
    template: workflow-roi
    source: Satori/measuring-ai-workflow-roi.png
    slug: measuring-ai-workflow-roi
    satori_title: "Measure AI Workflow ROI"
    title: "Measuring AI Workflow ROI"
    subtitle: "Track pass rate, time saved, and incident cost before scaling automation."
    category: Implementation Notes
    usage: [hero]
    status: mapped""",
    ),
    (
        """  - id: satori-prompt-frameworks-race-tag
    generator: satori
    template: category-default
    source: Satori/prompt-frameworks-race-tag-business.png
    slug: prompt-frameworks-race-tag-business
    title: "Prompt Frameworks for Business: RACE, TAG, and When to Use Each"
    category: Prompt Systems
    usage: [hero]
    status: mapped""",
        """  - id: satori-prompt-frameworks-race-tag
    generator: satori
    template: framework-chooser
    source: Satori/prompt-frameworks-race-tag-business.png
    slug: prompt-frameworks-race-tag-business
    title: "Prompt Frameworks for Business"
    category: Prompt Systems
    usage: [hero]
    status: mapped""",
    ),
]


def main() -> int:
    articles: dict[str, str] = {}
    for path in ARTICLES.glob("*.md"):
        meta = frontmatter.load(path).metadata
        slug = meta.get("slug")
        title = meta.get("title")
        if slug and title:
            articles[str(slug)] = str(title)

    text = ILLUSTRATIONS.read_text(encoding="utf-8")
    lines = text.splitlines()
    out: list[str] = []
    slug: str | None = None
    in_satori = False

    for line in lines:
        stripped = line.strip()
        if stripped == "generator: satori":
            in_satori = True
        if in_satori and stripped.startswith("slug:"):
            slug = stripped.split("slug:", 1)[1].strip()
        if in_satori and slug and stripped.startswith("title:"):
            indent = line[: len(line) - len(line.lstrip())]
            title = articles.get(slug, stripped.split("title:", 1)[1].strip().strip('"'))
            out.append(f'{indent}title: "{title}"')
            slug = None
            continue
        out.append(line)

    text = "\n".join(out) + "\n"
    for old, new in BLOCK_PATCHES:
        if old in text:
            text = text.replace(old, new)
        elif new.split("slug:")[1].split("\n", 1)[0].strip() in text:
            pass
        else:
            print(f"  note: block patch skipped (already applied or text changed)")

    ILLUSTRATIONS.write_text(text, encoding="utf-8")
    print("Synced Satori titles in illustrations.yaml")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
