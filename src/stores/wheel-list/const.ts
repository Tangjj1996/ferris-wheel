import { nanoid } from 'nanoid/non-secure';
import { WheelType } from '../shared';

export const wheelList = [
  {
    text: '中午吃什么🍽️',
    targetType: WheelType.eat,
    key: nanoid(),
  },
  {
    text: '今天谁买单💰',
    targetType: WheelType.money,
    key: nanoid(),
  },
];

export const selectedWheel: WheelType = WheelType.eat;
