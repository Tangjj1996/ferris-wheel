import { View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';

export default function Index() {
  const handleCollection = () => {
    navigateTo({
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
