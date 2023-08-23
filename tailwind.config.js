/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,html,js}",
  ],
  theme: {
    extend: {
      screens: {
        "ze": "1px",
      },
      colors: {
        "atom-dark": "#282c34",
        "atom-orange": "#d19a66",
        "atom-purple": "#c678dd",
        "atom-green": "#98c379"
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),

]
}
