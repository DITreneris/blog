import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const SECTIONS = [
  { label: 'Outcome', placeholder: 'One sentence + metric' },
  { label: 'Steps', placeholder: 'Human / model / both' },
  { label: 'Context', placeholder: 'Allowed sources only' },
  { label: 'Gates', placeholder: 'Eval + human send' },
];

export function buildWorkflowCanvas(props) {
  const sections = props.sections || SECTIONS;
  const diagram = panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
            marginBottom: '16px',
          },
        },
        props.canvasTitle || 'Workflow canvas — fill before build'
      ),
      ...sections.map((row) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              padding: '10px 0',
              borderBottom: `1px solid ${brand.colors.borderDark}`,
              gap: '16px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.brandAccent,
                fontSize: px(d.caption),
                fontWeight: 700,
                width: '120px',
              },
            },
            row.label
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                fontStyle: 'italic',
              },
            },
            row.placeholder
          )
        )
      )
    ),
    { width: '100%', minHeight: '280px' }
  );

  return articleHeroFrame({
    category: props.category || 'Templates',
    title: props.title,
    subtitle: props.subtitle || 'Copy-paste canvas — outcome, steps, context, gates',
    diagram,
  });
}
