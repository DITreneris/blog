import { h } from '../jsx.mjs';
import { brand, categoryStyles } from '../brand.mjs';
import { px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const PASS = categoryStyles['AI Agents'].accent;

const STEPS = [
  { n: '1', name: 'Brief', rule: 'Write the subject, who it is for, and where it will run.' },
  { n: '2', name: 'Copy', rule: 'You get a prompt. The picture is made somewhere else.' },
  { n: '3', name: 'Check', rule: 'Confirm the subject, the words on it, the ratio, and the colors.' },
];

const FOOTER = 'Paste into the image tool, then check the picture.';
const DEFAULT_SUBTITLE = 'A filled brief shows the gap. A person still checks the picture.';

function stepRow(step, compact, last) {
  const nameSize = compact ? 28 : 36;
  const ruleSize = compact ? 20 : 24;
  const numSize = compact ? 28 : 36;
  const numWidth = compact ? 36 : 44;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        rowGap: compact ? '6px' : '8px',
        padding: compact ? '14px 4px' : '18px 6px',
        borderBottom: last ? 'none' : `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
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
            width: px(numWidth),
            minWidth: px(numWidth),
            flexShrink: 0,
          },
        },
        step.n
      ),
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
        step.name
      )
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
          paddingLeft: px(numWidth),
        },
      },
      step.rule
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
    ...STEPS.map((step, i) => stepRow(step, compact, i === STEPS.length - 1)),
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

export function buildImageBriefCheck(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'IMAGE PROMPT',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(false),
  });
}

export function buildImageBriefCheckOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'IMAGE PROMPT',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
