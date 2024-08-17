import { request as _request, getStorageSync } from '@tarojs/taro';
import { merge } from 'lodash';
import { HttpStatus, LocalStorageKey } from '@/enums';
import { isDev } from '@/lib/utils';

type RequestOptions<T, U> = Parameters<typeof _request<T, U>>[number];

const baseUrl = (() => {
  if (isDev()) {
    return '';
  }
  return '';
})();

export const request = async <T, U = any>(optoins: RequestOptions<T, U>) => {
  const defaultOptions: Partial<RequestOptions<T, U>> = {
    header: {
      accessToken: getStorageSync(LocalStorageKey.accessToken),
    },
  };
  const mergedOptinos = merge(defaultOptions, optoins);
  mergedOptinos.url = `${baseUrl}${mergedOptinos.url}`;

  try {
    const result = await _request(mergedOptinos);
    if (result.statusCode === HttpStatus.UNAUTHORIZED) {
    }

    return result;
  } catch (e) {}
};
