/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070C0D",
        backgroundLight: "#0E181B",
        backgroundHover: "#152428",
        text: "#F0F5FA",
        textLight: "rgba(7, 12, 13, 0.8)",
        primary: "#D04D11",
        secondary: "#F39468",
      },
      fontFamily: {
        martel: ["Martel", "sans-serif"],
      },
    },
  },
  plugins: [],
};
