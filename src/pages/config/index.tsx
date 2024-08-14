import { useRealTimeStore } from '@/stores/real-time-config';
import { useUnload, getSystemInfoSync, showToast } from '@tarojs/taro';
import { Input, View, Slider, Form } from '@tarojs/components';
import { Controller, useForm } from 'react-hook-form';
import { useMount } from 'ahooks';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid/non-secure';
import { PrizesField } from './shared';

export default function Index() {
  const { prizes, dispatchUpdate, getDefaultOptions } = useRealTimeStore();
  const { control, getValues, setValue } = useForm();
  const { safeArea } = getSystemInfoSync();

  const setFormValue = (formValue: typeof prizes) => {
    formValue.forEach(({ key, fonts, background }) => {
      setValue(`${PrizesField.text}-${key}`, fonts[0].text);
      setValue(`${PrizesField.top}-${key}`, parseInt(fonts[0].top));
      setValue(`${PrizesField.background}-${key}`, background);
    });
  };

  /** 重置 */
  const handleReset = () => {
    const options = getDefaultOptions();
    dispatchUpdate(options);
    setFormValue(options?.prizes);
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
    if (prizes.length === 1) {
      showToast({ title: '请至少保留一项', icon: 'none' });
      return;
    }
    const clonePrizes = cloneDeep(prizes).filter(({ key }) => key !== _key);

    dispatchUpdate({
      prizes: clonePrizes,
    });
    setFormValue(clonePrizes);
  };

  useMount(() => {
    setFormValue(prizes);
  });

  // 没找到 beforeRouterLeave 钩子，暂时用这个
  useUnload(() => {
    const formValue = getValues();
    const clonePrizes = cloneDeep(prizes);

    clonePrizes.forEach(({ fonts, key }, index) => {
      clonePrizes[index].background =
        formValue[`${PrizesField.background}-${key}`];
      fonts[0].text = formValue[`${PrizesField.text}-${key}`];
      fonts[0].top = `${formValue[`${PrizesField.top}-${key}`]}%`;
    });

    dispatchUpdate({
      prizes: clonePrizes,
    });
  });

  return (
    <Form>
      <View className="flex flex-col gap-y-5">
        <View className="px-5 text-lg text-gray-500">转盘项</View>
        <View
          style={{ height: (safeArea?.height ?? 100) - 160 }}
          className="px-5 overflow-auto"
        >
          {prizes.map(({ key }) => (
            <View
              key={key}
              className="flex w-full items-center justify-between gap-x-4"
            >
              <View className="flex flex-col flex-1 gap-y-3">
                <Controller
                  control={control}
                  name={`${PrizesField.text}-${key}`}
                  render={({ field: { value, onChange } }) => (
                    <Input value={value} onInput={onChange} />
                  )}
                />
                <Controller
                  control={control}
                  name={`${PrizesField.top}-${key}`}
                  render={({ field: { value, onChange } }) => (
                    <Slider
                      style={{ margin: 0 }}
                      showValue
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${PrizesField.background}-${key}`}
                  render={({ field: { value, onChange } }) => (
                    <Input value={value} onInput={onChange} />
                  )}
                />
              </View>
              <View className="text-blue-500" onClick={() => handleDelete(key)}>
                删除
              </View>
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
