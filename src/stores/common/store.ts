import { create } from 'zustand';
import { initialState, State } from './initState';

interface Action {}

export type Store = State & Action;

export const useCommonStore = create<Store>()((set) => ({
  ...initialState,
}));
