import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardUser from '../../../components/CardUser'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../../../context/authContext'
import { Kategori } from '../../../constants/Constant'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BackButtonHeader from '../../../components/BackButtonHeader'
import { SpeedDial } from '@rneui/themed'
import { router } from 'expo-router'

const UserPage = () => {
    const name = "users"
    const { top } = useSafeAreaInsets()
    const [page, setPage] = useState({
        openSpeedDial: false
    });
    const { user } = useAuth()
    const colorBase = Kategori[name].color

    useEffect(() => {
        (async () => {
            if (user?.level !== "admin") router.replace("home")
        })()
    }, [user?.level])

    return (
        <>
            <View style={{ justifyContent: "flex-end", paddingTop: top, paddingBottom: hp(2), height: hp(12), backgroundColor: colorBase, paddingHorizontal: wp(5) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold", color: "white" }}>Daftar User</Text>
                </View>
            </View>
            <View style={{ paddingVertical: 10, paddingHorizontal: 15, flex: 1 }}>
                <View>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} >User</Text>
                    <Text style={{ fontFamily: "outfit", fontSize: hp(2), textAlign: "justify" }}>Lihat dan modifikasi daftar user yang dapat login kedalam aplikasi anda</Text>
                </View>
                <CardUser style={{ "backgroundColor": colorBase }} showControl={true} />
            </View>
            {user?.level == "admin" &&
                <SpeedDial
                    color={colorBase}
                    isOpen={page.openSpeedDial}
                    icon={{ name: 'add', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setPage(prev => ({ ...prev, openSpeedDial: true }))}
                    onClose={() => setPage(prev => ({ ...prev, openSpeedDial: false }))}>
                    <SpeedDial.Action color={colorBase} icon={{ name: 'add', color: '#fff' }} title="Baptis" onPress={() => router.push('baptis/baptis_tambah')} />
                </SpeedDial>
            }
        </>
    )
}

export default UserPage