#!/usr/bin/env python3
"""Allowlist chrome .app CTAs: utm_source=blog and query before hash.

Does not scan article Markdown (in-body #pricing stays bare) or ecosystem cards.
"""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
SITE_YAML = ROOT / "data" / "site.yaml"
ECOSYSTEM_YAML = ROOT / "data" / "ecosystem.yaml"


def _href_errors(url: str, label: str) -> list[str]:
    errors: list[str] = []
    if not url:
        return [f"{label}: missing URL"]
    if "utm_source=blog" not in url:
        errors.append(f"{label}: missing utm_source=blog: {url}")
    hash_at = url.find("#")
    if hash_at >= 0:
        query_at = url.find("?")
        if query_at < 0 or query_at > hash_at:
            errors.append(f"{label}: hash must follow query (? before #): {url}")
    return errors


def _nav_href(site: dict, label: str) -> str:
    for item in site.get("nav") or []:
        if isinstance(item, dict) and item.get("label") == label:
            return str(item.get("href") or "")
    return ""


def _footer_cta_href(footer: dict, label: str) -> str:
    for item in footer.get("ctas") or []:
        if isinstance(item, dict) and item.get("label") == label:
            return str(item.get("href") or "")
    return ""


def _footer_column_href(footer: dict, column_title: str, label: str) -> str:
    for column in footer.get("columns") or []:
        if not isinstance(column, dict) or column.get("title") != column_title:
            continue
        for link in column.get("links") or []:
            if isinstance(link, dict) and link.get("label") == label:
                return str(link.get("href") or "")
    return ""


def main() -> int:
    errors: list[str] = []
    if not SITE_YAML.is_file():
        print("data/site.yaml missing", file=sys.stderr)
        return 1
    if not ECOSYSTEM_YAML.is_file():
        print("data/ecosystem.yaml missing", file=sys.stderr)
        return 1

    site = yaml.safe_load(SITE_YAML.read_text(encoding="utf-8")) or {}
    ecosystem = yaml.safe_load(ECOSYSTEM_YAML.read_text(encoding="utf-8")) or {}
    hub = site.get("hub") or {}
    cta = site.get("cta") or {}
    footer = site.get("footer") or {}

    cta_href = str(cta.get("href") or "")
    pricing_url = str(hub.get("pricing_url") or "")
    checks = [
        (cta_href, "cta.href"),
        (pricing_url, "hub.pricing_url"),
        (str(hub.get("training_url") or ""), "hub.training_url"),
        (_nav_href(site, "Training"), "nav Training"),
        (_nav_href(site, "Pricing"), "nav Pricing"),
        (str(footer.get("entity_href") or ""), "footer.entity_href"),
        (_footer_cta_href(footer, "View plans"), "footer View plans"),
        (_footer_column_href(footer, "Product", "Training"), "footer Product Training"),
        (_footer_column_href(footer, "Product", "Pricing"), "footer Product Pricing"),
        (str(ecosystem.get("cta_href") or ""), "ecosystem.yaml cta_href"),
    ]
    for url, label in checks:
        errors.extend(_href_errors(url, label))

    if pricing_url != cta_href:
        errors.append(
            "hub.pricing_url must equal cta.href "
            f"(got {pricing_url!r} vs {cta_href!r})"
        )

    if errors:
        print("Hub chrome UTM validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  {err}", file=sys.stderr)
        return 1

    print("Hub chrome UTM validation OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
