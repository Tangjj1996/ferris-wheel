import { switchTab, navigateTo } from '@tarojs/taro';
import { useWheelListStore } from '@/stores/wheel-list';
import { View, Button } from '@tarojs/components';

export default function Index() {
  const { wheelList, dispatchSelectedWheel } = useWheelListStore();

  const handleClick = (key: string) => {
    dispatchSelectedWheel(key);
    switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className="flex flex-col gap-y-4">
      <Button onClick={() => navigateTo({ url: '/pages/nearby/index' })}>
        跳转
      </Button>
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
