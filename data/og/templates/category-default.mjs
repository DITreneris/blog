import { articleHeroFrame, categoryDefaultDiagram } from './base.mjs';

export function buildCategoryDefault(props) {
  const category = props.category || 'Framework';
  return articleHeroFrame({
    category,
    title: props.title,
    subtitle: props.subtitle || 'Structured AI implementation for teams',
    diagram: categoryDefaultDiagram(category),
  });
}
