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
      },
    },
  },
  plugins: [],
};
