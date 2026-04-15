/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'hero': '2.75rem', 
        'tight': '1.125rem', 
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