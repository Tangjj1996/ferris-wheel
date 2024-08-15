import { useRealTimeStore } from '@/stores/real-time-config';
import {
  useDidHide,
  getSystemInfoSync,
  showToast,
  vibrateShort,
} from '@tarojs/taro';
import {
  Input,
  View,
  Form,
  Image,
  Picker,
  PickerSelectorProps,
} from '@tarojs/components';
import { Controller, useForm } from 'react-hook-form';
import { useMount } from 'ahooks';
import { cloneDeep, toNumber } from 'lodash';
import { nanoid } from 'nanoid/non-secure';
import circleMinusPath from '@/assets/icon/circle-minus.svg';
import arrowUpPath from '@/assets/icon/arrow-up.svg';
import arrowUpGreyPath from '@/assets/icon/arrow-up-grey.svg';
import arrowDownPath from '@/assets/icon/arrow-down.svg';
import arrowDownGreyPath from '@/assets/icon/arrow-down-grey.svg';
import cogPath from '@/assets/icon/cog.svg';
import { PrizesBg } from '@/stores/real-time-config/const';
import ColorPicker from './color-picker';
import { IndicateNum, PrizesField, WheelTitleField } from './shared';

export default function Index() {
  const { prizes, dispatchUpdate, getDefaultOptions, wheelTitle } =
    useRealTimeStore();
  const { control, getValues, setValue } = useForm();
  const { safeArea } = getSystemInfoSync();

  const setFormValue = (formValue: typeof prizes, title?: string) => {
    formValue.forEach(({ key, fonts, background }) => {
      setValue(`${PrizesField.text}-${key}`, fonts[0].text);
      setValue(`${PrizesField.background}-${key}`, background);
    });
    if (title) {
      setValue(WheelTitleField, title);
    }
  };

  /** 重置 */
  const handleReset = () => {
    const options = getDefaultOptions();
    dispatchUpdate(options);
    setFormValue(options?.prizes, options.wheelTitle);
  };

  /** 新增 */
  const handleAdd = () => {
    const clonePrizes = cloneDeep(prizes);
    clonePrizes.push({
      key: nanoid(),
      fonts: [
        { text: clonePrizes[clonePrizes.length - 1].fonts[0].text, top: '10%' },
      ],
      background: clonePrizes.length % 2 === 0 ? PrizesBg.odd : PrizesBg.even,
    });

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
  };

  /** 删除 */
  const handleDelete = (_key: string) => {
    if (prizes.length === 2) {
      showToast({ title: '请至少保留两项', icon: 'none' });
      return;
    }
    const clonePrizes = cloneDeep(prizes).filter(({ key }) => key !== _key);

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
    vibrateShort();
  };

  /** 上移 */
  const hanldeMoveUp = (_key: string, _index: number) => {
    const clonePrizes = cloneDeep(prizes);
    [clonePrizes[_index - 1], clonePrizes[_index]] = [
      clonePrizes[_index],
      clonePrizes[_index - 1],
    ];

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
    vibrateShort();
  };

  /** 下移 */
  const hanldeMoveDonw = (_key: string, _index: number) => {
    const clonePrizes = cloneDeep(prizes);
    [clonePrizes[_index], clonePrizes[_index + 1]] = [
      clonePrizes[_index + 1],
      clonePrizes[_index],
    ];

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
    vibrateShort();
  };

  const handlePick: PickerSelectorProps['onChange'] = (e) => {
    const { value } = e.detail || {};

    if (toNumber(value) === IndicateNum.reset) {
      handleReset();
    }
    if (toNumber(value) === IndicateNum.add) {
      handleAdd();
    }
  };

  useMount(() => {
    setFormValue(prizes, wheelTitle);
  });

  // 没找到 beforeRouterLeave 钩子，暂时用这个
  useDidHide(() => {
    const formValue = getValues();
    const clonePrizes = cloneDeep(prizes);

    clonePrizes.forEach(({ fonts, key }, index) => {
      clonePrizes[index].background =
        formValue[`${PrizesField.background}-${key}`];
      fonts[0].text = formValue[`${PrizesField.text}-${key}`];
    });

    dispatchUpdate({
      prizes: clonePrizes,
      wheelTitle: formValue[WheelTitleField],
    });
  });

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
          <Picker
            mode="selector"
            range={['重置', '新增']}
            className="flex justify-center items-center mt-2"
            onChange={handlePick}
          >
            <Image src={cogPath} style={{ width: 24, height: 24 }} />
          </Picker>
        </View>
        <View
          style={{ height: (safeArea?.height ?? 100) - 300 }}
          className="px-5 overflow-auto"
        >
          <View className="flex items-center gap-x-4">
            <View className="w-3/6 text-sm text-gray-500">区块</View>
            <View className="w-1/6 text-sm text-gray-500">颜色</View>
            <View className="w-2/6 text-sm text-gray-500">操作</View>
          </View>
          {prizes.map(({ key }, index) => (
            <View className="flex items-center gap-x-4 h-14" key={key}>
              <Controller
                control={control}
                name={`${PrizesField.text}-${key}`}
                render={({ field: { value, onChange } }) => (
                  <View className="w-3/6 flex items-center">
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
                  <View className="w-1/6">
                    <ColorPicker
                      className="w-6 h-6 border border-solid border-gray-300 rounded-md p-2"
                      style={{ background: value }}
                      value={value}
                      onChange={onChange}
                    />
                  </View>
                )}
              />
              <View className="w-2/6 flex gap-x-2 items-center">
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
                    index === prizes.length - 1
                      ? arrowDownGreyPath
                      : arrowDownPath
                  }
                  style={{ width: 24, height: 24 }}
                  onClick={() => {
                    if (index === prizes.length - 1) return;
                    hanldeMoveDonw(key, index);
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </Form>
  );
}
