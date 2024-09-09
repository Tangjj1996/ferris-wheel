export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/config/index',
    'pages/nearby/index',
    'pages/mine/index',
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
      },
      {
        pagePath: 'pages/search/index',
        text: '热门',
      },
      {
        pagePath: 'pages/config/index',
        text: '配置',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
});
