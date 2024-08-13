import { create } from 'zustand';
import { options } from './const';

export const useRealTimeStore = create<typeof options>((set) => ({
  ...options,
}));
