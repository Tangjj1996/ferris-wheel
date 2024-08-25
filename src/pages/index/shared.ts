import eggPath from '@/assets/icon/egg.svg';
import beefPath from '@/assets/icon/beef.svg';
import soupPath from '@/assets/icon/soup.svg';
import utensilsPath from '@/assets/icon/utensils.svg';
import wheatPath from '@/assets/icon/wheat.svg';
import snailPath from '@/assets/icon/snail.svg';
import mapPinPath from '@/assets/icon/map-pin.svg';

export enum Eat {
  breakfast = 'breakfast',
  lunch = 'lunch',
  afternoon_tea = 'afternoon_tea',
  dinner = 'dinner',
  midnight_snack = 'midnight_snack',
  casual_meal = 'casual_meal',
  nearby = 'nearby',
}

export const eatConfig = [
  {
    text: '早餐',
    key: Eat.breakfast,
    icon: eggPath,
  },
  {
    text: '午餐',
    key: Eat.lunch,
    icon: beefPath,
  },
  {
    text: '下午茶',
    key: Eat.afternoon_tea,
    icon: soupPath,
  },
  {
    text: '晚餐',
    key: Eat.dinner,
    icon: utensilsPath,
  },
  {
    text: '夜宵',
    key: Eat.midnight_snack,
    icon: wheatPath,
  },
  {
    text: '随便吃吃',
    key: Eat.casual_meal,
    icon: snailPath,
  },
  {
    text: '附近',
    key: Eat.nearby,
    icon: mapPinPath,
  },
];
