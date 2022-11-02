/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,html,js}"
  ],
  theme: {
    extend: {
      colors: {
        "atom-dark": '#282c34'
      }
    },
  },
  plugins: [],
}
