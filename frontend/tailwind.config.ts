import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#8CC63F',
          dark:    '#6FAE2E',
          light:   '#a8d960',
          primary: '#4a8a1a',
        },
        navy: {
          DEFAULT: '#1E2A3A',
          2:       '#162030',
          3:       '#0d1520',
        },
        cream: '#F4F6F0',
        text: {
          medium: '#4a5568',
          light:  '#718096',
        },
        amber: '#F59E0B',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        lato:    ['Lato', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        'card-lg': '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(30,42,58,.09)',
      },
      animation: {
        'float':    'float 7s ease-in-out infinite',
        'pulse-g':  'pulseGreen 2s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        'counter':  'countUp .5s ease-out forwards',
        'reveal':   'reveal .55s cubic-bezier(.4,0,.2,1) forwards',
        'loader-bar':'loaderBar 1.4s ease forwards',
        'energy-flow':'energyFlow 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-18px)' },
        },
        pulseGreen: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(140,198,63,.5)' },
          '50%':     { boxShadow: '0 0 0 7px rgba(140,198,63,0)' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        loaderBar: {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
        energyFlow: {
          to: { left: '160%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
