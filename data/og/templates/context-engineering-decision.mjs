import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const ROWS = [
  { signal: 'Stale source', move: 'What the model saw' },
  { signal: 'Two live rules', move: 'Which rule applies' },
  { signal: 'Right rule, bad send', move: 'Where the check failed' },
];

const OG_ROWS = [
  { signal: 'Stale source', move: 'What the model saw' },
  { signal: 'Two rules', move: 'Who decides' },
  { signal: 'Bad send', move: 'Check before send' },
];

const HEADERS = ['Signal', 'First check'];
const FLEXES = [1.15, 1.35];

const GATES_STRIP = 'Check the send before you blame the pack.';

const USE_FOR =
  'Use for: regulated workflows · first check · before a new index';

const DEFAULT_SUBTITLE =
  'Check what the model saw before you blame the pack.';

function cell(text, opts = {}) {
  const { header = false, flex = 1 } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        minWidth: 0,
        padding: '12px 14px',
        color: header ? brand.colors.brandAccent : brand.colors.textOnDark,
        fontSize: px(header ? d.caption : d.caption + 1),
        fontWeight: header ? 700 : 600,
        lineHeight: 1.3,
        borderBottom: header
          ? `2px solid ${brand.colors.borderDark}`
          : `1px solid ${brand.colors.borderDark}`,
      },
    },
    text
  );
}

function tableRow(cols, opts = {}) {
  const { header = false } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      },
    },
    ...cols.map((c, i) => cell(c, { header, flex: FLEXES[i] }))
  );
}

function ogJobRow(row, last) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '10px 0',
        borderBottom: last ? 'none' : `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.brandAccent,
          fontSize: px(od.label),
          fontWeight: 700,
          marginBottom: '4px',
        },
      },
      row.signal
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(od.moduleTitle),
          fontWeight: 700,
          lineHeight: 1.3,
        },
      },
      row.move
    )
  );
}

function gatesStrip(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: compact ? '10px' : '14px',
        padding: compact ? '10px 12px' : '12px 14px',
        backgroundColor: 'rgba(207, 167, 58, 0.1)',
        border: '1px solid rgba(207, 167, 58, 0.25)',
        borderRadius: '8px',
        color: brand.colors.textOnDarkMuted,
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontStyle: 'italic',
      },
    },
    GATES_STRIP
  );
}

function worksheet(compact) {
  const inner = compact
    ? [
        ...OG_ROWS.map((r, i) => ogJobRow(r, i === OG_ROWS.length - 1)),
        gatesStrip(true),
      ]
    : [
        tableRow(HEADERS, { header: true }),
        ...ROWS.map((r) => tableRow([r.signal, r.move])),
        gatesStrip(false),
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
        ),
      ];

  const body = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: compact ? '520px' : '780px',
      },
    },
    ...inner
  );
  if (compact) {
    return ogWorksheetShell(body);
  }
  return panelBox(body, {
    padding: '22px 26px',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
    borderTop: `3px solid ${brand.colors.brandAccent}`,
  });
}

export function buildContextEngineeringDecision(props) {
  return articleHeroFrame({
    category: props.category || 'Framework',
    badgeLabel: 'CONTEXT DECISION',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildContextEngineeringDecisionOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Framework',
    badgeLabel: 'CONTEXT DECISION',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
