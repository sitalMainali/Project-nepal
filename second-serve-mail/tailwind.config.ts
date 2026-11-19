import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./mdx-components.tsx"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2A24",
        muted: "#4A5550",
        cream: "#F8F3EA",
        surface: "#EFE7D6",
        line: "#D9CFBB",
        terracotta: {
          DEFAULT: "#B94E2A", // buttons, white text (5.0:1)
          dark: "#9A3F20", // accent text on cream/surface (AA)
          deco: "#D2603A", // decorative only, never for text
        },
        gold: "#E3B04B",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "1.25rem" },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [typography],
};
export default config;
