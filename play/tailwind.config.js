/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F0F5FA",
        text: "#070C0D",
        primary: "#D04D11",
        secondary: "#F07942",
        backgroundLight: "#D1E0F0",
      },
      fontFamily: {
        martel: ["Martel", "sans-serif"],
      },
    },
  },
  plugins: [],
};
