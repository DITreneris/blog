import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const DIMENSIONS = [
  { name: 'Cost', desc: '$/1k runs', color: '#3f6fff' },
  { name: 'Latency', desc: 'p95 ms', color: '#7c5cff' },
  { name: 'Efficacy', desc: 'Pass rate', color: '#2e9e7e' },
  { name: 'Assurance', desc: 'Policy hits', color: '#cfa73a' },
  { name: 'Reliability', desc: 'Uptime', color: '#e07a5f' },
];

function scoreTile(item) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '118px',
        },
      },
      h('div', {
        style: {
          display: 'flex',
          width: '12px',
          height: '48px',
          backgroundColor: item.color,
          borderRadius: '4px',
          marginBottom: '12px',
        },
      }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
            textAlign: 'center',
          },
        },
        item.name
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '8px',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.caption),
            textAlign: 'center',
          },
        },
        item.desc
      )
    ),
    { padding: '16px 12px' }
  );
}

export function buildClearScorecard(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        maxWidth: '720px',
      },
    },
    ...DIMENSIONS.map((item) => scoreTile(item))
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'CLEAR scorecard — cost, latency, efficacy, assurance, reliability at workflow level.',
    diagram,
  });
}
