# Layout

CSS: [`layout.css`](../../theme/promptanatomy/static/css/layout.css), [`components.css`](../../theme/promptanatomy/static/css/components.css), [`article.css`](../../theme/promptanatomy/static/css/article.css).

## Primitives

| Class | Role |
|-------|------|
| `.container` | Centered max `--container-max` (75rem) |
| `.section` / `.section--dark` | Vertical padding; dark bands |
| `.grid`, `.grid--2`, `.grid--3`, `.grid--topics` | Responsive grids |
| `.stack`, `.cluster` | Flex gaps |
| `.article-layout`, `.article-layout--with-toc` | Article + TOC |

## Breakpoints

See [TOKENS.md](TOKENS.md). Verify at **375px**, **768px**, **1280px** per [`VISUAL_QA.md`](../VISUAL_QA.md).

## Article layout

- Prose column: `--article-max` (45rem / 720px)
- TOC: collapsible below `--bp-toc`; sticky sidebar at ≥ `--bp-toc`
- Takeaway box aligned to prose column width

## Hub hero

Split grid at ≥ `--bp-nav`: copy left, diagram right. Hub image uses explicit `width`/`height` on `<img>` to limit CLS.
