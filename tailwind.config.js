/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // looks inside all src files for Tailwind classes
    "./public/index.html",        // optional: Tailwind classes in static HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

