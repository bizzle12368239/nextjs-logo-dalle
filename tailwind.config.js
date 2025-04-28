/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        foreground: '#000000',
        accent: {
          DEFAULT: '#06B6D4', // cyan
          dark: '#6366F1',    // indigo
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 32px 0 rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
