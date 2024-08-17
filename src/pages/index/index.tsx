import { useRef } from 'react';
import { vibrateLong } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import { useDashboardStore, DashboardType } from '@/stores/dashboard';

export default function Index() {
  const {
    dashboard_type,
    dashboard_title,
    luck_wheel_config,
    generateRandomIndex,
  } = useDashboardStore();
  const lukyRef = useRef<any>();

  return (
    <View className="flex flex-col h-full justify-center items-center">
      <View className="flex justify-center items-center absolute top-5">
        {dashboard_title}
      </View>
      {dashboard_type === DashboardType.wheel && (
        <LuckyWheel
          ref={lukyRef}
          {...luck_wheel_config}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            // 调用抽奖组件的play方法开始游戏
            lukyRef.current?.play?.();
            lukyRef.current?.stop?.(generateRandomIndex());
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            vibrateLong();
          }}
        />
      )}
    </View>
  );
}
