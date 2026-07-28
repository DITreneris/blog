import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const ROWS = [
  {
    trigger: 'Low confidence',
    stops: 'Draft only',
    action: 'Review all fields',
    sla: '4h business',
  },
  {
    trigger: 'Policy keyword',
    stops: 'No send',
    action: 'Legal review',
    sla: '1 business day',
  },
  {
    trigger: 'Eval failure',
    stops: 'Block release',
    action: 'Owner + IT',
    sla: 'Immediate',
  },
];

const HEADERS = ['Trigger', 'AI stops', 'Human action', 'SLA'];

const LOG_STRIP = 'Log: handoff_trigger / assigned_role / resolved_at';

const USE_FOR =
  'Use for: support send gates / tender Legal review / VIP approval';

const DEFAULT_SUBTITLE =
  'Triggers, owners, and SLAs — not vague human-in-the-loop.';

function cell(text, opts = {}) {
  const { header = false, compact = false, flex = 1 } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        padding: compact ? '6px 8px' : '10px 12px',
        color: header
          ? brand.colors.brandAccent
          : brand.colors.textOnDark,
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontWeight: header ? 700 : 500,
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
  const { header = false, compact = false } = opts;
  const flexes = [1.2, 1, 1.2, 1];
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
      cell(c, { header, compact, flex: flexes[i] })
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
      tableRow(HEADERS, { header: true, compact }),
      ...ROWS.map((r) =>
        tableRow([r.trigger, r.stops, r.action, r.sla], { compact })
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: compact ? '8px' : '12px',
            padding: compact ? '8px 10px' : '10px 14px',
            backgroundColor: 'rgba(207, 167, 58, 0.1)',
            border: '1px solid rgba(207, 167, 58, 0.25)',
            borderRadius: '8px',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(compact ? od.moduleDesc : d.caption),
            fontStyle: 'italic',
          },
        },
        LOG_STRIP
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

export function buildHandoffTriggerTable(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'HANDOFF RULES',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildHandoffTriggerTableOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
