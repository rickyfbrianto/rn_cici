import { Text, View } from 'react-native';
import {
  MenuOption,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export const MenuItem = ({ text, action, value, icon }) => {

  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="flex flex-row justify-between p-2">
        <Text style={{ fontSize: hp(2) }} className="font-semibold text-gray-500">{text}</Text>
        {icon}
      </View>
    </MenuOption>
  )
}