import { useRealTimeStore } from '@/stores/real-time-config';
import { navigateBack, useUnload } from '@tarojs/taro';
import { Button, Input, View, Slider, Form } from '@tarojs/components';
import { Controller, useForm } from 'react-hook-form';
import { useCreation, useMount } from 'ahooks';
import { cloneDeep } from 'lodash';
import { PrizesField } from './shared';

export default function Index() {
  const { prizes, dispatchUpdate, getDefaultOptions } = useRealTimeStore();
  const { control, getValues, setValue } = useForm();

  const prizesContainer = useCreation(() => {
    return prizes.map(({ fonts, background, key }) => ({
      fonts,
      background,
      key,
    }));
  }, [prizes]);

  const handleReset = () => {
    const options = getDefaultOptions();
    dispatchUpdate(options);
    prizesContainer.forEach(({ key, fonts, background }) => {
      setValue(`${PrizesField.text}-${key}`, fonts[0].text);
      setValue(`${PrizesField.top}-${key}`, fonts[0].top);
      setValue(`${PrizesField.background}-${key}`, background);
    });
    navigateBack();
  };

  useMount(() => {
    prizesContainer.forEach(({ key, fonts, background }) => {
      setValue(`${PrizesField.text}-${key}`, fonts[0].text);
      setValue(`${PrizesField.top}-${key}`, fonts[0].top);
      setValue(`${PrizesField.background}-${key}`, background);
    });
  });

  // 没找到 beforeRouterLeave 钩子，暂时用这个
  useUnload(() => {
    const formValue = getValues();
    const clonePrizes = cloneDeep(prizes);

    clonePrizes.forEach(({ fonts, background, key }) => {
      background = formValue[`${PrizesField.background}-${key}`];
      fonts[0].text = formValue[`${PrizesField.text}-${key}`];
      fonts[0].top = formValue[`${PrizesField.top}-${key}`];
    });

    dispatchUpdate({
      prizes: clonePrizes,
    });
  });

  return (
    <Form>
      <View>转盘项</View>
      {prizesContainer.map(({ key }) => (
        <View key={key}>
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
              <Slider showValue value={parseInt(value)} onChange={onChange} />
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
      ))}
      <View></View>
      <Button onClick={handleReset}>重置</Button>
    </Form>
  );
}
