import { useRef } from 'react';
import { View, Form, Input } from '@tarojs/components';
import { useRealTimeStore } from '@/stores/real-time-config';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import './index.less';

export default function Index() {
  const lukyRef = useRef<any>();
  const realTimeStore = useRealTimeStore(({ blocks, buttons, prizes }) => ({
    blocks,
    buttons,
    prizes,
  }));

  return (
    <View>
      <View className="mt-20">
        <LuckyWheel
          width="300px"
          height="300px"
          ref={lukyRef}
          blocks={realTimeStore.blocks}
          buttons={realTimeStore.buttons}
          prizes={realTimeStore.prizes}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            // 调用抽奖组件的play方法开始游戏
            lukyRef.current?.play?.();
            // 模拟调用接口异步抽奖
            setTimeout(() => {
              // 调用stop停止旋转并传递中奖索引
              lukyRef.current?.stop?.(0);
            }, 100);
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            console.log(prize);
          }}
        />
      </View>
    </View>
  );
}
