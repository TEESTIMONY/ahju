/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FF99',
        secondary: '#00C4FF',
        dark: {
          900: '#0a0a0a',
          800: '#121212',
        },
        light: {
          bg: '#f5f5f5',
          text: '#1a1a1a',
          gray: '#e5e5e5',
        },
      },
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 153, 0.5)',
        'neon-lg': '0 0 20px rgba(0, 255, 153, 0.8)',
      },
    },
  },
  plugins: [],
}
