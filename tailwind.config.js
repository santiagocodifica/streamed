/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        dark1: "#141414",
        dark2: "#4D4D4D",
        dark3: "#797979",
        light1: "#F3F3F3"
      }
    },
  },
  plugins: [],
}
