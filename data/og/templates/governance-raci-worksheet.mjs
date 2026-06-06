import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const EMPTY_ROWS = [
  { role: 'Role / team', code: '—', focus: 'Responsibility (fill in)' },
  { role: 'Role / team', code: '—', focus: 'Responsibility (fill in)' },
  { role: 'Role / team', code: '—', focus: 'Responsibility (fill in)' },
  { role: 'Role / team', code: '—', focus: 'Responsibility (fill in)' },
  { role: 'Role / team', code: '—', focus: 'Responsibility (fill in)' },
];

function raciRow(item) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: '12px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brand.colors.surfaceDarkCard,
            border: `2px dashed ${brand.colors.borderDark}`,
            borderRadius: '6px',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.code),
            fontWeight: 800,
          },
        },
        item.code
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.title),
              fontWeight: 700,
            },
          },
          item.role
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginTop: '4px',
              fontStyle: 'italic',
            },
          },
          item.focus
        )
      )
    ),
    { padding: '12px 16px' }
  );
}

export function buildGovernanceRaciWorksheet(props) {
  const rows = props.rows || EMPTY_ROWS;
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '640px',
        gap: '8px',
      },
    },
    ...rows.map((item) => raciRow(item))
  );

  return articleHeroFrame({
    category: props.category || 'Templates',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Empty RACI grid — copy, assign R/A/C/I codes, and attach to your workflow.',
    diagram,
  });
}
