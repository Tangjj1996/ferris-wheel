import { useRealTimeStore } from '@/stores/real-time-config';
import { Form, View } from '@tarojs/components';

export default function Index() {
  const { buttons, blocks, prizes } = useRealTimeStore();

  return <Form>{JSON.stringify(buttons)}</Form>;
}
