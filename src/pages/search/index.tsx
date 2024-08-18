import { switchTab, navigateTo, useDidShow } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';
import { useSearchStore } from '@/stores/search';
import { DashboardType, useDashboardStore } from '@/stores/dashboard';
import { lunchEat, todayPayTheBill } from '@/consts';
import { isLogined } from '@/lib/utils';

export default function Index() {
  const searchList = useSearchStore((s) => s.searchList);

  useDidShow(() => {
    if (isLogined()) {
      // todo 根据配置拿到用户自己的所有列表数据
      return;
    }

    useSearchStore.setState({
      searchList: [
        {
          text: lunchEat.dashboard_title,
          key: lunchEat.key,
          hot: false,
          dashboard_type: DashboardType.wheel,
        },
        {
          text: todayPayTheBill.dashboard_title,
          key: todayPayTheBill.key,
          hot: false,
          dashboard_type: DashboardType.wheel,
        },
      ],
    });
  });

  /**
   * 跳转到大盘
   */
  const setDashboard = (key: string) => {
    if (isLogined()) {
      // todo 根据 key 拿到 dashboard 配置
      return;
    }
    if (key === lunchEat.key) {
      useDashboardStore.setState(lunchEat);
    }
    if (key === todayPayTheBill.key) {
      useDashboardStore.setState(todayPayTheBill);
    }
  };

  /**
   * 点击搜索列表
   * @param key
   */
  const handleClick = (key: string) => {
    useSearchStore.setState({ selectedKey: key });
    setDashboard(key);
    switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className="flex flex-col gap-y-4">
      <View>
        <Input onClick={() => navigateTo({ url: '/pages/nearby/index' })} />
      </View>
      {searchList?.map(({ text, key }) => (
        <View
          key={key}
          className="p-4 bg-gray-50 rounded-lg shadow-sm"
          onClick={() => handleClick(key)}
        >
          <View className="text-lg font-semibold text-gray-800">{text}</View>
        </View>
      ))}
    </View>
  );
}
