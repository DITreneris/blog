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

Push to `main` → Vercel builds automatically (`vercel.json`, `scripts/vercel_build.sh`).

Production URL: `https://promptanatomy.blog` (set in `publishconf.py`).

GitHub Actions runs `make build` on push and pull requests; Lighthouse runs on pull requests.

After `make serve`, open `/design-system/` for a live component reference.

## Stack

- Pelican 4.x, Markdown, Pygments
- Theme: `theme/promptanatomy/` (CSS design tokens + Jinja partials)
- No JavaScript frameworks (vanilla JS for reading progress + TOC)
