import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#061019",
        surface: {
          DEFAULT: "#0c1722",
          50: "#172738",
          100: "#132231",
          200: "#0f1c29",
          300: "#0c1722",
          400: "#081018",
        },
        border: {
          DEFAULT: "#1f3142",
          light: "#2a4158",
        },
        gold: {
          50: "#fff9e6",
          100: "#ffefb8",
          200: "#ffe285",
          300: "#ffd552",
          400: "#ffc429",
          500: "#ffb400",
          600: "#e09a00",
          700: "#b87800",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
