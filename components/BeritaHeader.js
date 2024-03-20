import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../context/authContext';
import { COLORS } from '../constants/Colors';

const ios = Platform.OS == "ios"

export default HomeHeader = () => {
    const { top } = useSafeAreaInsets()
    const { user, logout } = useAuth()

    return (
        <View style={{ paddingTop: ios ? top : top + 26 }} className={`flex-row justify-between rounded-b-3xl px-5 pb-3 h-[100px] bg-[${COLORS.PRIMARY.toLowerCase()}]`}>
            <Text style={{ fontSize: hp(2.5) }} className="font-medium text-white">Warta berita</Text>
        </View >
    )
}

const Divider = () => {
    return (
        <View className="h-[1px] bg-neutral-100" />
    )
}