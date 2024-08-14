import { create } from 'zustand';
import { options, wheelTitle } from './const';

type State = typeof options & { wheelTitle: string };

type Action = {
  dispatchUpdate: (value: State) => void;
  getDefaultOptions: () => typeof options;
};

export const useRealTimeStore = create<State & Action>((set) => ({
  wheelTitle,
  ...options,
  dispatchUpdate(value) {
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
