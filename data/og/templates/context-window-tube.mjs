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

function mythsDiagram() {
  const myths = [
    'Paste the whole drive',
    'Window replaces memory',
    'Fits = understands all',
    'Size fixes workflows',
    'Vendor size = ready',
  ];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '640px',
        gap: '10px',
      },
    },
    ...myths.map((m) =>
      panelBox(
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              gap: '12px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: '#ef4444',
                fontSize: px(d.caption),
                fontWeight: 700,
                width: '24px',
              },
            },
            '✕'
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                textDecoration: 'line-through',
              },
            },
            m
          )
        ),
        { padding: '10px 16px', width: '100%' }
      )
    ),
    panelBox(
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.brandAccent,
            fontSize: px(d.caption),
            fontWeight: 600,
          },
        },
        'Strategy = retrieval + policy + eval — not window size alone.'
      ),
      { padding: '14px 18px', width: '100%' }
    )
  );
}

export function buildContextWindowTube(props) {
  const variant = props.variant || 'tube';
  const diagram =
    variant === 'gauge'
      ? gaugeDiagram()
      : variant === 'myths'
        ? mythsDiagram()
        : tubeDiagram();

  const defaultSubtitle =
    variant === 'gauge'
      ? 'Token fuel level — full, degraded, or cut-off output.'
      : variant === 'myths'
        ? 'Five myths that inflate cost and hallucination risk.'
        : 'Context tube — safe, limit, and overflow zones.';

  return articleHeroFrame({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle: props.subtitle || defaultSubtitle,
    diagram,
  });
}
