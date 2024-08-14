/**
 * 默认配置项
 */
export const options = {
  blocks: [{ padding: '13px', background: '#617df2' }],
  prizes: [
    { fonts: [{ text: '番茄炒蛋🍅', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '青椒炒肉丝🫑', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '蒜蓉菠菜🥬', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '红烧豆腐🫘', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '清炒虾仁🍤', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '土豆丝🥔', top: '10%' }], background: '#b8c5f2' },
  ],
  buttons: [
    { radius: '50px', background: '#617df2' },
    { radius: '45px', background: '#afc8ff' },
    {
      radius: '40px',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '中午\n吃啥', top: '-20px' }],
    },
  ],
};

/**
 * 随机生成
 * @returns
 */
export const generateRandomIndex = () => {
  const random = Math.random();

  return Math.round(random * 5);
};
