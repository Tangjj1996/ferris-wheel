export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/config/index',
    'pages/nearby/index',
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
        text: '搜索',
      },
      {
        pagePath: 'pages/config/index',
        text: '配置',
      },
    ],
  },
});
