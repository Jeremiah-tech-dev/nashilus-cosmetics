/** @type {import(`tailwindcss`).Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],    
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#F4E3E3',
          gold: '#D4AF37', 
          dark: '#1A1A1A', 
        }
      }
    },
  },
  plugins: [],
}   








