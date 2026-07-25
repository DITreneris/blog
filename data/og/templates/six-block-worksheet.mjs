import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const BLOCKS = [
  { name: 'Meta', detail: 'Role · situation · purpose' },
  { name: 'Input', detail: 'Facts · sources · constraints' },
  { name: 'Output', detail: 'Format · sections · shape' },
  { name: 'Reasoning', detail: 'Steps before the answer' },
  { name: 'Quality', detail: 'Pass / fail · refuse rules' },
  { name: 'Advanced', detail: 'Settings that change behavior' },
];

const USE_FOR =
  'Use for: prompt drills · registry drafts · enablement · write-before-tools decisions';

function blockCell(block, index) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '190px',
        padding: '12px 14px',
        backgroundColor:
          index % 2 === 0 ? 'rgba(207, 167, 58, 0.08)' : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${brand.colors.borderDark}`,
        borderRadius: '8px',
        marginBottom: '10px',
        marginRight: index % 2 === 0 ? '10px' : '0',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '26px',
            height: '26px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brand.colors.brandAccent,
            borderRadius: '6px',
            color: brand.colors.brandDark,
            fontSize: px(d.caption - 1),
            fontWeight: 800,
            flexShrink: 0,
          },
        },
        String(index + 1)
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.brandAccent,
            fontSize: px(d.title),
            fontWeight: 700,
          },
        },
        block.name
      )
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
      block.detail
    )
  );
}

function sixBlockDiagram() {
  const rows = [];
  for (let i = 0; i < BLOCKS.length; i += 2) {
    rows.push(
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          },
        },
        blockCell(BLOCKS[i], i),
        blockCell(BLOCKS[i + 1], i + 1)
      )
    );
  }

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
          'Six-Block Prompt Worksheet'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              marginBottom: '14px',
            },
          },
          'Block contracts — Meta through Advanced'
        ),
        ...rows,
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '6px',
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

export function buildSixBlockWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'Prompt Systems',
    badgeLabel: 'PROMPT SYSTEM',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Meta through Advanced — write structured prompts before you scale tools.',
    diagram: sixBlockDiagram(),
  });
}
