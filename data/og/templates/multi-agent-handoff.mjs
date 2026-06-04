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
          width: '160px',
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
    { padding: '20px 16px' }
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

export function buildMultiAgentHandoff(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
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
      node('Orchestrator', 'Route & state'),
      arrow(),
      node('Specialist', 'Domain task'),
      arrow(),
      node('Checker', 'Policy scan')
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          marginTop: '24px',
          padding: '12px 20px',
          backgroundColor: brand.colors.surfaceDarkCard,
          border: `1px solid ${brand.colors.borderDark}`,
          borderRadius: '8px',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
          fontFamily: 'Inter',
        },
      },
      '{ workflow_id, step, payload, policy_pack_version }'
    )
  );

  return articleHeroFrame({
    category: props.category || 'AI Agents',
    title: props.title,
    subtitle: props.subtitle || 'Contracts, shared state, escalation',
    diagram,
  });
}
