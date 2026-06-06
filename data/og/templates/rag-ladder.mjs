import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const TIERS = [
  {
    name: 'Agentic',
    desc: 'Plan + tools + verify',
    color: '#2e9e7e',
  },
  {
    name: 'Smart',
    desc: 'Refine + rerank',
    color: '#7c5cff',
  },
  {
    name: 'Basic',
    desc: 'Query → retrieve → answer',
    color: '#3f6fff',
  },
];

function evalPill() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        padding: '6px 12px',
        backgroundColor: brand.colors.badgeAccentBg,
        border: `1px solid ${brand.colors.brandAccent}`,
        borderRadius: '9999px',
        color: brand.colors.brandAccent,
        fontSize: px(d.caption),
        fontWeight: 700,
        whiteSpace: 'nowrap',
      },
    },
    'Eval gate'
  );
}

function tierRow(tier) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '16px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          },
        },
        h('div', {
          style: {
            display: 'flex',
            width: '8px',
            height: '48px',
            backgroundColor: tier.color,
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
          labelText(tier.name),
          labelText(tier.desc, true)
        )
      ),
      evalPill()
    ),
    { padding: '16px 20px', width: '100%' }
  );
}

function chevron() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'center',
        color: brand.colors.brandAccent,
        fontSize: px(d.arrow),
        fontWeight: 700,
        margin: '4px 0',
      },
    },
    '↓'
  );
}

export function buildRagLadder(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '640px',
        gap: '4px',
      },
    },
    tierRow(TIERS[0]),
    chevron(),
    tierRow(TIERS[1]),
    chevron(),
    tierRow(TIERS[2])
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Basic lookup, smart refine, and agentic act — eval gates at each tier.',
    diagram,
  });
}
