import { nanoid } from 'nanoid/non-secure';

export enum PrizesBg {
  /** 奇数 */
  odd = '#e9e8fe',
  /** 偶数 */
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

const eatPrizes = [
  {
    text: '番茄炒蛋🍅',
    priority: null,
  },
  {
    text: '青椒炒肉丝🫑',
    priority: null,
  },
  {
    text: '蒜蓉菠菜🥬',
    priority: null,
  },
  {
    text: '红烧豆腐',
    priority: null,
  },
  {
    text: '清炒虾仁🍤',
    priority: null,
  },
  {
    text: '土豆丝🥔',
    priority: null,
  },
];

/**
 * 中文吃什么默认配置
 */
export const eatOptions = {
  blocks: [{ padding: '13px', background: '#617df2' }],
  prizes: [
    {
      fonts: [{ text: eatPrizes[0].text, top: '10%' }],
      background: PrizesBg.odd,
      key: nanoid(),
    },
    {
      fonts: [{ text: eatPrizes[1].text, top: '10%' }],
      background: PrizesBg.even,
      key: nanoid(),
    },
    {
      fonts: [{ text: eatPrizes[2].text, top: '10%' }],
      background: PrizesBg.odd,
      key: nanoid(),
    },
    {
      fonts: [{ text: eatPrizes[3].text, top: '10%' }],
      background: PrizesBg.even,
      key: nanoid(),
    },
    {
      fonts: [{ text: eatPrizes[4].text, top: '10%' }],
      background: PrizesBg.odd,
      key: nanoid(),
    },
    {
      fonts: [{ text: eatPrizes[5].text, top: '10%' }],
      background: PrizesBg.even,
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
      background: PrizesBg.odd,
      key: nanoid(),
    },
    {
      fonts: [{ text: '👷', top: '10%' }],
      background: PrizesBg.even,
      key: nanoid(),
    },
    {
      fonts: [{ text: '🧑‍⚕️', top: '10%' }],
      background: PrizesBg.odd,
      key: nanoid(),
    },
    {
      fonts: [{ text: '🧑‍🏫', top: '10%' }],
      background: PrizesBg.even,
      key: nanoid(),
    },
    {
      fonts: [{ text: '👮', top: '10%' }],
      background: PrizesBg.odd,
      key: nanoid(),
    },
    {
      fonts: [{ text: '👴', top: '10%' }],
      background: PrizesBg.even,
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
