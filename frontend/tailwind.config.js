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
      colors: {
        "tertiary-fixed-dim": "#ffb59a",
        "tertiary-container": "#c14300",
        "inverse-surface": "#32302c",
        "surface-variant": "#e7e2dc",
        "on-background": "#1d1b18",
        "primary-fixed": "#d9e2ff",
        "surface-dim": "#dfd9d3",
        "surface-tint": "#0058cb",
        "on-secondary-container": "#4b657c",
        "error": "#ba1a1a",
        "outline-variant": "#c2c6d7",
        "primary": "#004fb8",
        "secondary": "#466178",
        "primary-fixed-dim": "#b0c6ff",
        "secondary-container": "#c7e3fe",
        "on-error": "#ffffff",
        "surface-container-low": "#f9f3ed",
        "surface-container": "#f3ede7",
        "surface-container-lowest": "#ffffff",
        "on-surface-variant": "#424654",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#380d00",
        "surface-bright": "#fef8f2",
        "secondary-fixed-dim": "#aecae4",
        "primary-container": "#0d66e6",
        "tertiary": "#983300",
        "on-secondary-fixed": "#001e30",
        "on-primary-container": "#edf0ff",
        "on-tertiary-fixed-variant": "#802a00",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#ffede7",
        "inverse-on-surface": "#f6f0ea",
        "inverse-primary": "#b0c6ff",
        "on-primary-fixed-variant": "#00429c",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e7e2dc",
        "on-surface": "#1d1b18",
        "surface-container-high": "#ede7e1",
        "on-primary": "#ffffff",
        "on-secondary-fixed-variant": "#2e495f",
        "outline": "#727786",
        "secondary-fixed": "#cbe6ff",
        "tertiary-fixed": "#ffdbce",
        "surface": "#fef8f2",
        "on-primary-fixed": "#001945",
        "background": "#fef8f2",
        "bitly-navy": "#06263a",
        "bitly-blue": "#0d66e6"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
 },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}