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
        ink:       "#000000",
        parchment: "#E8E4DC",
        cream:     "#F0EBE3",
        gold:      "#B5A898",
        "gold-lt": "#C8BFB2",
        sage:      "#444444",
        // Keep old names for backward compat
        "obsidian-moss": "#263124",
        "linen-mist":    "#EBEBE4",
        "dried-sage":    "#56604B",
        "pure-white":    "#FFFFFF",
        "warm-gold":     "#A89070",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        body:    ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "h2-fluid": ["clamp(2.25rem, 5vw, 4.25rem)", { lineHeight: "1.06" }],
      },
    },
  },
  plugins: [],
};
export default config;
