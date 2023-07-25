/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2888f7',
          main: '#0177FD',
          dark: '#024da3',
        },
        button: {
          blue: '0177FD',
        },
      },
    },
    fontFamily: {
      medium: 'var(----pretendered-medium-font)',
      semibold: 'var(----pretendered-semiBold-font)',
      bold: 'var(----pretendered-bold-font)',
      regular: 'var(----pretendered-regular-font)',
    },
  },
  plugins: [],
};
