/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        lateef: ["Lateef", "cursive"],
        arabic: ['"Noto Naskh Arabic"', "serif"],
        english: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
