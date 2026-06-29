import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { typography, px } from '../typography.mjs';
import { articleHeroFrame, panelBox, flowArrowDown, flowArrowRight } from './base.mjs';

const d = typography.hero.diagram;

const PIPELINE = [
  { label: 'Scheduler', detail: 'Cron POST_TIMES + interval jobs' },
  { label: 'Price API', detail: 'CoinGecko → DB history' },
  { label: 'News ingest', detail: 'X search → repository' },
  { label: 'LLM gate', detail: 'Groq significance + sentiment' },
];

const PUBLISH = [
  { label: 'Compose', detail: 'Price + news OR quote/joke fallback' },
  { label: 'Dup check', detail: 'Skip if same window fired' },
  { label: 'X post', detail: 'create_tweet · post-only v1' },
];

const LOG_ROW = '08:00 UTC · BTC price · source: news · id: logged';

const USE_FOR =
  'Use for: scheduled social agents · API tier planning · post-only v1 before reply automation';

function stepChip(label, accent = false) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 12px',
        backgroundColor: accent ? 'rgba(207, 167, 58, 0.12)' : brand.colors.surfaceDarkCard,
        border: `1px solid ${accent ? 'rgba(207, 167, 58, 0.35)' : brand.colors.borderDark}`,
        borderRadius: '8px',
        color: accent ? brand.colors.brandAccent : brand.colors.textOnDarkMuted,
        fontSize: px(d.caption),
        fontWeight: 600,
        flex: 1,
        minWidth: '72px',
        textAlign: 'center',
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
          minWidth: '88px',
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

function publishLoopDiagram() {
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
          'X Publish Loop'
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
          'BTC Buzz Bot — scheduled broadcast, not mention replies'
        ),
        h(
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
          ...PIPELINE.map((step, i) => [
            i > 0 ? flowArrowRight(d.metric - 10) : null,
            stepChip(step.label),
          ]).flat()
        ),
        h(
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
          ...PIPELINE.map((step) => detailRow(step.label, step.detail))
        ),
        flowArrowDown(d.metric - 6),
        h(
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
          ...PUBLISH.map((step, i) => [
            i > 0 ? flowArrowRight(d.metric - 10) : null,
            stepChip(step.label, step.label === 'X post'),
          ]).flat()
        ),
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
          LOG_ROW
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            },
          },
          stepChip('429 backoff'),
          stepChip('Admin dashboard'),
          stepChip('Discord mirror', false),
          stepChip('Telegram mirror', false)
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

export function buildXPublishLoop(props) {
  return articleHeroFrame({
    category: props.category || 'Implementation Notes',
    badgeLabel: 'PUBLISH LOOP',
    title: props.title,
    subtitle:
      props.subtitle ||
      'Scheduler, ingest, LLM gate, post-only publish—not reply automation.',
    diagram: publishLoopDiagram(),
  });
}
