import {
  DashboardType,
  LuckyGridConfig,
  LuckyWheelConfig,
  SlotMachineConfig,
} from './shared';

export interface State {
  /**
   * 大盘类型
   *
   * 转盘 ｜ 九宫格 ｜ 老虎机
   */
  dashboday_type?: DashboardType;
  /**
   * 转盘配置
   */
  luck_wheel_config?: LuckyWheelConfig;
  /**
   * 九宫格配置
   */
  luck_grid_config?: LuckyGridConfig;
  /**
   *
   */
  slot_machine_config?: SlotMachineConfig;
}

export const initialState: State = {};
