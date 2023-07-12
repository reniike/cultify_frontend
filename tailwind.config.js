/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                'custom-blue': '#263238',
                'custom-green': '#008000'
            }
        },
    },
    plugins: [],
}