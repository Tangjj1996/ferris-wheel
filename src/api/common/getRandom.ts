import { request } from '@/lib/request';
import { RandomResponse } from './random';

export const getRandomConfig = () => {
  return request<RandomResponse>({
    url: '/common/getRandomConfig',
    method: 'GET',
  });
};
