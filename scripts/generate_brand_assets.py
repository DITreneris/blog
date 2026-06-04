#!/usr/bin/env python3
"""Generate brand OG image and favicon PNGs for Prompt Anatomy."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "theme" / "promptanatomy" / "static"
IMG_DIR = STATIC / "img"
AUTHOR_SOURCE_DIR = ROOT / "data" / "author"
AUTHOR_MASTER_DIR = ROOT / "data" / "01_illustrations"
AUTHOR_DEST = ROOT / "content" / "images" / "author" / "tomas-staniulis.jpg"
AUTHOR_SOURCE_NAMES = (
    "tomas-staniulis.jpg",
    "tomas-staniulis.jpeg",
    "tomas-staniulis.png",
    "tomas-staniulis.webp",
)
AUTHOR_MASTER_NAMES = ("author.jpg", "author.jpeg", "author.png", "author.webp")
AUTHOR_AVATAR_SIZE = 400

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


def find_author_photo_source() -> Path | None:
    """Return author headshot: data/author/ names, then data/01_illustrations/author.*."""
    for name in AUTHOR_SOURCE_NAMES:
        path = AUTHOR_SOURCE_DIR / name
        if path.is_file():
            return path
    for name in AUTHOR_MASTER_NAMES:
        path = AUTHOR_MASTER_DIR / name
        if path.is_file():
            return path
    return None


def _center_crop_square(img):
    from PIL import Image

    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return img.crop((left, top, left + side, top + side))


def sync_author_photo(dest: Path = AUTHOR_DEST) -> bool:
    """Copy and resize a real headshot from data/author/. Returns True if synced."""
    src = find_author_photo_source()
    if not src:
        return False

    from PIL import Image

    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as img:
        img = img.convert("RGB")
        img = _center_crop_square(img)
        img = img.resize(
            (AUTHOR_AVATAR_SIZE, AUTHOR_AVATAR_SIZE),
            Image.Resampling.LANCZOS,
        )
        img.save(dest, format="JPEG", quality=88, optimize=True)
    print(f"Synced author photo: {src.relative_to(ROOT)} -> {dest.relative_to(ROOT)}")
    return True


def sync_author_avatar(dest: Path = AUTHOR_DEST) -> None:
    """Prefer real photo from data/author/; remove stale generated placeholder when no source."""
    if sync_author_photo(dest):
        return
    if dest.is_file():
        dest.unlink()
        print(f"Removed stale avatar at {dest.relative_to(ROOT)} (was brand placeholder)")
    print("No author photo in data/author/; author bio will render without an avatar image")


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

    # og-default.png is generated by npm run build:satori (see data/og/templates/og-default.mjs)
    generate_favicons()
    sync_author_avatar()
    return 0


if __name__ == "__main__":
    sys.exit(main())
