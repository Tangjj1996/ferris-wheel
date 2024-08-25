import { request } from '../request';
import { ConfigResponse } from './config';

export const getConfig = () => {
  return request<ConfigResponse>({
    url: '/user/config',
    method: 'GET',
  });
};
