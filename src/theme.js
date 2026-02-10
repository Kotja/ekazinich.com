// ─────────────────────────────────────────────────────────────
// Shared design tokens & theme engine
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
  // Brand
  accent:      'var(--color-accent)',
  accentLight: 'var(--color-accent-light)',
  accentPeach: 'var(--color-accent-peach)',

  // Base palette
  cream:      'var(--color-cream)',
  creamMuted: 'var(--color-cream-muted)',
  charcoal:   'var(--color-charcoal)',

  // Dark surfaces
  surfaceDark:         'var(--color-surface-dark)',
  surfaceDarkRaised:   'var(--color-surface-dark-raised)',
  surfaceDarkElevated: 'var(--color-surface-dark-elevated)',
  surfaceDarkBorder:   'var(--color-surface-dark-border)',

  // Neutrals
  divider:   'var(--color-divider)',
  mutedText: 'var(--color-muted-text)',

  // Semantic
  success:    'var(--color-success)',
  mustard:    'var(--color-mustard)',
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
    // Layout
    bg:       isWandering ? 'bg-charcoal'    : 'bg-cream',
    text:     isWandering ? 'text-cream'     : 'text-charcoal',
    subText:  isWandering ? 'text-cream/60'  : 'text-charcoal/60',
    navBg:    isWandering ? 'bg-charcoal/90' : 'bg-cream/90',

    // Borders
    borderSolid: isWandering ? 'border-cream'    : 'border-charcoal',
    borderSoft:  isWandering ? 'border-cream/20' : 'border-charcoal/20',

    // Surfaces
    projectSectionBg:   isWandering ? 'bg-surface-dark'          : 'bg-cream-muted',
    cardBg:             isWandering ? 'bg-surface-dark-raised'   : 'bg-white',
    imagePlaceholderBg: isWandering ? 'bg-surface-dark-elevated' : 'bg-gray-100',
    tagBg: isWandering
      ? 'bg-surface-dark-elevated text-cream border-surface-dark-border'
      : 'bg-cream-muted text-gray-500 border-gray-200',

    // Chat
    inputBg:         isWandering ? 'bg-surface-dark-elevated' : 'bg-cream-muted',
    userBubble:      isWandering ? 'bg-accent text-white'     : 'bg-charcoal text-cream',
    assistantBubble: isWandering
      ? 'bg-surface-dark-elevated text-cream'
      : 'bg-cream-muted text-charcoal',
  };
};
