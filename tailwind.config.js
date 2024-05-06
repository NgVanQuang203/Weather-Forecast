/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                ssm: '460px',
            },
            gridTemplateColumns: {
                'min-auto-min': 'min-content auto min-content',
            },
        },
    },
    plugins: [],
};
