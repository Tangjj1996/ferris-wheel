import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getStorageSync } from '@tarojs/taro';
import { LocalStorageKey } from '@/enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 开发环境 */
export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

/** 生产环境 */
export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

export const isLogined = () => {
  return !!getStorageSync(LocalStorageKey.accessToken);
};
