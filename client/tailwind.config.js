/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBackground: '#151C25',
        customBackgroundPink: '#E32970'
      },
      fontFamily: {
        cedarville: ["'Cedarville Cursive'", "cursive"]
      },
    },
  },
  plugins: [],
}

