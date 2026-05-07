import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        ink: "var(--ink)",
        purple: "var(--purple)",
        peach: "var(--peach)",
        pink: "var(--pink)",
        grey: "var(--grey)",
      },
    },
  },
};

export default config;
