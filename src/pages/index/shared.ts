import eggPath from '@/assets/icon/egg.svg';
import beefPath from '@/assets/icon/beef.svg';
import soupPath from '@/assets/icon/soup.svg';
import utensilsPath from '@/assets/icon/utensils.svg';
import wheatPath from '@/assets/icon/wheat.svg';
import snailPath from '@/assets/icon/snail.svg';
import { ConfigData } from '@/api/common/config';

export enum Eat {
  breakfast = 'breakfast',
  lunch = 'lunch',
  afternoon_tea = 'afternoon_tea',
  dinner = 'dinner',
  midnight_snack = 'midnight_snack',
  casual_meal = 'casual_meal',
  nearby = 'nearby',
}

export const getEatConfig = (commonData: ConfigData[]) => [
  {
    text: '早餐',
    key: commonData[0].key,
    icon: eggPath,
  },
  {
    text: '午餐',
    key: commonData[1].key,
    icon: beefPath,
  },
  {
    text: '下午茶',
    key: commonData[2].key,
    icon: soupPath,
  },
  {
    text: '晚餐',
    key: commonData[3].key,
    icon: utensilsPath,
  },
  {
    text: '夜宵',
    key: commonData[4].key,
    icon: wheatPath,
  },
  {
    text: '随便吃吃',
    key: Eat.casual_meal,
    icon: snailPath,
  },
];
