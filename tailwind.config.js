/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#54b435',
        secondary: '#2f3b40',
        brand: {
          green: '#54b435',
          slate: '#2f3b40',
          charcoal: '#222222',
        },
        dark: {
          900: '#222222',
          800: '#2f3b40',
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
        'neon': '0 0 10px rgba(84, 180, 53, 0.45)',
        'neon-lg': '0 0 20px rgba(84, 180, 53, 0.7)',
      },
    },
  },
  plugins: [],
}
