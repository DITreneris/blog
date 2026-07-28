import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const LAYERS = [
  { n: '1', title: 'Scope', detail: 'What the model may see' },
  { n: '2', title: 'Retrieve', detail: 'Approved evidence path' },
  { n: '3', title: 'Verify', detail: 'Gate before external send' },
  { n: '4', title: 'Log', detail: 'Versions + decisions' },
];

const MATURITY = 'Scope-only > RAG-only > Verify-only > Full stack';

const USE_FOR = 'Use for: hallucination reviews / RAG pilots / release gates';

const DEFAULT_SUBTITLE =
  'Scope, retrieve, verify, log — one evidence path before send.';

function layerCard(layer) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '140px',
        padding: '14px 16px',
        backgroundColor: brand.colors.surfaceDarkCard,
        border: `1px solid ${brand.colors.borderDark}`,
        borderTop: `3px solid ${brand.colors.brandAccent}`,
        borderRadius: '10px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '8px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '26px',
            height: '26px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brand.colors.brandAccent,
            borderRadius: '6px',
            color: brand.colors.brandDark,
            fontSize: px(d.caption),
            fontWeight: 800,
            marginRight: '10px',
            flexShrink: 0,
          },
        },
        layer.n
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
          },
        },
        layer.title
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
          lineHeight: 1.35,
        },
      },
      layer.detail
    )
  );
}

function diagram() {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '780px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '12px',
            flexWrap: 'wrap',
          },
        },
        ...LAYERS.map(layerCard)
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '14px',
            padding: '10px 14px',
            backgroundColor: 'rgba(207, 167, 58, 0.1)',
            border: '1px solid rgba(207, 167, 58, 0.25)',
            borderRadius: '8px',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.caption),
            fontStyle: 'italic',
          },
        },
        MATURITY
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: `1px solid ${brand.colors.borderDark}`,
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.caption - 1),
          },
        },
        USE_FOR
      )
    ),
    {
      padding: '22px 26px',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
      border: '1px solid rgba(251, 191, 36, 0.35)',
      borderTop: `3px solid ${brand.colors.brandAccent}`,
    }
  );
}

export function buildGroundingSystemWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'Framework',
    badgeLabel: 'GROUNDING SYSTEM',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: diagram(),
  });
}
