export default defineAppConfig({
  pages: ['pages/index/index', 'pages/list/index', 'pages/config/index'],
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
        pagePath: 'pages/list/index',
        text: '列表',
      },
      {
        pagePath: 'pages/config/index',
        text: '配置',
      },
    ],
  },
});
