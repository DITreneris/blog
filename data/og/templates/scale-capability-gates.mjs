import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

/** Bottom foundation → top agent (article promotion order). */
const GATES = [
  { name: 'Context engineering', criterion: 'Pack owner + smoke eval' },
  { name: 'CoT (when needed)', criterion: 'Held-out with/without lift' },
  { name: 'Tools', criterion: 'Allow list + human send gate' },
  { name: 'Memory', criterion: 'TTL + access controls' },
  { name: 'Agents', criterion: '30-day eval + audit fields' },
];

const USE_FOR =
  'Use for: pilot-to-prod gates / exec demos that need evidence';

const DEFAULT_SUBTITLE =
  'Five capabilities — each needs promotion evidence before production.';

function gateRow(gate, index, compact) {
  const titleSize = compact ? od.moduleTitle : d.title;
  const captionSize = compact ? od.moduleDesc : d.caption;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: compact ? '6px' : '8px',
        padding: compact ? '8px 10px' : '10px 14px',
        backgroundColor: brand.colors.surfaceDarkCard,
        border: `1px solid ${brand.colors.borderDark}`,
        borderLeft: `4px solid ${brand.colors.brandAccent}`,
        borderRadius: '8px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: compact ? '22px' : '28px',
          height: compact ? '22px' : '28px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: brand.colors.brandAccent,
          borderRadius: '6px',
          color: brand.colors.brandDark,
          fontSize: px(compact ? od.label : d.caption),
          fontWeight: 800,
          flexShrink: 0,
          marginRight: compact ? '8px' : '12px',
        },
      },
      String(index + 1)
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(titleSize),
            fontWeight: 700,
            marginBottom: '2px',
          },
        },
        gate.name
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(captionSize),
          },
        },
        gate.criterion
      )
    )
  );
}

function worksheet(compact) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: compact ? '520px' : '780px',
        },
      },
      ...GATES.map((g, i) => gateRow(g, i, compact)),
      compact
        ? null
        : h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: `1px solid ${brand.colors.borderDark}`,
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption - 1),
              },
            },
            USE_FOR
          )
    ),
    compact
      ? { padding: '12px 14px' }
      : {
          padding: '22px 26px',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(251, 191, 36, 0.35)',
          borderTop: `3px solid ${brand.colors.brandAccent}`,
        }
  );
}

export function buildScaleCapabilityGates(props) {
  return articleHeroFrame({
    category: props.category || 'Opinion',
    badgeLabel: 'SCALE GATES',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildScaleCapabilityGatesOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
