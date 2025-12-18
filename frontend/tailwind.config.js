/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    extend: {
      colors: {
        // 1. Primary Backgrounds
        'brand-dark': '#331a1a',     // Deep, rich black
        'charcoal': '#2A2A2A',      // Soft dark gray (for cards/sections)
        
        // 2. Primary Text / Canvas
        'brand-pink-light': '#f6d5d9', // Soft pastel pink
        'brand-pink-accent': '#e993a0', // Vibrant accent pink

        // 3. Hero / Accent Color
        'brand-pink': '#e993a9', // Vibrant accent pink   
        
        // 4. Utility (Optional, keep for alerts)
        'alert-red': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Keep clean fonts
      }
   
  },
  plugins: [],
}