/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* FuXion Brand Colors - matching fuxion.com */
        'fx-green': '#8CC63F',
        'fx-green-dark': '#7AB535',
        'fx-green-darker': '#5a8a2a',
        'fx-green-light': '#A8D86A',
        'fx-green-bg': 'rgba(140, 198, 63, 0.08)',
        'fx-dark': '#1B3A2D',
        'fx-dark-mid': '#2D5A3F',
        'fx-dark-light': '#3A7A50',
        'fx-charcoal': '#333333',
        'fx-gray': '#666666',
        'fx-gray-light': '#999999',
        'fx-gray-lighter': '#e8e8e8',
        'fx-gray-bg': '#f5f5f5',
        'fx-white': '#ffffff',
        'fx-card': '#ffffff',
        'fx-border': '#e8e8e8',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
