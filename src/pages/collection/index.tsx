import { View, Image } from '@tarojs/components';
import { switchTab, showToast } from '@tarojs/taro';
import { useDashboardStore } from '@/stores/dashboard';
import { useCommonStore } from '@/stores/common';
import circleMinusPath from '@/assets/icon/circle-minus.svg';
import { deleteCollection } from '@/api/user/deleteCollection';
import { getConfig } from '@/api/common/getConfig';

export default function Index() {
  const configData = useCommonStore((s) => s.configData);
  const setDefaultDashboard = useDashboardStore((s) => s.setDefaultDashboard);

  /**
   * 选中
   * @param key
   */
  const handleClick = (selectedKey: string) => {
    const {
      dashboard_type,
      dashboard_title,
      dashboard_option,
      luck_wheel_config,
    } = configData?.find(({ key }) => key === selectedKey) || {};
    const options = {
      dashboard_type,
      dashboard_title,
      dashboard_option,
      luck_wheel_config,
    };
    useDashboardStore.setState(options);
    setDefaultDashboard(options);
    switchTab({ url: '/pages/index/index' });
  };

  /**
   * 删除
   */
  const handleDelete = async (key: string) => {
    try {
      const {
        data: { code },
      } = (await deleteCollection({ key })) || {};
      if (code === 200) {
        const {
          data: { data },
        } = (await getConfig()) || {};
        useCommonStore.setState({ configData: data });
      }
    } catch (e) {
      showToast({ title: '删除失败' });
    }
  };

  return (
    <View className="flex flex-col gap-y-4 p-4">
      {configData?.map(({ key, dashboard_title }) => (
        <View
          key={key}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-sm shadow-sm"
        >
          <View
            className="font-medium text-gray-800"
            onClick={() => handleClick(key)}
          >
            {dashboard_title}
          </View>
          <Image
            src={circleMinusPath}
            style={{ width: 20, height: 20 }}
            onClick={() => {
              handleDelete(key);
            }}
          />
        </View>
      ))}
    </View>
  );
}
