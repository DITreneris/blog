import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const PRESETS = {
  hallucination: {
    leftTitle: 'Grounded',
    rightTitle: 'Ungrounded',
    leftItems: ['Scoped context', 'Approved retrieval', 'Verify before send'],
    rightItems: ['No source anchor', 'Plausible guessing', 'High confidence errors'],
    leftAccent: brand.colors.brandAccent,
    rightAccent: '#f59e0b',
  },
  chaos: {
    leftTitle: 'Chaos',
    rightTitle: 'Control',
    leftItems: ['Vague chat prompts', 'No role or context', 'Failed outputs'],
    rightItems: ['Role + context', 'RACE / TAG structure', 'Eval-linked releases'],
    leftAccent: '#f59e0b',
    rightAccent: brand.colors.brandAccent,
  },
};

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

export function buildSplitCompare(props) {
  const preset = PRESETS[props.variant] || PRESETS.hallucination;
  const leftTitle = props.leftTitle || preset.leftTitle;
  const rightTitle = props.rightTitle || preset.rightTitle;
  const leftItems = props.leftItems || preset.leftItems;
  const rightItems = props.rightItems || preset.rightItems;
  const leftAccent = props.leftAccent || preset.leftAccent;
  const rightAccent = props.rightAccent || preset.rightAccent;

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
    column(leftTitle, leftItems, leftAccent),
    column(rightTitle, rightItems, rightAccent)
  );

  return articleHeroFrame({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle: props.subtitle || 'Two-panel contrast — structure vs failure mode.',
    diagram,
  });
}
