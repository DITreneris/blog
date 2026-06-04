import { h } from '../jsx.mjs';
import { brand, sizes } from '../brand.mjs';
import { boltIcon } from './base.mjs';

export function buildOgDefault() {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${brand.colors.brandDark} 0%, ${brand.colors.brandDarkMid} 100%)`,
        fontFamily: 'Inter',
        padding: '0 80px',
      },
    },
    boltIcon(2.5),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '48px',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.textOnDark,
            fontSize: '64px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          },
        },
        brand.name
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '16px',
            color: brand.colors.textOnDarkMuted,
            fontSize: '32px',
            fontWeight: 400,
          },
        },
        brand.tagline
      )
    )
  );
}

export const ogDefaultSize = { width: sizes.ogWidth, height: sizes.ogHeight };
