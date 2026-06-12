import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const COLUMNS = ['Workflow', 'C', 'L', 'E', 'A', 'R', 'Decision'];

const ROWS = [
  {
    workflow: 'Support triage',
    c: '0.83€',
    l: 'p95 11.2s',
    e: '91%',
    a: '98%',
    r: '0.7/1k',
    decision: 'Scale pilot',
    highlight: true,
  },
  {
    workflow: 'Outreach draft',
    c: '0.42€',
    l: 'p95 6.1s',
    e: '87%',
    a: '92%',
    r: '1.8/1k',
    decision: 'Hold',
    muted: true,
  },
];

const LEGEND = 'C Cost · L Latency · E Efficacy · A Assurance · R Reliability';
const FOOTER = 'Weekly 30-min review · promote · hold · rollback · narrow scope';

function tableHeader() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '8px 0',
        borderBottom: `2px solid ${brand.colors.brandAccent}`,
        gap: '4px',
      },
    },
    ...COLUMNS.map((col, idx) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: idx === 0 ? 2.2 : idx === 6 ? 1.4 : 0.9,
            color: brand.colors.brandAccent,
            fontSize: px(d.caption - 2),
            fontWeight: 700,
            letterSpacing: '0.02em',
          },
        },
        col
      )
    )
  );
}

function scoreRow(row) {
  const cells = [
    row.workflow,
    row.c,
    row.l,
    row.e,
    row.a,
    row.r,
    row.decision,
  ];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '8px 0',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
        gap: '4px',
        alignItems: 'center',
        opacity: row.muted ? 0.75 : 1,
      },
    },
    ...cells.map((cell, idx) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: idx === 0 ? 2.2 : idx === 6 ? 1.4 : 0.9,
            color:
              idx === 6 && row.highlight
                ? brand.colors.brandAccent
                : idx === 0
                  ? brand.colors.textOnDarkMuted
                  : brand.colors.textOnDark,
            fontSize: px(d.caption - (idx === 0 ? 0 : 1)),
            fontWeight: idx === 6 ? 700 : idx === 0 ? 500 : 600,
          },
        },
        cell
      )
    )
  );
}

function clearDiagram() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    h('div', {
      style: {
        display: 'flex',
        position: 'absolute',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(251, 191, 36, 0.14) 0%, rgba(11, 19, 32, 0) 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    }),
    panelBox(
      h(
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
              color: brand.colors.textOnDark,
              fontSize: px(d.title + 2),
              fontWeight: 700,
              marginBottom: '4px',
            },
          },
          'CLEAR Agent Scorecard'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginBottom: '14px',
            },
          },
          'One row per workflow · updated weekly'
        ),
        tableHeader(),
        ...ROWS.map((row) => scoreRow(row)),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '10px',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption - 2),
              letterSpacing: '0.01em',
            },
          },
          LEGEND
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
              letterSpacing: '0.01em',
            },
          },
          FOOTER
        )
      ),
      {
        padding: '22px 26px',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(251, 191, 36, 0.35)',
        borderTop: `3px solid ${brand.colors.brandAccent}`,
      }
    )
  );
}

export function buildClearScorecardWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'Framework',
    badgeLabel: 'CLEAR SCORECARD',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Five dimensions, one decision row — not a single vanity metric.',
    diagram: clearDiagram(),
  });
}
