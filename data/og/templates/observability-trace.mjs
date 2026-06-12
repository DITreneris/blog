import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowRight } from './base.mjs';

const d = typography.hero.diagram;

function node(label, sub) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '150px',
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
            textAlign: 'center',
          },
        },
        label
      ),
      sub
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '8px',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                textAlign: 'center',
              },
            },
            sub
          )
        : null
    ),
    { padding: '16px 12px' }
  );
}

function arrow() {
  return flowArrowRight(d.arrow);
}

export function buildObservabilityTrace(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '760px',
        gap: '16px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      node('Orchestrator', 'Route + state'),
      arrow(),
      node('Specialist', 'Domain step'),
      arrow(),
      node('Checker', 'Policy gate')
    ),
    panelBox(
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '8px',
            fontFamily: 'Inter',
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
            },
          },
          'Trace log'
        ),
        ...['step=2 status=ok latency=340ms', 'handoff=specialist→checker', 'failure_mode=timeout_retry'].map(
          (line) =>
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  color: brand.colors.textOnDarkMuted,
                  fontSize: px(d.caption),
                },
              },
              line
            )
        )
      ),
      { padding: '16px 20px', width: '100%' }
    )
  );

  return articleHeroFrame({
    category: props.category || 'AI Agents',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Handoff trace with failure-mode callouts — observability over black-box agents.',
    diagram,
  });
}
