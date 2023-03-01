/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{svelte,html, js, ts, css}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui'), 'flowbite/plugin'],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },

};
