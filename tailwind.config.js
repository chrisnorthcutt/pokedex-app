// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}" // ✅ very important for Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}