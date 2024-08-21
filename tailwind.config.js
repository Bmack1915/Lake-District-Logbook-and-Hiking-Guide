// /** @type {import('tailwindcss').Config} */

// const { nextui } = require("@nextui-org/react");
// module.exports = {
//   content: [
//     "./src/**/*.{html,js,jsx,ts,tsx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [
//     nextui({
//       prefix: "nextui", // prefix for themes variables
//       addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
//       defaultTheme: "light", // default theme from the themes object
//       defaultExtendTheme: "light", // default theme to extend on custom themes
//       layout: {}, // common layout tokens (applied to all themes)
//       themes: {
//         light: {
//           layout: {}, // light theme layout tokens
//           colors: {
//             background: "#ffffff",
//             foreground: "#000000",
//             text: "#000000",
//             primary: { 50: "#DCC48E", 100: "#505168", 200: "#27233A" },
//           },
//           fonts: {
//             sans: "Helvetica, Arial, sans-serif", // Define the default sans-serif font stack
//             serif: "Georgia, Times, serif", // Define the default serif font stack
//             mono: "Courier, monospace", // Define the default monospace font stack
//           },
//         },
//         dark: {
//           layout: {}, // light theme layout tokens
//           colors: {
//             background: "#505168",
//             foreground: "#DCC48E",
//             text: "#000000",
//             primary: { 50: "#DCC48E", 100: "#505168", 200: "#272333A" },
//           },
//         },
//       },
//     }),
//     require("@tailwindcss/forms"),
//   ],
// };

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
      // purple: "#7e5bef",
      // pink: "#ff49db",
      // orange: "#ff7849",
      // green: "#13ce66",
      // yellow: "#ffc82c",
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
