import { nanoid } from 'nanoid/non-secure';
import eggPath from '@/assets/icon/egg.svg';
import beefPath from '@/assets/icon/beef.svg';
import soupPath from '@/assets/icon/soup.svg';
import utensilsPath from '@/assets/icon/utensils.svg';
import wheatPath from '@/assets/icon/wheat.svg';
import snailPath from '@/assets/icon/snail.svg';

export const eatConfig = [
  {
    text: '早餐',
    key: nanoid(),
    icon: eggPath,
  },
  {
    text: '午餐',
    key: nanoid(),
    icon: beefPath,
  },
  {
    text: '下午茶',
    key: nanoid(),
    icon: soupPath,
  },
  {
    text: '晚餐',
    key: nanoid(),
    icon: utensilsPath,
  },
  {
    text: '夜宵',
    key: nanoid(),
    icon: wheatPath,
  },
  {
    text: '随便吃吃',
    key: nanoid(),
    icon: snailPath,
  },
];
