import { switchTab, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useSearchStore } from '@/stores/search';
import { useDashboardStore } from '@/stores/dashboard';
import { getHotDashboardConfig } from '@/api/common/getHotDashboardConfig';

export default function Index() {
  const setDefaultDashboard = useDashboardStore((s) => s.setDefaultDashboard);
  const searchList = useSearchStore((s) => s.searchList);
  const hotDashboard = useSearchStore((s) => s.hotDashboard);

  useDidShow(async () => {
    try {
      const {
        data: { data },
      } = await getHotDashboardConfig();

      useSearchStore.setState({
        hotDashboard: data,
        searchList: data.map(
          ({
            dashboard_title,
            dashboard_type,
            key,
            dashboard_option,
            is_hot,
          }) => ({
            text: dashboard_title,
            dashboard_type,
            is_hot,
            key,
            dashboard_option,
          })
        ),
      });
    } catch (error) {
      console.log(error);
    }
  });

  /**
   * 选中
   * @param key
   */
  const handleClick = (selectedKey: string) => {
    const {
      dashboard_type,
      dashboard_title,
      dashboard_option,
      hot_dashboard_config_items: luck_wheel_config,
    } = hotDashboard?.find(({ key }) => key === selectedKey) || {};
    const options = {
      dashboard_type,
      dashboard_title,
      dashboard_option,
      luck_wheel_config,
    };
    useDashboardStore.setState(options);
    setDefaultDashboard(options);
    switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className="flex flex-col gap-y-4 p-4">
      {searchList?.map(({ text, key }) => (
        <View
          key={key}
          className="p-3 bg-gray-50 rounded-sm shadow-sm"
          onClick={() => handleClick(key)}
        >
          <View className="font-medium text-gray-800">{text}</View>
        </View>
      ))}
    </View>
  );
}
