import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Taro, { useDidShow } from '@tarojs/taro';
import { useDashboardStore } from '@/stores/dashboard';
import { nanoid } from 'nanoid/non-secure';
import { LocalStorageKey } from './enums';
import { ConfigData } from './api/common/config';
import { DashboardType } from './stores/dashboard/shared';
import './app.less';

// create a client
const queryClient = new QueryClient();

const luck_wheel_config = [
  {
    text: '番茄炒蛋🍅',
    priority: null,
  },
  {
    text: '青椒炒肉丝🫑',
    priority: null,
  },
  {
    text: '蒜蓉菠菜🥬',
    priority: null,
  },
  {
    text: '红烧豆腐',
    priority: null,
  },
  {
    text: '清炒虾仁🍤',
    priority: null,
  },
  {
    text: '土豆丝🥔',
    priority: null,
  },
];

function App({ children }: PropsWithChildren<any>) {
  const init = useDashboardStore((s) => s.init);

  useDidShow(() => {
    let configData: ConfigData | null = null;
    const dashboard = Taro.getStorageSync(LocalStorageKey.dashboard);
    // localStorage 已有，直接取本地
    if (dashboard && dashboard?.state?.luck_wheel_config) {
      configData = dashboard.state.luck_wheel_config;
      return;
    }
    // localStorage 没有，但是已登录，取远程
    if (Taro.getStorageSync(LocalStorageKey.openId)) {
      return;
    }
    configData = {
      id: nanoid(),
      dashboard_title: '中文吃什么🍽️',
      dashboard_type: DashboardType.wheel,
      luck_wheel_config,
      luck_grid_config: null,
      slot_machine_config: null,
    };
    // localStorage 没有，未登录，取小程序默认值
    init(configData as unknown as ConfigData);
  });
  // children 是将要会渲染的页面
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default App;
