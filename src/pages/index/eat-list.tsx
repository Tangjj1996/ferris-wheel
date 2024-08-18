import { navigateTo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { eatConfig, Eeat } from './shared';

const EatList = () => {
  const handleClick = (key: Eeat) => {
    if (key === Eeat.nearby) {
      // todo 先获取授权
      navigateTo({ url: '/pages/nearby/index' });
    }
  };

  return (
    <View className="flex flex-wrap gap-2 p-4 mt-5">
      {eatConfig.map(({ text, key, icon }) => (
        <View
          key={key}
          className="flex justify-around items-center h-5 bg-blue-100 p-4 rounded-lg gap-x-2"
          onClick={() => handleClick(key)}
        >
          <Image src={icon} style={{ width: 24, height: 24 }} />
          {text}
        </View>
      ))}
    </View>
  );
};

export default EatList;
