import { articleOgFrame } from './base.mjs';

/** Homepage social OG — 1200×630 title card. */
export function buildHomepageOg(props) {
  return articleOgFrame({
    category: 'Knowledge Hub',
    title: props.title || 'Turn random AI usage into structured implementation',
    subtitle: props.subtitle || 'Structured AI implementation for teams',
  });
}
