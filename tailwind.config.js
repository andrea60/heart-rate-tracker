module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend:{
      boxShadow:{
        'even-sm': '0px 0px 2px 1px rgba(0,0,0,0.1)' 
      },
      colors: {
        'main': { DEFAULT: '#393948',  '50': '#57576E',  '100': '#54546A',  '200': '#4D4D62',  '300': '#474759',  '400': '#404051',  '500': '#393948',  '600': '#32323F',  '700': '#2B2B37',  '800': '#25252E',  '900': '#1E1E26'},
        'back': { DEFAULT: '#22222C', '50': '#252530', '100': '#22222C', '200': '#1B1B23' }, 
        'primary': '#00b4d8',
        'primary-dark': '#0096c7',
        'primary-light': '#48cae4'
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    }
  },
  plugins: [],
}
