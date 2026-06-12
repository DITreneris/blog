import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowRight } from './base.mjs';

const d = typography.hero.diagram;

const STEPS = [
  { label: 'Outcome', example: 'Faster tier-2 replies' },
  { label: 'Metric', example: 'CSAT + handle time' },
  { label: 'Workflow', example: 'support-reply-v3' },
];

export function buildBusinessOutcomes(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
    },
    ...STEPS.flatMap((step, i) => {
      const box = panelBox(
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '180px',
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
            step.label
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDark,
                fontSize: px(d.caption),
                textAlign: 'center',
              },
            },
            step.example
          )
        ),
        { padding: '24px 20px' }
      );
      if (i === 0) return [box];
      return [flowArrowRight(d.metric), box];
    })
  );

  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle: props.subtitle || 'Map metrics to workflows—not activity',
    diagram,
  });
}
