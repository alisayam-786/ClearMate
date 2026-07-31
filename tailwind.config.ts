import type { Config } from "tailwindcss";

/** Tailwind scan paths and initial ClearMate design tokens. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
