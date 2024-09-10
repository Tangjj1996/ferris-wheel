import { switchTab, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useSearchStore } from '@/stores/search';
import { getHotDashboardConfig } from '@/api/common/getHotDashboardConfig';

export default function Index() {
  const searchList = useSearchStore((s) => s.searchList);

  useDidShow(async () => {
    try {
      const {
        data: { data },
      } = await getHotDashboardConfig();

      useSearchStore.setState({
        searchList: data.map(
          ({
            dashboard_title,
            dashboard_type,
            key,
            dashboard_option,
            hot,
          }) => ({
            text: dashboard_title,
            dashboard_type,
            hot,
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
   * 点击搜索列表
   * @param key
   */
  const handleClick = (selectedKey: string) => {
    useSearchStore.setState({ selectedKey });
    switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className="flex flex-col gap-y-4">
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
