/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-shadow': {
          '0%, 100%': { 'box-shadow': '0 0 8px 2px var(--tw-shadow-color, rgba(0,0,0,0.2))' },
          '50%': { 'box-shadow': '0 0 16px 6px var(--tw-shadow-color, rgba(0,0,0,0.4))' },
        },
      },
      animation: {
        'pulse-shadow': 'pulse-shadow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}