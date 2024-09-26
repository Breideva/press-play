/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F0F5FA",
        backgroundLight: "#E0E0E0",
        text: "#070C0D",
        textLight: "rgba(7, 12, 13, 0.8)",
        primary: "#D1EAFF",
        secondary: "#D04D11",
        secondaryLight: "#F39468",
      },
      fontFamily: {
        martel: ["Martel", "sans-serif"],
      },
    },
  },
  plugins: [],
};
