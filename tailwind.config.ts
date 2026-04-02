import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0a0f1e',
        sapphire: {
          deep: '#1a2d5a',
          mid: '#2e4a8c',
          light: '#4a6cb3',
          glow: '#6b8fd4',
        },
        gold: {
          vintage: '#c9a96e',
          light: '#e8c98a',
          dark: '#a07845',
        },
        parchment: '#f5e6c8',
        rose: {
          soft: '#e8a0bf',
          deep: '#c06080',
          pale: '#f5d0e0',
        },
        cream: '#fdf6e3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        mono: ['"Courier Prime"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 9s ease-in-out 1s infinite',
        'petal-fall': 'petalFall linear infinite',
        'spin-vinyl': 'spin 4s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'typewriter': 'typewriter 4s steps(40) forwards',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'cat-walk': 'catWalk 8s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-50px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(106, 143, 212, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(106, 143, 212, 0.7), 0 0 60px rgba(106, 143, 212, 0.3)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        catWalk: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
      },
    },
  },
  plugins: [],
}

export default config
