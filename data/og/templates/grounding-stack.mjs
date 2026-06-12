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
          width: '170px',
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
    { padding: '18px 14px' }
  );
}

function arrow() {
  return flowArrowRight(d.arrow);
}

export function buildGroundingStack(props) {
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
      node('Scoped context', 'Policy + task scope'),
      arrow(),
      node('Approved retrieval', 'RAG + sources'),
      arrow(),
      node('Verify gate', 'Before external send')
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          padding: '12px 20px',
          backgroundColor: brand.colors.badgeAccentBg,
          border: `1px solid ${brand.colors.brandAccent}`,
          borderRadius: '8px',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
          fontWeight: 600,
        },
      },
      'Grounding stack — one flow, three control points'
    )
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Scoped context, approved retrieval, and verification gates in one system.',
    diagram,
  });
}
