import { nanoid } from 'nanoid/non-secure';
import { DashboardType } from './stores/dashboard';

/**
 * 中午吃什么列表
 */
export const lunchEat = {
  key: nanoid(),
  dashboard_title: '中文吃什么🍽️',
  dashboard_type: DashboardType.wheel,
  luck_wheel_config: [
    {
      text: '番茄炒蛋🍅',
      priority: null,
    },
    {
      text: '青椒炒肉丝🫑',
      priority: null,
    },
    {
      text: '蒜蓉菠菜🥬',
      priority: null,
    },
    {
      text: '红烧豆腐',
      priority: null,
    },
    {
      text: '清炒虾仁🍤',
      priority: null,
    },
    {
      text: '土豆丝🥔',
      priority: null,
    },
  ],
  luck_grid_config: null,
  slot_machine_config: null,
};

/**
 * 今天谁买单
 */
export const todayPayTheBill = {
  key: nanoid(),
  dashboard_title: '今天谁买单💵',
  dashboard_type: DashboardType.wheel,
  luck_wheel_config: [
    {
      text: '雷电将军🧑‍🌾',
      priority: null,
    },
    {
      text: '万叶👷',
      priority: null,
    },
    {
      text: '胡桃🧑‍⚕️',
      priority: null,
    },
    {
      text: '钟离🧑‍🏫',
      priority: null,
    },
    {
      text: '甘雨👮',
      priority: null,
    },
    {
      text: '纳西妲👴',
      priority: null,
    },
  ],
  luck_grid_config: null,
  slot_machine_config: null,
};
