import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { initialState, State } from './initialState';
import { PersistKey } from './shared';

export interface Action {
  init: () => Promise<void>;
}

export type Store = State & Action;

export const useDashboardStore = create<Store>()(
  persist(
    immer((set) => ({
      ...initialState,
      async init() {
        set({});
      },
    })),
    { name: PersistKey }
  )
);
