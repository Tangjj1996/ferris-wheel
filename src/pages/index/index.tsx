import { useRef } from 'react';
import { vibrateLong, getStorageSync, useLoad } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import {
  useDashboardStore,
  DashboardType,
  beConfig2FeConfig,
} from '@/stores/dashboard';
import { ConfigData } from '@/api/common/config';
import { LocalStorageKey } from '@/enums';
import { lunchEat } from '@/consts';
import { useSearchStore } from '@/stores/search';
import EatList from './eat-list';

export default function Index() {
  const {
    dashboard_type,
    dashboard_title,
    generateRandomIndex,
    setDefaultDashboard,
  } = useDashboardStore();
  const { luck_wheel_config } = useDashboardStore(beConfig2FeConfig);
  const selectedKey = useSearchStore((s) => s.selectedKey);
  const lukyRef = useRef<any>();

  // useLoad(() => {
  //   const dashboard = getStorageSync(LocalStorageKey.dashboard);
  //   if (dashboard && dashboard?.state?.luck_wheel_config) {
  //     // localStorage 已有，不需要再设置
  //     return;
  //   }

  //   useDashboardStore.setState(lunchEat as unknown as ConfigData);
  //   setDefaultDashboard(lunchEat as unknown as ConfigData);
  // });

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
          {selectedKey === lunchEat.key && <EatList />}
        </>
      )}
    </View>
  );
}
