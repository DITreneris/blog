import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const CLUSTERS = [
  {
    title: 'Context',
    terms: ['Context rot', 'Architecture'],
    cue: 'see context playbooks',
  },
  {
    title: 'Eval',
    terms: ['CLEAR', 'Eval gate'],
    cue: 'see CLEAR + hooks',
  },
  {
    title: 'Agents',
    terms: ['Handoff', 'MCP'],
    cue: 'see agent playbooks',
  },
  {
    title: 'Governance',
    terms: ['RACI', 'Audit trail'],
    cue: 'see ownership guides',
  },
];

const USE_FOR =
  'Use for: design reviews / steering vocabulary / GEO citations';

const DEFAULT_SUBTITLE = 'Shared terms that route to canonical playbooks.';

function clusterCard(cluster) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '150px',
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
          color: brand.colors.brandAccent,
          fontSize: px(d.title),
          fontWeight: 700,
          marginBottom: '10px',
        },
      },
      cluster.title
    ),
    ...cluster.terms.map((term) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.caption),
            marginBottom: '6px',
            fontWeight: 600,
          },
        },
        term
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          marginTop: '6px',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption - 1),
          fontStyle: 'italic',
        },
      },
      cluster.cue
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
        ...CLUSTERS.map(clusterCard)
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

export function buildGlossaryRoutingMap(props) {
  return articleHeroFrame({
    category: props.category || 'Framework',
    badgeLabel: 'GLOSSARY MAP',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: diagram(),
  });
}
