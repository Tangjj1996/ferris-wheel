import { View } from '@tarojs/components';
import { switchTab } from '@tarojs/taro';
import { useDashboardStore } from '@/stores/dashboard';
import { useCommonStore } from '@/stores/common';

export default function Index() {
  const configData = useCommonStore((s) => s.configData);
  const setDefaultDashboard = useDashboardStore((s) => s.setDefaultDashboard);

  /**
   * 选中
   * @param key
   */
  const handleClick = (selectedKey: string) => {
    const {
      dashboard_type,
      dashboard_title,
      dashboard_option,
      luck_wheel_config,
    } = configData?.find(({ key }) => key === selectedKey) || {};
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
      {configData?.map(({ key, dashboard_title }) => (
        <View key={key} className="p-3 bg-gray-50 rounded-sm shadow-sm">
          <View
            className="font-medium text-gray-800"
            onClick={() => handleClick(key)}
          >
            {dashboard_title}
          </View>
        </View>
      ))}
    </View>
  );
}
