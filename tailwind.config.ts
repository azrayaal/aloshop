import type { Config } from 'tailwindcss'

/**
 * Aloshop client design tokens.
 * Brand palette is a fresh emerald/green used across the storefront.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          muted: '#94a3b8',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          sunken: '#f1f5f9',
        },
        night: '#0b241b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 4px 20px -8px rgba(15, 23, 42, 0.12)',
        soft: '0 2px 12px -4px rgba(15, 23, 42, 0.08)',
      },
      maxWidth: {
        app: '430px',
      },
    },
  },
  plugins: [],
} satisfies Config
