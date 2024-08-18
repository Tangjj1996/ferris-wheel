import eggPath from '@/assets/icon/egg.svg';
import beefPath from '@/assets/icon/beef.svg';
import soupPath from '@/assets/icon/soup.svg';
import utensilsPath from '@/assets/icon/utensils.svg';
import wheatPath from '@/assets/icon/wheat.svg';
import snailPath from '@/assets/icon/snail.svg';
import mapPinPath from '@/assets/icon/map-pin.svg';

export enum Eeat {
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
    key: Eeat.breakfast,
    icon: eggPath,
  },
  {
    text: '午餐',
    key: Eeat.lunch,
    icon: beefPath,
  },
  {
    text: '下午茶',
    key: Eeat.afternoon_tea,
    icon: soupPath,
  },
  {
    text: '晚餐',
    key: Eeat.dinner,
    icon: utensilsPath,
  },
  {
    text: '夜宵',
    key: Eeat.midnight_snack,
    icon: wheatPath,
  },
  {
    text: '随便吃吃',
    key: Eeat.casual_meal,
    icon: snailPath,
  },
  {
    text: '附近',
    key: Eeat.nearby,
    icon: mapPinPath,
  },
];
