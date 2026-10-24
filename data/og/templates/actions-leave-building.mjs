import { h } from '../jsx.mjs';
import { brand, categoryStyles } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const inside = categoryStyles['AI Agents'].accent;
const person = brand.colors.brandAccent;

const ROWS = [
  { action: 'Draft the reply', where: 'Inside', approval: 'No', tone: 'inside' },
  { action: 'Tag the case', where: 'Inside', approval: 'No', tone: 'inside' },
  { action: 'Send the email', where: 'Outside', approval: 'Yes', tone: 'person' },
  { action: 'Post the credit', where: 'Record', approval: 'Yes', tone: 'person' },
];

const USE_FOR = 'Use for: one workflow that can already draft';

const DEFAULT_SUBTITLE = 'For this workflow, a send and a credit need approval.';

function cell(text, opts = {}) {
  const { header = false, compact = false, flex = 1, color } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        alignItems: 'center',
        padding: compact ? '8px 8px' : '12px 12px',
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

function whoColor(tone) {
  if (tone === 'inside') return inside;
  if (tone === 'person') return person;
  return null;
}

function tableRow(cols, opts = {}) {
  const { header = false, compact = false, markTone } = opts;
  const flexes = [1.85, 0.7, 1.05];
  const colors = [null, null, whoColor(markTone)];
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
    tableRow(['Action', 'Where it lands', 'Approval required?'], { header: true, compact }),
    ...ROWS.map((r) =>
      tableRow([r.action, r.where, r.approval], { compact, markTone: r.tone })
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

export function buildActionsLeaveBuilding(props) {
  return articleHeroFrame({
    category: props.category || 'AI Governance',
    badgeLabel: 'APPROVAL BOUNDARY',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildActionsLeaveBuildingOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'AI Governance',
    badgeLabel: 'APPROVAL BOUNDARY',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
