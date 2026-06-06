import { h } from '../jsx.mjs';
import { brand, getCategoryStyle } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const TERMS = [
  { term: 'MCP', gloss: 'Tool protocol layer' },
  { term: 'RAG tiers', gloss: 'Basic / smart / agentic' },
  { term: 'Context rot', gloss: 'Signal vs window size' },
  { term: 'CLEAR', gloss: 'Agent scorecard' },
  { term: 'Prompt registry', gloss: 'Version + owners' },
  { term: 'Eval gates', gloss: 'Smoke / pilot / scale' },
];

function termChip(item, accent) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '180px',
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
            marginBottom: '6px',
          },
        },
        item.term
      ),
      labelText(item.gloss, true)
    ),
    { padding: '16px 18px' }
  );
}

export function buildGlossaryTerms(props) {
  const style = getCategoryStyle(props.category || 'Framework');

  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '580px',
        gap: '12px',
        justifyContent: 'center',
      },
    },
    ...TERMS.map((item) => termChip(item, style.accent))
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Shared definitions for MCP, RAG tiers, context rot, CLEAR, and registry terms.',
    diagram,
  });
}
