import { useRealTimeStore } from '@/stores/real-time-config';
import {
  useDidHide,
  getSystemInfoSync,
  showToast,
  vibrateShort,
} from '@tarojs/taro';
import { Input, View, Form, Image } from '@tarojs/components';
import { Controller, useForm } from 'react-hook-form';
import { useMount } from 'ahooks';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid/non-secure';
import circleMinusPath from '@/assets/icon/circle-minus.svg';
import { PrizesField, WheelTitleField } from './shared';

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
      fonts: [{ text: '番茄炒蛋🍅', top: '10%' }],
      background: '#e9e8fe',
    });

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
  };

  /** 删除 */
  const handleDelete = (_key: string) => {
    if (prizes.length === 2) {
      showToast({ title: '请至少保留一项', icon: 'none' });
      return;
    }
    const clonePrizes = cloneDeep(prizes).filter(({ key }) => key !== _key);

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
    vibrateShort();
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
              <Input value={value} onInput={onChange} />
            )}
          />
        </View>
        <View className="px-5 text-lg text-gray-500">转盘项</View>
        <View
          style={{ height: (safeArea?.height ?? 100) - 300 }}
          className="px-5 overflow-auto"
        >
          <View className="flex items-center">
            <View className="w-2/3">名称</View>
            <View className="w-1/3">色块</View>
          </View>
          {prizes.map(({ key }) => (
            <View className="flex items-center h-10" key={key}>
              <Controller
                control={control}
                name={`${PrizesField.text}-${key}`}
                render={({ field: { value, onChange } }) => (
                  <View className="flex items-center w-2/3 gap-x-4">
                    <Image
                      src={circleMinusPath}
                      style={{ width: 24, height: 24 }}
                      onClick={() => handleDelete(key)}
                    />
                    <Input value={value} onInput={onChange} />
                  </View>
                )}
              />
              <Controller
                control={control}
                name={`${PrizesField.background}-${key}`}
                render={({ field: { value, onChange } }) => (
                  <Input className="w-1/3" value={value} onInput={onChange} />
                )}
              />
            </View>
          ))}
        </View>
        <View className="flex justify-center items-center gap-x-10">
          <View className="text-blue-500" onClick={handleReset}>
            重置
          </View>
          <View className="text-blue-500" onClick={handleAdd}>
            新增
          </View>
        </View>
      </View>
    </Form>
  );
}
