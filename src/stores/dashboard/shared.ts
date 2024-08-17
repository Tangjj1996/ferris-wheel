import { ConfigData } from '@/api/common/config';
import { isNil } from 'lodash';
import { nanoid } from 'nanoid/non-secure';
import type {
  LuckyWheelConfig,
  LuckyGridConfig,
  SlotMachineConfig,
} from './types';
import { PrizesBg } from '../shared';

export type { LuckyWheelConfig, LuckyGridConfig, SlotMachineConfig };

export enum DashboardType {
  /**
   * 大转盘
   */
  wheel = 'wheel',
  /**
   * 九宫格
   */
  grid = 'grid',
  /**
   * 老虎机
   */
  slotMachine = 'slotMachine',
}

/**
 * 后端数据转换成大转盘
 */
export const transfrom2wheel = (
  luck_wheel_config: ConfigData['luck_wheel_config'] | undefined
): LuckyWheelConfig | null => {
  if (isNil(luck_wheel_config)) return null;

  return {
    width: 300,
    height: 300,
    blocks: [{ padding: '13px', background: '#617df2' }],
    prizes: luck_wheel_config.map(({ text, priority, background }) => ({
      fonts: [{ text, top: '10%' }],
      range: priority ?? undefined,
      background,
      key: nanoid(),
    })),
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
};

/**
 * 后端数据转换成九宫格
 */
export const transform2Grid = (
  luck_grid_config: ConfigData['luck_grid_config'] | undefined
): LuckyGridConfig | null => {
  return null;
};

/**
 * 后端数据转换成老虎机
 */
export const transform2SlotMachnie = (
  slot_machine_config: ConfigData['slot_machine_config'] | undefined
): SlotMachineConfig | null => {
  return null;
};
