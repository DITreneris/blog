---
name: production-release
description: Production release or deploy for promptanatomy.blog. Use when cutting a release, deploying to Vercel main, production smoke test, or full release checklist.
---

# Production Release

Workflow for shipping to **https://promptanatomy.blog**.

## Pre-release

```bash
make validate && make build
```

Confirm:

- [docs/definition_of_done_system.md](../../docs/definition_of_done_system.md) row **Production release**
- [docs/DESIGN_SYSTEM.md](../../docs/DESIGN_SYSTEM.md) § Definition of Done (2.0) §8–§10 for major releases
- UX-visible theme changes → [docs/VISUAL_QA.md](../../docs/VISUAL_QA.md)

## Deploy

- Push to `main` → Vercel builds automatically
- Production `SITEURL` only in `publishconf.py` — never in `pelicanconf.py`
- See [docs/DEPLOY.md](../../docs/DEPLOY.md) for smoke checks and Windows build sequence

## Post-release (Major)

- GSC sitemap resubmit if URLs/metadata changed ([docs/SEO_improvement.md](../../docs/SEO_improvement.md))
- Production smoke: home, one article, `/about/`, Atom feed, key topic pages

## Editorial gate (before growth push)

Run `make audit-content` and confirm [docs/EDITORIAL_PLAN.md](../../docs/EDITORIAL_PLAN.md) §9 growth readiness.

## Done when

Vercel green on `main`; evidence block per definition_of_done_system.md.

## Handoff

**q-and-a-agent** — CHANGELOG entry and version header if user requests a version cut.
