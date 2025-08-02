/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Important for Vite projects
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all JS/JSX/TS/TSX files in 'src'
  ],
  theme: {
    extend: {
      fontSize: {
        'hero': '2.75rem', // 44px
        'tight': '1.125rem', // 18px
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
 },

  plugins: [],
}