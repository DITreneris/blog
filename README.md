# Prompt Anatomy Blog

Premium knowledge hub for [promptanatomy.blog](https://promptanatomy.blog), built with **Pelican** (Python) and a custom Jinja theme.

**Repository:** [github.com/DITreneris/blog](https://github.com/DITreneris/blog)

Internal development docs and agent config are maintained locally, not in this repository.

## Quick start

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
make validate
make preview
```

Open http://localhost:8000. Use `make serve` only when you need a release-like bake (Satori check + image sync + validators).

Roadmap → [`todo.md`](todo.md) · Content strategy → [`docs/EDITORIAL_PLAN.md`](docs/EDITORIAL_PLAN.md)

## Commands

| Command | Description |
|---------|-------------|
| `make validate` | Theme token lint + article/page frontmatter |
| `make preview` | Pelican + `http.server` on port 8000 (no Satori, no image re-encode) |
| `make build` | Production build (`publishconf.py`) |
| `make build-dev` | Local full bake (`pelicanconf.py`) |
| `make serve` | Full `build-dev` then serve `output/` on port 8000 |

Without `make` (Windows): `python scripts/validate_theme_tokens.py`, `python scripts/validate_content.py`, `python -m pelican content -s publishconf.py`

## Deploy

Push to `main` → Vercel builds automatically (`vercel.json`, `scripts/vercel_build.sh`).

Production URL: `https://promptanatomy.blog` (set in `publishconf.py`).

GitHub Actions runs `make build` on push and pull requests; Lighthouse runs on pull requests against that build output (no second image bake).

After `make preview`, open `/design-system/` for a live component reference.

## Stack

- Pelican 4.x, Markdown, Pygments
- Theme: `theme/promptanatomy/` (CSS design tokens + Jinja partials)
- No JavaScript frameworks (vanilla JS for reading progress + TOC)
