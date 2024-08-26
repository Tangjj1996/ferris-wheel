import { navigateTo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useDashboardStore } from '@/stores/dashboard';
import { useSearchStore } from '@/stores/search';
import { useCommonStore } from '@/stores/common';
import { getRandomConfig } from '@/api/common/getRandom';
import { getEatConfig, Eat } from './shared';

const EatList = () => {
  const configData = useCommonStore((s) => s.configData);
  const selectedKey = useSearchStore((s) => s.selectedKey);
  const setDefaultDashboard = useDashboardStore((s) => s.setDefaultDashboard);

  const handleClick = async (key: Eat | string, index: number) => {
    useSearchStore.setState({ selectedKey: key });
    if (key === Eat.nearby) {
      // todo 先获取授权
      navigateTo({ url: '/pages/nearby/index' });
      return;
    }
    if (key === Eat.casual_meal) {
      const { data: wrapData } = (await getRandomConfig()) || {};
      const { data: randomData } = wrapData || {};
      if (randomData && randomData.length) {
        useDashboardStore.setState({
          luck_wheel_config: randomData!,
          dashboard_title: '随便吃吃',
        });
        setDefaultDashboard({
          luck_wheel_config: randomData,
          dashboard_title: '随便吃吃',
        });
      }
      return;
    }

    if (configData && configData.length) {
      useDashboardStore.setState(configData[index]);
      setDefaultDashboard(configData[index]);
    }
  };

  if (!configData?.length) {
    return null;
  }

  return (
    <View className="flex flex-wrap gap-2 p-4 mt-5">
      {getEatConfig(configData).map(({ text, key, icon }, index) => (
        <View
          key={key}
          className={`flex justify-around items-center h-5 bg-blue-100 p-4 rounded-lg gap-x-2 ${
            selectedKey === key && 'bg-purple-200'
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
