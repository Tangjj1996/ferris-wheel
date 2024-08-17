import {
  DashboardType,
  LuckyGridConfig,
  LuckyWheelConfig,
  SlotMachineConfig,
} from './shared';

export interface State {
  /**
   * 转盘id
   */
  id?: string;
  /**
   * 转盘标题
   */
  dashboard_title?: string;
  /**
   * 大盘类型
   *
   * 转盘 ｜ 九宫格 ｜ 老虎机
   */
  dashboard_type?: DashboardType;
  /**
   * 转盘配置
   */
  luck_wheel_config?: LuckyWheelConfig | null;
  /**
   * 九宫格配置
   */
  luck_grid_config?: LuckyGridConfig | null;
  /**
   * 老虎机配置
   */
  slot_machine_config?: SlotMachineConfig | null;
}

export const initialState: State = {};
