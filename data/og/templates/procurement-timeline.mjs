import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowRight } from './base.mjs';

const d = typography.hero.diagram;

const PHASES = [
  { days: 'Days 1–15', label: 'Inventory', desc: 'Freeze + tool map' },
  { days: 'Days 16–45', label: 'Rationalize', desc: 'Retire overlap' },
  { days: 'Days 46–75', label: 'Governance', desc: 'Approvals + logs' },
  { days: 'Days 76–90', label: 'Restart', desc: 'Controlled reopen' },
];

export function buildProcurementTimeline(props) {
  const phases = props.phases || PHASES;
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        gap: '12px',
      },
    },
    ...phases.flatMap((phase, i) => {
      const box = panelBox(
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px',
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
                marginBottom: '8px',
              },
            },
            phase.days
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDark,
                fontSize: px(d.caption),
                fontWeight: 700,
                marginBottom: '6px',
                textAlign: 'center',
              },
            },
            phase.label
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                textAlign: 'center',
              },
            },
            phase.desc
          )
        ),
        { padding: '20px 16px' }
      );
      if (i === 0) return [box];
      return [flowArrowRight(d.metric), box];
    })
  );

  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle: props.subtitle || '90-day procurement freeze — inventory to controlled restart',
    diagram,
  });
}
