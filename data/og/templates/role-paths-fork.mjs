import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown } from './base.mjs';

const d = typography.hero.diagram;

const ROLES = [
  { label: 'Sales', shape: 'KPI · forecast' },
  { label: 'Marketing', shape: 'Channel · campaign' },
  { label: 'IT / Eng', shape: 'Schema · pipeline' },
  { label: 'People', shape: 'Retention · pulse' },
  { label: 'Management', shape: 'Exec summary · risk' },
  { label: 'Other data', shape: 'Named placeholders' },
];

const USE_FOR =
  'Use for: enablement design · data-analysis onboarding · role-fit practice · anti-generic training';

function roleChip(role) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 10px',
        backgroundColor: 'rgba(207, 167, 58, 0.1)',
        border: `1px solid rgba(207, 167, 58, 0.35)`,
        borderRadius: '8px',
        marginRight: '8px',
        marginBottom: '8px',
        minWidth: '140px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(d.caption),
          fontWeight: 600,
          marginBottom: '2px',
        },
      },
      role.label
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption - 1),
          fontWeight: 500,
        },
      },
      role.shape
    )
  );
}

function rolePathsDiagram() {
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
          'Role Paths · One Analysis Spine'
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
          'Module 7 on promptanatomy.app — practice matches the job'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${brand.colors.borderDark}`,
              borderRadius: '8px',
              marginBottom: '4px',
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
            'Shared spine'
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
            'Sources · structure · verify before send'
          )
        ),
        flowArrowDown(d.metric - 8),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              marginTop: '4px',
            },
          },
          ...ROLES.map((r) => roleChip(r))
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '10px',
              padding: '10px 14px',
              backgroundColor: 'rgba(207, 167, 58, 0.1)',
              border: `1px solid rgba(207, 167, 58, 0.25)`,
              borderRadius: '8px',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontStyle: 'italic',
            },
          },
          'Same pipeline · role-adapted OUTPUT'
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
        padding: '20px 24px',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(251, 191, 36, 0.35)',
        borderTop: `3px solid ${brand.colors.brandAccent}`,
      }
    )
  );
}

export function buildRolePathsFork(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'ROLE PATHS',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Six org roles on one analysis spine — not one generic analyst script.',
    diagram: rolePathsDiagram(),
  });
}
