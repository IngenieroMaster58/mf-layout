/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // escanea templates Angular
  ],
  theme: {
    extend: {
      fontFamily: {
        prospero: ["Prospero", "sans-serif"], // Fuente registrada
      },
      colors: {
        darktext: "#212529", // Negro para la fuente
      },
    },
    fontFamily: {
      sans: ["Prospero", "sans-serif"], // Reemplaza la fuente base
    },
  },
  plugins: [],
};

