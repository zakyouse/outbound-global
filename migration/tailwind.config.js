import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        teachers: ["Teachers", "sans-serif"],
        nunito:["Nunito", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: '#007fd5',
        secondary: '#d74c42',
        mygreen: "#009340",
        mywhite: "#f3faff",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

