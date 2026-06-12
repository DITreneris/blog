import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown } from './base.mjs';

const d = typography.hero.diagram;

/** Northline-style example — illustrative, not live claims. */
const STEPS = [
  { label: 'Baseline', detail: 'Manual cost / current quality' },
  { label: 'AI Workflow', detail: 'support-reply-v3' },
  {
    label: 'Measured Impact',
    detail: '93% pass rate · 4 min saved/case · $280 incident cost avoided',
    highlight: true,
  },
  { label: 'Decision', detail: 'Scale / fix / stop' },
];

const FORMULA = 'ROI signal = pass rate + time saved − incident risk';

const USE_FOR =
  'Use for: automation pilots · support workflows · approval cases · governance reviews';

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

function roiDiagram() {
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
          'AI Workflow ROI Model'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginBottom: '16px',
            },
          },
          'Example: Northline support-assist workflow'
        ),
        ...STEPS.map((step, i) => flowRow(step, i)),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '12px',
              padding: '10px 14px',
              backgroundColor: 'rgba(207, 167, 58, 0.1)',
              border: `1px solid rgba(207, 167, 58, 0.25)`,
              borderRadius: '8px',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontStyle: 'italic',
              letterSpacing: '0.01em',
            },
          },
          FORMULA
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

export function buildWorkflowRoi(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'ROI MODEL',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Track pass rate, time saved, and incident cost before scaling automation.',
    diagram: roiDiagram(),
  });
}
