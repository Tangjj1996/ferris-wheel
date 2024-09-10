import { DashboardOption, DashboardType } from '@/enums';

export interface HotDashboardConfigResponse {
  code: number;
  msg: string;
  traceId: string;
  data: HotDashboardConfigData[];
}

export interface HotDashboardConfigData {
  key: string;
  dashboard_title: string;
  dashboard_type: DashboardType;
  dashboard_option: DashboardOption;
  hot: boolean;
  hot_dashboard_config_items: HotDashboardConfigItem[];
}

export interface HotDashboardConfigItem {
  text: string;
  priority: number | null;
  background: string;
  key: string;
}
