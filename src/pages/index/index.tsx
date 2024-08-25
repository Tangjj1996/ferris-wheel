import { useRef } from 'react';
import { vibrateLong } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import {
  useDashboardStore,
  DashboardType,
  beConfig2FeConfig,
  DashboardOption,
} from '@/stores/dashboard';
import { useSearchStore } from '@/stores/search';
import { useCommonStore } from '@/stores/common';
import EatList from './eat-list';
import { Eat } from './shared';

export default function Index() {
  const { dashboard_type, dashboard_title, generateRandomIndex } =
    useDashboardStore();
  const { luck_wheel_config } = useDashboardStore(beConfig2FeConfig);
  const configData = useCommonStore((s) => s.configData);
  const selectedKey = useSearchStore((s) => s.selectedKey);
  const lukyRef = useRef<any>();

  const renderEatList = () => {
    if ([Eat.casual_meal, Eat.nearby].includes(selectedKey as Eat)) {
      return <EatList />;
    }

    if (
      configData
        ?.filter(
          ({ dashboard_option }) => dashboard_option === DashboardOption.eat
        )
        ?.some(({ key }) => key === selectedKey)
    ) {
      return <EatList />;
    }
    return null;
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
          {renderEatList()}
        </>
      )}
    </View>
  );
}
