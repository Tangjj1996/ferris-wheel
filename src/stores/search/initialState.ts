import { DashboardOption, DashboardType } from '@/enums';
import type { HotDashboardConfigData } from '@/api/common/HotDashboardConfig';

export interface SearchList {
  text: string;
  key: string;
  is_hot: boolean;
  dashboard_type: DashboardType;
  dashboard_option: DashboardOption;
}

export interface State {
  searchList?: SearchList[];
  selectedKey?: string;
  hotDashboard?: HotDashboardConfigData[];
}

export const initialState: State = {};
