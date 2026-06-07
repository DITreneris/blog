"""Resolve continue-learning navigation slots from reading paths and editorial clusters."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
CATEGORIES_YAML = ROOT / "data" / "categories.yaml"
CLUSTERS_YAML = ROOT / "data" / "editorial_clusters.yaml"

NAV_TIER = "nav"
OPINION_TIER = "opinion"
PILLAR_TIER = "pillar"
TEMPLATES_CATEGORY = "Templates"
FRAMEWORK_READING_PATH_FIRST = "the-model-is-not-the-system"

CANVAS_SLUG = "ai-workflow-canvas-template"
EVAL_CHECKLIST_SLUG = "ai-workflow-eval-checklist"

NAV_HUB_SLUGS = frozenset(
    {
        "prompt-anatomy-foundations",
        "prompt-anatomy-glossary",
        "prompt-anatomy-ecosystem-map",
    }
)


def load_reading_paths(categories_data: dict | None = None) -> dict[str, list[str]]:
    """Category title -> ordered slug list."""
    if categories_data is None:
        with CATEGORIES_YAML.open(encoding="utf-8") as f:
            categories_data = yaml.safe_load(f) or {}
    paths: dict[str, list[str]] = {}
    for cat in categories_data.get("categories", []):
        title = cat.get("title", cat.get("slug", ""))
        slugs = [
            entry["slug"]
            for entry in cat.get("reading_path", [])
            if entry.get("slug")
        ]
        paths[title] = slugs
    return paths


def load_category_slugs(categories_data: dict | None = None) -> dict[str, str]:
    """Category title -> URL slug (e.g. Opinion -> opinion)."""
    if categories_data is None:
        with CATEGORIES_YAML.open(encoding="utf-8") as f:
            categories_data = yaml.safe_load(f) or {}
    return {
        cat.get("title", ""): cat.get("slug", "")
        for cat in categories_data.get("categories", [])
        if cat.get("title")
    }


def load_spoke_hub_map(clusters_data: dict | None = None) -> dict[str, list[str]]:
    """Spoke slug -> merged ordered hub slugs (multi-cluster spokes deduped)."""
    if clusters_data is None:
        with CLUSTERS_YAML.open(encoding="utf-8") as f:
            clusters_data = yaml.safe_load(f) or {}
    spoke_hubs: dict[str, list[str]] = {}
    for cluster in (clusters_data.get("clusters") or {}).values():
        hubs = cluster.get("hub_slugs") or []
        for spoke in cluster.get("spokes") or []:
            existing = spoke_hubs.setdefault(spoke, [])
            for hub in hubs:
                if hub not in existing:
                    existing.append(hub)
    return spoke_hubs


def _content_tier(article: Any) -> str:
    return str(getattr(article, "content_tier", "") or "").lower()


def _category_name(article: Any) -> str:
    cat = getattr(article, "category", None)
    if cat is None:
        return ""
    return getattr(cat, "name", str(cat))


def _tags(article: Any) -> set[str]:
    raw = getattr(article, "tags", None) or []
    return {str(t).lower() for t in raw}


def _slug_path_index(
    slug: str, reading_paths: dict[str, list[str]]
) -> tuple[str, int] | None:
    for category, slugs in reading_paths.items():
        if slug in slugs:
            return category, slugs.index(slug)
    return None


def _path_position(
    slug: str,
    reading_paths: dict[str, list[str]],
    category_slugs: dict[str, str],
) -> dict | None:
    found = _slug_path_index(slug, reading_paths)
    if not found:
        return None
    category, index = found
    total = len(reading_paths[category])
    return {
        "category": category,
        "category_slug": category_slugs.get(category, ""),
        "index": index + 1,
        "total": total,
        "slug": slug,
    }


def _prev_next(
    slug: str, reading_paths: dict[str, list[str]], by_slug: dict[str, Any]
) -> tuple[Any | None, Any | None]:
    found = _slug_path_index(slug, reading_paths)
    if not found:
        return None, None
    category, index = found
    slugs = reading_paths[category]
    prev_slug = slugs[index - 1] if index > 0 else None
    next_slug = slugs[index + 1] if index < len(slugs) - 1 else None
    return (
        by_slug.get(prev_slug) if prev_slug else None,
        by_slug.get(next_slug) if next_slug else None,
    )


def _first_hub(
    slug: str, spoke_hubs: dict[str, list[str]], by_slug: dict[str, Any]
) -> Any | None:
    for hub_slug in spoke_hubs.get(slug, []):
        if hub_slug != slug and hub_slug in by_slug:
            return by_slug[hub_slug]
    return None


def _resolve_deeper(
    article: Any,
    slug: str,
    hub_article: Any | None,
    spoke_hubs: dict[str, list[str]],
    reading_paths: dict[str, list[str]],
    by_slug: dict[str, Any],
) -> Any | None:
    tier = _content_tier(article)
    hubs = spoke_hubs.get(slug, [])

    if tier == OPINION_TIER and hub_article:
        return hub_article

    if tier in (PILLAR_TIER, NAV_TIER):
        return None

    if len(hubs) > 1:
        for hub_slug in hubs[1:]:
            if hub_slug != slug and hub_slug in by_slug:
                return by_slug[hub_slug]

    category = _category_name(article)
    path = reading_paths.get(category, [])
    for path_slug in path:
        candidate = by_slug.get(path_slug)
        if candidate and _content_tier(candidate) == PILLAR_TIER and path_slug != slug:
            return candidate

    if hub_article:
        return hub_article

    return None


def _build_templates_index(articles: list[Any]) -> dict[str, list[Any]]:
    """Tag -> template articles sharing that tag."""
    index: dict[str, list[Any]] = {}
    for article in articles:
        if _category_name(article) != TEMPLATES_CATEGORY:
            continue
        for tag in _tags(article):
            index.setdefault(tag, []).append(article)
    for tag in index:
        index[tag].sort(key=lambda a: getattr(a, "date", None) or "", reverse=True)
    return index


def _resolve_practical(
    article: Any,
    templates_by_tag: dict[str, list[Any]],
    by_slug: dict[str, Any],
) -> Any | None:
    tags = _tags(article)
    for tag in sorted(tags):
        candidates = templates_by_tag.get(tag, [])
        for candidate in candidates:
            if candidate.slug != article.slug:
                return candidate

    tier = _content_tier(article)
    category = _category_name(article)
    if "eval" in tags and EVAL_CHECKLIST_SLUG in by_slug:
        return by_slug[EVAL_CHECKLIST_SLUG]
    if tier in ("playbook", PILLAR_TIER) and category in (
        "Framework",
        "Implementation Notes",
    ):
        if CANVAS_SLUG in by_slug:
            return by_slug[CANVAS_SLUG]
    return None


def _resolve_related_fallback(
    article: Any,
    used_slugs: set[str],
    spoke_hubs: dict[str, list[str]],
    by_slug: dict[str, Any],
    limit: int = 2,
) -> list[Any]:
    slug = article.slug
    hub_slugs = spoke_hubs.get(slug, [])
    if not hub_slugs:
        return []

    primary_hub = hub_slugs[0]
    hub = by_slug.get(primary_hub)
    if not hub:
        return []

    hub_cat = _category_name(hub)
    candidates: list[Any] = []
    for candidate in by_slug.values():
        if candidate.slug in used_slugs:
            continue
        if candidate.slug == slug:
            continue
        if _category_name(candidate) != hub_cat:
            continue
        tier = _content_tier(candidate)
        if tier not in ("playbook", PILLAR_TIER, "template"):
            continue
        candidates.append(candidate)

    candidates.sort(key=lambda a: getattr(a, "date", None) or "", reverse=True)
    seen: set[str] = set()
    result: list[Any] = []
    for candidate in candidates:
        if candidate.slug in seen:
            continue
        seen.add(candidate.slug)
        result.append(candidate)
        if len(result) >= limit:
            break
    return result


def _resolve_nav_tier_next(
    article: Any,
    reading_paths: dict[str, list[str]],
    by_slug: dict[str, Any],
) -> Any | None:
    slug = article.slug
    if slug == "prompt-anatomy-foundations":
        return by_slug.get(FRAMEWORK_READING_PATH_FIRST)
    if slug == "prompt-anatomy-glossary":
        framework_path = reading_paths.get("Framework", [])
        if len(framework_path) > 1:
            return by_slug.get(framework_path[1])
        return by_slug.get("prompt-anatomy-foundations")
    if slug == "prompt-anatomy-ecosystem-map":
        return by_slug.get("10-signs-your-company-is-vibe-prompting")
    framework_path = reading_paths.get("Framework", [])
    if framework_path:
        return by_slug.get(framework_path[0])
    return None


def resolve_continue_learning(
    article: Any,
    by_slug: dict[str, Any],
    reading_paths: dict[str, list[str]],
    spoke_hubs: dict[str, list[str]],
    templates_by_tag: dict[str, list[Any]],
) -> dict[str, Any]:
    slug = article.slug
    tier = _content_tier(article)
    used_slugs: set[str] = {slug}

    previous, next_article = _prev_next(slug, reading_paths, by_slug)

    if tier == NAV_TIER and next_article is None:
        next_article = _resolve_nav_tier_next(article, reading_paths, by_slug)

    hub = _first_hub(slug, spoke_hubs, by_slug)
    deeper = _resolve_deeper(
        article, slug, hub, spoke_hubs, reading_paths, by_slug
    )
    if hub is not None and deeper is not None and hub.slug == deeper.slug:
        deeper = None
    practical = _resolve_practical(article, templates_by_tag, by_slug)

    for slot_article in (previous, next_article, hub, deeper, practical):
        if slot_article is not None:
            used_slugs.add(slot_article.slug)

    related = _resolve_related_fallback(article, used_slugs, spoke_hubs, by_slug)
    for rel in related:
        used_slugs.add(rel.slug)

    return {
        "previous": previous,
        "next": next_article,
        "hub": hub,
        "deeper": deeper,
        "practical": practical,
        "related": related,
    }


def attach_journey_to_articles(
    articles: list[Any],
    categories_data: dict | None = None,
    clusters_data: dict | None = None,
) -> None:
    """Mutate each article with continue_learning and path_position."""
    if categories_data is None:
        with CATEGORIES_YAML.open(encoding="utf-8") as f:
            categories_data = yaml.safe_load(f) or {}
    if clusters_data is None:
        with CLUSTERS_YAML.open(encoding="utf-8") as f:
            clusters_data = yaml.safe_load(f) or {}

    reading_paths = load_reading_paths(categories_data)
    category_slugs = load_category_slugs(categories_data)
    spoke_hubs = load_spoke_hub_map(clusters_data)
    by_slug = {a.slug: a for a in articles}
    templates_by_tag = _build_templates_index(articles)

    for article in articles:
        article.path_position = _path_position(
            article.slug, reading_paths, category_slugs
        )
        article.continue_learning = resolve_continue_learning(
            article,
            by_slug,
            reading_paths,
            spoke_hubs,
            templates_by_tag,
        )


def _article_summary(article: Any) -> dict:
    cl = getattr(article, "continue_learning", {}) or {}
    return {
        "slug": article.slug,
        "title": getattr(article, "title", article.slug),
        "category": _category_name(article),
        "content_tier": _content_tier(article),
        "path_position": getattr(article, "path_position", None),
        "continue_learning": {
            key: (
                {"slug": val.slug, "title": val.title}
                if val is not None and key != "related"
                else [
                    {"slug": v.slug, "title": v.title}
                    for v in (val or [])
                ]
                if key == "related"
                else None
            )
            for key, val in cl.items()
        },
    }


def journey_has_primary_slot(continue_learning: dict) -> bool:
    """True if at least one primary navigation slot is filled."""
    for key in ("next", "hub", "deeper"):
        if continue_learning.get(key) is not None:
            return True
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Smoke-test journey resolution for slugs")
    parser.add_argument(
        "slugs",
        nargs="*",
        default=[
            "three-types-of-rag",
            "prompt-registry-playbook",
            "prompt-anatomy-foundations",
            "your-company-does-not-need-more-ai-tools",
            "how-to-design-an-ai-agent-workflow",
        ],
    )
    args = parser.parse_args()

    import frontmatter

    articles_dir = ROOT / "content" / "articles"
    articles = []
    for path in sorted(articles_dir.glob("*.md")):
        post = frontmatter.load(path)
        meta = post.metadata
        if meta.get("status", "published") == "draft":
            continue

        class Stub:
            pass

        stub = Stub()
        stub.slug = str(meta.get("slug") or path.stem)
        stub.title = meta.get("title", stub.slug)
        stub.content_tier = meta.get("content_tier") or ""
        stub.tags = list(meta.get("tags") or [])
        stub.category = type("Cat", (), {"name": meta.get("category", "")})()
        stub.date = meta.get("date")
        articles.append(stub)

    attach_journey_to_articles(articles)
    by_slug = {a.slug: a for a in articles}
    for slug in args.slugs:
        article = by_slug.get(slug)
        if not article:
            print(json.dumps({"slug": slug, "error": "not found"}, indent=2))
            continue
        print(json.dumps(_article_summary(article), indent=2, default=str))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
