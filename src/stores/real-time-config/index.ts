import { create } from 'zustand';
import { options, wheelTitle } from './const';

type State = typeof options & { wheelTitle: string };

type Action = {
  dispatchUpdate: (value: Partial<State>) => void;
  getDefaultOptions: () => State;
};

export const useRealTimeStore = create<State & Action>((set) => ({
  ...options,
  wheelTitle,
  dispatchUpdate(value) {
    const record: Partial<State> = {};

    if (value?.buttons) {
      record['buttons'] = value?.buttons;
    }
    if (value?.blocks) {
      record['blocks'] = value?.blocks;
    }
    if (value?.prizes) {
      record['prizes'] = value?.prizes;
    }
    if (value.wheelTitle) {
      record['wheelTitle'] = value.wheelTitle;
    }

    set(() => record);
  },
  getDefaultOptions: () => Object.assign(options, { wheelTitle }),
}));
