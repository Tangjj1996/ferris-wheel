import { request } from '../request';

export const getOpenid = (code: string) => {
  return request<any>({
    method: 'POST',
    url: '/auth/wx-login',
    data: {
      code,
    },
  });
};
