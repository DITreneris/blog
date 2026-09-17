import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const ROWS = [
  {
    need: 'Shared vendor reads',
    mcp: 'Default',
    custom: 'N hosts x N SDKs',
    hybrid: 'MCP SaaS; keep core APIs',
  },
  {
    need: 'Tenant / dual-control writes',
    mcp: 'Easy to miss',
    custom: 'Gateway injects tenant',
    hybrid: 'Custom writes; MCP reads',
  },
  {
    need: 'Hot path',
    mcp: 'Schema + token cost',
    custom: 'Thin RPC',
    hybrid: 'Custom RPC; JIT MCP',
  },
];

const OG_ROWS = [
  {
    need: 'Vendor reads',
    mcp: 'Default',
    custom: 'NxN SDKs',
    hybrid: 'MCP SaaS; keep APIs',
  },
  {
    need: 'Tenant writes',
    mcp: 'Easy to miss',
    custom: 'Gateway tenant',
    hybrid: 'Custom writes; MCP reads',
  },
  {
    need: 'Hot path',
    mcp: 'Token cost',
    custom: 'Thin RPC',
    hybrid: 'Custom RPC; JIT MCP',
  },
];

const HEADERS = ['Need', 'MCP', 'Custom', 'Hybrid'];
const FLEXES = [1.3, 1, 1, 1.35];

const GATES_STRIP = 'Same allowlist, eval, send gates on both';

const USE_FOR =
  'Use for: connector-surface choice · regulated pilots · allowlisted hybrid';

const DEFAULT_SUBTITLE =
  'Hybrid is the regulated default — two surfaces, one policy.';

function cell(text, opts = {}) {
  const { header = false, flex = 1 } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        minWidth: 0,
        padding: '10px 12px',
        color: header
          ? brand.colors.brandAccent
          : brand.colors.textOnDark,
        fontSize: px(d.caption),
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

function ogLabeledValue(label, value, flex) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex,
        minWidth: 0,
        paddingRight: '8px',
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
          marginBottom: '2px',
        },
      },
      label
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(od.moduleDesc),
          fontWeight: 500,
          lineHeight: 1.3,
        },
      },
      value
    )
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
        padding: '8px 0',
        borderBottom: last
          ? 'none'
          : `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(od.moduleTitle),
          fontWeight: 700,
          marginBottom: '6px',
        },
      },
      row.need
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        },
      },
      ogLabeledValue('MCP', row.mcp, 0.9),
      ogLabeledValue('Custom', row.custom, 1.1),
      ogLabeledValue('Hybrid', row.hybrid, 1.4)
    )
  );
}

function gatesStrip(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: compact ? '10px' : '12px',
        padding: compact ? '10px 12px' : '10px 14px',
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
        ...ROWS.map((r) =>
          tableRow([r.need, r.mcp, r.custom, r.hybrid])
        ),
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

export function buildMcpConnectorSurface(props) {
  return articleHeroFrame({
    category: props.category || 'AI Agents',
    badgeLabel: 'CONNECTOR SURFACE',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildMcpConnectorSurfaceOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'AI Agents',
    badgeLabel: 'CONNECTOR SURFACE',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
