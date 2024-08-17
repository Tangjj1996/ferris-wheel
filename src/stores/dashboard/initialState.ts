import { ConfigData } from '@/api/common/config';
import { DashboardType } from './shared';

export interface State {
  /**
   * 转盘id
   */
  key?: string;
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
  luck_wheel_config?: ConfigData['luck_wheel_config'];
  /**
   * 九宫格配置
   */
  luck_grid_config?: ConfigData['luck_grid_config'];
  /**
   * 老虎机配置
   */
  slot_machine_config?: ConfigData['slot_machine_config'];
}

export const initialState: State = {};
