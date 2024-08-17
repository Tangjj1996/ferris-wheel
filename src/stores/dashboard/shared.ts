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
