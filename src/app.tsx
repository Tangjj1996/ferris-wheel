import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLaunch, login, setStorageSync, getStorageSync } from '@tarojs/taro';
import { getOpenid } from './api/common/getOpenid';
import { getConfig } from './api/common/getConfig';
import { LocalStorageKey } from './enums';
import { useDashboardStore } from './stores/dashboard';
import { useCommonStore } from './stores/common';
import { exceptionBiz } from './lib/utils';
import './app.less';

// create a client
const queryClient = new QueryClient();

function App({ children }: PropsWithChildren<any>) {
  const { setDefaultDashboard } = useDashboardStore();

  // 启动的时候用一次，后面就用本地数据
  useLaunch(async () => {
    try {
      if (!getStorageSync(LocalStorageKey.openId)) {
        const { code } = await login();
        const { data } = (await getOpenid(code)) || {};
        const {
          data: { openid },
        } = data || {};
        setStorageSync(LocalStorageKey.openId, openid);
      }
      const { data: userResult } = (await getConfig()) || {};
      const { data: userData } = userResult || {};

      if (userData && userData.length) {
        useCommonStore.setState({ configData: userData });
        useDashboardStore.setState(userData[0]);
        setDefaultDashboard(userData[0]);
      }
    } catch (e) {
      exceptionBiz(e);
    }
  });

  // children 是将要会渲染的页面
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default App;
