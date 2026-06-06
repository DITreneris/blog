import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const TIERS = [
  { name: 'System memory', desc: 'Policy + tool config', lifetime: 'Persistent', color: '#2e9e7e' },
  { name: 'Long memory', desc: 'Profile + preferences', lifetime: 'Cross-session', color: '#7c5cff' },
  { name: 'Short memory', desc: 'Thread + turn context', lifetime: 'Session', color: '#3f6fff' },
];

function tierCard(tier) {
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
          height: '52px',
          backgroundColor: tier.color,
          borderRadius: '4px',
        },
      }),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
        labelText(tier.name),
        labelText(tier.desc, true)
      ),
      h(
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
            fontWeight: 600,
          },
        },
        tier.lifetime
      )
    ),
    { padding: '14px 18px', width: '100%' }
  );
}

export function buildMemoryTiers(props) {
  const tiers = props.tiers || TIERS;
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '680px',
        gap: '8px',
      },
    },
    ...tiers.map((tier) => tierCard(tier))
  );

  return articleHeroFrame({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle: props.subtitle || 'Short, long, and system memory — different lifetimes.',
    diagram,
  });
}
