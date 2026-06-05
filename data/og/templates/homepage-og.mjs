import { textOgFrame } from './base.mjs';

/** Homepage social OG — 1200×630, typography-led (diagram lives on-page only). */
export function buildHomepageOg(props) {
  return textOgFrame({
    category: 'Knowledge Hub',
    title: props.title || 'Build AI workflows your team can actually repeat',
    subtitle:
      props.subtitle ||
      'Frameworks, templates, and field notes for repeatable AI workflows.',
    showBrandRow: true,
    showWatermark: true,
  });
}
