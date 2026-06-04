import { articleOgFrame } from './base.mjs';

/** Topic / category page social OG — 1200×630. */
export function buildCategoryOg(props) {
  return articleOgFrame({
    category: props.category || 'Framework',
    title: props.title || props.category || 'Prompt Anatomy',
    subtitle: props.subtitle || '',
  });
}
