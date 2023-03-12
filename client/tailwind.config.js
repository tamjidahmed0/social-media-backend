/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'mbl': {'max': '425px'}
    },
    extend: {
      colors:{
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.18)",
        "mirage": "#151929",
        "dark": "#1C2438",
        "sea": "#389A80"
      }
    },
  },
  plugins: [
    'tailwindcss',
    'autoprefixer',
    'tailwind-scrollbar',
  ],
}
