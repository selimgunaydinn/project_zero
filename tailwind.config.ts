import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      container: {
        center: true, // Container'ı ortalar
        padding: "1rem", // Varsayılan padding
        screens: {
          sm: "600px", // Küçük ekranlar için genişlik
          md: "728px", // Orta ekranlar için genişlik
          lg: "984px", // Büyük ekranlar için genişlik
          xl: "1240px", // Daha büyük ekranlar için genişlik
          "2xl": "1440px", // 2XL ekranlar için genişlik
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
} satisfies Config;
