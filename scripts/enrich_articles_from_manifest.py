#!/usr/bin/env python3
"""Apply hero_image and structured body copy from illustrations manifest."""

from __future__ import annotations

import re
from pathlib import Path

import frontmatter
import yaml

from reading_time import label_from_text

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS_YAML = ROOT / "data" / "illustrations.yaml"
ARTICLES = ROOT / "content" / "articles"

BOILERPLATE_MARKER = "The hero diagram summarizes the core idea"

CATEGORY_INTRO = {
    "Framework": "This framework note helps teams move from ad hoc prompting to repeatable implementation.",
    "Prompt Systems": "Prompt systems are contracts: inputs, constraints, outputs, and owners—not one-off chat messages.",
    "AI Agents": "Agent workflows only work when boundaries, tools, escalation, and evaluation are designed upfront.",
    "AI Governance": "Governance turns AI from a demo into an operating capability with clear accountability.",
    "Implementation Notes": "Implementation notes capture what actually works when AI meets real teams and processes.",
    "Opinion": "A clear-eyed take on hype, shortcuts, and what structured implementation requires.",
    "Case Studies": "A documented move from experiment to controlled AI operations.",
    "Templates": "A reusable canvas or checklist for structured AI work.",
}


def _body(title: str, category: str, slug: str) -> str:
    intro = CATEGORY_INTRO.get(category, "Practical notes for structured AI implementation.")
    return f"""{intro}

## What this covers

**{title}** breaks down how to design, ship, and govern AI work so outcomes stay predictable. The hero diagram summarizes the core idea; the sections below translate it into actions your team can adopt this quarter.

## Why teams get stuck

Most groups buy another tool or rewrite prompts when results drift. That treats symptoms. Durable progress requires workflow design: what context is allowed, who approves outputs, and how you measure quality before scale.

## A practical path forward

1. **Define the business outcome** in one sentence—not model behavior.
2. **Map the workflow** including human checkpoints and failure modes.
3. **Place the model** only where probabilistic generation adds leverage.
4. **Add evaluation hooks** before you expand scope or headcount on AI work.

## Related reading

- [The Model Is Not the System](/articles/the-model-is-not-the-system/) — why workflows beat tool sprawl.
- [How to Design an AI Agent Workflow](/articles/how-to-design-an-ai-agent-workflow/) — agent-ready process design.
- [10 Signs Your Company Is Vibe Prompting](/articles/10-signs-your-company-is-vibe-prompting/) — a quick diagnostic.

## Implementation checklist

- Document inputs, outputs, and owners for this workflow.
- Run a two-week pilot with explicit success metrics.
- Review failures in a standing cadence—not only when executives ask.

Explore training and templates on [Prompt Anatomy](https://www.promptanatomy.app/#pricing) when you are ready to standardize across teams.
"""


def _should_skip_body_update(post) -> bool:
    if post.metadata.get("body_locked"):
        return True
    content = post.content or ""
    if BOILERPLATE_MARKER not in content and len(content.strip()) > 400:
        return True
    return False


def _default_status(row: dict) -> str:
    if row.get("replaces_stub"):
        return "published"
    return row.get("default_status", "draft")


def _takeaway(title: str, category: str) -> str:
    if category == "Opinion":
        return f"{title} is a reminder: structure beats novelty when AI touches customer-facing work."
    if category == "AI Governance":
        return "Governance is not bureaucracy—it is how you keep AI auditable and aligned with policy."
    return f"{title} only creates value when wrapped in workflow, context, and evaluation—not model choice alone."


def main() -> int:
    with ILLUSTRATIONS_YAML.open(encoding="utf-8") as f:
        manifest = yaml.safe_load(f)

    for row in manifest.get("illustrations", []):
        slug = row["slug"]
        path = ARTICLES / f"{slug}.md"
        if not path.exists():
            print(f"Skip missing: {slug}")
            continue

        post = frontmatter.load(path)
        post.metadata["hero_image"] = f"images/articles/{slug}/hero.png"
        post.metadata["title"] = row["title"]
        post.metadata["category"] = row["category"]
        if row.get("featured"):
            post.metadata["featured"] = True
        if not post.metadata.get("key_takeaway"):
            post.metadata["key_takeaway"] = _takeaway(row["title"], row["category"])

        if post.metadata.get("status") not in ("draft", "published"):
            post.metadata["status"] = _default_status(row)

        if not _should_skip_body_update(post):
            post.content = _body(row["title"], row["category"], slug)

        if post.content:
            post.metadata["reading_time"] = label_from_text(post.content)

        path.write_text(frontmatter.dumps(post), encoding="utf-8")
        print(f"  enriched: {slug}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
