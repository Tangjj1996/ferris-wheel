import { switchTab, navigateTo, useDidShow } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import { useSearchStore } from '@/stores/search';
import { useCommonStore } from '@/stores/common';
import { useDashboardStore } from '@/stores/dashboard';

export default function Index() {
  const searchList = useSearchStore((s) => s.searchList);
  const configData = useCommonStore((s) => s.configData);

  useDidShow(() => {
    useSearchStore.setState({
      searchList:
        configData?.map(({ dashboard_title, dashboard_type, key }) => ({
          text: dashboard_title,
          dashboard_type,
          hot: false,
          key,
        })) ?? [],
    });
  });

  /**
   * 点击搜索列表
   * @param key
   */
  const handleClick = (selectedKey: string, index: number) => {
    useSearchStore.setState({
      selectedIndex: index,
      selectedKey: selectedKey,
    });
    const selectConfigData = configData?.find(({ key }) => key === selectedKey);
    if (selectConfigData) {
      useDashboardStore.setState(selectConfigData);
    }
    switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className="flex flex-col gap-y-4">
      <View>
        <Input onClick={() => navigateTo({ url: '/pages/nearby/index' })} />
      </View>
      {searchList?.map(({ text, key }, index) => (
        <View
          key={key}
          className="p-4 bg-gray-50 rounded-lg shadow-sm"
          onClick={() => handleClick(key, index)}
        >
          <View className="text-lg font-semibold text-gray-800">{text}</View>
        </View>
      ))}
    </View>
  );
}
