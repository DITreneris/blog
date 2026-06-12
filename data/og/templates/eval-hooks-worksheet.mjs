import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown } from './base.mjs';

const d = typography.hero.diagram;

const STEPS = [
  { label: 'Change', detail: 'Prompt · context · model · connector update' },
  { label: 'Eval run', detail: 'support-reply-eval-25 · YAML cases' },
  { label: 'Pass / fail gate', detail: 'Block merge or allow promote', highlight: true },
  { label: 'Outcome', detail: 'Prod pin updated or rollback' },
];

const GATES = [
  { gate: 'Smoke', rule: '100% on 10 cases (CI)' },
  { gate: 'Pilot', rule: '≥92% weekly' },
  { gate: 'Scale', rule: '30-day hold + forum' },
];

const USE_FOR =
  'Use for: prompt changes · context packs · model routing · registry promotion';

function stepNumber(n) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        width: '32px',
        height: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: brand.colors.brandAccent,
        borderRadius: '6px',
        color: brand.colors.brandDark,
        fontSize: px(d.caption),
        fontWeight: 800,
        flexShrink: 0,
      },
    },
    String(n)
  );
}

function flowRow(step, index) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    },
    index > 0 ? flowArrowDown(d.metric - 8) : null,
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
          gap: '12px',
          padding: step.highlight ? '10px 0' : '6px 0',
        },
      },
      stepNumber(index + 1),
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
          step.label
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: step.highlight ? brand.colors.textOnDark : brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontWeight: step.highlight ? 600 : 400,
              lineHeight: 1.35,
            },
          },
          step.detail
        )
      )
    )
  );
}

function gateStripRow(row) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '6px 0',
        gap: '12px',
        alignItems: 'baseline',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '72px',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
          fontWeight: 700,
          flexShrink: 0,
        },
      },
      row.gate
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
      row.rule
    )
  );
}

function evalHooksDiagram() {
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
          'Workflow Eval Hook Model'
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
          'Example: Northline support-reply-v3'
        ),
        ...STEPS.map((step, i) => flowRow(step, i)),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '12px',
              padding: '10px 14px',
              backgroundColor: 'rgba(207, 167, 58, 0.08)',
              border: `1px solid rgba(207, 167, 58, 0.2)`,
              borderRadius: '8px',
              flexDirection: 'column',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDark,
                fontSize: px(d.caption),
                fontWeight: 700,
                marginBottom: '6px',
              },
            },
            'Gate thresholds'
          ),
          ...GATES.map((row) => gateStripRow(row))
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
        border: '1px solid rgba(251, 191, 36, 0.35)',
        borderTop: `3px solid ${brand.colors.brandAccent}`,
      }
    )
  );
}

export function buildEvalHooksWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'Framework',
    badgeLabel: 'EVAL GATES',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Pass/fail gates before prompt, context, or model changes reach production.',
    diagram: evalHooksDiagram(),
  });
}
