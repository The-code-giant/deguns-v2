import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          100: '#F2F5F7',
          200: '#F3F5F9',
          300: '#E3E9EF',
          400: '#DAE1E7',
          500: '#AEB4BE',
          600: '#7A6E7A',
          700: '#4B566B',
          800: '#373F50',
          900: '#292E2D',
          white: '#FFFFFF',
        },
        primary: {
          light: '#fbe8e8',
          DEFAULT: '#db1b21',
          dark: '#4F4CB6',
          blue: '#020659',
          'bright-blue': '#030a99',
          'light-blue': '#e5e6ee',
          'new-blue': 'rgb(37 99 235 / 1)',
          price: '#171717',
        },
        secondary: {
          light: 'rgba(15, 52, 96, 0.2)',
          DEFAULT: '#2e2e2e',
          dark: '#303A47',
          900: '#041533',
          100: '#F3F6F9',
        },
        warning: {
          DEFAULT: '#FFCD4E',
        },
        error: {
          light: '#FFE1E6',
          DEFAULT: '#db1b21',
        },
        success: {
          light: 'rgba(51, 208, 103, 0.15)',
          DEFAULT: 'rgba(51, 208, 103, 1)',
        },
        text: {
          primary: '#292E2D',
          secondary: '#171717',
          hint: '#7A6E7A',
          muted: '#525252',
          disabled: '#DAE1E7',
          blue: '#020659',
        },
        body: {
          DEFAULT: '#F2F5F7',
          paper: '#FFFFFF',
        },
      },
      boxShadow: {
        'none': 'none',
        'xs': '0px 2px 1px -1px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.042), 0px 1px 3px 0px rgba(0, 0, 0, 0.036)',
        'sm': '0px 3px 1px -2px rgba(0, 0, 0, 0.06), 0px 2px 2px 0px rgba(0, 0, 0, 0.042), 0px 1px 5px 0px rgba(0, 0, 0, 0.036)',
        'DEFAULT': '0px 3px 3px -2px rgba(0, 0, 0, 0.06), 0px 3px 4px 0px rgba(0, 0, 0, 0.042), 0px 1px 8px 0px rgba(0, 0, 0, 0.036)',
        'md': '0px 6px 26px rgba(0, 0, 0, 0.05)',
        'lg': '0px 15px 50px rgba(0, 0, 0, 0.06)',
        'xl': '0px 3px 5px -1px rgba(0, 0, 0, 0.06), 0px 5px 8px 0px rgba(0, 0, 0, 0.042), 0px 1px 14px 0px rgba(0, 0, 0, 0.036)',
        '2xl': '0px 3px 5px -1px rgba(0, 0, 0, 0.06), 0px 6px 10px 0px rgba(0, 0, 0, 0.042), 0px 1px 18px 0px rgba(0, 0, 0, 0.036)',
        // Custom named shadows
        'small': '0px 1px 3px rgba(3, 0, 71, 0.09)',
        'regular': '0px 4px 16px rgba(43, 52, 69, 0.1)',
        'large': '0px 8px 45px rgba(3, 0, 71, 0.09)',
        'border': '0px 0px 28px rgba(3, 0, 71, 0.04)',
        'badge': '0px 8px 20px -5px rgba(255, 103, 128, 0.9)',
      },
      gridTemplateColumns: {
        // If you need custom column configurations
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    scrollbarHide
  ],
} satisfies Config;
