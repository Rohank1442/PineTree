const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", flowbite.content(),],
  theme: {
    extend: {
      colors: {
        customBackground: '#151C25',
        customBackgroundPink: '#E32970'
      },
      fontFamily: {
        cedarville: ["'Cedarville Cursive'", "cursive"],
        assist: ["'Assistant'", "sans-serif"]
      },
    },
  },
  plugins: [flowbite.plugin()],
}

