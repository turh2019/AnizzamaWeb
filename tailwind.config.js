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
        'toolbarBg' : "url('/bg/toolbarBg.webp')",
        'bookmark' : "url('/bg/bookmark.webp')",
        'profile' : "url('/bg/profile.png')",
        'PanelCoins' : "url('/bg/CoinsPanel.png')",
        'coin' : "url('/bg/coin.png')"
      }),
      colors: {
        'a': '#1B1651',
        'cover_bg_color': '#261D78',
        'cover_bg_color_2': '#382C8B',
        'cover_bg_color_3': '#382C8B',
        'cover_color':'#4864F6',
        'main_bg_color': '#1B1651',
        'textColor': '#736AC4',
        'linksColor': '#fefefe',
        'main_Inventory': '#1B1651',
        'cover_Inventory': '#261D78',
        'cover_Inventory-button': '#382C8B',
        'Inventory-border': '#1B1651',
 
      },
    },
  },

  plugins: [],
}
