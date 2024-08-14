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
    const record = {};
    if (value?.buttons) {
      record['buttons'] = value?.buttons;
    }
    if (value?.blocks) {
      record['blocks'] = value?.blocks;
    }
    if (value?.prizes) {
      record['prizes'] = value?.prizes;
    }

    set(() => record);
  },
  getDefaultOptions: () => options,
}));
