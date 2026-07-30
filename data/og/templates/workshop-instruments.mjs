import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import {
  articleHeroFrame,
  articleOgFrameWithDiagram,
  panelBox,
  flowArrowRight,
} from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const STEPS = [
  {
    time: '0-5',
    instrument: 'Ecosystem map',
    action: 'Orient one domain',
    surfaces: ['.site'],
  },
  {
    time: '5-15',
    instrument: 'Anatomizer',
    action: 'Same messy prompt',
    surfaces: ['.site'],
  },
  {
    time: '15-20',
    instrument: 'Team Assessment',
    action: 'Score maturity',
    surfaces: ['.site'],
  },
  {
    time: '20-25',
    instrument: 'Hand off',
    action: 'Owned next step',
    surfaces: ['.cloud', '.app', '.blog'],
  },
];

const PANEL_TITLE = '25-Minute Workshop Opener';
const PANEL_SUBTITLE = 'Instruments, not decks — the room does the move';
const FOOTER = 'Use for: workshop openers · enablement · replace slide decks';

function surfaceTokens(step, fontSize) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: '2px',
        columnGap: '6px',
        maxWidth: '100%',
      },
    },
    ...step.surfaces.map((s) =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.brandAccent,
            fontSize: px(fontSize),
            fontWeight: 600,
            letterSpacing: '0.02em',
            opacity: 0.85,
          },
        },
        s
      )
    )
  );
}

function stepCard(step) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '0',
        padding: '10px 12px',
        borderRadius: '8px',
        border: `1px solid ${brand.colors.borderDark}`,
        background: 'rgba(15, 23, 42, 0.55)',
        gap: '4px',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption - 1),
          fontWeight: 700,
          letterSpacing: '0.04em',
        },
      },
      step.time
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(d.caption + 1),
          fontWeight: 700,
          lineHeight: 1.2,
        },
      },
      step.instrument
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption - 1),
          lineHeight: 1.3,
        },
      },
      step.action
    ),
    surfaceTokens(step, d.caption - 2)
  );
}

function stepRow() {
  const nodes = [];
  STEPS.forEach((step, i) => {
    nodes.push(stepCard(step));
    if (i < STEPS.length - 1) {
      nodes.push(
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              flexShrink: 0,
            },
          },
          flowArrowRight(18)
        )
      );
    }
  });
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        gap: '0',
      },
    },
    ...nodes
  );
}

function compactStepRow(step, isLast) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '6px 10px',
        gap: '12px',
        borderBottom: isLast ? 'none' : `1px solid ${brand.colors.borderDark}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '42px',
          flexShrink: 0,
          color: brand.colors.brandAccent,
          fontSize: px(od.moduleDesc),
          fontWeight: 700,
          letterSpacing: '0.04em',
        },
      },
      step.time
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1.3,
          color: brand.colors.textOnDark,
          fontSize: px(od.moduleDesc),
          fontWeight: 700,
        },
      },
      step.instrument
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1.4,
          color: brand.colors.textOnDarkMuted,
          fontSize: px(od.moduleDesc - 1),
        },
      },
      step.action
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1.1,
          justifyContent: 'flex-end',
        },
      },
      surfaceTokens(step, od.moduleDesc - 1)
    )
  );
}

function compactSteps() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '8px',
        border: `1px solid ${brand.colors.borderDark}`,
        background: 'rgba(15, 23, 42, 0.55)',
      },
    },
    ...STEPS.map((step, i) => compactStepRow(step, i === STEPS.length - 1))
  );
}

function workshopPanel(compact) {
  return panelBox(
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
            fontSize: px(compact ? od.moduleTitle : d.title + 2),
            fontWeight: 700,
            marginBottom: '4px',
          },
        },
        PANEL_TITLE
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(compact ? od.moduleDesc : d.caption),
            marginBottom: compact ? '10px' : '16px',
          },
        },
        PANEL_SUBTITLE
      ),
      compact ? compactSteps() : stepRow(),
      compact
        ? null
        : h(
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
            FOOTER
          )
    ),
    compact
      ? { padding: '12px 14px' }
      : {
          padding: '22px 26px',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(251, 191, 36, 0.35)',
          borderTop: `3px solid ${brand.colors.brandAccent}`,
        }
  );
}

function workshopDiagram() {
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
    workshopPanel(false)
  );
}

export function buildWorkshopInstruments(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'WORKSHOP DESIGN',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Ecosystem map, Anatomizer, assessment, handoff — the room does the work.',
    diagram: workshopDiagram(),
  });
}

export function buildWorkshopInstrumentsOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Ecosystem map, Anatomizer, assessment, handoff — the room does the work.',
    diagram: workshopPanel(true),
  });
}
