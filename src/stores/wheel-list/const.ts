import { nanoid } from 'nanoid/non-secure';
import { wheelEatTitle, wheelMoneyTitle, WheelType } from '../shared';

export const wheelList = [
  {
    text: wheelEatTitle,
    targetType: WheelType.eat,
    key: nanoid(),
  },
  {
    text: wheelMoneyTitle,
    targetType: WheelType.money,
    key: nanoid(),
  },
];

export const selectedWheel: WheelType = WheelType.eat;
