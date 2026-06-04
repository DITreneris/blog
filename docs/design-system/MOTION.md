# Motion

Tokens: `--duration-fast`, `--duration-normal`, `--ease-standard` in [`tokens.css`](../../theme/promptanatomy/static/css/tokens.css).

## Allowed

- Card hover lift and border highlight
- Button hover (`translateY(-1px)` on primary)
- Reading progress bar width transition
- TOC active link color
- Ecosystem card hover elevation

## Forbidden

- Parallax
- Heavy animation / 3D
- Neon gradients
- Distracting hovers on body text

## Reduced motion

`base.css` disables transitions when `prefers-reduced-motion: reduce`.
