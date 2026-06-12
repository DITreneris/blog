import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown } from './base.mjs';

const d = typography.hero.diagram;

const AGENTS = ['Research', 'Coding', 'Content', 'QA'];

const ORCHESTRATOR_FUNCS = ['Route', 'Context', 'Escalate', 'Retry', 'Log'];

const CHECKER_FUNCS = ['Policy', 'Quality', 'Risk'];

const AUDIT_ITEMS = [
  'Who handled the task',
  'What decision was made',
  'What failed or retried',
  'When human review is needed',
];

const USE_FOR =
  'Use for: multi-agent pilots · release gates · escalation paths · governance reviews';

function agentChip(label) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 12px',
        backgroundColor: brand.colors.surfaceDarkCard,
        border: `1px solid ${brand.colors.borderDark}`,
        borderRadius: '8px',
        color: brand.colors.textOnDarkMuted,
        fontSize: px(d.caption),
        fontWeight: 600,
        flex: 1,
        minWidth: '72px',
      },
    },
    `${label} Agent`
  );
}

function hubCard(title, funcs, accent = brand.colors.brandAccent) {
  return panelBox(
    h(
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
            color: accent,
            fontSize: px(d.title + 1),
            fontWeight: 800,
            letterSpacing: '0.04em',
            marginBottom: '10px',
          },
        },
        title
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
          },
        },
        ...funcs.map((fn) =>
          h(
            'div',
            {
              style: {
                display: 'flex',
                padding: '4px 10px',
                backgroundColor: 'rgba(207, 167, 58, 0.12)',
                borderRadius: '6px',
                color: brand.colors.textOnDark,
                fontSize: px(d.caption - 1),
                fontWeight: 600,
              },
            },
            fn
          )
        )
      )
    ),
    { padding: '16px 20px', width: '100%' }
  );
}

function flowArrow() {
  return flowArrowDown(d.metric - 6);
}

function orchestratorDiagram() {
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
          'radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, rgba(11, 19, 32, 0) 70%)',
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
          'Digital Workforce Control Layer'
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
          'One orchestrator routes work across specialist agents'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontWeight: 600,
              marginBottom: '6px',
            },
          },
          'User request'
        ),
        flowArrow(),
        hubCard('ORCHESTRATOR', ORCHESTRATOR_FUNCS),
        flowArrow(),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '8px',
              width: '100%',
              marginTop: '4px',
            },
          },
          ...AGENTS.map((agent) => agentChip(agent))
        ),
        flowArrow(),
        hubCard('CHECKER', CHECKER_FUNCS),
        flowArrow(),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              width: '100%',
            },
          },
          panelBox(
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                },
              },
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    color: brand.colors.brandAccent,
                    fontSize: px(d.caption),
                    fontWeight: 700,
                    marginBottom: '4px',
                  },
                },
                'Approved output'
              ),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    color: brand.colors.textOnDarkMuted,
                    fontSize: px(d.caption - 1),
                    textAlign: 'center',
                  },
                },
                'Release to production'
              )
            ),
            { padding: '12px 14px', flex: 1 }
          ),
          panelBox(
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                },
              },
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    color: brand.colors.textOnDarkMuted,
                    fontSize: px(d.caption),
                    fontWeight: 700,
                    marginBottom: '4px',
                  },
                },
                'Human escalation'
              ),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    color: brand.colors.textOnDarkMuted,
                    fontSize: px(d.caption - 1),
                    textAlign: 'center',
                  },
                },
                'Policy or quality hold'
              )
            ),
            { padding: '12px 14px', flex: 1 }
          )
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '14px',
              padding: '12px 14px',
              backgroundColor: 'rgba(207, 167, 58, 0.08)',
              border: `1px solid rgba(207, 167, 58, 0.2)`,
              borderRadius: '8px',
              flexDirection: 'column',
              gap: '6px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.brandAccent,
                fontSize: px(d.caption),
                fontWeight: 700,
              },
            },
            'Audit trail'
          ),
          ...AUDIT_ITEMS.map((item) =>
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  color: brand.colors.textOnDarkMuted,
                  fontSize: px(d.caption - 1),
                },
              },
              `• ${item}`
            )
          )
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
          USE_FOR
        )
      ),
      {
        padding: '22px 26px',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(52, 211, 153, 0.35)',
        borderTop: `3px solid ${brand.colors.brandAccent}`,
      }
    )
  );
}

export function buildAgentOrchestrator(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'ORCHESTRATION MODEL',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Route work, manage handoffs, check quality, and keep an audit trail across AI agents.',
    diagram: orchestratorDiagram(),
  });
}
