/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend"],
      },
      colors: {
        // LIGHT
        "lavender-mist": "#e3eaf5",
        "blueberry-blue": "#0b40c9",
        "faded-blue": "#628fb5",
        "cadet-blue": "#a6b3c7",
        "deep-cove": "#0a1040",
        "blue-koi": "#639dcf",
        leather: "#a9753d",
        // DARK
        jaguar: "#02030b",
        "rich-blue": "#031ff4",
        "phthalo-blue": "#010e92",
        "dark-blue": "#050b5e",
        "vampire-grey": "#504f57",
        "soft-peach": "#eceef4",
        "glacial-blue-ice": "#3588cc",
      },
    },
  },
  plugins: [],
};
