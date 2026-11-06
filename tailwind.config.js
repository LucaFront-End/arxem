/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', '"Geist"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', '"Geist"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
        arxem: {
          bg: '#F7F7F4',
          surface: '#FFFFFF',
          stone: '#EFECE6',
          ink: '#0D1117',
          slate: '#4B5563',
          cobalt: '#0052FF',
          cobaltDark: '#003BB5',
          amber: '#D97706',
          lead: '#1E242B',
        }
      },
      animation: {
        'marquee': 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 3.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        scanline: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.2' },
          '50%': { transform: 'translateY(100%)', opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
