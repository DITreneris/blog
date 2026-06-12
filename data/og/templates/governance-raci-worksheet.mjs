import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox } from './base.mjs';

const d = typography.hero.diagram;

/** RACI definitions — teaches the model, not generic placeholders. */
const RACI_LEGEND = [
  { code: 'R', role: 'Responsible', focus: 'Executes the AI workflow change' },
  { code: 'A', role: 'Accountable', focus: 'Owns approval and final decision' },
  { code: 'C', role: 'Consulted', focus: 'Legal, risk, or technical input' },
  { code: 'I', role: 'Informed', focus: 'Receives updates after release' },
];

/** Empty worksheet rows — assign owners before pilot traffic scales. */
const ACTIVITY_ROWS = [
  { activity: 'Workflow change', r: '—', a: '—', c: '—', i: '—' },
  { activity: 'Release', r: '—', a: '—', c: '—', i: '—' },
  { activity: 'Incident', r: '—', a: '—', c: '—', i: '—' },
  { activity: 'Policy update', r: '—', a: '—', c: '—', i: '—' },
];

const USE_FOR =
  'Use for: AI workflows · model releases · automation incidents · policy changes';

function codeBadge(code, filled = true) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        width: '36px',
        height: '36px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: filled ? brand.colors.brandAccent : brand.colors.surfaceDarkCard,
        border: filled ? 'none' : `2px dashed ${brand.colors.borderDark}`,
        borderRadius: '6px',
        color: filled ? brand.colors.brandDark : brand.colors.textOnDarkMuted,
        fontSize: px(d.code),
        fontWeight: 800,
        flexShrink: 0,
      },
    },
    code
  );
}

function raciLegendRow(item) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: '12px',
        padding: '10px 0',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
      },
    },
    codeBadge(item.code),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(d.title + 1),
            fontWeight: 700,
          },
        },
        item.role
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(d.caption),
            marginTop: '3px',
            lineHeight: 1.35,
          },
        },
        item.focus
      )
    )
  );
}

function tableHeader() {
  const cols = ['Activity', 'R', 'A', 'C', 'I'];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '10px 0',
        borderBottom: `2px solid ${brand.colors.brandAccent}`,
        gap: '8px',
      },
    },
    ...cols.map((col, idx) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: idx === 0 ? 2 : 1,
            color: brand.colors.brandAccent,
            fontSize: px(d.caption),
            fontWeight: 700,
            letterSpacing: '0.03em',
            textTransform: idx === 0 ? 'none' : 'uppercase',
          },
        },
        col
      )
    )
  );
}

function activityRow(row) {
  const cells = [row.activity, row.r, row.a, row.c, row.i];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '9px 0',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
        gap: '8px',
        alignItems: 'center',
      },
    },
    ...cells.map((cell, idx) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: idx === 0 ? 2 : 1,
            color: idx === 0 ? brand.colors.textOnDarkMuted : brand.colors.textOnDark,
            fontSize: px(d.caption),
            fontWeight: idx === 0 ? 500 : 700,
            fontStyle: idx > 0 && cell === '—' ? 'italic' : 'normal',
          },
        },
        cell
      )
    )
  );
}

function worksheetDiagram() {
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
          'radial-gradient(circle, rgba(45, 212, 191, 0.14) 0%, rgba(11, 19, 32, 0) 70%)',
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
          'AI Governance Ownership Map'
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
          'Assign R · A · C · I before changes ship'
        ),
        ...RACI_LEGEND.map((item) => raciLegendRow(item)),
        h('div', { style: { display: 'flex', height: '16px' } }),
        tableHeader(),
        ...ACTIVITY_ROWS.map((row) => activityRow(row)),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '14px',
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
        padding: '22px 26px',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
        border: `1px solid rgba(45, 212, 191, 0.35)`,
        borderTop: `3px solid ${brand.colors.brandAccent}`,
      }
    )
  );
}

export function buildGovernanceRaciWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'Templates',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Stop AI workflow changes from falling between teams.',
    diagram: worksheetDiagram(),
  });
}
