/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vinho: {
          50:  '#eef0f8',
          100: '#d5d9ef',
          200: '#aab3df',
          300: '#7f8cce',
          400: '#5466be',
          500: '#3040ae',
          600: '#25338e',
          700: '#1B2A6B',
          800: '#152057',
          900: '#0f1640',
          950: '#080c25',
        },
        verde: {
          50:  '#fff0f0',
          100: '#fdd9d9',
          200: '#fbb3b3',
          300: '#f88080',
          400: '#f44d4d',
          500: '#ef2020',
          600: '#E31E24',
          700: '#c0191e',
          800: '#991417',
          900: '#730f11',
          950: '#4d0a0c',
        },
        dourado: {
          50:  '#f0f2f9',
          100: '#d8dcf0',
          200: '#b0b9e1',
          300: '#8896d2',
          400: '#6073c3',
          500: '#4A5FB4',
          600: '#3D52A0',
          700: '#304285',
          800: '#23316a',
          900: '#18234f',
          950: '#0e1535',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(27,42,107,0.92) 0%, rgba(227,30,36,0.85) 100%)",
      },
    },
  },
  plugins: [],
}
