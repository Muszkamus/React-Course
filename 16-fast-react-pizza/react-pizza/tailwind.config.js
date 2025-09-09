/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 this is for Tailwind to scan your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
