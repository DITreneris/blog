import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const RITUALS = [
  { ritual: 'Workflow office hours', frequency: 'Weekly in pilot' },
  { ritual: 'Eval review', frequency: 'Biweekly' },
  { ritual: 'Change log standup', frequency: 'On release' },
  { ritual: 'Risk forum', frequency: 'Monthly' },
];

const FOOTER = 'Use for: pilot maintenance · eval drift · registry releases';

function ritualRow(row) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        padding: '12px 0',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
        gap: '16px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 2,
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
          fontWeight: 500,
        },
      },
      row.ritual
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1,
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
          fontWeight: 700,
          justifyContent: 'flex-end',
        },
      },
      row.frequency
    )
  );
}

function ritualsDiagram() {
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
          'Team Rituals Worksheet'
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
          'Recurring forums that keep workflows honest after launch'
        ),
        ...RITUALS.map((row) => ritualRow(row)),
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

export function buildTeamRitualsWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'TEAM RITUALS',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Lightweight recurring forums — office hours, eval review, and change announcements.',
    diagram: ritualsDiagram(),
  });
}
