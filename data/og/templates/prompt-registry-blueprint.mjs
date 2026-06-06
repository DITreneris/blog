import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, labelText } from './base.mjs';

const d = typography.hero.diagram;

const STACK = [
  { layer: 'Business workflow', desc: 'Outcomes + owners' },
  { layer: 'Prompt registry', desc: 'Versioned templates + eval' },
  { layer: 'Context + retrieval', desc: 'Scoped inputs + RAG' },
  { layer: 'Model + tools', desc: 'Reasoning engine + MCP' },
];

function stackRow(item, highlight) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: '16px',
        },
      },
      h('div', {
        style: {
          display: 'flex',
          width: highlight ? '8px' : '4px',
          height: '44px',
          backgroundColor: highlight ? brand.colors.brandAccent : brand.colors.borderDark,
          borderRadius: '4px',
        },
      }),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
        labelText(item.layer),
        labelText(item.desc, true)
      )
    ),
    {
      padding: '12px 18px',
      width: '100%',
      ...(highlight
        ? {
            border: `1px solid ${brand.colors.brandAccent}`,
            backgroundColor: brand.colors.badgeAccentBg,
          }
        : {}),
    }
  );
}

export function buildPromptRegistryBlueprint(props) {
  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '620px',
        gap: '6px',
      },
    },
    ...STACK.map((item) => stackRow(item, item.layer === 'Prompt registry'))
  );

  return articleHeroFrame({
    category: props.category || 'Framework',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Blueprint — where the prompt registry sits in the implementation stack.',
    diagram,
  });
}
