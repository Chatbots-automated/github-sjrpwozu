/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 50px -12px rgba(212, 165, 165, 0.25)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'elegant': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        'luxe': '0 0 35px -5px rgba(212, 165, 165, 0.35)'
      },
      backgroundImage: {
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-elegant': 'linear-gradient(to right bottom, rgba(212, 165, 165, 0.05), rgba(212, 165, 165, 0.1))',
      },
      keyframes: {
        shine: {
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        shine: 'shine 1.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.6s ease-out forwards'
      },
      colors: {
        background: '#FAF7F5',
        accent: {
          DEFAULT: '#D4A5A5',
          dark: '#BF8F8F',
          light: '#E5C3C3'
        },
        'text-primary': '#2C1810',
        'text-secondary': '#65524A'
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
        'sans': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}