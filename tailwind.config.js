/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      primary: '#7042D2',
      secondary: '#4648FF',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
    extend: {
      colors: {
        gradient: {
          start: '#FCC188',
          middle: '#7042D2',
          end: '#2E008E',
        },
      },
      borderRadius: {
        'btn': '0.5rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 