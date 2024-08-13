import { useRealTimeStore } from '@/stores/real-time-config';
import { Button, Form, View, Textarea, FormProps } from '@tarojs/components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ConfigField, FieldValue } from './shared';

export default function Index() {
  const { buttons, blocks, prizes, dispatchUpdate } = useRealTimeStore();
  const { register, handleSubmit, reset, control } = useForm();

  // 提交
  const handleFieldSubmit: SubmitHandler<FieldValue> = (data) => {
    try {
      const { real_time_buttons, real_time_blocks, real_time_prizes } = data;
      const json_real_time_buttons = JSON.parse(real_time_buttons);
      const json_real_time_blocks = JSON.parse(real_time_blocks);
      const json_real_time_prizes = JSON.parse(real_time_prizes);

      dispatchUpdate({
        buttons: json_real_time_buttons,
        blocks: json_real_time_blocks,
        prizes: json_real_time_prizes,
      } as any);
    } catch (e) {
      console.error(e);
    }
  };

  // 重置
  const handleFieldRest = () => {};

  return (
    <Form
      onSubmit={
        handleSubmit(handleFieldSubmit) as unknown as FormProps['onSubmit']
      }
      onReset={handleFieldRest}
    >
      <View className="flex flex-col gap-y-5 p-5 h-screen overflow-auto">
        <View>
          buttons:
          <Controller
            control={control}
            name={ConfigField.real_time_buttons}
            render={({ field: { onChange, value } }) => (
              <Textarea
                maxlength={-1}
                showCount
                autoHeight
                className="bg-slate-50 w-full p-2 mt-2"
                value={value}
                onInput={onChange}
                defaultValue={JSON.stringify(buttons, null, 2)}
              />
            )}
          />
        </View>
        <View>
          blocks:
          <Controller
            control={control}
            name={ConfigField.real_time_blocks}
            render={({ field: { onChange, value } }) => (
              <Textarea
                maxlength={-1}
                autoHeight
                className="bg-slate-50 w-full p-2 mt-2"
                value={value}
                onInput={onChange}
                defaultValue={JSON.stringify(blocks, null, 2)}
              />
            )}
          />
        </View>
        <View>
          prizes:
          <Controller
            control={control}
            name={ConfigField.real_time_prizes}
            render={({ field: { onChange, value } }) => (
              <Textarea
                maxlength={-1}
                showCount
                autoHeight
                className="bg-slate-50 w-full p-2 mt-2"
                value={value}
                onInput={onChange}
                defaultValue={JSON.stringify(prizes, null, 2)}
              />
            )}
          ></Controller>
        </View>
        <View className="flex justify-around">
          <Button formType="reset" className="w-40">
            重置
          </Button>
          <Button type="primary" formType="submit" className="w-40">
            提交
          </Button>
        </View>
      </View>
    </Form>
  );
}
