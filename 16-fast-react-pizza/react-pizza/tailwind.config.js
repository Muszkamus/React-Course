/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // This is for Tailwind to scan React files
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace', // Sans (Whole project)
      //  specificContent: 'Roboto Mono, monospace' // Could be used for specific places
    },

    extend: {
      colors: { title: '#123456' }, // This can be used for specific content as well
    },
  },
  plugins: [],
};
