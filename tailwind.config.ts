import type { Config } from 'tailwindcss';
import { black, white, slate, stone } from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black,
      white,
      slate,
      stone,
    },
    extend: {
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': {
            'text-shadow':
              '0 0 5px #fff, 0 0 10px #ffe798, 0 0 30px #ffe798, 0 0 50px #ffe798, 0 0 70px #ffe798',
          },
          '50%': {
            'text-shadow':
              '0 0 5px #fff, 0 0 20px #9FF4F7, 0 0 40px #9FF4F7, 0 0 60px #9FF4F7, 0 0 80px #9FF4F7',
          },
          '100%': {
            'text-shadow':
              '0 0 5px #fff, 0 0 30px #BB98FF, 0 0 50px #BB98FF, 0 0 70px #BB98FF, 0 0 90px #BB98FF',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-itc-willow)'],
      },
    },
  },
} satisfies Config;
