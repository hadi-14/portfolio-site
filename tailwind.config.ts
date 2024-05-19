import NavBar from "@/app/components/Navbar";
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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: '#040D12',
        navbar: '#040D12',
        gradient1: '#4DFFF3',
        gradient2: '#735290',
        foreground: '#069E2D',
      },
      boxShadow: {
        'custom-dark': '0 10px 35px rgba(0, 0, 0, 0.95)',
      },
    },
  },
  plugins: [],
}
export default config;