import { request } from '@/lib/request';
import { HotDashboardConfigResponse } from './HotDashboardConfig';

export const getHotDashboardConfig = () => {
  return request<HotDashboardConfigResponse>({
    url: '/common/getHotConfig',
    method: 'GET',
  });
};
