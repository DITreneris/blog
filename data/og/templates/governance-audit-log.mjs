import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const FIELDS = [
  'workflow_id',
  'prompt_version',
  'context_pack',
  'input_hash',
  'output_hash',
  'human_override',
  'retention',
];

export function buildGovernanceAuditLog(props) {
  const diagram = panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '560px',
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
            marginBottom: '16px',
          },
        },
        'Minimum log fields'
      ),
      ...FIELDS.map((field, i) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px 0',
              borderTop:
                i > 0 ? `1px solid ${brand.colors.borderDark}` : 'none',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                width: '160px',
              },
            },
            field
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDark,
                fontSize: px(d.caption),
                fontWeight: 600,
              },
            },
            'required'
          )
        )
      )
    ),
    { padding: '24px 28px' }
  );

  return articleHeroFrame({
    category: props.category || 'AI Governance',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Inputs, context versions, outputs, overrides, and retention for accountable AI workflows.',
    diagram,
  });
}
