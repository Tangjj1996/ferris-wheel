import { create } from 'zustand';
import { eatOptions, matchOptions, matchWheelTitle } from '../shared';
import { useWheelListStore } from '../wheel-list';

export type State = typeof eatOptions & { wheelTitle: string };

type Action = {
  dispatchUpdate: (value: Partial<State>) => void;
  getDefaultOptions: () => State;
  generateRandomIndex: () => number;
};

export const useRealTimeStore = create<State & Action>((set, get) => {
  const selectedWheel = useWheelListStore.getState().selectedWheel;
  const realOptions = matchOptions[selectedWheel];
  const realWheelTitle = matchWheelTitle[selectedWheel];

  const state = {
    ...realOptions,
    wheelTitle: realWheelTitle,
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
    getDefaultOptions: () =>
      Object.assign(realOptions, { wheelTitle: realWheelTitle }),
    generateRandomIndex: () => {
      return Math.round(Math.random() * get().prizes.length);
    },
  };

  useWheelListStore.subscribe((_state) =>
    set(
      Object.assign(matchOptions[_state.selectedWheel], {
        wheelTitle: matchWheelTitle[_state.selectedWheel],
      })
    )
  );

  return state;
});
