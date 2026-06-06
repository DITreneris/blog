import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const PRESETS = {
  control: [
    { name: 'RAG', desc: 'Retrieval + verify', color: '#2e9e7e' },
    { name: 'Hallucination guard', desc: 'Grounding checks', color: '#7c5cff' },
    { name: 'Temperature', desc: 'Output variance', color: '#3f6fff' },
    { name: 'Context', desc: 'Scoped inputs', color: '#5b8def' },
    { name: 'Tokens', desc: 'Unit budget', color: '#94a3b8' },
  ],
  scale: [
    { name: 'Memory', desc: 'Short + long lifetimes', color: '#2e9e7e' },
    { name: 'Tools', desc: 'MCP + workflows', color: '#7c5cff' },
    { name: 'Chain-of-thought', desc: 'Structured reasoning', color: '#3f6fff' },
    { name: 'Context engineering', desc: 'Layers + retrieval', color: '#5b8def' },
    { name: 'Chat basics', desc: 'Single-turn prompts', color: '#94a3b8' },
  ],
};

function rungRow(rung) {
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
          backgroundColor: rung.color,
          borderRadius: '4px',
        },
      }),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
        labelText(rung.name),
        labelText(rung.desc, true)
      )
    ),
    { padding: '12px 18px', width: '100%' }
  );
}

export function buildTierLadder(props) {
  const rungs = props.rungs || PRESETS[props.variant] || PRESETS.control;

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
    ...rungs.map((rung) => rungRow(rung))
  );

  return articleHeroFrame({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle: props.subtitle || 'Maturity rungs — control or scale progression.',
    diagram,
  });
}
