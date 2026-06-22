/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    // Brand colors resolve to CSS variables (defined in src/styles/global.css and
    // mirrored in /public/brand-tokens.css) so the WordPress theme can reuse the
    // exact same token set. Hex fallbacks keep them readable in isolation.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      navy: {
        DEFAULT: 'var(--navy, #012877)',
        600: 'var(--navy-600, #022a85)',
        700: 'var(--navy, #012877)',
        800: 'var(--navy-800, #01205f)',
        900: 'var(--navy-900, #011843)',
      },
      orange: {
        DEFAULT: 'var(--orange, #FD5E03)',
        600: 'var(--orange-600, #e85503)',
        700: 'var(--orange-700, #c84802)',
      },
      slate: { DEFAULT: 'var(--slate, #7086B2)' },
      mist: { DEFAULT: 'var(--mist, #D4DAE8)' },
      ink: { DEFAULT: 'var(--ink, #0A0F1F)' },
      paper: {
        DEFAULT: 'var(--paper, #FFFFFF)',
        2: 'var(--paper-2, #F6F8FC)',
      },
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      fontFamily: {
        display: ['"Sora Variable"', 'Sora', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // One modular scale (~1.2 minor third on body, larger jumps on display).
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
        'display-xl': ['clamp(2.6rem, 6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.1rem, 4.5vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.018em' }],
        'display-md': ['clamp(1.6rem, 3vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.012em' }],
        'display-sm': ['clamp(1.3rem, 2vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: { measure: '70ch', container: '1200px' },
      borderRadius: { card: '16px', btn: '12px' },
      boxShadow: {
        // Cool navy-tinted, layered, low-opacity — never heavy.
        soft: '0 1px 2px rgba(1, 40, 119, 0.06), 0 8px 24px rgba(1, 40, 119, 0.08)',
        lift: '0 2px 6px rgba(1, 40, 119, 0.08), 0 18px 48px rgba(1, 40, 119, 0.14)',
        ring: '0 0 0 1px rgba(112, 134, 178, 0.22)',
      },
      transitionTimingFunction: {
        // Gravitational easing: slow fall-in, slight overshoot/settle on arrival.
        gravity: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fall: 'cubic-bezier(0.5, 0, 0.2, 1)',
      },
      spacing: { section: 'clamp(4rem, 9vw, 7.5rem)' },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s var(--ease-fall) both',
      },
    },
  },
  plugins: [],
};
