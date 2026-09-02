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
        void: "#0D0004", // Deep dark space maroon
        "void-light": "#1A030A",
        "void-card": "rgba(27, 3, 10, 0.72)", // Matte glass maroon
        maroon: {
          DEFAULT: "#0D0004",
          gradient: "#2B020A", // Polished crimson-black gradient
          surface: "#1A030A",
        },
        crimson: {
          DEFAULT: "#E60049", // Metallic magenta-red
          glow: "rgba(230, 0, 73, 0.4)",
          soft: "#FFB0C1", // Subtle soft neon glow
        },
        magenta: "#E60049",
        "soft-glow": "#FFB0C1",
        gold: "#E6B93F",
        "gold-glow": "rgba(230, 185, 63, 0.35)",
        violet: "#7C3AED",
        glass: {
          surface: "rgba(27, 3, 10, 0.72)",
          border: "rgba(230, 0, 73, 0.20)", // Metallic magenta outline
          highlight: "rgba(255, 176, 193, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "Hind Siliguri", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        bangla: ["Hind Siliguri", "sans-serif"],
      },
      boxShadow: {
        "neon-crimson": "0 0 25px -4px rgba(230, 0, 73, 0.45)",
        "neon-soft": "0 0 35px -5px rgba(255, 176, 193, 0.25)",
        "neon-gold": "0 0 25px -5px rgba(230, 185, 63, 0.45)",
        "glass-inner": "inset 0 1px 1px 0 rgba(255, 176, 193, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
