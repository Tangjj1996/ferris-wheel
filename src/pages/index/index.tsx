import { useRef } from 'react';
import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { LuckyWheel } from '@lucky-canvas/taro/react';
import { getOptions, generateRandomIndex } from './shared';
import './index.less';

export default function Index() {
  const lukyRef = useRef<any>();

  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View>
      <LuckyWheel
        width="300px"
        height="300px"
        {...getOptions()}
        ref={lukyRef}
        onStart={() => {
          // 点击抽奖按钮会触发star回调
          // 调用抽奖组件的play方法开始游戏
          lukyRef.current?.play?.();
          // 模拟调用接口异步抽奖
          setTimeout(() => {
            // 调用stop停止旋转并传递中奖索引
            lukyRef.current?.stop?.(generateRandomIndex());
          }, 2500);
        }}
        onEnd={(prize) => {
          // 抽奖结束会触发end回调
          console.log(prize);
        }}
      />
    </View>
  );
}
