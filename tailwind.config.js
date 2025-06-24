/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jnpr: {
          primary: '#1a1a1a',
          secondary: '#f5f5f5',
          accent: '#ff6b35',
          slider: '#F4FFE3',
          spice: '#FFD392',
        }
      },
      fontFamily: {
        'jnpr': ['Inter', 'system-ui', 'sans-serif'],
        'suisse-mono': ['SuisseIntlMono', 'Consolas', 'Monaco', 'monospace'],
        'formula': ['FormulaCondensed', 'Arial Narrow', 'sans-serif-condensed'],
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400',
        'bold': '700',
      }
    },
  },
  plugins: [],
} 