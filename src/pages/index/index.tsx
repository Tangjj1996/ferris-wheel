import { useRef } from 'react';
import { navigateTo } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useRealTimeStore } from '@/stores/real-time-config';
import { generateRandomIndex } from '@/stores/const';
import { useBoolean } from 'ahooks';
import { LuckyWheel } from '@lucky-canvas/taro/react';

export default function Index() {
  const lukyRef = useRef<any>();
  const { blocks, buttons, prizes } = useRealTimeStore();
  const [isWheeling, { setTrue: setWheelTrue, setFalse: setWheelFalse }] =
    useBoolean(false);

  return (
    <View className="flex flex-col items-center justify-center h-full">
      <View>
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
            setWheelTrue();
            lukyRef.current?.play?.();
            // 模拟调用接口异步抽奖
            setTimeout(() => {
              // 调用stop停止旋转并传递中奖索引
              lukyRef.current?.stop?.(generateRandomIndex());
            }, 100);
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            setWheelFalse();
          }}
        />
      </View>
      <Button
        disabled={isWheeling}
        type="primary"
        className="mt-10 ml-5 mr-5"
        onClick={() => {
          navigateTo({ url: '/pages/config/index' });
        }}
      >
        查看实时配置
      </Button>
    </View>
  );
}
