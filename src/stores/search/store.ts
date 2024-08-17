import { create } from 'zustand';
import { initialState, State } from './initialState';

interface Action {}

export type Store = State & Action;

export const useSearchStore = create<Store>()(() => ({
  ...initialState,
}));
