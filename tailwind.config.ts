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
      eslint: {
        dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'text': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'background': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'primary': {
          50: '#eafbeb',
          100: '#d4f7d7',
          200: '#a9efaf',
          300: '#7ee787',
          400: '#54de5f',
          500: '#29d637',
          600: '#21ab2c',
          700: '#188121',
          800: '#105616',
          900: '#082b0b',
          950: '#041506',
        },
        'secondary': {
          50: '#f1e5ff',
          100: '#e3ccff',
          200: '#c799ff',
          300: '#ab66ff',
          400: '#8f33ff',
          500: '#7300ff',
          600: '#5c00cc',
          700: '#450099',
          800: '#2e0066',
          900: '#170033',
          950: '#0b001a',
        },
        'accent': {
          50: '#e5ffed',
          100: '#ccffda',
          200: '#99ffb6',
          300: '#66ff91',
          400: '#33ff6d',
          500: '#00ff48',
          600: '#00cc3a',
          700: '#00992b',
          800: '#00661d',
          900: '#00330e',
          950: '#001a07',
        },
       },       
      boxShadow: {
        'custom-dark': '0 10px 35px rgba(0, 0, 0, 0.95)',
      },
    },
  },
  plugins: [],
}
export default config;