import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "obsidian-moss": "#263124",
        "linen-mist": "#EBEBE4",
        "dried-sage": "#56604B",
        "pure-white": "#FFFFFF",
        "warm-gold": "#A89070",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
