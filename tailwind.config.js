/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        /* === Base tokens === */
        bg: {
          DEFAULT: "#F7F7F7",
          dark: "#333333",
          header: "#FFFFFF",
          modalDark: "#3B3B3B"
        },
        text: {
          DEFAULT: "#333333",
          dark: "#FFFFFF",
          muted: "#A0A1A3",
        },
        input: {
          DEFAULT: "#ffffff",
          dark: "#3B3B3B",
        },
        /* === Semantic colors === */
        success: "#7EA310",
        error: "#FF0000",
        checkbox: "#C8C7C7",
        border: {
          DEFAULT: "rgba(200, 199, 199, 1)",
        },
      },
      borderRadius: {
        '20': '20px', // для rounded-20
      },
      spacing: {
        '13': '13px', // для py-13
        '15': '15px', // для px-15
      },
      /* === Gradients === */
      backgroundImage: {
        gradient: "linear-gradient(180deg, rgba(33, 107, 82, 1), rgba(126, 163, 16, 1))",
      },
      border: {
        gradient: "linear-gradient(180deg, rgba(33, 107, 82, 1), rgba(126, 163, 16, 1))",
      },
      /* === Shadows (якщо з Figma) === */
      boxShadow: {
        input: "0px 0px 20px rgba(0, 0, 0, 0.25)",
        "input-dark": "0px 0px 20px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
