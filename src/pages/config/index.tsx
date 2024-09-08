import { useEffect, useMemo } from 'react';
import {
  getSystemInfoSync,
  showToast,
  vibrateShort,
  nextTick,
  useDidHide,
  useDidShow,
} from '@tarojs/taro';
import { Input, View, Form, Image, Button } from '@tarojs/components';
import { Controller, useForm } from 'react-hook-form';
import { debounce, isNil, toNumber } from 'lodash';
import { produce } from 'immer';
import { nanoid } from 'nanoid/non-secure';
import circleMinusPath from '@/assets/icon/circle-minus.svg';
import arrowUpPath from '@/assets/icon/arrow-up.svg';
import arrowUpGreyPath from '@/assets/icon/arrow-up-grey.svg';
import arrowDownPath from '@/assets/icon/arrow-down.svg';
import arrowDownGreyPath from '@/assets/icon/arrow-down-grey.svg';
import { PrizesBg } from '@/stores/shared';
import { useBoolean } from 'ahooks';
import {
  beConfig2FeConfig,
  useDashboardStore,
  Store as DashboardStore,
} from '@/stores/dashboard';
import { useSearchStore } from '@/stores/search';
import ColorPicker from './color-picker';
import { PrizesField, WheelTitleField } from './shared';

export default function Index() {
  const { luck_wheel_config } = useDashboardStore(beConfig2FeConfig);
  const default_initial_state = useDashboardStore(
    (s) => s.default_initial_state
  );
  const dashboard_title = useDashboardStore((s) => s.dashboard_title);
  const { control, setValue, watch } = useForm();
  const { safeArea } = getSystemInfoSync();
  const [isNeedWaching, { setTrue: setWatchTrue, setFalse: setWatchFalse }] =
    useBoolean(false);
  const formValues = watch();

  const setFormValue = (
    formValue: NonNullable<typeof luck_wheel_config>['prizes'],
    title?: string
  ) => {
    formValue?.forEach(({ key, fonts, background, range }) => {
      setValue(`${PrizesField.text}-${key}`, fonts?.[0]?.text);
      setValue(`${PrizesField.background}-${key}`, background);
      setValue(`${PrizesField.range}-${key}`, range);
    });
    if (title) {
      setValue(WheelTitleField, title);
    }
  };

  /** 重置 */
  const handleReset = () => {
    if (isNil(default_initial_state)) return;

    useDashboardStore.setState(default_initial_state);
    useSearchStore.setState({ selectedKey: default_initial_state.key });
    setFormValue(
      beConfig2FeConfig(default_initial_state as DashboardStore)
        .luck_wheel_config?.prizes,
      default_initial_state.dashboard_title
    );
    vibrateShort();
  };

  /** 新增 */
  const handleAdd = () => {
    const newPrizes = produce(luck_wheel_config?.prizes, (draft) => {
      draft?.push({
        key: nanoid(),
        fonts: [
          {
            text: draft[draft.length - 1]?.fonts?.[0]?.text ?? '',
            top: '10%',
          },
        ],
        background: draft.length % 2 === 0 ? PrizesBg.odd : PrizesBg.even,
      });
    });

    if (isNil(newPrizes)) return;
    const { key, fonts, background, range } = newPrizes[newPrizes.length - 1];
    if (isNil(key) || isNil(fonts) || isNil(background)) return;

    useDashboardStore.setState(
      produce<DashboardStore>((draft) => {
        draft.luck_wheel_config?.push({
          text: fonts[0].text,
          key,
          background,
          priority: range ?? null,
        });
      })
    );
    setFormValue(newPrizes);
    vibrateShort();
  };

  /** 删除 */
  const handleDelete = (key: string | undefined) => {
    const { prizes } = luck_wheel_config || {};
    if (isNil(prizes)) return;

    if (prizes.length === 2) {
      showToast({ title: '请至少保留两项', icon: 'none' });
      return;
    }
    const newPrizes = produce(prizes, (draft) => {
      return draft.filter((prize) => prize.key !== key);
    });

    useDashboardStore.setState(
      produce<DashboardStore>((draft) => {
        draft.luck_wheel_config = newPrizes.map(
          ({ key: iKey, fonts, background, range }) => ({
            key: iKey!,
            text: fonts?.[0].text ?? '',
            background: background!,
            priority: range ?? null,
          })
        );
      })
    );
    setFormValue(newPrizes);
    vibrateShort();
  };

  /** 上移 */
  const hanldeMoveUp = (_key: string | undefined, index: number) => {
    const { prizes } = luck_wheel_config || {};
    if (isNil(prizes)) return;

    const upPrizes = produce(prizes, (draft) => {
      [draft[index - 1], draft[index]] = [draft[index], draft[index - 1]];
    });

    useDashboardStore.setState(
      produce<DashboardStore>((draft) => {
        draft.luck_wheel_config = upPrizes.map(
          ({ key: iKey, fonts, background, range }) => ({
            key: iKey!,
            text: fonts?.[0].text ?? '',
            background: background!,
            priority: range ?? null,
          })
        );
      })
    );
    setFormValue(upPrizes);
    vibrateShort();
  };

  /** 下移 */
  const hanldeMoveDonw = (_key: string | undefined, index: number) => {
    const { prizes } = luck_wheel_config || {};
    if (isNil(prizes)) return;

    const downPrizes = produce(prizes, (draft) => {
      [draft[index], draft[index + 1]] = [draft[index + 1], draft[index]];
    });

    useDashboardStore.setState(
      produce<DashboardStore>((draft) => {
        draft.luck_wheel_config = downPrizes.map(
          ({ key: iKey, fonts, background, range }) => ({
            key: iKey!,
            text: fonts?.[0].text ?? '',
            background: background!,
            priority: range ?? null,
          })
        );
      })
    );
    setFormValue(downPrizes);
    vibrateShort();
  };

  useDidShow(() => {
    nextTick(() => {
      const { prizes } = luck_wheel_config || {};
      setFormValue(prizes, dashboard_title);
    });
  });

  useDidShow(() => setWatchTrue());

  useDidHide(() => setWatchFalse());

  // 在组件外部定义防抖函数
  const debouncedUpdateDashboardState = useMemo(
    () =>
      debounce(
        (_formValues) => {
          useDashboardStore.setState(
            produce<DashboardStore>((draft) => {
              draft.luck_wheel_config?.forEach((item) => {
                item.text = _formValues[`${PrizesField.text}-${item.key}`];
                item.background =
                  _formValues[`${PrizesField.background}-${item.key}`];
                item.priority = _formValues[`${PrizesField.range}-${item.key}`];
              });
              draft.dashboard_title = _formValues[WheelTitleField];
            })
          );
        },
        300,
        { leading: false, trailing: true }
      ),
    []
  );

  useEffect(() => {
    // 离开(hide)页面，主动取消监听
    if (!isNeedWaching) return;

    debouncedUpdateDashboardState(formValues);

    return () => {
      debouncedUpdateDashboardState.cancel();
    };
  }, [formValues, isNeedWaching, debouncedUpdateDashboardState]);

  return (
    <Form>
      <View className="flex flex-col gap-y-5">
        <View className="px-5 text-lg text-gray-500">转盘名称</View>
        <View className="px-5">
          <Controller
            control={control}
            name={WheelTitleField}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onInput={onChange}
                className="border border-solid border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
        </View>
        <View className="px-5 text-lg text-gray-500 flex items-center gap-x-2">
          转盘项
        </View>
        <View
          style={{ height: (safeArea?.height ?? 100) - 300 }}
          className="px-5 overflow-auto"
        >
          <View className="flex items-center gap-x-4">
            <View className="w-5/12 text-sm text-gray-500">区块</View>
            <View className="w-2/12 text-sm text-gray-500">色板</View>
            <View className="w-2/12 text-sm text-gray-500">权重</View>
            <View className="w-3/12 text-sm text-gray-500">操作</View>
          </View>
          {luck_wheel_config?.prizes?.map(({ key }, index) => (
            <View className="flex items-center gap-x-4 h-14" key={key}>
              <Controller
                control={control}
                name={`${PrizesField.text}-${key}`}
                render={({ field: { value, onChange } }) => (
                  <View className="w-5/12 flex items-center">
                    <Input
                      className="border border-solid border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={value}
                      onInput={onChange}
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name={`${PrizesField.background}-${key}`}
                render={({ field: { value, onChange } }) => (
                  <View className="w-2/12">
                    <ColorPicker
                      className="w-6 h-6 border border-solid border-gray-300 rounded-md p-2"
                      style={{ background: value }}
                      value={value}
                      onChange={onChange}
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name={`${PrizesField.range}-${key}`}
                render={({ field: { value, onChange } }) => (
                  <View className="w-2/12">
                    <Input
                      type="digit"
                      placeholder="无"
                      className="border border-solid border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={value ?? undefined}
                      onInput={(e) => onChange(toNumber(e.detail.value))}
                    />
                  </View>
                )}
              />

              <View className="w-3/12 flex gap-x-2 items-center">
                <Image
                  src={circleMinusPath}
                  style={{ width: 24, height: 24 }}
                  onClick={() => {
                    handleDelete(key);
                  }}
                />
                <Image
                  src={index === 0 ? arrowUpGreyPath : arrowUpPath}
                  style={{ width: 24, height: 24 }}
                  onClick={() => {
                    if (index === 0) return;
                    hanldeMoveUp(key, index);
                  }}
                />
                <Image
                  src={
                    index === (luck_wheel_config?.prizes?.length ?? 0) - 1
                      ? arrowDownGreyPath
                      : arrowDownPath
                  }
                  style={{ width: 24, height: 24 }}
                  onClick={() => {
                    if (index === (luck_wheel_config?.prizes?.length ?? 0) - 1)
                      return;
                    hanldeMoveDonw(key, index);
                  }}
                />
              </View>
            </View>
          ))}
          <View className="flex justify-between items-center gap-x-4 mt-4">
            <Button
              className="border border-dashed border-blue-500 text-blue-500 bg-transparent w-1/3"
              onClick={handleReset}
            >
              收藏
            </Button>
            <Button
              className="border border-dashed border-blue-500 text-blue-500 bg-transparent w-1/3"
              onClick={handleReset}
            >
              重置
            </Button>
            <Button
              className="
            border border-dashed border-blue-500 text-blue-500 bg-transparent w-1/3"
              onClick={handleAdd}
            >
              新增
            </Button>
          </View>
        </View>
      </View>
    </Form>
  );
}
