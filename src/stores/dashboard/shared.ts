export type {
  LuckyWheelConfig,
  LuckyGridConfig,
  SlotMachineConfig,
} from './types';

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
export const transfrom2wheel = () => {};

/**
 * 后端数据转换成九宫格
 */
export const transform2Grid = () => {};

/**
 * 后端数据转换成老虎机
 */
export const transform2SlotMachnie = () => {};

export const PersistKey = 'dashboard';
