# Author photo

Headshot sources (first match wins), synced on `make brand-assets`:

1. **`data/author/tomas-staniulis.jpg`** (or `.png` / `.jpeg` / `.webp`)
2. **`data/01_illustrations/author.jpg`** (or `.png` / `.jpeg` / `.webp`) — illustration master

[`scripts/generate_brand_assets.py`](../../scripts/generate_brand_assets.py) center-crops to 400×400 and writes `content/images/author/tomas-staniulis.jpg` for Pelican.
