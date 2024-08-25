import { DashboardOption, DashboardType } from '@/stores/dashboard/shared';

export interface ConfigResponse {
  code: number;
  msg: string;
  traceId: string;
  data: ConfigData[];
}

interface ConfigData {
  key: string;
  dashboard_title: string;
  dashboard_type: DashboardType;
  dashboard_option: DashboardOption;
  luck_wheel_config: LuckyWheelConfig[] | null;
  luck_grid_config: LuckyGridConfig[] | null;
  slot_machine_config: SlotMachineConfig[] | null;
}

interface LuckyWheelConfig {
  text: string;
  priority: null | number;
  background: string;
  key: string;
}

interface LuckyGridConfig {}

interface SlotMachineConfig {}
