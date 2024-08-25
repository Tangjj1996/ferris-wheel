import { navigateTo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useDashboardStore } from '@/stores/dashboard';
import { useCommonStore } from '@/stores/common';
import { eatConfig, Eeat } from './shared';

const EatList = () => {
  const configData = useCommonStore((s) => s.configData);

  const handleClick = (key: Eeat, index: number) => {
    if (key === Eeat.nearby) {
      // todo 先获取授权
      navigateTo({ url: '/pages/nearby/index' });
      return;
    }
    if (key === Eeat.casual_meal) {
      return;
    }

    console.log(configData);
    if (configData && configData.length) {
      useDashboardStore.setState(configData[index]);
    }
  };

  return (
    <View className="flex flex-wrap gap-2 p-4 mt-5">
      {eatConfig.map(({ text, key, icon }, index) => (
        <View
          key={key}
          className="flex justify-around items-center h-5 bg-blue-100 p-4 rounded-lg gap-x-2"
          onClick={() => handleClick(key, index)}
        >
          <Image src={icon} style={{ width: 24, height: 24 }} />
          {text}
        </View>
      ))}
    </View>
  );
};

export default EatList;
