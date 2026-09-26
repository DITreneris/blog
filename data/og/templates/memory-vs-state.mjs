import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, articleOgFrameWithDiagram, panelBox, ogWorksheetShell } from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const LEFT = {
  title: 'Memory',
  foot: 'What to remember',
  rows: [
    ['Preferences', 'How they like it'],
    ['History', 'What happened before'],
  ],
};

const RIGHT = {
  title: 'Job state',
  foot: 'Runs this job',
  rows: [
    ['Approval', 'May send'],
    ['Email sent', 'Checked result only'],
  ],
};

const BRIDGE = 'Approval is not proof. A checked result writes done.';
const FOOTER = 'Use for: steps where a remembered send must not close this job.';

function storeColumn(spec, compact) {
  const titleSize = compact ? od.moduleTitle : d.title + 2;
  const nameSize = compact ? od.moduleDesc : d.caption;
  const detailSize = compact ? 12 : d.caption - 1;
  const pad = compact ? '10px 12px' : '16px 16px';

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
            color: brand.colors.brandAccent,
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
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: compact ? '6px' : '8px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                width: compact ? '6px' : '7px',
                height: compact ? '6px' : '7px',
                borderRadius: '50%',
                backgroundColor: brand.colors.brandAccent,
                marginRight: compact ? '6px' : '8px',
                marginTop: compact ? '4px' : '6px',
                flexShrink: 0,
              },
            }
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
      )
    ),
    {
      flex: 1,
      padding: pad,
      border: `1px solid ${brand.colors.borderDark}`,
      borderTop: `3px solid ${brand.colors.brandAccent}`,
    }
  );
}

function centerMark(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: compact ? '54px' : '72px',
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
          textAlign: 'center',
          lineHeight: 1.25,
        },
      },
      'Not the same'
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
    storeColumn(LEFT, compact),
    centerMark(compact),
    storeColumn(RIGHT, compact)
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

export function buildMemoryVsState(props) {
  return articleHeroFrame({
    category: props.category || 'Opinion',
    badgeLabel: 'MEMORY VS STATE',
    title: props.title,
    subtitle: props.subtitle || 'Memory prepares. Approval allows. A checked result writes done.',
    diagram: heroDiagram(),
  });
}

export function buildMemoryVsStateOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Opinion',
    badgeLabel: 'MEMORY VS STATE',
    title: props.title,
    subtitle: props.subtitle || 'Memory prepares. Approval allows. A checked result writes done.',
    diagram: ogDiagram(),
  });
}
