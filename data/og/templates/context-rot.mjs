import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

export function buildContextRot(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '720px',
        gap: '20px',
      },
    },
    panelBox(
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '12px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontWeight: 600,
            },
          },
          'Context window size →'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              width: '100%',
              height: '80px',
              gap: '8px',
            },
          },
          ...[30, 45, 60, 75, 90, 100].map((hgt, i) =>
            h('div', {
              style: {
                display: 'flex',
                flex: 1,
                height: `${hgt}%`,
                backgroundColor: brand.colors.brandAccent,
                opacity: 0.35 + i * 0.1,
                borderRadius: '4px 4px 0 0',
              },
            })
          )
        )
      ),
      { padding: '20px 24px', width: '100%' }
    ),
    panelBox(
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '12px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontWeight: 600,
            },
          },
          'Signal quality →'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              width: '100%',
              height: '80px',
              gap: '8px',
            },
          },
          ...[100, 85, 70, 55, 40, 28].map((hgt, i) =>
            h('div', {
              style: {
                display: 'flex',
                flex: 1,
                height: `${hgt}%`,
                backgroundColor: '#f59e0b',
                opacity: 0.9 - i * 0.08,
                borderRadius: '4px 4px 0 0',
              },
            })
          )
        )
      ),
      { padding: '20px 24px', width: '100%' }
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
        },
      },
      'Long windows, weak signal — structure beats raw token count'
    )
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'When context grows faster than structure, agent decisions degrade.',
    diagram,
  });
}
