import { fontFamily } from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}',
];
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      mblue: '#121268',
      mred: '#E20000',
      mgold: '#FFAB48',
      mlightblue: '#37ABE1',
      categorybg: 'rgba(180, 180, 180, 0.5)',
      dark: '#1A1A1A',
      textBlack: '#242429',
      textDarkGray: '#4D4D4D',
      textGray: '#808080',
      textLight: '#878799',
      textDarkt: '#636370',
      fillLightGray: '#CCCCCC',
      fillLightBgLightContr: '#F5F5FA',
      fillLightBgHightContr: '#E6E6FA',
      fillLightGray3: '#F5F5F5',
      fillNavyBlue: '#121268',
      fillRed: '#EB6767',
      fillGreen: '#73D169',
      fillOrange: '#EB9C52',
      fillBlue: '#468ADA',
      strokeLightGray1: '#dcdcfa',
      fillButtonLowContrastDefault: '#E1E1F5',
      fillTableHead: '#E1E1F5',
      fillTableRow: '#F0F0FA',
      fillTableRow2: '#F5F5FA',
      fillTableStrokeTableHead: '#dcdcfa',
      fillTableStrokeTableRow: '#E6E6FA',
      srokeLight1: '#DCDCFA',
      fillBGBlockbg: '#F2F2FA',
      fillButtonAccentDefault: '#7A7ACC',
      fillFormRest: '#E6E6FA',
      textCaptioninform: '#BCBCD6',
      fillLinkRest: '#878799',
    },
    fontFamily: {
      aeroport: ['var(--font-aeroport)', ...fontFamily.sans],
      roboto: ['var(--font-roboto)', ...fontFamily.sans],
      mw: ['var(--font-mw)', ...fontFamily.sans],
      mw_sans: ['var(--font-mwsans)', ...fontFamily.sans],
      alexandria: ['var(--font-alexandria)', ...fontFamily.sans],
    },
    gridTemplateRows: {
      full3: 'repeat(3, 33.333333333333333333333%)',
    },
    boxShadow: {
      form: '0px 4px 8px rgba(0, 0, 0, 0.25)',
      quizButton: '0px 2px 16px 0px rgba(0, 0, 0, 0.10)',
    },
    gridTemplateColumns: {
      home_custom: '56% 44%',
      footer: '70% 30%',
      video: '80px calc(100% - 80px)',
      search: '1fr 70px',
      four: 'repeat(4, 1fr)',
      three: 'repeat(3, 1fr)',
      two: 'repeat(2, 1fr)',
      one: 'repeat(1, 1fr)',
      advert_step: '51px 130px 1fr',
    },
    height: {
      home: 'calc(100vh - 51px)',
      mesh: 'calc(100vh - 300px)',
    },
    borderRadius: {
      five: '5px',
    },
    backgroundImage: {
      'fancy-input':
        'linear-gradient(90.91deg, rgba(55, 171, 225, 0.07) 16.09%, rgba(55, 171, 225, 0.19) 115.87%)',
      mesh: 'linear-gradient(360deg, #FFFFFF 10.05%, rgba(255, 255, 255, 0) 100%), linear-gradient(277.27deg, #68A5A7 3.72%, #005BCB 50.48%, #74B783 100%)',
      step_line: 'url(/step_line.svg)',
      step_tick: 'url(/step_tick.svg)',
      fancyTitle: 'linear-gradient(180deg, #121268 50%, rgba(18, 18, 104, 0.10) 100%)',
      fancySubtitle: 'linear-gradient(180deg, #FFF 0%, rgba(215, 215, 215, 0.10) 100%)',
    },

    animation: {
      buble: 'buble 7s infinite',
    },

    keyframes: {
      buble: {
        '0%': {
          transform: 'scale(1) translate(0%, 0%)',
        },
        '33%': {
          transform: 'scale(0.7) translate(40%, 20%)',
        },
        '66%': {
          transform: 'scale(1.2) translate(10%, 20%)',
        },
        '100%': {
          transform: 'scale(1) translate(0%, 0%)',
        },
      },
    },
  },
};
export const plugins = [];
