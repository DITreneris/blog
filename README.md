# Prompt Anatomy Blog

Premium knowledge hub for [promptanatomy.blog](https://promptanatomy.blog), built with **Pelican** (Python) and a custom Jinja theme.

**Repository:** [github.com/DITreneris/blog](https://github.com/DITreneris/blog)

## Quick start

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
make validate
make build-dev
make serve
```

Open http://localhost:8000

## Commands

| Command | Description |
|---------|-------------|
| `make validate` | Theme token lint + article/page frontmatter |
| `make build` | Production build (`publishconf.py`) |
| `make build-dev` | Local build (`pelicanconf.py`) |
| `make serve` | Build and serve `output/` on port 8000 |

Without `make` (Windows): `python scripts/validate_theme_tokens.py`, `python scripts/validate_content.py`, `python -m pelican content -s publishconf.py`

## Deploy

GitHub → Vercel. See [docs/DEPLOY.md](docs/DEPLOY.md).

Production URL is set in `publishconf.py`: `https://promptanatomy.blog`

## Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Definition of Done (system)](docs/definition_of_done_system.md)
- [Design system](docs/DESIGN_SYSTEM.md) (v2.0)
- [Visual QA checklist](docs/VISUAL_QA.md)
- [Component map](docs/COMPONENT_MAP.md)
- [Agent instructions](AGENTS.md)
- [Changelog](CHANGELOG.md)

After `make serve`, open `/design-system/` for a live component reference.

## Stack

- Pelican 4.x, Markdown, Pygments
- Theme: `theme/promptanatomy/` (CSS design tokens + Jinja partials)
- No JavaScript frameworks (vanilla JS for reading progress + TOC)
