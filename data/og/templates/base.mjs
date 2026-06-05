import { h } from '../jsx.mjs';
import { brand, getCategoryStyle } from '../brand.mjs';
import { typography, titleStyle, px } from '../typography.mjs';

const { hero: hType, og: oType } = typography;

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

export function categoryBadge(label, category, surface = 'hero') {
  const style = getCategoryStyle(category || label);
  const badgeSize = surface === 'og' ? oType.badge : hType.badge;
  const isOg = surface === 'og';
  const outerStyle = { display: 'flex' };
  if (isOg) outerStyle.alignSelf = 'flex-start';
  return h(
    'div',
    { style: outerStyle },
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          padding: isOg ? '6px 14px' : '8px 16px',
          backgroundColor: style.badgeBg,
          border: `1px solid ${style.accent}`,
          borderRadius: isOg ? '9999px' : '6px',
          color: style.accent,
          fontSize: px(badgeSize),
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        },
      },
      label
    )
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
              fontSize: px(hType.brand),
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
  const titleSx = titleStyle(title, hType.title);
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
            width: `${hType.textColumnWidth}px`,
            justifyContent: 'center',
            paddingRight: '40px',
          },
        },
        categoryBadge(category, category, 'hero'),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '28px',
              color: brand.colors.textOnDark,
              ...titleSx,
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
                  fontSize: px(hType.subtitle),
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
        fontSize: px(hType.label),
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
  const d = hType.diagram;
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
                fontSize: px(d.label),
                fontWeight: 700,
                marginBottom: '6px',
              },
            },
            label
          )
        ),
        { padding: '18px 14px' }
      )
    )
  );
}

/** 1200×630 OG layout — copy left, diagram right (homepage + fallback). */
export function articleOgFrameWithDiagram({
  category,
  title,
  subtitle,
  diagram,
  showBrandRow = true,
}) {
  const titleSx = titleStyle(title, oType.title);
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
          padding: '32px 44px 28px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: `${oType.textColumnWidth}px`,
            justifyContent: 'flex-start',
            paddingTop: '4px',
            paddingRight: '24px',
          },
        },
        showBrandRow
          ? h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                },
              },
              boltIcon(1.1),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    marginLeft: '12px',
                    color: brand.colors.textOnDarkMuted,
                    fontSize: px(oType.brand),
                  },
                },
                brand.name
              )
            )
          : null,
        categoryBadge(category, category, 'og'),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '14px',
              color: brand.colors.textOnDark,
              ...titleSx,
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
                  marginTop: '10px',
                  color: brand.colors.textOnDarkMuted,
                  fontSize: px(oType.subtitle),
                  lineHeight: 1.35,
                  maxLines: 2,
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
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '4px',
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
          height: '5px',
          margin: '0 44px 14px',
          backgroundColor: brand.colors.brandAccent,
          borderRadius: '2px',
        },
      }
    )
  );
}

/** Typography-led 1200×630 OG — hub + fallback (no side diagram). */
export function textOgFrame({
  category,
  title,
  subtitle,
  showBrandRow = true,
  showWatermark = true,
}) {
  const titleSx = titleStyle(title, oType.title);
  const watermarkScale = 7.5;

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        position: 'relative',
        background: `linear-gradient(160deg, ${brand.colors.brandDark} 0%, ${brand.colors.brandDarkMid} 55%, #0a2840 100%)`,
        fontFamily: 'Inter',
      },
    },
    showWatermark
      ? h(
          'div',
          {
            style: {
              display: 'flex',
              position: 'absolute',
              right: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.1,
            },
          },
          boltIcon(watermarkScale)
        )
      : null,
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          padding: '48px 64px 40px',
          justifyContent: 'center',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '920px',
          },
        },
        showBrandRow
          ? h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                },
              },
              boltIcon(1.2),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    marginLeft: '12px',
                    color: brand.colors.textOnDarkMuted,
                    fontSize: px(oType.brand),
                  },
                },
                brand.name
              )
            )
          : null,
        categoryBadge(category, category, 'og'),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: showBrandRow ? '16px' : '0',
              color: brand.colors.textOnDark,
              ...titleSx,
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
                  marginTop: '14px',
                  color: brand.colors.textOnDarkMuted,
                  fontSize: px(oType.subtitle),
                  lineHeight: 1.35,
                },
              },
              subtitle
            )
          : null
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          height: '5px',
          margin: '0 44px 14px',
          backgroundColor: brand.colors.brandAccent,
          borderRadius: '2px',
        },
      }
    )
  );
}

/** Compact 1200×630 OG layout — title card without side diagram. */
export function articleOgFrame({ category, title, subtitle }) {
  const titleSx = titleStyle(title, oType.title);
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
            fontSize: px(oType.brand),
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
      categoryBadge(category, category, 'og'),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '24px',
            color: brand.colors.textOnDark,
            ...titleSx,
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
                fontSize: px(oType.subtitle),
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
