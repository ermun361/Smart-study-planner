/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"],
    
  theme: {
    extend: {
      colors: {
         // We call it 'brandPurple' to match your Figma design
        brandPurple: '#6D69AC', 
        brandLight: '#F3F4F6', // A light gray for the background
      },
    },
  },
  plugins: [],
}