# Prompt Anatomy Blog

Premium knowledge hub for [promptanatomy.blog](https://promptanatomy.blog), built with **Pelican** (Python) and a custom Jinja theme.

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
| `make validate` | Check article/page frontmatter |
| `make build` | Production build (`publishconf.py`) |
| `make build-dev` | Local build (`pelicanconf.py`) |
| `make serve` | Build and serve `output/` on port 8000 |

## Deploy

GitHub → Vercel. See [docs/DEPLOY.md](docs/DEPLOY.md).

Production URL is set in `publishconf.py`: `https://promptanatomy.blog`

## Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Component map](docs/COMPONENT_MAP.md)
- [Agent instructions](AGENTS.md)
- [Changelog](CHANGELOG.md)

## Stack

- Pelican 4.x, Markdown, Pygments
- Theme: `theme/promptanatomy/` (CSS design tokens + Jinja partials)
- No JavaScript frameworks (vanilla JS for reading progress + TOC)
