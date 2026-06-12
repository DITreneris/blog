import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const SLOTS = [
  { label: 'Weekly', item: 'Eval review + override tags' },
  { label: 'Monthly', item: 'Risk forum + release votes' },
  { label: 'Quarterly', item: 'Portfolio + tool rationalization' },
];

export function buildOperatingCadence(props) {
  const slots = props.slots || SLOTS;
  const diagram = panelBox(
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
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
            marginBottom: '16px',
          },
        },
        props.cadenceTitle || 'Operating cadence — rituals + forum'
      ),
      ...slots.map((slot) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              padding: '12px 0',
              borderBottom: `1px solid ${brand.colors.borderDark}`,
              gap: '16px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.brandAccent,
                fontSize: px(d.caption),
                fontWeight: 700,
                width: '100px',
              },
            },
            slot.label
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
              },
            },
            slot.item
          )
        )
      )
    ),
    { width: '100%', minHeight: '260px' }
  );

  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle: props.subtitle || 'Team rituals and risk forum on one calendar',
    diagram,
  });
}
