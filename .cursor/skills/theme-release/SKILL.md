---
name: theme-release
description: Theme, CSS, or template changes for Prompt Anatomy blog. Use when editing theme/promptanatomy/, tokens.css, Jinja templates, or design-system release work.
---

# Theme Release

Workflow for theme/CSS/template changes under `theme/promptanatomy/`.

## Rules

- Hex/rgba **only** in `theme/promptanatomy/static/css/tokens.css`
- Use `var(--token)` elsewhere; run `validate_theme_tokens.py`
- Prefer [macros/ui.html](../../theme/promptanatomy/templates/macros/ui.html) for repeated UI
- Follow [docs/DESIGN_SYSTEM.md](../../docs/DESIGN_SYSTEM.md) v2.0 and [.cursor/rules/design-system.mdc](../../.cursor/rules/design-system.mdc)

## Checklist

1. Edit theme files only under `theme/promptanatomy/`
2. Update [docs/COMPONENT_MAP.md](../../docs/COMPONENT_MAP.md) if partials/macros change
3. UX-visible change → [docs/VISUAL_QA.md](../../docs/VISUAL_QA.md)
4. Brand color change → edit `tokens.css` + `data/og/brand.mjs`; run `validate_brand_sync.py`; regen Satori if needed

## Validate

```bash
make validate && make build
make serve
```

Spot-check affected URLs and `/design-system/` if components changed.

## Done when

[docs/definition_of_done_system.md](../../docs/definition_of_done_system.md) row **Theme / CSS / templates** — DoD 2.0 §1, §4, §5 (CI); §6 if UX-visible.

## Docs handoff

Ask **q-and-a-agent** to sync CHANGELOG + DESIGN_SYSTEM / COMPONENT_MAP / VISUAL_QA if you did not update them inline.
