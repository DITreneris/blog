import { h } from '../jsx.mjs';
import { brand, getCategoryStyle } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const PLATFORMS = ['LangGraph', 'CrewAI', 'MS Agent'];
const ROWS = [
  { label: 'State / graph', values: ['Strong', 'Light', 'Medium'] },
  { label: 'Multi-agent', values: ['First-class', 'Role teams', 'Enterprise path'] },
  { label: 'Ops fit', values: ['Eng-heavy', 'Fast pilot', 'MS stack'] },
];

function cell(text, accent, bold = false) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: bold ? accent : brand.colors.textOnDarkMuted,
        fontSize: px(d.caption),
        fontWeight: bold ? 700 : 400,
        textAlign: 'center',
        padding: '8px 4px',
      },
    },
    text
  );
}

/** Agent orchestration framework comparison (LangGraph / CrewAI / MS Agent). */
export function buildAgentFrameworkComparison(props) {
  const category = props.category || 'AI Agents';
  const style = getCategoryStyle(category);

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
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            borderBottom: `1px solid ${brand.colors.borderDark}`,
            paddingBottom: '10px',
            marginBottom: '8px',
          },
        },
        cell('', style.accent, true),
        ...PLATFORMS.map((p) => cell(p, style.accent, true))
      ),
      ...ROWS.map((row) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              borderBottom: `1px solid ${brand.colors.borderDark}`,
              padding: '8px 0',
            },
          },
          cell(row.label, brand.colors.textOnDark, true),
          ...row.values.map((v) => cell(v, style.accent))
        )
      )
    ),
    { width: '680px', padding: '20px 24px' }
  );

  return articleHeroFrame({
    category,
    title: props.title,
    subtitle:
      props.subtitle ||
      'Agent framework selection — graph depth, multi-agent patterns, ops fit.',
    diagram,
  });
}
