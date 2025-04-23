// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}" // ✅ very important for Angular
  ],
  safelist: [
    {
      pattern: /bg-type-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
    },
    {
      pattern: /(from|to)-type-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
    },
  ],
  theme: {
    
    extend: {colors: {
      'type-normal': '#A8A77A',
      'type-fire': '#EE8130',
      'type-water': '#6390F0',
      'type-electric': '#F7D02C',
      'type-grass': '#7AC74C',
      'type-ice': '#96D9D6',
      'type-fighting': '#C22E28',
      'type-poison': '#A33EA1',
      'type-ground': '#a4733c',
      'type-flying': '#74aad0',
      'type-psychic': '#F95587',
      'type-bug': '#9f9f28',
      'type-rock': '#a9a481',
      'type-ghost': '#735797',
      'type-dragon': '#6F35FC',
      'type-dark': '#705746',
      'type-steel': '#B7B7CE',
      'type-fairy': '#D685AD',
    },},
  },
  plugins: [],
}