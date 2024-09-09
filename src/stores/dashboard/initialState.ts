import { ConfigData } from '@/api/common/config';
import { DashboardOption, DashboardType } from '@/enums';

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
   * 转盘选项
   */
  dashboard_option?: DashboardOption;
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
  /**
   * 默认配置（可以是前端，也可以是后端）
   */
  default_initial_state?: State;
}

export const initialState: State = {};
