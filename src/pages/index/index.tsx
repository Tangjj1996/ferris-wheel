import { useRef } from 'react';
import { vibrateLong } from '@tarojs/taro';
import { Button, View } from '@tarojs/components';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import { useDashboardStore, beConfig2FeConfig } from '@/stores/dashboard';
import { getRandomConfig } from '@/api/common/getRandom';
import { DashboardType, DashboardOption } from '@/enums';

export default function Index() {
  const {
    dashboard_type,
    dashboard_title,
    generateRandomIndex,
    dashboard_option,
  } = useDashboardStore();
  const { luck_wheel_config } = useDashboardStore(beConfig2FeConfig);
  const setDefaultDashboard = useDashboardStore((s) => s.setDefaultDashboard);
  const lukyRef = useRef<any>();

  const handleRandom = async () => {
    const { data: wrapData } = (await getRandomConfig()) || {};
    const { data: randomData } = wrapData || {};
    if (randomData && randomData.length) {
      useDashboardStore.setState({
        luck_wheel_config: randomData!,
        dashboard_title: '随便吃点',
      });
      setDefaultDashboard({
        luck_wheel_config: randomData,
        dashboard_title: '随便吃点',
      });
    }
  };

  return (
    <View className="flex flex-col h-full justify-center items-center">
      <View className="flex justify-center items-center absolute top-5">
        {dashboard_title}
      </View>
      {dashboard_type === DashboardType.wheel && (
        <>
          <LuckyWheel
            ref={lukyRef}
            {...luck_wheel_config}
            onStart={() => {
              // 点击抽奖按钮会触发star回调
              // 调用抽奖组件的play方法开始游戏
              lukyRef.current?.play?.();
              lukyRef.current?.stop?.(generateRandomIndex());
            }}
            onEnd={(_prize) => {
              // 抽奖结束会触发end回调
              vibrateLong();
            }}
          />
          {dashboard_option === DashboardOption.eat && (
            <Button
              onClick={handleRandom}
              className="mt-8 border border-dashed border-blue-500 text-blue-500 bg-transparent"
            >
              随便吃点
            </Button>
          )}
        </>
      )}
    </View>
  );
}
