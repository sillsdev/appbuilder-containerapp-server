/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{svelte, html, js, ts, css}'],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'dark'
    }
};
