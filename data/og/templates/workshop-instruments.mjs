import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import {
  articleHeroFrame,
  articleOgFrameWithDiagram,
  panelBox,
} from './base.mjs';

const d = typography.hero.diagram;
const od = typography.og.diagram;

const ROWS = [
  {
    job: 'Orient + language',
    surfaceLabel: 'Marketing demos',
    surfaceTld: '.site',
    action: 'Map · assemble · maturity check',
  },
  {
    job: 'First habit',
    surfaceLabel: 'Cloud lesson',
    surfaceTld: '.cloud',
    action: 'Ordered send check',
  },
  {
    job: 'Measurable practice',
    surfaceLabel: 'App drills',
    surfaceTld: '.app',
    action: 'Click-and-do under checks',
  },
  {
    job: 'Owners + gates',
    surfaceLabel: 'Blog playbooks',
    surfaceTld: '.blog',
    action: 'Workflows after the room',
  },
];

const HEADERS = ['Job', 'Surface', 'Learners do'];

const PANEL_TITLE = 'Instruments by job';
const PANEL_SUBTITLE =
  "Match the room's job to one surface — demos orient; drills deepen; playbooks own";
const FOOTER = 'Use for: workshop openers · enablement · replace slide decks';

const DEFAULT_SUBTITLE =
  'Job to surface — demos orient, drills deepen, playbooks own.';

const FLEXES = [1.15, 1.2, 1.45];

function surfaceCell(row, opts = {}) {
  const { header = false, compact = false, flex = 1 } = opts;
  if (header) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          flex,
          padding: compact ? '6px 8px' : '10px 12px',
          color: brand.colors.brandAccent,
          fontSize: px(compact ? od.moduleDesc : d.caption),
          fontWeight: 700,
          lineHeight: 1.3,
          borderBottom: `2px solid ${brand.colors.borderDark}`,
        },
      },
      'Surface'
    );
  }
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex,
        padding: compact ? '6px 8px' : '10px 12px',
        gap: '2px',
        borderBottom: `1px solid ${brand.colors.borderDark}`,
        minWidth: '0',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDark,
          fontSize: px(compact ? od.moduleDesc : d.caption),
          fontWeight: 600,
          lineHeight: 1.3,
        },
      },
      row.surfaceLabel
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.brandAccent,
          fontSize: px(compact ? od.moduleDesc - 1 : d.caption - 1),
          fontWeight: 600,
          letterSpacing: '0.02em',
          opacity: 0.85,
        },
      },
      row.surfaceTld
    )
  );
}

function textCell(text, opts = {}) {
  const { header = false, compact = false, flex = 1 } = opts;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flex,
        padding: compact ? '6px 8px' : '10px 12px',
        color: header
          ? brand.colors.brandAccent
          : brand.colors.textOnDark,
        fontSize: px(compact ? od.moduleDesc : d.caption),
        fontWeight: header ? 700 : 500,
        lineHeight: 1.3,
        borderBottom: header
          ? `2px solid ${brand.colors.borderDark}`
          : `1px solid ${brand.colors.borderDark}`,
        minWidth: '0',
      },
    },
    text
  );
}

function headerRow(compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      },
    },
    textCell(HEADERS[0], { header: true, compact, flex: FLEXES[0] }),
    surfaceCell(null, { header: true, compact, flex: FLEXES[1] }),
    textCell(HEADERS[2], { header: true, compact, flex: FLEXES[2] })
  );
}

function dataRow(row, compact) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      },
    },
    textCell(row.job, { compact, flex: FLEXES[0] }),
    surfaceCell(row, { compact, flex: FLEXES[1] }),
    textCell(row.action, { compact, flex: FLEXES[2] })
  );
}

function worksheet(compact) {
  return panelBox(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: compact ? '520px' : '780px',
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
            marginBottom: compact ? '10px' : '14px',
            lineHeight: 1.35,
          },
        },
        PANEL_SUBTITLE
      ),
      headerRow(compact),
      ...ROWS.map((row) => dataRow(row, compact)),
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
    worksheet(false)
  );
}

export function buildWorkshopInstruments(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'WORKSHOP DESIGN',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: workshopDiagram(),
  });
}

export function buildWorkshopInstrumentsOg(props) {
  return articleOgFrameWithDiagram({
    category: props.category || 'Implementation Notes',
    title: props.title,
    subtitle: props.subtitle || DEFAULT_SUBTITLE,
    diagram: worksheet(true),
  });
}
