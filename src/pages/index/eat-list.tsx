import { useState } from 'react';
import { navigateTo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useDashboardStore } from '@/stores/dashboard';
import { useCommonStore } from '@/stores/common';
import { eatConfig, Eat } from './shared';

const EatList = () => {
  const configData = useCommonStore((s) => s.configData);
  const [activeKey, setActivekey] = useState<Eat>(Eat.breakfast);

  const handleClick = (key: Eat, index: number) => {
    setActivekey(key);
    if (key === Eat.nearby) {
      // todo 先获取授权
      navigateTo({ url: '/pages/nearby/index' });
      return;
    }
    if (key === Eat.casual_meal) {
      return;
    }

    if (configData && configData.length) {
      useDashboardStore.setState(configData[index]);
    }
  };

  return (
    <View className="flex flex-wrap gap-2 p-4 mt-5">
      {eatConfig.map(({ text, key, icon }, index) => (
        <View
          key={key}
          className={`flex justify-around items-center h-5 bg-blue-100 p-4 rounded-lg gap-x-2 ${
            activeKey === key && 'bg-purple-200'
          }`}
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
