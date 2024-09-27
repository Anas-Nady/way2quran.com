/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        arabic: ['"Noto Naskh Arabic"', "serif"],
        english: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
