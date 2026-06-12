import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const STEPS = [
  { agent: 'Orchestrator', job: 'Route step · record active specialist · enforce sequence' },
  { agent: 'Specialist', job: 'Domain task only — research, draft, or format' },
  { agent: 'Checker', job: 'Policy scan before next step or human send' },
];

const PAYLOAD_FIELDS = [
  { field: 'workflow_version', example: 'tender-v2' },
  { field: 'step', example: 'legal_scan' },
  { field: 'artifacts', example: 'draft_section_3.md' },
  { field: 'confidence', example: '0.82 · escalate if low' },
];

const USE_FOR =
  'Use for: multi-agent pilots · orchestrator design · handoff contracts · escalation rules';

function stepRow(row, index) {
  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '8px 0',
    gap: '12px',
    alignItems: 'flex-start',
  };
  if (index < STEPS.length - 1) {
    rowStyle.borderBottom = `1px solid ${brand.colors.borderDark}`;
  }
  return h(
    'div',
    {
      style: rowStyle,
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '28px',
          height: '28px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: brand.colors.brandAccent,
          borderRadius: '6px',
          color: brand.colors.brandDark,
          fontSize: px(d.caption - 1),
          fontWeight: 800,
          flexShrink: 0,
        },
      },
      String(index + 1)
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.brandAccent,
            fontSize: px(d.title),
            fontWeight: 700,
            marginBottom: '4px',
          },
        },
        row.agent
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.caption),
            lineHeight: 1.35,
          },
        },
        row.job
      )
    )
  );
}

function payloadRow(row) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '5px 0',
        gap: '12px',
        alignItems: 'baseline',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '132px',
          color: brand.colors.textOnDark,
          fontSize: px(d.caption - 1),
          fontWeight: 600,
          fontFamily: 'Inter',
          flexShrink: 0,
        },
      },
      row.field
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1,
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption - 1),
        },
      },
      row.example
    )
  );
}

function handoffDiagram() {
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
          'Multi-Agent Handoff Model'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginBottom: '12px',
            },
          },
          'Specialization with explicit contracts — not chained prompts'
        ),
        ...STEPS.map((step, i) => stepRow(step, i)),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDark,
              fontSize: px(d.caption),
              fontWeight: 700,
              marginTop: '14px',
              marginBottom: '8px',
            },
          },
          'Handoff payload (minimal JSON)'
        ),
        ...PAYLOAD_FIELDS.map((row) => payloadRow(row)),
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
        border: '1px solid rgba(251, 191, 36, 0.35)',
        borderTop: `3px solid ${brand.colors.brandAccent}`,
      }
    )
  );
}

export function buildMultiAgentHandoffWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'AI Agents',
    badgeLabel: 'HANDOFF MODEL',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Orchestrator routes specialists with structured payloads and human gates on external actions.',
    diagram: handoffDiagram(),
  });
}
