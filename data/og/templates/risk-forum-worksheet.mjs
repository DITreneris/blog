import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown } from './base.mjs';

const d = typography.hero.diagram;

const AGENDA = [
  { num: 1, item: 'New/changed workflows', detail: 'Scope, data classes, owners' },
  { num: 2, item: 'Eval regressions + incidents', detail: 'Pass rate trend, near-misses' },
  { num: 3, item: 'Legal / Security open items', detail: 'Policy packs, retention, denials' },
  { num: 4, item: 'Approvals', detail: 'Promote · pause · retire · connector row' },
  {
    num: 5,
    item: 'Actions with owners + due dates',
    detail: 'Risk register — not email',
    highlight: true,
  },
];

const FOOTER = 'Monthly 60 min · Northline support-reply-v3 example';

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

function agendaRow(step, index) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    },
    index > 0 ? flowArrowDown(d.metric - 10) : null,
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
      stepNumber(step.num),
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
          step.item
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

function forumDiagram() {
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
          'Standing Risk Forum Agenda'
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
          'Fixed order — decisions, not vendor demos'
        ),
        ...AGENDA.map((step, i) => agendaRow(step, i)),
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
          FOOTER
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

export function buildRiskForumWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'AI Governance',
    badgeLabel: 'RISK FORUM',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Standing risk forum — incidents, eval regressions, and workflow changes on a fixed agenda.',
    diagram: forumDiagram(),
  });
}
