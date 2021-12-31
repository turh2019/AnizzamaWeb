module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) =>({
        'bgt-top': "url('/bg/bg_2.png')",
        'title': "url('/bg/title.png')",
        'toolbarBg' : "url('/bg/toolbarBg.png')"
      })
    },
  },
  colors: {
    'bG-Color': '#243c5a',
  },
  plugins: [],
}
