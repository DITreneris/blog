import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { boltIcon, panelBox } from './base.mjs';

/** Mirror data/hub_sections.yaml hero.diagram — compact for 1200×630 OG right column. */
const PIPELINE = [
  { label: 'Input', desc: 'Briefs, data, goals' },
  { label: 'Context', desc: 'Rules, examples' },
  { label: 'Reasoning', desc: 'Steps, checks' },
  { label: 'Output', desc: 'Reusable assets' },
];

const FOUNDATION = [
  { label: 'Quality', desc: 'Checks before ship' },
  { label: 'Workflow', desc: 'Repeatable system' },
];

function pipelineModule(item, d) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '88px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.brandAccentBright,
            fontSize: px(d.moduleTitle),
            fontWeight: 700,
          },
        },
        item.label
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '4px',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.moduleDesc),
            textAlign: 'center',
            lineHeight: 1.2,
          },
        },
        item.desc
      )
    ),
    { padding: '10px 8px', borderRadius: '8px' }
  );
}

function arrow(d) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        color: brand.colors.textOnDarkMuted,
        fontSize: px(d.arrow),
        fontWeight: 600,
        marginLeft: '4px',
        marginRight: '4px',
      },
    },
    '→'
  );
}

/** Compact homepage workflow diagram for OG cards (right column). */
export function buildHubWorkflowDiagram() {
  const d = typography.og.diagram;

  const pipelineRow = h(
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
    ...PIPELINE.flatMap((item, i) => {
      const nodes = [pipelineModule(item, d)];
      if (i < PIPELINE.length - 1) nodes.push(arrow(d));
      return nodes;
    })
  );

  const engine = panelBox(
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
      boltIcon(0.85),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '10px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDark,
              fontSize: px(d.engineTitle),
              fontWeight: 700,
            },
          },
          'Prompt Anatomy'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '2px',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.moduleDesc),
            },
          },
          'Workflow Engine'
        )
      )
    ),
    {
      padding: '12px 20px',
      borderRadius: '10px',
      border: `1px solid ${brand.colors.brandAccent}`,
      marginTop: '10px',
      marginBottom: '10px',
    }
  );

  const foundationRow = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      },
    },
    ...FOUNDATION.map((item, i) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginLeft: i > 0 ? '10px' : '0',
          },
        },
        panelBox(
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '120px',
              },
            },
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  color: brand.colors.brandAccentBright,
                  fontSize: px(d.moduleTitle),
                  fontWeight: 700,
                },
              },
              item.label
            ),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  marginTop: '4px',
                  color: brand.colors.textOnDarkMuted,
                  fontSize: px(d.moduleDesc),
                  textAlign: 'center',
                },
              },
              item.desc
            )
          ),
          { padding: '10px 12px', borderRadius: '8px' }
        )
      )
    )
  );

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.label),
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        },
      },
      'AI Workflow Architecture'
    ),
    pipelineRow,
    engine,
    foundationRow
  );
}
