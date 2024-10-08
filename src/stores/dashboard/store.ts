import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { DashboardType } from '@/enums';
import { ConfigData } from '@/api/common/config';
import { initialState, State } from './initialState';

export interface Action {
  setDefaultDashboard: (payload: Partial<ConfigData>) => void;
  generateRandomIndex: () => number;
}

export type Store = State & Action;

export const useDashboardStore = createWithEqualityFn<Store>()(
  (set, get) => ({
    ...initialState,
    setDefaultDashboard(payload) {
      set({
        default_initial_state: payload,
      });
    },
    generateRandomIndex() {
      const {
        dashboard_type,
        luck_wheel_config,
        luck_grid_config,
        slot_machine_config,
      } = get();

      if (dashboard_type === DashboardType.wheel) {
        return Math.round(Math.random() * (luck_wheel_config?.length ?? 0));
      }
      if (dashboard_type === DashboardType.grid) {
        return Math.round(Math.random() * (luck_grid_config?.length ?? 0));
      }

      return Math.round(Math.random() * (slot_machine_config?.length ?? 0));
    },
  }),
  shallow
);
