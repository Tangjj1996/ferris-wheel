import { request } from '../request';

export const getOpenid = (code: string) => {
  return request<any>({
    method: 'POST',
    url: '/api/auth/wx-login',
    data: {
      code,
    },
  });
};
