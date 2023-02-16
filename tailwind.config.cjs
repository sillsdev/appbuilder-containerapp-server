/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html, js, ts, css}',
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui'), ('flowbite/plugin')],
    darkMode: 'class',

};
