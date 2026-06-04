/** Mirror of theme/promptanatomy/static/css/tokens.css — update both when brand changes. */
export const brand = {
  name: 'Prompt Anatomy',
  tagline: 'Structured AI implementation for teams',
  colors: {
    brandDark: '#0b1320',
    brandDarkMid: '#103b5a',
    surfaceDarkCard: '#111827',
    brandAccent: '#cfa73a',
    brandAccentBright: '#fbd304',
    textOnDark: '#f9fafb',
    textOnDarkMuted: '#9ca3af',
    textSecondary: '#4b5563',
    borderDark: 'rgba(255, 255, 255, 0.12)',
    badgeAccentBg: 'rgba(207, 167, 58, 0.15)',
  },
};

export const sizes = {
  heroWidth: 1600,
  heroHeight: 900,
  ogWidth: 1200,
  ogHeight: 630,
};

/** Pelican category → badge accent for category-default heroes. */
export const categoryStyles = {
  Framework: { accent: '#cfa73a', badgeBg: 'rgba(207, 167, 58, 0.15)' },
  'Prompt Systems': { accent: '#60a5fa', badgeBg: 'rgba(96, 165, 250, 0.15)' },
  'AI Agents': { accent: '#34d399', badgeBg: 'rgba(52, 211, 153, 0.15)' },
  'AI Governance': { accent: '#a78bfa', badgeBg: 'rgba(167, 139, 250, 0.15)' },
  'Implementation Notes': { accent: '#fbbf24', badgeBg: 'rgba(251, 191, 36, 0.15)' },
  'Case Studies': { accent: '#f472b6', badgeBg: 'rgba(244, 114, 182, 0.15)' },
  Templates: { accent: '#2dd4bf', badgeBg: 'rgba(45, 212, 191, 0.15)' },
  Opinion: { accent: '#fb923c', badgeBg: 'rgba(251, 146, 60, 0.15)' },
};

export function getCategoryStyle(category) {
  return categoryStyles[category] || categoryStyles.Framework;
}
