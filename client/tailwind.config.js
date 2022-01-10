module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          blue: '#7289da',
          white: '#ffffff',
          light: '#36383e',
          gray: '#2e3137',
          dark: '#212325',
          bluegray: '#40444b',
        },
      },
    },
    height: {
      10: '10rem',
      20: '20rem',
      '10v': '10vh',
      '20v': '20vh',
      '30v': '30vh',
      '40v': '40vh',
      '50v': '50vh',
      '60v': '60vh',
      '70v': '70vh',
      '80v': '80vh',
      '90v': '90vh',
      '100v': '100vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
