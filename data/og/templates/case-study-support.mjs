import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

export function buildCaseStudySupport(props) {
  const column = (title, items, accent) =>
    panelBox(
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
      { flex: 1, minHeight: '280px' }
    );

  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '780px',
        gap: '16px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '16px',
        },
      },
      column(
        'Before',
        ['Scattered copilots', 'No eval set', 'CSAT flat', '8/10 vibe signs'],
        '#f59e0b'
      ),
      column(
        'After (12 wk)',
        ['One owned workflow', '25-case eval set', '+6–9 CSAT pts', '~18% handle time ↓'],
        brand.colors.brandAccent
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 24px',
          backgroundColor: brand.colors.badgeAccentBg,
          border: `1px solid ${brand.colors.brandAccent}`,
          borderRadius: '8px',
          color: brand.colors.brandAccent,
          fontSize: px(d.title),
          fontWeight: 700,
        },
      },
      'support-reply-v3'
    )
  );

  return articleHeroFrame({
    category: props.category || 'Case Studies',
    title: props.title,
    subtitle: props.subtitle || 'Northline B2B — structured support pilot',
    diagram,
  });
}
