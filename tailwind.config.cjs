/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html, js, ts, css, jpeg}'],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui')]
};
