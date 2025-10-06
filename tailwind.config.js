/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "prospero": ["Prospero-Regular", "sans-serif"],
        "prospero-semibold": ["Prospero-SemiBold", "sans-serif"],
        "prospero-bold": ["Prospero-Bold", "sans-serif"],
        "prospero-extralight": ["Prospero-Extralight", "sans-serif"],
        "prospero-italic": ["Prospero-RegularItalic", "sans-serif"],
        "prospero-bolditalic": ["Prospero-BoldItalic", "sans-serif"],
      },
      colors: {
        darktext: "#212529",
      },
    },
  },
  plugins: [],
};
