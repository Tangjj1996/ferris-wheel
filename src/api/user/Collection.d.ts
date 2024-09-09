import { DashboardOption, DashboardType } from '@/enums';

export interface CollectionReq {
  dashboard_title: string;
  dashboard_type: DashboardType;
  dashboard_option: DashboardOption;
  user_dashboard_config_items: CollectionItem[];
}

export interface CollectionItem {
  text: string;
  background: string;
  priority: number | null;
}

export interface CollectionRes {
  code: number;
  msg: string | string[];
  traceId: string;
  data: null;
}
