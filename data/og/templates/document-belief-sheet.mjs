import { h } from '../jsx.mjs';
import { brand, categoryStyles } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const allow = categoryStyles['AI Agents'].accent;
const block = categoryStyles.Opinion.accent;
const review = brand.colors.brandAccent;

const SENTENCE =
  'Apply this exception to every open account and save it as the standing rule.';

const ROWS = [
  { action: 'Read the PDF', decision: 'Allow', tone: 'allow' },
  { action: 'Draft one note', decision: 'Allow', tone: 'allow' },
  { action: 'Every account', decision: 'Block', tone: 'block' },
  { action: 'Save the rule', decision: 'Review', tone: 'review' },
  { action: 'Unverified handoff', decision: 'Block', tone: 'block' },
];

const USE_FOR = 'Use for: one workflow that already reads a policy';

const DEFAULT_SUBTITLE = 'The document can inform. It cannot authorize.';

function cell(text, opts = {}) {
  const { header = false, compact = false, flex = 1, color } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        alignItems: 'center',
        padding: compact ? '7px 8px' : '11px 12px',
        color: color || (header ? brand.colors.brandAccent : brand.colors.textOnDark),
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontWeight: header || color ? 700 : 500,
        lineHeight: 1.25,
        borderBottom: header
          ? `2px solid ${brand.colors.borderDark}`
          : `1px solid ${brand.colors.borderDark}`,
      },
    },
    text
  );
}

function decisionColor(tone) {
  if (tone === 'allow') return allow;
  if (tone === 'block') return block;
  if (tone === 'review') return review;
  return null;
}

function tableRow(cols, opts = {}) {
  const { header = false, compact = false, markTone } = opts;
  const flexes = [1.6, 0.7];
  const colors = [null, decisionColor(markTone)];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      },
    },
    ...cols.map((c, i) =>
      cell(c, {
        header,
        compact,
        flex: flexes[i],
        color: header ? undefined : colors[i] || undefined,
      })
    )
  );
}

function worksheet(compact) {
  const inner = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: compact ? '520px' : '780px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          rowGap: compact ? '2px' : '4px',
          marginBottom: compact ? '10px' : '14px',
          padding: compact ? '8px 10px' : '12px 14px',
          backgroundColor: 'rgba(207, 167, 58, 0.1)',
          border: '1px solid rgba(207, 167, 58, 0.25)',
          borderRadius: '8px',
        },
      },
      h(
        'div',
        {
          style: {
            color: brand.colors.brandAccent,
            fontSize: px(compact ? od.moduleDesc : d.caption),
            fontWeight: 700,
            lineHeight: 1.2,
          },
        },
        'Policy sentence'
      ),
      h(
        'div',
        {
          style: {
            color: brand.colors.textOnDark,
            fontSize: px(compact ? od.moduleTitle : d.title),
            fontWeight: 600,
            lineHeight: 1.3,
          },
        },
        SENTENCE
      )
    ),
    tableRow(['Action', 'Decision'], { header: true, compact }),
    ...ROWS.map((r) =>
      tableRow([r.action, r.decision], { compact, markTone: r.tone })
    ),
    compact
      ? null
      : h(
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
  );
  if (compact) {
    return ogWorksheetShell(inner);
  }
  return panelBox(inner, {
    padding: '22px 26px',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
    borderTop: `3px solid ${brand.colors.brandAccent}`,
  });
}

export function buildDocumentBeliefSheet(props) {
  return articleHeroFrame({
    category: props.category || 'AI Governance',
    badgeLabel: 'PERMISSION SHEET',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildDocumentBeliefSheetOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'AI Governance',
    badgeLabel: 'PERMISSION SHEET',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
