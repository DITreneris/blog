import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowRight } from './base.mjs';

const d = typography.hero.diagram;

const STEPS = [
  { role: 'AI draft', detail: 'Structured output · no external send' },
  { role: 'Human review', detail: 'Policy · facts · tone · escalation' },
  { role: 'Human send', detail: 'CRM / email / ticket — accountable actor' },
];

function stepPanel(step, index) {
  return panelBox(
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
            width: '32px',
            height: '32px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: brand.colors.brandAccent,
            color: brand.colors.textOnAccent,
            fontSize: px(d.caption),
            fontWeight: 700,
            marginBottom: '10px',
          },
        },
        String(index + 1)
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '6px',
          },
        },
        step.role
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
        step.detail
      )
    ),
    { padding: '16px 12px' }
  );
}

export function buildHumanHandoffWorksheet(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '760px',
        gap: '8px',
      },
    },
    ...STEPS.flatMap((step, i) =>
      i === 0
        ? [stepPanel(step, i)]
        : [flowArrowRight(d.arrow), stepPanel(step, i)]
    )
  );

  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Human-in-the-loop handoff — AI drafts, humans review, humans send.',
    diagram,
  });
}
