import { create } from 'zustand';
import { wheelList, selectedWheel } from './const';
import { WheelType } from '../shared';

type State = {
  wheelList: typeof wheelList;
  selectedWheel: WheelType;
};

type Action = {
  dispatchSelectedWheel: (key: string) => void;
};

export const useWheelListStore = create<State & Action>((set) => ({
  wheelList,
  selectedWheel,
  dispatchSelectedWheel(_key) {
    const sltWheel = wheelList.find(({ key }) => key === _key)?.targetType;

    if (sltWheel) {
      set({
        selectedWheel: sltWheel,
      });
    }
  },
}));
