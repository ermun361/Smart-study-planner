/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Here is where you put the Indigo from your Figma!
        primary: "#4F46E5",
        background: "#F8FAFC",
      },
    },
  },
  plugins: [],
}