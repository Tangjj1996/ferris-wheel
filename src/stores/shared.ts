import { nanoid } from 'nanoid/non-secure';

export enum PrizesBg {
  /** 奇数 */
  odd = '#e9e8fe',
  /** */
  even = '#b8c5f2',
}

export enum WheelType {
  /** 中午吃什么转盘 */
  eat = 'eat',
  /** 今天谁买单转盘 */
  money = 'money',
}

export const wheelEatTitle = '中午吃什么🍽️';

export const wheelMoneyTitle = '今天谁买单💰';

/**
 * 中文吃什么默认配置
 */
export const eatOptions = {
  blocks: [{ padding: '13px', background: '#617df2' }],
  prizes: [
    {
      fonts: [{ text: '番茄炒蛋🍅', top: '10%' }],
      background: '#e9e8fe',
      key: nanoid(),
    },
    {
      fonts: [{ text: '青椒炒肉丝🫑', top: '10%' }],
      background: '#b8c5f2',
      key: nanoid(),
    },
    {
      fonts: [{ text: '蒜蓉菠菜🥬', top: '10%' }],
      background: '#e9e8fe',
      key: nanoid(),
    },
    {
      fonts: [{ text: '红烧豆腐🫘', top: '10%' }],
      background: '#b8c5f2',
      key: nanoid(),
    },
    {
      fonts: [{ text: '清炒虾仁🍤', top: '10%' }],
      background: '#e9e8fe',
      key: nanoid(),
    },
    {
      fonts: [{ text: '土豆丝🥔', top: '10%' }],
      background: '#b8c5f2',
      key: nanoid(),
    },
  ],
  buttons: [
    { radius: '50px', background: '#617df2' },
    { radius: '45px', background: '#afc8ff' },
    {
      radius: '40px',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '启动', top: '-20px' }],
    },
  ],
};

/**
 * 今天谁买单默认配置
 */
export const moneyOptions = {
  blocks: [{ padding: '13px', background: '#617df2' }],
  prizes: [
    {
      fonts: [{ text: '🧑‍🌾', top: '10%' }],
      background: '#e9e8fe',
      key: nanoid(),
    },
    {
      fonts: [{ text: '👷', top: '10%' }],
      background: '#b8c5f2',
      key: nanoid(),
    },
    {
      fonts: [{ text: '🧑‍⚕️', top: '10%' }],
      background: '#e9e8fe',
      key: nanoid(),
    },
    {
      fonts: [{ text: '🧑‍🏫', top: '10%' }],
      background: '#b8c5f2',
      key: nanoid(),
    },
    {
      fonts: [{ text: '👮', top: '10%' }],
      background: '#b8c5f2',
      key: nanoid(),
    },
  ],
  buttons: [
    { radius: '50px', background: '#617df2' },
    { radius: '45px', background: '#afc8ff' },
    {
      radius: '40px',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '启动', top: '-20px' }],
    },
  ],
};

export const matchOptions = {
  [WheelType.eat]: eatOptions,
  [WheelType.money]: moneyOptions,
};

export const matchWheelTitle = {
  [WheelType.eat]: wheelEatTitle,
  [WheelType.money]: wheelMoneyTitle,
};
