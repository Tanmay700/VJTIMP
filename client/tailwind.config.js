/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#04B2D9",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};
