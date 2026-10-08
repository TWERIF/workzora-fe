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
          light: "#999999"
        },
        input: {
          DEFAULT: "#ffffff",
          dark: "#3B3B3B",
        },
        success: "#7EA310",
        error: "#FF0000",
        checkbox: "#C8C7C7",
        border: {
          DEFAULT: "rgba(200, 199, 199, 1)",
          light: "#E2E2E2",
        },
        surface: {
          DEFAULT: "#F5F5F5",
          success: "#F2F6E7",
        },
        secondary: "#216B52",
        star: "#EBB447",
        danger: "#EF4C4C",
        main: {
          100: "rgb(var(--wz-main-100) / <alpha-value>)",
          90: "rgb(var(--wz-main-90) / <alpha-value>)",
          50: "rgb(var(--wz-main-50) / <alpha-value>)",
          10: "rgb(var(--wz-main-10) / <alpha-value>)",
          5: "rgb(var(--wz-main-5) / <alpha-value>)",
        },
        background: "rgb(var(--wz-background) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--wz-primary) / <alpha-value>)",
          10: "rgb(var(--wz-primary-10) / <alpha-value>)",
        },
        status: {
          success: "#7EA310",
          successSoft: "#7EA3101A",
          danger: "#E55555",
          dangerSoft: "#CC40401A",
          info: "#6987E9",
          infoSoft: "#486BDD1A",
          warning: "#E08A00",
          warningSoft: "#F5A6231F",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "var(--font-manrope)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      borderRadius: {
        '20': '20px',
        '18': '18px',
        '22': '22px',
        '36': '36px',
      },
      fontSize: {
        '22': ['22px', '31px'],
        '25': '25px',
      },
      spacing: {
        '13': '13px',
        '15': '15px',
      },
      backgroundImage: {
        gradient: "linear-gradient(90deg, #216B52 0%, #7EA310 100%)",
        gradientReverse: "linear-gradient(90deg, #7EA310 0%, #216B52 100%)",
        card: "linear-gradient(180deg, #E4F1C1 0%, #F2F6E7 100%)",
        "card-dark": "linear-gradient(180deg, #216B52 0%, #2E413B 100%)",
      },
      border: {
        gradient: "linear-gradient(180deg, rgba(33, 107, 82, 1), rgba(126, 163, 16, 1))",
      },
      boxShadow: {
        input: "0px 0px 20px rgba(0, 0, 0, 0.25)",
        "input-dark": "0px 0px 20px rgba(0, 0, 0, 0.5)",
        card: "0px 0px 20px rgba(0, 0, 0, 0.08)",
        "card-dark": "0px 0px 20px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
