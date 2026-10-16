import { h } from '../jsx.mjs';
import { brand, categoryStyles } from '../brand.mjs';
import { px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const PASS = categoryStyles['AI Agents'].accent;

const GATES = [
  { n: '1', name: 'Voice', rule: 'No click. No overlap.' },
  { n: '2', name: 'Pixels', rule: 'No flash. No hard cut.' },
  { n: '3', name: 'Stills', rule: 'A person signs six frames.' },
];

const FOOTER = 'All three pass before 4K.';
const DEFAULT_SUBTITLE = 'A render ships only when every gate passes.';

function gateRow(gate, compact, last) {
  const nameSize = compact ? 28 : 36;
  const ruleSize = compact ? 20 : 24;
  const numSize = compact ? 28 : 36;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        columnGap: compact ? '16px' : '20px',
        padding: compact ? '14px 4px' : '18px 6px',
        borderBottom: last ? 'none' : `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: PASS,
          fontSize: px(numSize),
          fontWeight: 800,
          lineHeight: 1,
          width: compact ? '28px' : '36px',
        },
      },
      gate.n
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          rowGap: compact ? '4px' : '6px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(nameSize),
            fontWeight: 700,
            lineHeight: 1.1,
          },
        },
        gate.name
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: px(ruleSize),
            fontWeight: 500,
            lineHeight: 1.25,
          },
        },
        gate.rule
      )
    )
  );
}

function worksheet(compact) {
  const inner = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: compact ? '520px' : '640px',
      },
    },
    ...GATES.map((gate, i) => gateRow(gate, compact, i === GATES.length - 1)),
    h(
      'div',
      {
        style: {
          display: 'flex',
          marginTop: compact ? '8px' : '12px',
          paddingTop: compact ? '12px' : '16px',
          borderTop: `1px solid ${brand.colors.borderDark}`,
          color: brand.colors.textOnDark,
          fontSize: px(compact ? 20 : 22),
          fontWeight: 700,
          lineHeight: 1.25,
        },
      },
      FOOTER
    )
  );
  if (compact) {
    return ogWorksheetShell(inner, { padding: '18px 22px' });
  }
  return panelBox(inner, {
    padding: '28px 36px',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
    borderTop: `3px solid ${brand.colors.brandAccent}`,
  });
}

export function buildVideoAgentEvalsGates(props) {
  return articleHeroFrame({
    category: props.category || 'Case Studies',
    badgeLabel: 'VIDEO EVAL GATES',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildVideoAgentEvalsGatesOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Case Studies',
    badgeLabel: 'VIDEO EVAL GATES',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
