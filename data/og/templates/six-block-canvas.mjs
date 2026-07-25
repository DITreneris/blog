import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const META_ROWS = ['Prompt ID', 'Owner'];
const BLOCKS = ['Meta', 'Input', 'Output', 'Reasoning', 'Quality', 'Advanced'];

const USE_FOR = 'Use for: wiki paste · registry drafts · enablement · write-before-chat';

function blankRow(name, index) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: '12px',
        marginBottom: '8px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '110px',
          flexShrink: 0,
          color: brand.colors.brandAccent,
          fontSize: px(d.caption + 1),
          fontWeight: 700,
        },
      },
      `${index + 1}. ${name}`
    ),
    h('div', {
      style: {
        display: 'flex',
        flex: 1,
        height: '20px',
        borderBottom: `1px dashed ${brand.colors.borderDark}`,
        backgroundColor:
          index % 2 === 0 ? 'rgba(207, 167, 58, 0.06)' : 'rgba(255, 255, 255, 0.02)',
        borderRadius: '4px 4px 0 0',
      },
    })
  );
}

function canvasDiagram() {
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
          'Six-Block Prompt Canvas'
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
          'Blank worksheet — fill before chat experiments'
        ),
        ...META_ROWS.map((name, i) => blankRow(name, i)),
        ...BLOCKS.map((name, i) => blankRow(name, i + META_ROWS.length)),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '8px',
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

export function buildSixBlockCanvas(props) {
  return articleHeroFrame({
    category: props.category || 'Templates',
    badgeLabel: 'TEMPLATE',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Blank Meta → Advanced grid — paste into wiki, then attach registry and eval.',
    diagram: canvasDiagram(),
  });
}
