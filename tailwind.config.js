/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(165.47deg, #00159C -1.17%, #000C1F 107.81%)',
      },
    },
  },
  plugins: [],
}

