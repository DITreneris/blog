import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const DAYS = [
  { day: 'Day 1', item: 'Scope + freeze support-reply-v3' },
  { day: 'Day 2', item: 'Collect 25–40 real cases' },
  { day: 'Day 3', item: 'Rubric + failure tags' },
  { day: 'Day 4', item: 'Baseline scores + calibration' },
  {
    day: 'Day 5',
    item: 'Release gates → changelog',
    highlight: true,
    note: 'No promote if regression >2pp on key slice',
  },
];

const FOOTER = 'Deliverables: frozen cases · rubric · baseline · release rule';

function dayRow(slot) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        padding: slot.highlight ? '14px 12px' : '12px 0',
        borderBottom: slot.highlight ? 'none' : `1px solid ${brand.colors.borderDark}`,
        borderRadius: slot.highlight ? '8px' : '0',
        backgroundColor: slot.highlight ? 'rgba(207, 167, 58, 0.1)' : 'transparent',
        border: slot.highlight ? `1px solid rgba(207, 167, 58, 0.25)` : 'none',
        gap: '16px',
        marginBottom: slot.highlight ? '4px' : '0',
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
          width: '72px',
          flexShrink: 0,
        },
      },
      slot.day
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
            color: slot.highlight ? brand.colors.textOnDark : brand.colors.textOnDarkMuted,
            fontSize: px(d.caption),
            fontWeight: slot.highlight ? 600 : 400,
          },
        },
        slot.item
      ),
      slot.note
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '6px',
                color: brand.colors.brandAccent,
                fontSize: px(d.caption - 1),
                fontWeight: 600,
              },
            },
            slot.note
          )
        : null
    )
  );
}

function weekDiagram() {
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
          'One-Week Regression Plan'
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
          'One workflow · frozen cases · release gate'
        ),
        ...DAYS.map((slot) => dayRow(slot)),
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

export function buildPromptRegressionWeek(props) {
  return articleHeroFrame({
    category: props.category || 'Prompt Systems',
    badgeLabel: 'ONE-WEEK PLAN',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Build a regression set in five working days — one workflow, frozen cases, release gate.',
    diagram: weekDiagram(),
  });
}
