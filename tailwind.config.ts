import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#D4A574",
          secondary: "#F5E6D3",
          accent: "#C9A982",
          dark: "#2C2C2C",
          light: "#FAF8F5",
        },
      },
    },
  },
  plugins: []
};

export default config;
