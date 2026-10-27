import { h } from '../jsx.mjs';
import { brand, categoryStyles } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;
const callAccent = categoryStyles['Prompt Systems'].accent;

const TAKEAWAY = 'The prompt does not own the run.';

const CARDS = [
  {
    tone: 'call',
    label: 'Prompt',
    title: 'One call',
    detail: 'Tone and format',
  },
  {
    tone: 'path',
    label: 'Workflow',
    title: 'The path',
    detail: 'Who may send',
  },
];

function statusCard(card, compact) {
  const labelSize = compact ? 22 : 28;
  const titleSize = compact ? 26 : 40;
  const detailSize = compact ? od.moduleDesc : 20;
  const accent = card.tone === 'path' ? brand.colors.brandAccent : callAccent;
  const wash = card.tone === 'path' ? 'rgba(207, 167, 58, 0.12)' : 'rgba(96, 165, 250, 0.12)';

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: compact ? 0 : 1,
        flexBasis: compact ? 'auto' : '0',
        width: compact ? '100%' : 'auto',
        justifyContent: 'center',
        backgroundColor: wash,
        border: `2px solid ${accent}`,
        borderRadius: '12px',
        padding: compact ? '14px 16px' : '28px 24px',
        rowGap: compact ? '4px' : '8px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: accent,
          fontSize: px(labelSize),
          fontWeight: 800,
          letterSpacing: '0.04em',
          lineHeight: 1,
        },
      },
      card.label
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(titleSize),
          fontWeight: 700,
          lineHeight: 1.1,
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
          lineHeight: 1.25,
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
        fontSize: px(compact ? 18 : d.metric - 4),
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
      ...CARDS.map((card) => statusCard(card, compact))
    ),
    takeaway(compact)
  );
}

function heroDiagram() {
  return panelBox(contrast(false), {
    width: '100%',
    padding: '28px 28px',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
    borderTop: `3px solid ${brand.colors.brandAccent}`,
  });
}

function ogDiagram() {
  return ogWorksheetShell(contrast(true));
}

export function buildPromptVsWorkflow(props) {
  return articleHeroFrame({
    category: props.category || 'Prompt Systems',
    badgeLabel: 'CALL VS PATH',
    title: props.title,
    subtitle:
      props.subtitle || 'When quality varies by person, fix the path before a longer prompt.',
    diagram: heroDiagram(),
  });
}

export function buildPromptVsWorkflowOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Prompt Systems',
    badgeLabel: 'CALL VS PATH',
    title: props.title,
    subtitle:
      props.subtitle || 'When quality varies by person, fix the path before a longer prompt.',
    diagram: ogDiagram(),
  });
}
