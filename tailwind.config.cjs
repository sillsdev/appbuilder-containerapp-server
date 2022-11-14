/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/*.{css}',
    './src/**/*.{svelte, html, js, ts, css}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
