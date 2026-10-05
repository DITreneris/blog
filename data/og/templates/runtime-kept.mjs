import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const LEFT = {
  title: 'Vendor module',
  foot: 'Offered at renewal',
  rows: [
    ['Prompt change', 'Ticket to reject'],
    ['Near-miss export', 'No policy version'],
    ['Release', 'Vendor calendar'],
  ],
};

const RIGHT = {
  title: 'Their pin',
  foot: 'What they kept',
  rows: [
    ['Policy pack', 'Versioned in git'],
    ['Smoke job', 'Fail stops the merge'],
    ['Audit log', 'Run row points at the pin'],
  ],
};

const BRIDGE = 'Rent the host. Withhold the pin.';
const FOOTER = 'Use for: a renewal where the vendor wants your release gate.';

function column(spec, compact, kept) {
  const titleSize = compact ? od.moduleTitle : d.title + 2;
  const nameSize = compact ? od.moduleDesc : d.caption;
  const detailSize = compact ? 12 : d.caption - 1;
  const pad = compact ? '10px 12px' : '16px 16px';
  const titleColor = kept ? brand.colors.brandAccent : brand.colors.textOnDarkMuted;

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
            color: titleColor,
            fontSize: px(titleSize),
            fontWeight: 700,
            marginBottom: '2px',
          },
        },
        spec.title
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDarkMuted,
            fontSize: px(detailSize),
            fontWeight: 500,
            marginBottom: compact ? '8px' : '12px',
          },
        },
        spec.foot
      ),
      ...spec.rows.map(([name, detail]) =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              marginBottom: compact ? '6px' : '8px',
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
                lineHeight: 1.2,
              },
            },
            name
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: brand.colors.textOnDarkMuted,
                fontSize: px(detailSize),
                fontWeight: 500,
                lineHeight: 1.2,
                marginTop: '1px',
              },
            },
            detail
          )
        )
      )
    ),
    {
      flex: 1,
      padding: pad,
      border: `1px solid ${kept ? 'rgba(251, 191, 36, 0.45)' : brand.colors.borderDark}`,
      borderTop: kept ? `3px solid ${brand.colors.brandAccent}` : `3px solid ${brand.colors.borderDark}`,
    }
  );
}

function centerMark(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: compact ? '52px' : '64px',
        padding: compact ? '6px 4px' : '8px 6px',
        backgroundColor: brand.colors.brandDark,
        borderRadius: '8px',
        border: `1px solid ${brand.colors.brandAccent}`,
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.brandAccent,
          fontSize: px(compact ? 11 : 13),
          fontWeight: 800,
          letterSpacing: '0.04em',
        },
      },
      'Keep'
    )
  );
}

function pairRow(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'stretch',
        columnGap: compact ? '8px' : '12px',
      },
    },
    column(LEFT, compact, false),
    centerMark(compact),
    column(RIGHT, compact, true)
  );
}

function bridgeLine(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: compact ? '8px' : '12px',
        color: brand.colors.textOnDark,
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontWeight: 600,
      },
    },
    BRIDGE
  );
}

function footerStrip() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: `1px solid ${brand.colors.borderDark}`,
        color: brand.colors.textOnDarkMuted,
        fontSize: px(d.caption - 1),
      },
    },
    FOOTER
  );
}

function heroDiagram() {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '820px',
        },
      },
      pairRow(false),
      bridgeLine(false),
      footerStrip()
    ),
    {
      padding: '18px 20px',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
      border: '1px solid rgba(251, 191, 36, 0.35)',
      borderTop: `3px solid ${brand.colors.brandAccent}`,
    }
  );
}

function ogDiagram() {
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
      pairRow(true),
      bridgeLine(true)
    )
  );
}

export function buildRuntimeKept(props) {
  return articleHeroFrame({
    category: props.category || 'Case Studies',
    badgeLabel: 'RENEWAL SPLIT',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || 'Rent the host. Withhold the production pin.',
    diagram: heroDiagram(),
  });
}

export function buildRuntimeKeptOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Case Studies',
    badgeLabel: 'RENEWAL SPLIT',
    title: props.satoriTitle || props.title,
    subtitle: props.subtitle || 'Rent the host. Withhold the production pin.',
    diagram: ogDiagram(),
  });
}
