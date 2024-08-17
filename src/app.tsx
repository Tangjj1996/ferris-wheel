import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './app.less';

// create a client
const queryClient = new QueryClient();

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default App;
