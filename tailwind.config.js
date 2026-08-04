/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/*.html", "./src/**/*.css", "./assets/js/case-studies-v22.js"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          purple: "#4e284b",
          red: "#c11818",
          black: "#111111",
          paper: "#f7f6f2",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat Variable", "Montserrat", "Arial", "sans-serif"],
      },
      maxWidth: {
        portfolio: "1440px",
      },
    },
  },
  plugins: [],
};
