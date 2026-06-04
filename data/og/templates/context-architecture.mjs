import { h } from '../jsx.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const LAYERS = [
  { name: 'Policy', desc: 'Compliance & red lines', color: '#cfa73a' },
  { name: 'Task', desc: 'Goal & output contract', color: '#7c5cff' },
  { name: 'Operational', desc: 'CRM, tickets, docs', color: '#3f6fff' },
  { name: 'Memory', desc: 'Session & org context', color: '#2e9e7e' },
];

export function buildContextArchitecture(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '720px',
        gap: '12px',
      },
    },
    ...LAYERS.map((layer) =>
      panelBox(
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            },
          },
          h('div', {
            style: {
              display: 'flex',
              width: '8px',
              height: '48px',
              backgroundColor: layer.color,
              borderRadius: '4px',
              marginRight: '16px',
            },
          }),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
              },
            },
            labelText(layer.name),
            labelText(layer.desc, true)
          )
        ),
        { padding: '16px 20px' }
      )
    )
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle: props.subtitle || 'Task, policy, operational, and memory layers',
    diagram,
  });
}
