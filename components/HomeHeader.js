import { View, Text, Platform, Pressable } from 'react-native'
import React, { useCallback } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { MenuItem } from './CustomMenuItems';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Feather, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { COLORS } from '../constants/Colors';
import { getUser } from '../constants/DataQuery'
import { getAuth } from 'firebase/auth';

const ios = Platform.OS == "ios"

export default HomeHeader = () => {
    const { top } = useSafeAreaInsets()
    const { user, logout } = useAuth()
    const auth = getAuth()
    const userData = getUser(user?.id)

    useFocusEffect(
        useCallback(() => {
            userData.refetch()
        }, [])
    )

    const handleProfile = () => router.push({ pathname: `users/edit/[id_edit]`, params: { id_edit: user.userId } });
    const handleLogout = () => {
        setTimeout(async () => await logout(), 500)
    };

    const SudahLogin = () => {
        return (
            <View className="flex-row items-center gap-x-4">
                <Menu>
                    <MenuTrigger>
                        <Image style={{ height: hp(7), aspectRatio: 1, borderRadius: 100 }} source={userData.data?.photoURL ? { uri: userData.data?.photoURL } : "https://picsum.photos/seed/696/3000/2000"} placeholder={blurhash} transition={500} />
                    </MenuTrigger>

                    <MenuOptions customStyles={{
                        optionsContainer: { borderRadius: 10, borderCurve: "continuous", marginTop: 55, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 0 } }
                    }}>
                        <MenuOption onSelect={() => { }}>
                            <View className="flex-row justify-between p-2">
                                <Text style={{ fontSize: hp(1.4) }} className="font-semibold text-gray-500">App ver 1</Text>
                                <EvilIcons name="exclamation" size={24} color="gray" />
                            </View>
                        </MenuOption>
                        <Divider />
                        <MenuItem text={"Profil"} action={handleProfile} icon={<Feather name="user" size={24} color="gray" />} />
                        <Divider />
                        <MenuItem text={"Keluar"} action={handleLogout} icon={<MaterialIcons name="logout" size={24} color="red" />} />
                    </MenuOptions>
                </Menu>

                <View className="">
                    <Text style={{ fontFamily: "outfit", fontSize: hp(2.2) }} className="font-medium text-white">Shalom,</Text>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }} className="text-white">{userData.data?.username?.toUpperCase()}</Text>
                    {!auth.currentUser?.emailVerified && (
                        <View style={{borderRadius:10, backgroundColor:"red", paddingHorizontal:10,}}>
                            <Text style={{fontSize:10, color:"white"}}>Belum Verified</Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    const BelumLogin = () => {
        return (
            <Pressable onPress={() => router.replace("signIn")} style={{ borderRadius: 20, backgroundColor: "white", paddingVertical: hp(1), paddingHorizontal: wp(5) }}>
                <MaterialIcons name="login" size={24} color="black" />
            </Pressable>
        )
    }

    return (
        <View style={{ backgroundColor: COLORS.PRIMARY, paddingTop: top }} className={`justify-center items-start px-5 h-[120px] rounded-b-[30]`}>
            {user ? <SudahLogin /> : <BelumLogin />}
        </View >
    )
}

const Divider = () => {
    return (
        <View className="h-[1px] bg-neutral-100" />
    )
}