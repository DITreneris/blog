import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

const ROWS = [
  { item: 'Tool allowlist', status: 'Required', ok: true },
  { item: 'Scoped permissions', status: 'Per workflow', ok: true },
  { item: 'Prompt injection path', status: 'Blocked', ok: true },
  { item: 'Unscoped tool call', status: 'Denied', ok: false },
];

export function buildChecklistWorksheet(props) {
  const rows = props.rows || ROWS;
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
            color: brand.colors.textOnDark,
            fontSize: px(d.title),
            fontWeight: 700,
            marginBottom: '16px',
          },
        },
        props.worksheetTitle || 'Worksheet — copy and complete'
      ),
      ...rows.map((row) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              padding: '12px 0',
              borderBottom: `1px solid ${brand.colors.borderDark}`,
              gap: '12px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                width: '22px',
                height: '22px',
                border: `2px solid ${brand.colors.borderDark}`,
                borderRadius: '4px',
              },
            }
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                color: brand.colors.textOnDarkMuted,
                fontSize: px(d.caption),
              },
            },
            row.item || row
          ),
          row.status
            ? h(
                'div',
                {
                  style: {
                    display: 'flex',
                    color: row.ok ? brand.colors.brandAccent : '#f59e0b',
                    fontSize: px(d.caption),
                    fontWeight: 600,
                  },
                },
                row.status
              )
            : null
        )
      )
    ),
    { width: '680px', padding: '28px 32px' }
  );

  return articleHeroFrame({
    category: props.category || 'Templates',
    title: props.title,
    subtitle: props.subtitle || 'Empty rows — copy, complete, and attach to your workflow.',
    diagram,
  });
}
