import { create } from 'zustand';
import { options } from './const';

export const useRealTimeStore = create<
  typeof options & {
    dispatchUpdate: (value: any) => any;
    getDefaultOptions: () => any;
  }
>((set) => ({
  ...options,
  dispatchUpdate(value: any) {
    set(() => ({
      buttons: value?.buttons,
      blocks: value?.blocks,
      prizes: value?.prizes,
    }));
  },
  getDefaultOptions: () => options,
}));
