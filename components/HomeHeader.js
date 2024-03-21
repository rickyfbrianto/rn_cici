import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { MenuItem } from './CustomMenuItems';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const ios = Platform.OS == "ios"

export default HomeHeader = () => {
    const { top } = useSafeAreaInsets()
    const { user, logout } = useAuth()

    const handleProfile = () => console.log('profile');
    const handleLogout = () => {
        setTimeout(async () => {
            await logout()
        }, 500)
    };

    const SudahLogin = () => {
        return (
            <View className="flex-row items-center gap-x-4">
                <Menu>   
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            // 
                        }
                    }}>
                        <Image style={{ height: hp(7), aspectRatio: 1, borderRadius: 100 }} source="https://picsum.photos/seed/696/3000/2000" placeholder={blurhash} transition={500} />
                    </MenuTrigger>

                    <MenuOptions customStyles={{
                        optionsContainer: {
                            borderRadius: 10,
                            borderCurve: "continuous",
                            marginTop: 55,
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 0, height: 0 }
                        }
                    }}>
                        <MenuItem text={"Profil"} action={handleProfile} value={null} icon={<Feather name="user" size={24} color="black" />} />
                        <Divider />
                        <MenuItem text={"Keluar"} action={handleLogout} value={null} icon={<MaterialIcons name="logout" size={24} color="red" />} />
                    </MenuOptions>
                </Menu>

                <View className="">
                    <Text style={{fontFamily:"outfit", fontSize: hp(2) }} className="font-medium text-white">Welcome,</Text>
                    <Text style={{fontFamily:"outfit-bold", fontSize: hp(2.5) }} className="text-white">{user?.username}</Text>
                </View>
            </View>
        )
    }

    const BelumLogin = () =>{
        return (
            <View>
                <Link style={{ backgroundColor: "white", paddingHorizontal: hp(2), paddingVertical: hp(1) }} href={"signIn"}>Sign In</Link>
            </View>
        )
    }
    
    return (
        <View style={{ paddingTop: top }} className={`flex-row justify-between items-center rounded-b-3xl px-5 pb-3 h-[120px] bg-[#4682b4]`}>
            {user ? <SudahLogin/> : <BelumLogin/>}
        </View >
    )
}

const Divider = () => {
    return (
        <View className="h-[1px] bg-neutral-100" />
    )
}