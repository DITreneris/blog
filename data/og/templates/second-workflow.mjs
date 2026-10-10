import { h } from '../jsx.mjs';
import { brand, categoryStyles } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

/** Topic tokens already in brand.mjs — mint pass, coral fail. Not the gold accent. */
const PASS = categoryStyles['AI Agents'].accent;
const FAIL = categoryStyles.Opinion.accent;

const TAKEAWAY = 'A rule can pass while the job fails.';

function markIcon(kind, accent, compact) {
  const size = compact ? 22 : 36;
  const box = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    style: { flexShrink: 0 },
  };
  if (kind === 'pass') {
    return h(
      'svg',
      box,
      h('path', {
        d: 'M5 12.5l5 5L19 7',
        fill: 'none',
        stroke: accent,
        strokeWidth: 2.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      })
    );
  }
  return h(
    'svg',
    box,
    h('path', {
      d: 'M6 6l12 12M18 6L6 18',
      fill: 'none',
      stroke: accent,
      strokeWidth: 2.5,
      strokeLinecap: 'round',
    })
  );
}

function statusCard(card, compact) {
  const statusSize = compact ? 22 : 36;
  const titleSize = compact ? od.moduleTitle : 22;
  const detailSize = compact ? od.moduleDesc : 18;
  const accent = card.kind === 'pass' ? PASS : FAIL;
  const wash = card.kind === 'pass' ? 'rgba(52, 211, 153, 0.14)' : 'rgba(251, 146, 60, 0.16)';

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: compact ? 0 : 1,
        flexBasis: compact ? 'auto' : '0',
        justifyContent: 'center',
        backgroundColor: wash,
        border: `2px solid ${accent}`,
        borderRadius: '12px',
        padding: compact ? '16px 16px' : '36px 28px',
        rowGap: compact ? '6px' : '12px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: compact ? '8px' : '12px',
        },
      },
      markIcon(card.kind, accent, compact),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: accent,
            fontSize: px(statusSize),
            fontWeight: 800,
            letterSpacing: '0.04em',
            lineHeight: 1,
          },
        },
        card.status
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(titleSize),
          fontWeight: 700,
          lineHeight: 1.2,
        },
      },
      card.title
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(detailSize),
          fontWeight: 500,
          lineHeight: 1.3,
        },
      },
      card.detail
    )
  );
}

function takeaway(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: compact ? '10px' : '16px',
        paddingTop: compact ? '10px' : '14px',
        borderTop: `1px solid ${brand.colors.borderDark}`,
        color: brand.colors.textOnDark,
        fontSize: px(compact ? od.moduleTitle : d.metric - 4),
        fontWeight: 700,
        lineHeight: 1.25,
      },
    },
    TAKEAWAY
  );
}

function contrast(compact) {
  return h(
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
          flexDirection: compact ? 'column' : 'row',
          width: '100%',
          columnGap: '16px',
          rowGap: compact ? '10px' : '0px',
        },
      },
      statusCard(
        {
          kind: 'pass',
          status: 'PASS',
          title: 'Wording',
          detail: 'Copied language rule',
        },
        compact
      ),
      statusCard(
        {
          kind: 'fail',
          status: 'FAIL',
          title: 'Credit validation',
          detail: 'Amount, customer, basis',
        },
        compact
      )
    ),
    takeaway(compact)
  );
}

function heroDiagram() {
  return panelBox(contrast(false), {
    width: '100%',
    padding: '32px 28px',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
    borderTop: `3px solid ${brand.colors.brandAccent}`,
  });
}

function ogDiagram() {
  return ogWorksheetShell(contrast(true));
}

export function buildSecondWorkflow(props) {
  return articleHeroFrame({
    category: props.category || 'Case Studies',
    badgeLabel: 'CREDIT CHECK',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || 'A language check passed. The credit was still wrong.',
    diagram: heroDiagram(),
  });
}

export function buildSecondWorkflowOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Case Studies',
    badgeLabel: 'CREDIT CHECK',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || 'A language check passed. The credit was still wrong.',
    diagram: ogDiagram(),
  });
}
