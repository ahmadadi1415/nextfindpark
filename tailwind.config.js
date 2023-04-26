/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      birugelap: '#252FE5',
      biruterang: '#5667E2',
      abu: '#BCC9ED',
      unguterang: '#F6E9FF',
      ungugelap: '#8C16F2',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
