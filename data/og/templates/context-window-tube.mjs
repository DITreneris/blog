import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

function tubeDiagram() {
  const zones = [
    { label: 'Safe zone', pct: 55, color: brand.colors.brandAccent },
    { label: 'Limit', pct: 25, color: '#f59e0b' },
    { label: 'Overflow', pct: 20, color: '#ef4444' },
  ];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '640px',
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
          height: '48px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${brand.colors.borderDark}`,
        },
      },
      ...zones.map((z) =>
        h('div', {
          style: {
            display: 'flex',
            width: `${z.pct}%`,
            height: '100%',
            backgroundColor: z.color,
            opacity: 0.85,
          },
        })
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        },
      },
      ...zones.map((z) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
            },
          },
          z.label
        )
      )
    ),
    panelBox(
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.caption),
          },
        },
        'More text ≠ more useful context — structure beats window size.'
      ),
      { padding: '14px 18px', width: '100%' }
    )
  );
}

function gaugeDiagram() {
  const levels = [
    { label: 'Full output', pct: 100, color: brand.colors.brandAccent },
    { label: 'Degraded', pct: 60, color: '#f59e0b' },
    { label: 'Cut-off', pct: 25, color: '#ef4444' },
  ];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '560px',
        gap: '14px',
      },
    },
    ...levels.map((lvl) =>
      panelBox(
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              gap: '14px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                height: '14px',
                backgroundColor: brand.colors.surfaceDarkCard,
                borderRadius: '4px',
                overflow: 'hidden',
              },
            },
            h('div', {
              style: {
                display: 'flex',
                width: `${lvl.pct}%`,
                height: '100%',
                backgroundColor: lvl.color,
              },
            })
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                width: '120px',
                color: brand.colors.textOnDark,
                fontSize: px(d.caption),
                fontWeight: 600,
              },
            },
            lvl.label
          )
        ),
        { padding: '12px 16px', width: '100%' }
      )
    )
  );
}

export function buildContextWindowTube(props) {
  const isGauge = props.variant === 'gauge';
  const diagram = isGauge ? gaugeDiagram() : tubeDiagram();

  return articleHeroFrame({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle:
      props.subtitle ||
      (isGauge
        ? 'Token fuel level — full, degraded, or cut-off output.'
        : 'Context tube — safe, limit, and overflow zones.'),
    diagram,
  });
}
