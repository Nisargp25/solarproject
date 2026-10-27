/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfcf9',
          100: '#f8f5ee',
          200: '#f0ebe0',
          300: '#e6dfcf',
        },
        charcoal: {
          900: '#0d0c0a',
          800: '#15130f',
          700: '#1d1a14',
          600: '#26221b',
          500: '#33301f', // not used much; kept for ramp
        },
        gold: {
          50: '#fff8e6',
          100: '#fdeec2',
          200: '#fbd98a',
          300: '#f7c45a',
          400: '#eab049',
          500: '#c8902a',
          600: '#a2741c',
        },
        sage: {
          400: '#5fa07f',
          500: '#3f8463',
        },
        terracotta: {
          400: '#c97b56',
          500: '#a85f3e',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.22em',
      },
    },
  },
  plugins: [],
};
