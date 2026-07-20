import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#000000',
          700: '#616365',
        },
        paper: {
          50: '#ffffff',
          100: '#f7f7f7',
          200: '#e8e8e8',
          300: '#919ba6',
        },
        navy: {
          900: '#17212b',
          800: '#1c2733',
          700: '#232e3c',
        },
        signal: {
          blue: '#0088cc',
          blueHover: '#0077b3',
          blueDark: '#3390ec',
          blueBright: '#5eb0f3',
          cyan: '#3dd6c6',
          lime: '#a9e34b',
          amber: '#f5b84b',
          red: '#ff5d4f',
        },
      },
      boxShadow: {
        // A hairline top highlight (inset) layered under the ambient drop shadow, so panels read
        // as a lifted glass surface catching light from above rather than a flat card with a blur.
        soft: '0 1px 0 0 rgb(255 255 255 / 0.6) inset, 0 18px 60px rgb(0 0 0 / 0.10)',
        darkSoft: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 18px 60px rgb(0 0 0 / 0.38)',
        glow: '0 8px 24px rgb(0 136 204 / 0.35)',
        glowDark: '0 8px 24px rgb(51 144 236 / 0.45)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(0.94)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
      },
      animation: {
        breathe: 'breathe 3.2s ease-in-out infinite',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Lucida Grande',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
