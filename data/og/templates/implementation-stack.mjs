import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const STACK = [
  { name: 'Governance', desc: 'Who may change what', color: '#2e9e7e' },
  { name: 'Evaluation', desc: 'Pass/fail before scale', color: '#7c5cff' },
  { name: 'Model step', desc: 'Generation with leverage', color: '#3f6fff' },
  { name: 'Context', desc: 'What the model may see', color: '#5b8def' },
  { name: 'Workflow', desc: 'Steps, owners, handoffs', color: '#64748b' },
  { name: 'Outcome', desc: 'Business result + metric', color: '#94a3b8' },
];

function stackRow(layer) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: '16px',
        },
      },
      h('div', {
        style: {
          display: 'flex',
          width: '8px',
          height: '44px',
          backgroundColor: layer.color,
          borderRadius: '4px',
        },
      }),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
        labelText(layer.name),
        labelText(layer.desc, true)
      )
    ),
    { padding: '12px 18px', width: '100%' }
  );
}

export function buildImplementationStack(props) {
  const layers = props.layers || STACK;
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '620px',
        gap: '6px',
      },
    },
    ...layers.map((layer) => stackRow(layer))
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle: props.subtitle || 'Implementation stack — outcome through governance',
    diagram,
  });
}
