import { articleOgFrame } from './base.mjs';

export function buildArticleOg(props) {
  return articleOgFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle: props.subtitle || '',
  });
}
