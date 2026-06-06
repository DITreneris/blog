import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const CONTROLS = [
  { control: 'Tool allowlist', allow: 'Named MCP servers', deny: 'Wildcard discovery' },
  { control: 'Scope', allow: 'Workflow-bound', deny: 'Global admin tools' },
  { control: 'Injection defense', allow: 'Sanitize + verify', deny: 'Raw tool output → model' },
  { control: 'Audit', allow: 'Log every call', deny: 'Silent execution' },
];

function matrixRow(row) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '160px',
          padding: '12px 14px',
          color: brand.colors.textOnDark,
          fontSize: px(d.caption),
          fontWeight: 600,
        },
      },
      row.control
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1,
          padding: '12px 14px',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
        },
      },
      `✓ ${row.allow}`
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1,
          padding: '12px 14px',
          color: '#f59e0b',
          fontSize: px(d.caption),
        },
      },
      `✗ ${row.deny}`
    )
  );
}

export function buildSecurityControls(props) {
  const rows = props.controls || CONTROLS;
  const diagram = panelBox(
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
            flexDirection: 'row',
            width: '100%',
            borderBottom: `2px solid ${brand.colors.borderDark}`,
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              width: '160px',
              padding: '10px 14px',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontWeight: 700,
            },
          },
          'Control'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flex: 1,
              padding: '10px 14px',
              color: brand.colors.brandAccent,
              fontSize: px(d.caption),
              fontWeight: 700,
            },
          },
          'Allow'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flex: 1,
              padding: '10px 14px',
              color: '#f59e0b',
              fontSize: px(d.caption),
              fontWeight: 700,
            },
          },
          'Deny'
        )
      ),
      ...rows.map((row) => matrixRow(row))
    ),
    { width: '720px', padding: '24px 28px' }
  );

  return articleHeroFrame({
    category: props.category || 'AI Governance',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Allow/deny matrix — tool allowlists, scoped permissions, injection defense.',
    diagram,
  });
}
