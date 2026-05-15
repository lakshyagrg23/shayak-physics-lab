/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'physics-dark': '#0a0e27',
        'physics-blue': '#1e3a8a',
        'electric-blue': '#00d4ff',
        'neon-green': '#39ff14',
        'glass-light': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-lab': 'linear-gradient(135deg, #0a0e27 0%, #1e3a8a 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
