import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

function column(title, items, accent) {
  return panelBox(
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
            color: accent,
            fontSize: px(d.title),
            fontWeight: 700,
            marginBottom: '16px',
          },
        },
        title
      ),
      ...items.map((item) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginBottom: '10px',
            },
          },
          `• ${item}`
        )
      )
    ),
    { flex: 1, minHeight: '260px' }
  );
}

export function buildFrameworkChooser(props) {
  const leftTitle = props.leftTitle || 'RACE';
  const rightTitle = props.rightTitle || 'TAG';
  const leftItems = props.leftItems || [
    'Role + action + context',
    'Policy-bearing outputs',
    'Multi-step with handoffs',
    'Strict review criteria',
  ];
  const rightItems = props.rightItems || [
    'Task + audience + goal',
    'Communication drafts',
    'Tone and reader fit',
    'Lighter procedural control',
  ];

  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '780px',
        gap: '16px',
      },
    },
    column(leftTitle, leftItems, brand.colors.brandAccent),
    column(rightTitle, rightItems, '#5b8def')
  );

  return articleHeroFrame({
    category: props.category || 'Prompt Systems',
    title: props.title,
    subtitle: props.subtitle || 'Choose by task shape and risk — then standardize in registry',
    diagram,
  });
}
