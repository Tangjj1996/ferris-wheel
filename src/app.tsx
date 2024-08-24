import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLaunch, login } from '@tarojs/taro';
import { getOpenid } from './api/common/getOpenid';
import './app.less';

// create a client
const queryClient = new QueryClient();

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  useLaunch(async () => {
    const { code } = await login();
    const res = await getOpenid(code);
    console.log(res);
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default App;
