/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      red: "#C70000",
      white: "#F6F9F4",
      blue: "#145B9F",
      lightblue: "#8EBCE5",
      mint: "#E0ECE4",
      slate: "#A59B89",
      green: "#6B7B39",
    },
    fontFamily: {
      inconsolata: ["Inconsolata"],
      poppins: ["Poppins"],
      sans: ["Roboto", "Graphik", "sans-serif"],
      serif: ["Roboto", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    nextui({
      themes: {
        light: {
          colors: {
            white: "#F6F9F4",
            blue: "#145B9F",
            lightblue: "#8EBCE5",
            mint: "#E0ECE4",
            slate: "#A59B89",
            green: "#6B7B39",
          },
        },
        dark: {
          // ...
          colors: {},
        },
        // ... custom themes
      },
    }),
  ],
};
