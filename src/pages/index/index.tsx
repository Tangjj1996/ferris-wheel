import { useRef } from 'react';
import { vibrateLong } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useRealTimeStore } from '@/stores/real-time-config';
import { LuckyWheel } from '@lucky-canvas/taro/react';

export default function Index() {
  const lukyRef = useRef<any>();
  const { blocks, buttons, prizes, wheelTitle, generateRandomIndex } =
    useRealTimeStore();

  return (
    <View className="flex flex-col h-full justify-center items-center">
      <View className="flex justify-center items-center absolute top-5">
        {wheelTitle}
      </View>
      <LuckyWheel
        width="300px"
        height="300px"
        ref={lukyRef}
        blocks={blocks}
        buttons={buttons}
        prizes={prizes}
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
    </View>
  );
}
