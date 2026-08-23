import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#05070c",
          900: "#0b0f19",
          850: "#111726",
          800: "#182035",
          700: "#232e4a",
          600: "#324167",
        },
        gold: {
          300: "#fbe495",
          400: "#f5d77f",
          500: "#d4af37",
          600: "#aa8625",
          700: "#7f6014",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5D77F 0%, #D4AF37 50%, #AA8625 100%)",
        "gold-radial": "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
        "navy-gradient": "linear-gradient(180deg, #0B0F19 0%, #05070C 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 55, 0.3)",
        "gold-sm": "0 0 12px -2px rgba(212, 175, 55, 0.25)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
