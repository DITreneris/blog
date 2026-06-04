/** Satori card typography — single scale for heroes (1600×900) and OG (1200×630). */

export const heroSubtitleMax = 100;
export const ogSubtitleMax = 72;

export const typography = {
  hero: {
    title: 52,
    subtitle: 26,
    badge: 20,
    brand: 22,
    label: 18,
    textColumnWidth: 560,
    diagram: {
      label: 17,
      title: 18,
      caption: 16,
      code: 18,
      metric: 32,
      arrow: 26,
    },
  },
  og: {
    title: 58,
    subtitle: 26,
    badge: 20,
    brand: 20,
  },
};

const LONG_TITLE_THRESHOLD = 48;

/**
 * Fixed font size with up to 3 lines; tighter line-height for long titles.
 * @param {string} title
 * @param {number} baseSize
 * @param {{ maxLines?: number }} [opts]
 */
export function titleStyle(title, baseSize, opts = {}) {
  const maxLines = opts.maxLines ?? 3;
  const len = (title || '').length;
  const long = len > LONG_TITLE_THRESHOLD;
  return {
    fontSize: `${baseSize}px`,
    fontWeight: 700,
    lineHeight: long ? 1.08 : 1.12,
    letterSpacing: '-0.02em',
    maxLines,
  };
}

export function px(n) {
  return `${n}px`;
}
