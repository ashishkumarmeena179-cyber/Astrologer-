/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Cosmic Backgrounds
        cosmic: {
          950: '#050614', // Deepest Black/Blue
          900: '#0f1025', // Main Background
          800: '#1a1b4b', // Card Background
          700: '#2d2b55', // Lighter Card
        },
        // Mystical Accents
        mystic: {
          dark: '#4c1d95', // Deep Purple
          DEFAULT: '#8b5cf6', // Primary Purple
          light: '#a78bfa', // Light Purple
          glow: '#d8b4fe', // Pale Glow
        },
        // Neon Glows
        accent: {
          cyan: '#06b6d4',
          teal: '#14b8a6',
          pink: '#ec4899',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'serif'], // Used for Headings/Tarot Titles
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #0f1025, #1a1b4b)',
        'mystic-gradient': 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      }
    },
  },
  plugins: [],
}
