#!/usr/bin/env python3
"""Generate brand OG image and favicon PNGs for Prompt Anatomy."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "theme" / "promptanatomy" / "static"
IMG_DIR = STATIC / "img"

# Brand colors (asset-only; not used in CSS templates)
BG_TOP = (5, 13, 20)
BG_BOTTOM = (16, 59, 90)
GOLD = (251, 211, 4)
WHITE = (255, 255, 255)
MUTED = (180, 195, 210)

OG_WIDTH = 1200
OG_HEIGHT = 630


def _load_font(size: int, bold: bool = False):
    from PIL import ImageFont

    candidates = []
    if sys.platform == "win32":
        windir = Path("C:/Windows/Fonts")
        candidates.extend(
            [
                windir / ("arialbd.ttf" if bold else "arial.ttf"),
                windir / ("segoeuib.ttf" if bold else "segoeui.ttf"),
            ]
        )
    else:
        candidates.extend(
            [
                Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
                if bold
                else Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
                Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
                if bold
                else Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
            ]
        )
    for path in candidates:
        if path.is_file():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def _vertical_gradient(width: int, height: int):
    from PIL import Image

    img = Image.new("RGB", (width, height))
    pixels = img.load()
    for y in range(height):
        t = y / max(height - 1, 1)
        r = int(BG_TOP[0] + (BG_BOTTOM[0] - BG_TOP[0]) * t)
        g = int(BG_TOP[1] + (BG_BOTTOM[1] - BG_TOP[1]) * t)
        b = int(BG_TOP[2] + (BG_BOTTOM[2] - BG_TOP[2]) * t)
        for x in range(width):
            pixels[x, y] = (r, g, b)
    return img


def _draw_bolt(draw, cx: int, cy: int, scale: float) -> None:
    """Lightning bolt matching favicon.svg geometry."""
    s = scale
    points = [
        (cx + 13.5 * s, cy + 1.5 * s),
        (cx + 4.5 * s, cy + 14.25 * s),
        (cx + 10.5 * s, cy + 14.25 * s),
        (cx + 8.25 * s, cy + 22.5 * s),
        (cx + 19.5 * s, cy + 9.75 * s),
        (cx + 13.5 * s, cy + 9.75 * s),
    ]
    draw.polygon(points, fill=GOLD)


def _icon_image(size: int):
    from PIL import Image, ImageDraw

    img = _vertical_gradient(size, size)
    draw = ImageDraw.Draw(img)
    inset = size * 0.08
    radius = size * 0.25
    draw.rounded_rectangle(
        (inset, inset, size - inset, size - inset),
        radius=radius,
        outline=None,
    )
    _draw_bolt(draw, int(size * 0.125), int(size * 0.09), size / 32)
    return img


def generate_og_default(dest: Path) -> None:
    from PIL import Image, ImageDraw

    img = _vertical_gradient(OG_WIDTH, OG_HEIGHT)
    draw = ImageDraw.Draw(img)

    _draw_bolt(draw, 120, 200, 6.5)

    title_font = _load_font(72, bold=True)
    tagline_font = _load_font(36, bold=False)

    draw.text((280, 220), "Prompt Anatomy", fill=WHITE, font=title_font)
    draw.text(
        (280, 310),
        "Structured AI implementation for teams",
        fill=MUTED,
        font=tagline_font,
    )

    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, format="PNG", optimize=True)
    print(f"Wrote {dest}")


def generate_author_avatar(dest: Path) -> None:
    """Branded placeholder avatar until a real photo is added under content/images/author/."""
    from PIL import Image, ImageDraw

    size = 400
    img = _icon_image(size)
    draw = ImageDraw.Draw(img)
    font = _load_font(120, bold=True)
    initials = "TS"
    bbox = draw.textbbox((0, 0), initials, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(
        ((size - tw) / 2, (size - th) / 2 - 8),
        initials,
        fill=WHITE,
        font=font,
    )
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(dest, format="JPEG", quality=88, optimize=True)
    print(f"Wrote {dest}")


def generate_favicons() -> None:
    outputs = {
        STATIC / "favicon-16x16.png": 16,
        STATIC / "favicon-32x32.png": 32,
        STATIC / "apple-touch-icon.png": 180,
        STATIC / "android-chrome-192x192.png": 192,
        STATIC / "android-chrome-512x512.png": 512,
    }
    for dest, size in outputs.items():
        _icon_image(size).save(dest, format="PNG", optimize=True)
        print(f"Wrote {dest}")


def main() -> int:
    try:
        from PIL import Image  # noqa: F401
    except ImportError:
        print("Pillow is required. Install: pip install Pillow", file=sys.stderr)
        return 1

    generate_og_default(IMG_DIR / "og-default.png")
    generate_favicons()
    generate_author_avatar(ROOT / "content" / "images" / "author" / "tomas-staniulis.jpg")
    return 0


if __name__ == "__main__":
    sys.exit(main())
