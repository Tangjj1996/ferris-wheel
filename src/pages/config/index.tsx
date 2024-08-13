import { useRealTimeStore } from '@/stores/real-time-config';
import { Button, Form, View, Editor, Textarea } from '@tarojs/components';
import { useForm } from 'react-hook-form';
import { ConfigField } from './shared';

export default function Index() {
  const { buttons, blocks, prizes } = useRealTimeStore();
  const { register, handleSubmit } = useForm();

  return (
    <Form>
      <View className="flex flex-col gap-y-5 p-5">
        <View>
          buttons:
          <Textarea
            className="bg-slate-50 w-full p-2 mt-2"
            {...register(ConfigField.real_time_buttons)}
            value={JSON.stringify(buttons, null, 2)}
          />
        </View>
        <View>
          blocks:
          <Textarea
            className="bg-slate-50 w-full p-2 mt-2"
            {...register(ConfigField.real_time_blocks)}
            value={JSON.stringify(blocks, null, 2)}
          />
        </View>
        <View>
          prizes
          <Textarea
            className="bg-slate-50 w-full p-2 mt-2"
            {...register(ConfigField.real_time_prizes)}
            value={JSON.stringify(prizes, null, 2)}
          />
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
