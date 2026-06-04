import { h } from '../jsx.mjs';
import { brand } from '../brand.mjs';
import { boltIcon } from './base.mjs';

/** Deprecated for live hub hero — use native SVG partial. OG/embed shell with h1.png raster. */
export function buildHomepageHeroFrame(props) {
  const embedSrc = props.embedSrc;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${brand.colors.brandDark} 0%, ${brand.colors.brandDarkMid} 100%)`,
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
          alignItems: 'center',
          padding: '40px 56px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '380px',
            paddingRight: '32px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
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
              color: brand.colors.textOnDark,
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.2,
            },
          },
          props.title || 'AI quality layers around a workflow hub'
        )
      ),
      embedSrc
        ? h('img', {
            src: embedSrc,
            width: 900,
            height: 900,
            style: {
              objectFit: 'contain',
              maxWidth: '900px',
              maxHeight: '820px',
              opacity: 0.95,
            },
          })
        : null
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
