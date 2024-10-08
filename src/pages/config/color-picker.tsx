import React from 'react';
import { ScrollView, View, Image } from '@tarojs/components';
import { useBoolean } from 'ahooks';
import checkPath from '@/assets/icon/check.svg';
import { colorPalette } from './shared';

interface ColorPickerProps {
  className: string;
  style: React.CSSProperties;
  onChange: (value: string) => void;
  value: string;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { className, style, onChange, value } = props;
  const [isShow, { setTrue: setShowTrue, setFalse: setShowFalse }] =
    useBoolean(false);

  const handleClick = () => {
    setShowTrue();
  };

  return (
    <>
      <View className={className} style={style} onClick={handleClick}></View>
      <View
        style={{
          visibility: isShow ? 'visible' : 'hidden',
          background: 'rgba(0, 0, 0, 0.7)',
        }}
        className="fixed inset-0 z-10"
        onClick={() => setShowFalse()}
      >
        <ScrollView
          scrollY
          style={{ height: isShow ? 500 : 0 }}
          enableFlex
          className="absolute left-0 bottom-0 rounded-t-3xl z-20 bg-white flex flex-wrap transition-all duration-500"
        >
          {colorPalette.map((color, index) => (
            <View
              key={index}
              style={{ background: color }}
              className="w-10 h-10 rounded-full m-4 flex justify-center items-center"
              onClick={() => onChange(color)}
            >
              {color === value && (
                <Image src={checkPath} style={{ width: 24, height: 24 }} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ColorPicker;
