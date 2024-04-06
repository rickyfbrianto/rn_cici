import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { SpeedDial } from '@rneui/themed';
import CardNikah from '../../../components/CardNikah'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Kategori } from '../../../constants/Constant'
import BackButtonHeader from '../../../components/BackButtonHeader'
import { useAuth } from '../../../context/authContext';

const index = () => {
    const [page, setPage] = React.useState({
        openSpeedDial: false
    });
    const { user } = useAuth()
    const colorBase = Kategori["pranikah"].color
    const { top } = useSafeAreaInsets()

    return (
        <>
            <View style={{ justifyContent: "flex-end", paddingTop: top, paddingBottom: hp(3), height: hp(20), borderBottomLeftRadius: 50, backgroundColor: colorBase, paddingHorizontal: wp(5) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <BackButtonHeader color="white" to="home" />
                    <Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold", color: "white" }}>Pernikahan</Text>
                </View>
            </View>
            {/* Body */}
            <View style={{ padding: 10, flex: 1 }}>
                <View style={{ paddingTop: hp(1.6) }}>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} >Menikah semakin gampang</Text>
                    <Text style={{ fontFamily: "outfit", fontSize: hp(2), textAlign: "justify" }}>Urusan administrasi dan biaya nikah sekarang semakin murah</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <CardNikah style={{ backgroundColor: colorBase }} showControl={true} />
                </View>
            </View>
            {user &&
                <SpeedDial
                    color={colorBase}
                    isOpen={page.openSpeedDial}
                    icon={{ name: 'add', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setPage(prev => ({ ...prev, openSpeedDial: true }))}
                    onClose={() => setPage(prev => ({ ...prev, openSpeedDial: false }))}>
                    <SpeedDial.Action color={colorBase} icon={{ name: 'add', color: '#fff' }} title="Nikah" onPress={() => router.push('nikah/nikah_tambah')} />
                </SpeedDial>
            }
        </>
    )
}

export default index