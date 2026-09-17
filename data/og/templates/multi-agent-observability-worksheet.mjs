import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const ANSWERS = [
  'Which agent decided',
  'Context + policy version',
  'Why the handoff fired',
  'Guardrails fired / bypassed',
  'Degrade vs last release',
];

const ENVELOPE = ['run_id', 'handoff_reason', 'policy_pack_version', 'human_gate'];

const USE_FOR =
  'Use for: multi-agent pilots / launch blockers / governance replay';

const DEFAULT_SUBTITLE =
  'Run-level traces: who handed what, under which policy version.';

function answerRow(text, index, compact) {
  const size = compact ? od.moduleDesc : d.caption;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: compact ? '6px' : '8px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: compact ? '20px' : '24px',
          height: compact ? '20px' : '24px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: brand.colors.brandAccent,
          borderRadius: '5px',
          color: brand.colors.brandDark,
          fontSize: px(compact ? od.label : d.caption - 1),
          fontWeight: 800,
          flexShrink: 0,
          marginRight: compact ? '8px' : '10px',
        },
      },
      String(index + 1)
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(size),
          lineHeight: 1.3,
        },
      },
      text
    )
  );
}

function envelopeChip(label, compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        padding: compact ? '6px 10px' : '8px 12px',
        marginBottom: compact ? 0 : '8px',
        backgroundColor: 'rgba(207, 167, 58, 0.1)',
        border: '1px solid rgba(207, 167, 58, 0.3)',
        borderRadius: '8px',
        color: brand.colors.brandAccent,
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontWeight: 600,
      },
    },
    label
  );
}

function worksheet() {
  const titleSize = d.title;
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '780px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            columnGap: '16px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1.35,
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.brandAccent,
                fontSize: px(titleSize),
                fontWeight: 700,
                marginBottom: '12px',
              },
            },
            '5 answers in 5 min'
          ),
          ...ANSWERS.map((t, i) => answerRow(t, i, false))
        ),
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
                color: brand.colors.brandAccent,
                fontSize: px(titleSize),
                fontWeight: 700,
                marginBottom: '12px',
              },
            },
            'Run envelope'
          ),
          ...ENVELOPE.map((chip) => envelopeChip(chip, false))
        )
      ),
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
          },
        },
        USE_FOR
      )
    ),
    {
      padding: '22px 26px',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
      border: '1px solid rgba(251, 191, 36, 0.35)',
      borderTop: `3px solid ${brand.colors.brandAccent}`,
    }
  );
}

function ogDiagram() {
  const titleSize = od.moduleTitle;
  return ogWorksheetShell(
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
            color: brand.colors.brandAccent,
            fontSize: px(titleSize),
            fontWeight: 700,
            marginBottom: '8px',
          },
        },
        '5 answers in 5 min'
      ),
      ...ANSWERS.map((t, i) => answerRow(t, i, true)),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.brandAccent,
            fontSize: px(titleSize),
            fontWeight: 700,
            marginTop: '8px',
            marginBottom: '8px',
          },
        },
        'Run envelope'
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            columnGap: '8px',
            rowGap: '6px',
          },
        },
        ...ENVELOPE.map((chip) => envelopeChip(chip, true))
      )
    )
  );
}

export function buildMultiAgentObservabilityWorksheet(props) {
  return articleHeroFrame({
    category: props.category || 'AI Agents',
    badgeLabel: 'OBSERVABILITY',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(),
  });
}

export function buildMultiAgentObservabilityOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'AI Agents',
    badgeLabel: 'OBSERVABILITY',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: ogDiagram(),
  });
}
