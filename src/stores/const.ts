/**
 * 默认配置项
 */
export const options = {
  blocks: [{ padding: '13px', background: '#617df2' }],
  prizes: [
    { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
  ],
  buttons: [
    { radius: '50px', background: '#617df2' },
    { radius: '45px', background: '#afc8ff' },
    {
      radius: '40px',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始\n抽奖', top: '-20px' }],
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
