module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) =>({
        'bgt-top': "url('/bg/bg_2.webp')",
        'title': "url('/bg/title.webp')",
        'toolbarBg' : "url('/bg/toolbarBg.webp')"
      })
    },
  },
  colors: {
    'bG-Color': '##243c5a',
  },
  plugins: [],
}
