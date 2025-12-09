/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FFC107', // Amber-like yellow from screenshot
                    foreground: '#1F2937',
                },
                secondary: {
                    DEFAULT: '#F3F4F6', // Light gray
                    foreground: '#111827',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
