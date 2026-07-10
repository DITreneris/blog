import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown, flowArrowRight } from './base.mjs';

const d = typography.hero.diagram;

const AUTHOR_ROW = [
  { label: 'Vercel CMS', detail: 'Authoring + publish API on Vercel' },
  { label: 'posts.json', detail: 'Lesson copy + topic_key' },
  { label: 'polls + PNG', detail: 'Quiz bank + visual assets' },
];

const MANIFEST_ROW = [
  { label: 'sync queue', detail: 'posts + polls → delivery manifest' },
  { label: 'content.json', detail: 'photo · text · poll queue' },
];

const ADAPTERS = [
  { label: 'Telegram', detail: 'Channel feed today · via Railway queue', accent: true },
  { label: 'X optional', detail: 'Second adapter · post-only guardrails', muted: true },
];

const LESSON_ROW = '234 lessons · prepare once on Vercel · plug in networks';

const USE_FOR =
  'Use for: broadcast CMS · Vercel content kitchen · channel adapters before omnichannel';

function stepChip(label, accent = false, muted = false) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 12px',
        backgroundColor: accent
          ? 'rgba(207, 167, 58, 0.12)'
          : muted
            ? 'rgba(255, 255, 255, 0.03)'
            : brand.colors.surfaceDarkCard,
        border: `1px solid ${
          accent
            ? 'rgba(207, 167, 58, 0.35)'
            : muted
              ? 'rgba(255, 255, 255, 0.12)'
              : brand.colors.borderDark
        }`,
        borderRadius: '8px',
        color: accent ? brand.colors.brandAccent : brand.colors.textOnDarkMuted,
        fontSize: px(d.caption),
        fontWeight: 600,
        flex: muted ? 0 : 1,
        minWidth: muted ? 140 : 72,
        textAlign: 'center',
        fontStyle: muted ? 'italic' : 'normal',
        opacity: muted ? 0.85 : 1,
      },
    },
    label
  );
}

function detailRow(label, detail) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        gap: '10px',
        padding: '5px 0',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.brandAccent,
          fontSize: px(d.caption),
          fontWeight: 700,
          minWidth: '100px',
        },
      },
      label
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: brand.colors.textOnDarkMuted,
          fontSize: px(d.caption),
          lineHeight: 1.35,
          flex: 1,
        },
      },
      detail
    )
  );
}

function rowLabel(text) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        color: brand.colors.brandAccent,
        fontSize: px(d.caption - 1),
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: '8px',
      },
    },
    text
  );
}

function chipRow(steps, accentLabel = null) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%',
        marginBottom: '6px',
      },
    },
    ...steps
      .map((step, i) => [
        i > 0 ? flowArrowRight(d.metric - 10) : null,
        stepChip(step.label, step.label === accentLabel || step.accent, step.muted),
      ])
      .flat()
  );
}

function detailRows(steps) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '8px',
        paddingLeft: '4px',
      },
    },
    ...steps.map((step) => detailRow(step.label, step.detail))
  );
}

function curriculumCmsDiagram() {
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
          'Content kitchen'
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
          'Vercel authoring · manifest sync · plug-in channels'
        ),
        rowLabel('Author row'),
        chipRow(AUTHOR_ROW),
        detailRows(AUTHOR_ROW),
        flowArrowDown(d.metric - 6),
        rowLabel('Manifest row'),
        chipRow(MANIFEST_ROW),
        detailRows(MANIFEST_ROW),
        flowArrowDown(d.metric - 6),
        rowLabel('Adapters'),
        chipRow(ADAPTERS, 'Telegram'),
        detailRows(ADAPTERS),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '10px',
              padding: '10px 14px',
              backgroundColor: 'rgba(207, 167, 58, 0.1)',
              border: '1px solid rgba(207, 167, 58, 0.25)',
              borderRadius: '8px',
              color: brand.colors.textOnDarkMuted,
              fontSize: px(d.caption),
              fontFamily: 'monospace',
              letterSpacing: '0.01em',
            },
          },
          LESSON_ROW
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
              letterSpacing: '0.01em',
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
    )
  );
}

export function buildTelegramCurriculumCms(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'CONTENT OPS MODEL',
    title: props.title,
    subtitle:
      props.subtitle || 'Vercel authoring · manifest sync · plug-in channels',
    diagram: curriculumCmsDiagram(),
  });
}
