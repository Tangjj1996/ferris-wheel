import { useWheelList } from '@/stores/wheel-list';
import { View } from '@tarojs/components';
import { switchTab } from '@tarojs/taro';

export default function Index() {
  const { wheelList, dispatchSelectedWheel } = useWheelList();

  const handleClick = (key: string) => {
    dispatchSelectedWheel(key);
    switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className="flex flex-col gap-y-4">
      {wheelList.map(({ text, key }) => (
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
