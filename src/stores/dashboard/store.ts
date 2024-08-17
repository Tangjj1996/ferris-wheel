import {
  getStorageSync,
  setStorageSync,
  removeStorageSync,
} from '@tarojs/taro';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKey } from '@/enums';
import { ConfigData } from '@/api/common/config';
import { nanoid } from 'nanoid/non-secure';
import { isNil } from 'lodash';
import { initialState, State } from './initialState';
import { PrizesBg } from '../shared';
import {
  DashboardType,
  LuckyGridConfig,
  LuckyWheelConfig,
  SlotMachineConfig,
} from './shared';

export interface Action {
  init: (payload: ConfigData) => void;
  generateRandomIndex: () => number;
}

export type Store = State & Action;

/**
 * 后端数据转换成大转盘
 */
export const transfrom2wheel = (
  luck_wheel_config: ConfigData['luck_wheel_config']
): LuckyWheelConfig | null => {
  if (isNil(luck_wheel_config)) return null;

  return {
    width: 300,
    height: 300,
    blocks: [{ padding: '13px', background: '#617df2' }],
    prizes: luck_wheel_config.map((wheel, index) => ({
      fonts: [{ text: wheel.text, top: '10%' }],
      background: index % 2 === 0 ? PrizesBg.even : PrizesBg.odd,
      key: nanoid(),
    })),
    buttons: [
      { radius: '50px', background: '#617df2' },
      { radius: '45px', background: '#afc8ff' },
      {
        radius: '40px',
        background: '#869cfa',
        pointer: true,
        fonts: [{ text: '启动', top: '-20px' }],
      },
    ],
  };
};

/**
 * 后端数据转换成九宫格
 */
export const transform2Grid = (
  luck_grid_config: ConfigData['luck_grid_config']
): LuckyGridConfig | null => {
  return null;
};

/**
 * 后端数据转换成老虎机
 */
export const transform2SlotMachnie = (
  slot_machine_config: ConfigData['slot_machine_config']
): SlotMachineConfig | null => {
  return null;
};

export const useDashboardStore = create<Store>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      init(payload) {
        const {
          id,
          dashboard_title,
          dashboard_type,
          luck_wheel_config,
          luck_grid_config,
          slot_machine_config,
        } = payload;
        set({
          id,
          dashboard_title,
          dashboard_type,
          luck_wheel_config: transfrom2wheel(luck_wheel_config),
          luck_grid_config: transform2Grid(luck_grid_config),
          slot_machine_config: transform2SlotMachnie(slot_machine_config),
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
          return Math.round(
            Math.random() * (luck_wheel_config?.prizes?.length ?? 0)
          );
        }
        if (dashboard_type === DashboardType.grid) {
          return Math.round(
            Math.random() * (luck_grid_config?.prizes?.length ?? 0)
          );
        }

        return Math.round(
          Math.random() * (slot_machine_config?.prizes?.length ?? 0)
        );
      },
    })),
    {
      name: LocalStorageKey.dashboard,
      storage: {
        getItem: getStorageSync,
        setItem: setStorageSync,
        removeItem: removeStorageSync,
      },
    }
  )
);
