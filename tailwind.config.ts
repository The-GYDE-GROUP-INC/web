import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['HelveticaNeue', 'sans-serif'],
        montreal: ['PPNeueMontreal', 'sans-serif'],
      },
      colors: {
        primary: '#D0841B',
        'primary-dark': '#a6660e',
        'primary-subtle': '#E9B992',
        'light-primary': '#FAF3E8',
        'dim-primary': '#E9C696',
        'light-grey': '#424242',
        'dim-grey': '#5D5D5D',
        'dark-grey': '#212121',
        'actual-grey': '#F2F2F2',
        dark: '#333333',
        divider: '#C8C8C8',
        danger: '#B33629',
        yellow: '#FEC73B',
        'success-subtle': '#8dd28e33',
        'success-light': '#64A965',
        success: '#388738',
      },
      backgroundImage: {
        'profile-auth': 'url("/assets/images/profile-auth.png")',
      },
      boxShadow: {
        custom: '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
