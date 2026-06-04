import { h } from '../jsx.mjs';
import { brand, getCategoryStyle } from '../brand.mjs';

/** Lightning bolt path from theme/promptanatomy/static/favicon.svg (scaled). */
export function boltIcon(scale = 1) {
  const s = scale;
  const points =
    `${13.5 * s},${1.5 * s} ${4.5 * s},${14.25 * s} ${10.5 * s},${14.25 * s} ` +
    `${8.25 * s},${22.5 * s} ${19.5 * s},${9.75 * s} ${13.5 * s},${9.75 * s}`;
  return h(
    'svg',
    {
      width: 32 * s,
      height: 32 * s,
      viewBox: `0 0 ${24 * s} ${24 * s}`,
    },
    h('polygon', {
      points,
      fill: brand.colors.brandAccentBright,
    })
  );
}

export function categoryBadge(label, category) {
  const style = getCategoryStyle(category || label);
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: style.badgeBg,
        border: `1px solid ${style.accent}`,
        borderRadius: '6px',
        color: style.accent,
        fontSize: '18px',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      },
    },
    label
  );
}

export function heroBackground(width, height) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${brand.colors.brandDark} 0%, ${brand.colors.brandDarkMid} 100%)`,
        fontFamily: 'Inter',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          padding: '48px 64px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          },
        },
        boltIcon(1.2),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginLeft: '16px',
              color: brand.colors.textOnDarkMuted,
              fontSize: '20px',
              fontWeight: 400,
            },
          },
          brand.name
        )
      )
    )
  );
}

/**
 * Article hero shell: badge, title, subtitle, diagram area.
 * Title placed in vertical center third for OG crop safety.
 */
export function articleHeroFrame({ category, title, subtitle, diagram }) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${brand.colors.brandDark} 0%, ${brand.colors.brandDarkMid} 55%, #0a2840 100%)`,
        fontFamily: 'Inter',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          padding: '56px 72px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '520px',
            justifyContent: 'center',
            paddingRight: '40px',
          },
        },
        categoryBadge(category, category),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '28px',
              color: brand.colors.textOnDark,
              fontSize: '44px',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            },
          },
          title
        ),
        subtitle
          ? h(
              'div',
              {
                style: {
                  display: 'flex',
                  marginTop: '20px',
                  color: brand.colors.textOnDarkMuted,
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                },
              },
              subtitle
            )
          : null
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        diagram
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          height: '6px',
          width: '100%',
          backgroundColor: brand.colors.brandAccent,
        },
      }
    )
  );
}

export function panelBox(children, extraStyle = {}) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: brand.colors.surfaceDarkCard,
        border: `1px solid ${brand.colors.borderDark}`,
        borderRadius: '12px',
        padding: '20px 24px',
        ...extraStyle,
      },
    },
    children
  );
}

export function labelText(text, muted = false) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        color: muted ? brand.colors.textOnDarkMuted : brand.colors.textOnDark,
        fontSize: '16px',
        fontWeight: muted ? 400 : 600,
        marginBottom: '8px',
      },
    },
    text
  );
}

/** Abstract workflow grid for category-default heroes. */
export function categoryDefaultDiagram(category) {
  const style = getCategoryStyle(category);
  const cells = ['Input', 'Context', 'Model', 'Output', 'Eval', 'Gate'];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '520px',
        gap: '12px',
        justifyContent: 'center',
      },
    },
    ...cells.map((label) =>
      panelBox(
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '150px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: style.accent,
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '6px',
              },
            },
            label
          )
        ),
        { padding: '16px 12px' }
      )
    )
  );
}

/** Compact 1200×630 OG layout — title card without side diagram. */
export function articleOgFrame({ category, title, subtitle }) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${brand.colors.brandDark} 0%, ${brand.colors.brandDarkMid} 100%)`,
        fontFamily: 'Inter',
        padding: '48px 64px',
        justifyContent: 'space-between',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      boltIcon(1.4),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginLeft: '16px',
            color: brand.colors.textOnDarkMuted,
            fontSize: '18px',
          },
        },
        brand.name
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          maxWidth: '900px',
        },
      },
      categoryBadge(category, category),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '24px',
            color: brand.colors.textOnDark,
            fontSize: '52px',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          },
        },
        title
      ),
      subtitle
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '16px',
                color: brand.colors.textOnDarkMuted,
                fontSize: '22px',
                lineHeight: 1.35,
              },
            },
            subtitle
          )
        : null
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          height: '5px',
          width: '100%',
          backgroundColor: brand.colors.brandAccent,
        },
      }
    )
  );
}
