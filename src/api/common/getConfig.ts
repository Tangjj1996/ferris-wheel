import { request } from '../request';
import { ConfigResponse } from './config';

export const getConfig = () => {
  // return request<ConfigResponse>({
  //   url: '/getConfig',
  //   method: 'GET',
  //   data: { userId },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};
