/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colors used
      colors: {
        primary: "#2b85ff",
        secondary: "#ef8638",
      },
      screens: {
        mobile: "500px",
        mlg: "950px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400% 0" },
          "100%": { backgroundPosition: "400% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
