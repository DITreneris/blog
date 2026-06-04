import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const GATES = [
  { name: 'Smoke', desc: '10-case sanity', color: '#3f6fff' },
  { name: 'Pilot', desc: 'Held-out set', color: '#7c5cff' },
  { name: 'Scale', desc: 'Regression + owners', color: '#2e9e7e' },
];

function gateColumn(gate) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '160px',
        },
      },
      h('div', {
        style: {
          display: 'flex',
          width: '12px',
          height: '48px',
          backgroundColor: gate.color,
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
          },
        },
        gate.name
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
        gate.desc
      )
    ),
    { padding: '20px 16px' }
  );
}

function arrow() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        color: brand.colors.brandAccent,
        fontSize: px(d.arrow),
        fontWeight: 700,
        margin: '0 6px',
      },
    },
    '→'
  );
}

export function buildGovernanceEvalGates(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    gateColumn(GATES[0]),
    arrow(),
    gateColumn(GATES[1]),
    arrow(),
    gateColumn(GATES[2])
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Smoke, pilot, and scale checkpoints before workflow changes reach production.',
    diagram,
  });
}
