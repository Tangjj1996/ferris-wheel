import { DashboardType } from '../dashboard';

export interface SearchList {
  text: string;
  key: string;
  hot: boolean;
  dashboard_type: DashboardType;
}

export interface State {
  searchList?: SearchList[];
  selectedKey?: string;
}

export const initialState: State = {};
