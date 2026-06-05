import { brand, sizes } from '../brand.mjs';
import { textOgFrame } from './base.mjs';

/** Site-wide fallback OG — 1200×630, value-first typography. */
export function buildOgDefault() {
  return textOgFrame({
    category: 'Knowledge Hub',
    title: brand.tagline,
    subtitle: brand.name,
    showBrandRow: false,
    showWatermark: true,
  });
}

export const ogDefaultSize = { width: sizes.ogWidth, height: sizes.ogHeight };
