# Illustration masters

Source PNGs for article heroes and hub art. **Do not edit synced copies** under `content/images/` — run `make sync-images` instead.

## Layout

| Folder / file | Purpose |
|---------------|---------|
| `Basic/` | Framework and workflow diagrams |
| `Agents/` | Agent orchestration art |
| `Governance/` | Governance and memory diagrams |
| `Memes/` | Diagnostic / opinion visuals |
| `Selfpromo/` | Hub ecosystem map, promo heroes |
| `h1.png` | Homepage hero diagram (synced to `content/images/hub/hero.png`) |

Mapping: [`data/illustrations.yaml`](../illustrations.yaml). Script: [`scripts/sync_illustrations.py`](../../scripts/sync_illustrations.py).

## Large repos

If this tree exceeds ~50 MB, track with Git LFS (`data/01_illustrations/**`) and document in [`docs/DEPLOY.md`](../../docs/DEPLOY.md).
