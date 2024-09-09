import { useRef } from 'react';
import { vibrateLong } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import { useDashboardStore, beConfig2FeConfig } from '@/stores/dashboard';
import { DashboardType, DashboardOption } from '@/enums';
import EatList from './eat-list';

export default function Index() {
  const {
    dashboard_type,
    dashboard_title,
    generateRandomIndex,
    dashboard_option,
  } = useDashboardStore();
  const { luck_wheel_config } = useDashboardStore(beConfig2FeConfig);
  const lukyRef = useRef<any>();

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
          {dashboard_option === DashboardOption.eat && <EatList />}
        </>
      )}
    </View>
  );
}
