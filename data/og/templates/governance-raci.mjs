import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const ROLES = [
  { role: 'Exec sponsor', code: 'A', focus: 'Approve go-live' },
  { role: 'Process owner', code: 'R', focus: 'Outcomes & prompts' },
  { role: 'IT', code: 'R', focus: 'Integrations' },
  { role: 'Legal', code: 'C', focus: 'Policy context' },
  { role: 'Ops lead', code: 'I', focus: 'Incidents' },
];

function raciRow(item) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: '12px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brand.colors.brandAccent,
            borderRadius: '6px',
            color: brand.colors.brandDark,
            fontSize: px(d.code),
            fontWeight: 800,
          },
        },
        item.code
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
              color: brand.colors.textOnDark,
              fontSize: px(d.title),
              fontWeight: 700,
            },
          },
          item.role
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginTop: '4px',
            },
          },
          item.focus
        )
      )
    ),
    { padding: '12px 16px' }
  );
}

export function buildGovernanceRaci(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '640px',
        gap: '8px',
      },
    },
    ...ROLES.map((item) => raciRow(item))
  );

  return articleHeroFrame({
    category: props.category || 'AI Governance',
    title: props.title,
    subtitle:
      props.subtitle ||
      'RACI for AI workflows — named owners for outcomes, context, changes, and incidents.',
    diagram,
  });
}
