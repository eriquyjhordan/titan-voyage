import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background-gradient": "linear-gradient(178deg, #050409 32.84%, #3E658B 203.35%)",
      },
      colors: {
        "neutral-800": "#262626",
        "neutral-700": "#2D2D2D",
        "neutral-600": "#313131",
        "neutral-100": "#9F9F9F",
        "neutral-900":"#434343",
        "white": "#ddd",
      }
    },
  },
  plugins: [],
};
export default config;
