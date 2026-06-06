import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

function node(label, sub) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '150px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
            textAlign: 'center',
          },
        },
        label
      ),
      sub
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '8px',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                textAlign: 'center',
              },
            },
            sub
          )
        : null
    ),
    { padding: '18px 14px' }
  );
}

function arrow() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        color: brand.colors.brandAccent,
        fontSize: px(d.arrow),
        fontWeight: 700,
        margin: '0 8px',
      },
    },
    '→'
  );
}

export function buildMcpArchitecture(props) {
  const isSecurity = props.emphasis === 'security';
  const footerStrip = isSecurity
    ? 'Allowlist + scoped permissions + injection defense'
    : 'OAuth + allowlist + audit log';
  const schemaLine = isSecurity
    ? '{ tool, scope, allowlist_id, audit_id, injection_guard }'
    : '{ tool, resource, prompt_template, scope, audit_id }';

  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '720px',
        gap: '16px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      node('Agent', 'Reasoning engine'),
      arrow(),
      node('MCP client', 'Discovery + calls'),
      arrow(),
      node('Tool servers', 'Tools + resources')
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          padding: '10px 20px',
          backgroundColor: brand.colors.badgeAccentBg,
          border: `1px solid ${brand.colors.brandAccent}`,
          borderRadius: '8px',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
          fontWeight: 600,
        },
      },
      footerStrip
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          padding: '12px 20px',
          backgroundColor: brand.colors.surfaceDarkCard,
          border: `1px solid ${brand.colors.borderDark}`,
          borderRadius: '8px',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
          fontFamily: 'Inter',
        },
      },
      schemaLine
    )
  );

  return articleHeroFrame({
    category: props.category || 'AI Agents',
    title: props.title,
    subtitle:
      props.subtitle ||
      (isSecurity
        ? 'MCP security controls — allowlists, scoped permissions, injection defense.'
        : 'Decoupled reasoning engine, standardized tool servers, OAuth boundaries.'),
    diagram,
  });
}
