/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'Inter', 'sans-serif'],
        display: ['Inter', '"Noto Sans JP"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
