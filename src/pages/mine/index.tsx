import { View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { getConfig } from '@/api/common/getConfig';
import { useCommonStore } from '@/stores/common';

export default function Index() {
  /**
   * 进入到收藏页面前更新下收藏配置数据
   */
  const handleCollection = async () => {
    const { data } = (await getConfig()) || {};
    const { data: configData } = data || {};
    useCommonStore.setState({ configData });
    await navigateTo({
      url: '/pages/collection/index',
    });
  };

  return (
    <View className="flex flex-col gap-y-4 p-4">
      <View
        className="p-3 bg-gray-50 rounded-sm shadow-sm"
        onClick={handleCollection}
      >
        收藏
      </View>
    </View>
  );
}
