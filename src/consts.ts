import { nanoid } from 'nanoid/non-secure';
import { DashboardType } from './stores/dashboard';
import { ConfigData } from './api/common/config';
import { PrizesBg } from './stores/shared';

/**
 * 中午吃什么列表
 */
export const lunchEat: ConfigData = {
  key: nanoid(),
  dashboard_title: '中文吃什么🍽️',
  dashboard_type: DashboardType.wheel,
  luck_wheel_config: [
    {
      text: '番茄炒蛋🍅',
      background: PrizesBg.odd,
      priority: null,
    },
    {
      text: '青椒炒肉丝🫑',
      background: PrizesBg.even,
      priority: null,
    },
    {
      text: '蒜蓉菠菜🥬',
      priority: null,
      background: PrizesBg.odd,
    },
    {
      text: '红烧豆腐',
      priority: null,
      background: PrizesBg.even,
    },
    {
      text: '清炒虾仁🍤',
      priority: null,
      background: PrizesBg.odd,
    },
    {
      text: '土豆丝🥔',
      priority: null,
      background: PrizesBg.even,
    },
  ],
  luck_grid_config: null,
  slot_machine_config: null,
};

/**
 * 今天谁买单
 */
export const todayPayTheBill: ConfigData = {
  key: nanoid(),
  dashboard_title: '今天谁买单💵',
  dashboard_type: DashboardType.wheel,
  luck_wheel_config: [
    {
      text: '雷电将军🧑‍🌾',
      background: PrizesBg.odd,
      priority: null,
    },
    {
      text: '万叶👷',
      priority: null,
      background: PrizesBg.even,
    },
    {
      text: '胡桃🧑‍⚕️',
      background: PrizesBg.odd,
      priority: null,
    },
    {
      text: '钟离🧑‍🏫',
      priority: null,
      background: PrizesBg.even,
    },
    {
      text: '甘雨👮',
      background: PrizesBg.odd,
      priority: null,
    },
    {
      text: '纳西妲👴',
      priority: null,
      background: PrizesBg.even,
    },
  ],
  luck_grid_config: null,
  slot_machine_config: null,
};
