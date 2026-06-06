import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const ROWS = [
  ['prompt_id', 'support-reply-v3/task'],
  ['version', '1.4.2'],
  ['owner', 'support-ops'],
  ['eval_set', 'support-reply-eval-25'],
  ['min_pass', '92%'],
];

export function buildPromptRegistry(props) {
  const showRelease = props.showReleaseFlow;
  const diagram = panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
      },
      labelText('Prompt registry'),
      ...ROWS.map(([key, val]) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 0',
              borderBottom: `1px solid ${brand.colors.borderDark}`,
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
                fontFamily: 'Inter',
              },
            },
            key
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
            val
          )
        )
      ),
      showRelease
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '16px',
                gap: '8px',
                color: brand.colors.brandAccent,
                fontSize: px(d.label),
              },
            },
            'Draft → Eval → Release → Monitor'
          )
        : h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '16px',
                color: brand.colors.brandAccent,
                fontSize: px(d.label),
              },
            },
            'Versioned templates + eval-linked releases'
          )
    ),
    { width: '680px', padding: '28px 32px' }
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle: props.subtitle || 'Registry, owners, environments, changelog',
    diagram,
  });
}
