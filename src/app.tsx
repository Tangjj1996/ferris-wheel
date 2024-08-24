import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLaunch, login, setStorageSync, getStorageSync } from '@tarojs/taro';
import { getOpenid } from './api/common/getOpenid';
import { getConfig } from './api/common/getConfig';
import './app.less';
import { LocalStorageKey } from './enums';

// create a client
const queryClient = new QueryClient();

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    if (!getStorageSync(LocalStorageKey.openId)) {
      const { code } = await login();
      const { data } = (await getOpenid(code)) || {};
      const {
        data: { openid },
      } = data || {};
      setStorageSync(LocalStorageKey.openId, openid);
    }
    await getConfig();
  });

  // children 是将要会渲染的页面
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default App;
