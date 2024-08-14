import { useRef } from 'react';
import { View } from '@tarojs/components';
import { useRealTimeStore } from '@/stores/real-time-config';
import { generateRandomIndex } from '@/stores/real-time-config/const';
import { LuckyWheel } from '@lucky-canvas/taro/react';

export default function Index() {
  const lukyRef = useRef<any>();
  const { blocks, buttons, prizes, wheelTitle } = useRealTimeStore();

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
          // 模拟调用接口异步抽奖
          setTimeout(() => {
            // 调用stop停止旋转并传递中奖索引
            lukyRef.current?.stop?.(generateRandomIndex());
          }, 100);
        }}
        onEnd={(prize) => {
          // 抽奖结束会触发end回调
        }}
      />
    </View>
  );
}
