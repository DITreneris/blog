import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const ROWS = [
  {
    path: 'Case note',
    stays: 'Note text',
    acts: 'Write on another case',
  },
  {
    path: 'Search or URL',
    stays: 'A lookup',
    acts: 'Data sent outside',
  },
  {
    path: 'Saved note',
    stays: 'A draft',
    acts: 'Save as policy',
  },
  {
    path: 'Handoff',
    stays: 'A next step',
    acts: 'Inherited approval',
  },
];

const HEADERS = ['Check', 'Model may propose', 'Server must reject'];

const OPEN_STRIP = 'A model refusal is not the control. Test the bad proposal.';

const USE_FOR =
  'Use for: support agents with retrieval / email copilots / MCP workflows';

const DEFAULT_SUBTITLE = 'Untrusted content must not expand the agent’s authority.';

function cell(text, opts = {}) {
  const { header = false, flex = 1, emphasis = false } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        padding: '10px 12px',
        color: header ? brand.colors.brandAccent : brand.colors.textOnDark,
        fontSize: px(d.caption),
        fontWeight: header || emphasis ? 700 : 500,
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
  const flexes = [1.05, 1.35, 1.45];
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
      cell(c, { header, flex: flexes[i], emphasis: !header && i === 2 })
    )
  );
}

function stackedRow(row) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        rowGap: '2px',
        padding: '6px 0',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          color: brand.colors.brandAccent,
          fontSize: px(od.moduleDesc),
          fontWeight: 700,
          lineHeight: 1.25,
        },
      },
      row.path
    ),
    h(
      'div',
      {
        style: {
          color: brand.colors.textOnDark,
          fontSize: px(od.moduleDesc),
          fontWeight: 500,
          lineHeight: 1.3,
        },
      },
      `May propose: ${row.stays}`
    ),
    h(
      'div',
      {
        style: {
          color: brand.colors.textOnDark,
          fontSize: px(od.moduleDesc),
          fontWeight: 700,
          lineHeight: 1.3,
        },
      },
      `Must reject: ${row.acts}`
    )
  );
}

function heroWorksheet() {
  const inner = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '780px',
      },
    },
    tableRow(HEADERS, { header: true }),
    ...ROWS.map((r) => tableRow([r.path, r.stays, r.acts])),
    h(
      'div',
      {
        style: {
          display: 'flex',
          marginTop: '12px',
          padding: '10px 14px',
          backgroundColor: 'rgba(207, 167, 58, 0.1)',
          border: '1px solid rgba(207, 167, 58, 0.25)',
          borderRadius: '8px',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
          fontStyle: 'italic',
        },
      },
      OPEN_STRIP
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
  );
  return panelBox(inner, {
    padding: '22px 26px',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
    borderTop: `3px solid ${brand.colors.brandAccent}`,
  });
}

function ogWorksheet() {
  const inner = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '520px',
      },
    },
    ...ROWS.map((r) => stackedRow(r)),
    h(
      'div',
      {
        style: {
          display: 'flex',
          marginTop: '8px',
          padding: '8px 10px',
          backgroundColor: 'rgba(207, 167, 58, 0.1)',
          border: '1px solid rgba(207, 167, 58, 0.25)',
          borderRadius: '8px',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(od.moduleDesc),
          fontStyle: 'italic',
        },
      },
      OPEN_STRIP
    )
  );
  return ogWorksheetShell(inner);
}

export function buildInjectionActionPaths(props) {
  return articleHeroFrame({
    category: props.category || 'AI Governance',
    badgeLabel: 'ACTION PATH',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: heroWorksheet(),
  });
}

export function buildInjectionActionPathsOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'AI Governance',
    badgeLabel: 'ACTION PATH',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: ogWorksheet(),
  });
}
