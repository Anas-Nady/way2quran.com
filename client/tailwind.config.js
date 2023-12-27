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
        notoNaskhArabic: ['"Noto Naskh Arabic"', "serif"],
        roboto: ["Roboto", "sans -serif"],
      },
    },
  },
  plugins: [],
};
