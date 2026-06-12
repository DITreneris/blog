import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown } from './base.mjs';

const d = typography.hero.diagram;

const STEPS = [
  { label: 'Business metric', detail: 'CSAT + handle time on assisted queue' },
  { label: 'Workflow ID', detail: 'support-reply-v3 · one owner · one eval set' },
  { label: 'Human gate', detail: 'Agent sends · Legal consulted on policy hits', highlight: true },
  { label: 'Eval signal', detail: 'Override rate + pass rate predict metric movement' },
];

const ROWS = [
  { col: 'Metric', val: 'Primary KPI only in pilot' },
  { col: 'Baseline', val: '8 weeks pre-change window' },
  { col: 'Decision', val: 'Scale / fix / stop at forum' },
];

const USE_FOR =
  'Use for: outcome mapping · sponsor reviews · workflow canvas · ROI conversations';

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

function mappingRow(row) {
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
          width: '88px',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
          fontWeight: 700,
          flexShrink: 0,
        },
      },
      row.col
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
      row.val
    )
  );
}

function outcomesDiagram() {
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
          'Outcome Mapping Model'
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
              flexDirection: 'column',
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: `1px solid ${brand.colors.borderDark}`,
            },
          },
          ...ROWS.map((row) => mappingRow(row))
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

export function buildBusinessOutcomesFlow(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'OUTCOME MAP',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Tie each workflow to one business metric, owner, and eval gate—not activity alone.',
    diagram: outcomesDiagram(),
  });
}
