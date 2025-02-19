import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#215a6d",
        blueP: "#395BA5",
        secondary: {
          DEFAULT: '#2d2d29',
          100: '#ff901',
          200: '#18D99B'
        },
        tertiary:{
          DEFAULT: '#3ca2a2',
          100: '#92c7a3',
          200: '#0009DB'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
