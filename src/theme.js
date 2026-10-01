// ─────────────────────────────────────────────────────────────
// Shared design tokens & theme engine — Bauhaus / Mondrian system
//
// Color values live as CSS custom properties in index.css (@theme).
// This module provides JS references (for inline styles / SVG) and
// Tailwind-class mappings for the two visual modes.
// ─────────────────────────────────────────────────────────────

/**
 * CSS-variable references for use in inline styles, SVG attributes,
 * and any context that expects a CSS color value string.
 */
export const COLOURS = {
  // Bauhaus neutrals
  black900: 'var(--color-black-900)',
  black800: 'var(--color-black-800)',
  gray500: 'var(--color-gray-500)',
  gray200: 'var(--color-gray-200)',
  white100: 'var(--color-white-100)',

  // Bauhaus primaries
  red700: 'var(--color-red-700)',
  red500: 'var(--color-red-500)',
  red200: 'var(--color-red-200)',
  blue700: 'var(--color-blue-700)',
  blue500: 'var(--color-blue-500)',
  blue200: 'var(--color-blue-200)',
  yellow700: 'var(--color-yellow-700)',
  yellow500: 'var(--color-yellow-500)',
  yellow200: 'var(--color-yellow-200)',

  // Brand aliases
  accent: 'var(--color-accent)',
  accentLight: 'var(--color-accent-light)',
  accentPeach: 'var(--color-accent-peach)',

  // Base palette aliases
  cream: 'var(--color-cream)',
  creamMuted: 'var(--color-cream-muted)',
  charcoal: 'var(--color-charcoal)',

  // Dark surfaces
  surfaceDark: 'var(--color-surface-dark)',
  surfaceDarkRaised: 'var(--color-surface-dark-raised)',
  surfaceDarkElevated: 'var(--color-surface-dark-elevated)',
  surfaceDarkBorder: 'var(--color-surface-dark-border)',

  // Neutrals
  divider: 'var(--color-divider)',
  mutedText: 'var(--color-muted-text)',

  // Semantic
  success: 'var(--color-success)',
  mustard: 'var(--color-mustard)',
  deepOrange: 'var(--color-deep-orange)',
};

/**
 * Build a Tailwind-class theme object for the current mode.
 *
 * Consolidates the separate theme objects that previously lived in
 * App.jsx, Home.jsx, ChatContext.jsx, and ProjectDetail.jsx.
 */
export const getTheme = (mode) => {
  const isWandering = mode === 'wandering';

  return {
    // Layout (cream/charcoal aliases kept for existing component checks)
    bg: isWandering ? 'bg-charcoal' : 'bg-cream',
    text: isWandering ? 'text-cream' : 'text-charcoal',
    subText: 'text-gray-500',
    navBg: isWandering ? 'bg-charcoal/95' : 'bg-cream/95',

    // Borders — thick Bauhaus lines
    borderSolid: isWandering ? 'border-cream' : 'border-charcoal',
    borderSoft: isWandering ? 'border-gray-500' : 'border-charcoal',

    // Surfaces
    projectSectionBg: isWandering ? 'bg-surface-dark' : 'bg-cream-muted',
    cardBg: isWandering ? 'bg-surface-dark' : 'bg-cream',
    imagePlaceholderBg: isWandering ? 'bg-surface-dark' : 'bg-gray-200',
    tagBg: isWandering
      ? 'bg-transparent border-2 border-yellow-500 text-yellow-500'
      : 'bg-yellow-500 text-charcoal',

    // Blue text/icons: cobalt on cream, light blue on charcoal (WCAG 2.2)
    iconBlue: isWandering ? 'text-blue-200' : 'text-blue-500',
    linkBlue: isWandering ? 'text-blue-200 hover:text-cream' : 'text-blue-500 hover:text-blue-700',

    // Chat
    inputBg: isWandering ? 'bg-charcoal' : 'bg-cream-muted',
    userBubble: isWandering
      ? 'bg-red-500 text-cream border-[2px] border-cream'
      : 'bg-charcoal text-cream border-[2px] border-charcoal',
    assistantBubble: isWandering
      ? 'bg-blue-200 text-charcoal border-[2px] border-cream'
      : 'bg-blue-200 text-charcoal border-[2px] border-charcoal',
  };
};
