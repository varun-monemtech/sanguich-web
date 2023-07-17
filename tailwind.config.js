/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './WP/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        0: '0',
        1: '0.4rem',
        '1-5': '0.6rem',
        2: '0.8rem',
        3: '1.2rem',
        4: '1.6rem',
        5: '2rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4rem',
        11: '4.4rem',
        12: '4.8rem',
        13: '5.2rem',
        14: '5.6rem',
        15: '6rem',
        'nav-h': 'var(--nav-h)'
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        complimentary: ['var(--font-complimentary)'],
      },
      fontSize: {
        'sm': ['.85rem', 1],
        'md': ['1rem', 1.35],
        'lg': ['1.5rem', 1.1],
        'xl': ['3.25rem', 1.1],
        'xxl': ['5rem', 1.1],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        primary: 'rgba(242, 13, 98, 0.5) 0px 1px 40px',
        secondary: 'rgba(40,93,223,1) 0px 1px 40px',
      },
      zIndex: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
        1000: 1000
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(236deg, rgba(255,145,0,1) 0%, rgba(218,50,110,1) 31%, rgba(222,62,67,1) 66%, rgba(255,131,21,1) 100%)',
        'primary-gradient-variant': 'linear-gradient(236deg, rgba(251,111,17,1) 0%, rgba(230,33,103,1) 24%, rgba(242,13,98,1) 67%, rgba(242,66,13,1) 100%)',
        'secondary-gradient': 'linear-gradient(236deg, rgba(178,17,251,1) 0%, rgba(40,93,223,1) 34%, rgba(82,13,242,1) 68%, rgba(159,13,242,1) 100%)',
        'secondary-gradient-variant': 'linear-gradient(236deg, rgba(40,93,223,1) 0%, rgba(178,17,251,1) 40%, rgba(159,13,242,1) 65%, rgba(82,13,242,1) 100%)'
      },
    },
  },
  plugins: [],
}
