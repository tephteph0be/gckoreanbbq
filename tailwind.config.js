/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#3e0202',
          red: '#710d0d',
          lightred: '#8b1212',
          card: '#490606',
          btn: '#7a1111',
          btnhighlight: '#5e0b0b'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
        button: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

