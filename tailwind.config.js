/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        '86-screen': '86vh',
        '72-screen': '72vh',
        '68-screen': '68vh'
        },
       colors: {
         'dark-red': {
           500: '#6e0000',
           50: '#eecece'
          }
     }
    },
    fontFamily: {
      'body': ['"Open Sans"']
    }
  },
  plugins: [  require('@tailwindcss/forms')]
};

