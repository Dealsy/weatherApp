/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panelBlue: '#2A71B7',
        panelBorder: '#2A71B7',
        overlay: 'rgba(24, 39, 119, 0.4)',
      },
    },
  },
  plugins: [],
}
