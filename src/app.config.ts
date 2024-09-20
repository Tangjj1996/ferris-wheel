export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/config/index',
    'pages/nearby/index',
    'pages/mine/index',
    'pages/collection/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    selectedColor: '#3b82f6',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '大盘',
        iconPath: './assets/icon/house.png',
        selectedIconPath: './assets/icon/house_blue.png',
      },
      {
        pagePath: 'pages/search/index',
        text: '热门',
        iconPath: './assets/icon/flame.png',
        selectedIconPath: './assets/icon/flame_blue.png',
      },
      {
        pagePath: 'pages/config/index',
        text: '配置',
        iconPath: './assets/icon/settings.png',
        selectedIconPath: './assets/icon/settings_blue.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/icon/user.png',
        selectedIconPath: './assets/icon/user_blue.png',
      },
    ],
  },
});
