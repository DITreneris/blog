import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;
const AMBER = '#f59e0b';

const PRESETS = {
  hallucination: {
    badgeLabel: 'GROUNDING',
    leftTitle: 'Ungrounded',
    rightTitle: 'Grounded',
    leftItems: ['No source anchor', 'Plausible guessing', 'High-confidence errors'],
    rightItems: ['Scoped context', 'Approved retrieval', 'Verify before send'],
    leftAccent: AMBER,
    rightAccent: brand.colors.brandAccent,
    footer: 'Use for: RAG reviews · claim checks · high-stakes send gates',
    defaultSubtitle: 'Ungrounded guessing vs scoped retrieval and verify-before-send.',
  },
  chaos: {
    badgeLabel: 'CHAOS VS CONTROL',
    leftTitle: 'Chaos',
    rightTitle: 'Control',
    leftItems: ['Vague chat prompts', 'No role or context', 'Failed outputs'],
    rightItems: ['Role + context', 'RACE / TAG structure', 'Eval-linked releases'],
    leftAccent: AMBER,
    rightAccent: brand.colors.brandAccent,
    footer: 'Use for: prompt coaching · enablement · eval-linked releases',
    defaultSubtitle: 'Vague chat prompts vs role, structure, and eval-linked control.',
  },
  system_contract: {
    badgeLabel: 'SYSTEM CONTRACT',
    leftTitle: 'Chat tweaks',
    rightTitle: 'System contract',
    leftItems: [
      "One person's sidebar",
      'Edits do not transfer',
      'Tribal knowledge, no owner',
    ],
    rightItems: [
      'Shared pack on every run',
      'Versioned system / policy',
      'Named releases + changelog',
    ],
    leftAccent: AMBER,
    rightAccent: brand.colors.brandAccent,
    releaseFlow: 'Diagnose > one named pack change > re-check cases > promote',
    footer:
      'Use for: shared workflows where quality varies by person, not by task.',
    defaultSubtitle:
      'Private chat history vs a versioned system pack every run inherits.',
  },
};

function resolvePreset(props) {
  const preset = PRESETS[props.variant] || PRESETS.hallucination;
  return {
    badgeLabel: props.badgeLabel || preset.badgeLabel,
    leftTitle: props.leftTitle || preset.leftTitle,
    rightTitle: props.rightTitle || preset.rightTitle,
    leftItems: props.leftItems || preset.leftItems,
    rightItems: props.rightItems || preset.rightItems,
    leftAccent: props.leftAccent || preset.leftAccent,
    rightAccent: props.rightAccent || preset.rightAccent,
    footer: props.footer || preset.footer,
    releaseFlow: props.releaseFlow !== undefined ? props.releaseFlow : preset.releaseFlow,
    defaultSubtitle: preset.defaultSubtitle,
  };
}

function markIcon(kind, accent, compact) {
  const size = compact ? 12 : 14;
  const stroke = accent;
  if (kind === 'good') {
    return h(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        style: { marginRight: compact ? '6px' : '8px', flexShrink: 0 },
      },
      h('path', {
        d: 'M5 12.5l5 5L19 7',
        fill: 'none',
        stroke,
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      })
    );
  }
  return h(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      style: { marginRight: compact ? '6px' : '8px', flexShrink: 0 },
    },
    h('path', {
      d: 'M6 6l12 12M18 6L6 18',
      fill: 'none',
      stroke,
      strokeWidth: 3,
      strokeLinecap: 'round',
    })
  );
}

function compareColumn(title, items, accent, kind, preferred, compact) {
  const titleSize = compact ? od.moduleTitle : d.title;
  const captionSize = compact ? od.moduleDesc : d.caption;
  const gap = compact ? '6px' : '10px';
  const pad = compact ? '12px 14px' : '16px 18px';
  const border = preferred
    ? `1px solid rgba(251, 191, 36, 0.55)`
    : `1px solid ${brand.colors.borderDark}`;
  const borderTop = preferred
    ? `3px solid ${brand.colors.brandAccent}`
    : `3px solid ${AMBER}`;

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
            color: accent,
            fontSize: px(titleSize),
            fontWeight: 700,
            marginBottom: compact ? '10px' : '14px',
          },
        },
        title
      ),
      ...items.map((item) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              color: preferred
                ? brand.colors.textOnDark
                : brand.colors.textOnDarkMuted,
              fontSize: px(captionSize),
              marginBottom: gap,
              lineHeight: 1.35,
            },
          },
          markIcon(kind, accent, compact),
          h('div', { style: { display: 'flex', flex: 1 } }, item)
        )
      )
    ),
    {
      flex: 1,
      padding: pad,
      border,
      borderTop,
      opacity: preferred ? 1 : 0.92,
    }
  );
}

function vsLabel(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: compact ? '28px' : '36px',
        color: brand.colors.brandAccent,
        fontSize: px(compact ? od.label : d.label),
        fontWeight: 800,
        letterSpacing: '0.04em',
      },
    },
    'VS'
  );
}

function compareRows(cfg, compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'stretch',
        gap: compact ? '8px' : '12px',
      },
    },
    compareColumn(
      cfg.leftTitle,
      cfg.leftItems,
      cfg.leftAccent,
      'bad',
      false,
      compact
    ),
    vsLabel(compact),
    compareColumn(
      cfg.rightTitle,
      cfg.rightItems,
      cfg.rightAccent,
      'good',
      true,
      compact
    )
  );
}

function releaseStrip(text, compact) {
  if (!text) return null;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: compact ? '8px' : '12px',
        padding: compact ? '8px 10px' : '10px 14px',
        backgroundColor: 'rgba(207, 167, 58, 0.1)',
        border: '1px solid rgba(207, 167, 58, 0.25)',
        borderRadius: '8px',
        color: brand.colors.textOnDarkMuted,
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontStyle: 'italic',
        letterSpacing: '0.01em',
      },
    },
    text
  );
}

function footerStrip(text) {
  if (!text) return null;
  return h(
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
    text
  );
}

function heroDiagram(cfg) {
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
      compareRows(cfg, false),
      releaseStrip(cfg.releaseFlow, false),
      footerStrip(cfg.footer)
    ),
    {
      padding: '22px 26px',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
      border: '1px solid rgba(251, 191, 36, 0.35)',
      borderTop: `3px solid ${brand.colors.brandAccent}`,
    }
  );
}

function ogDiagram(cfg) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '520px',
      },
    },
    compareRows(cfg, true)
  );
}

export function buildSplitCompare(props) {
  const cfg = resolvePreset(props);
  return articleHeroFrame({
    category: props.category || 'Opinion',
    badgeLabel: cfg.badgeLabel,
    title: props.title,
    subtitle: props.subtitle || cfg.defaultSubtitle,
    diagram: heroDiagram(cfg),
  });
}

export function buildSplitCompareOg(props) {
  const cfg = resolvePreset(props);
  return articleOgFrameWithDiagram({
    category: props.category || 'Opinion',
    title: props.title,
    subtitle: props.subtitle || cfg.defaultSubtitle,
    diagram: ogDiagram(cfg),
  });
}
