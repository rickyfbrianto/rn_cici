import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Kategori } from '../../../constants/Constant'
import CardBerita from '../../../components/CardBerita'
import { SpeedDial } from '@rneui/themed';
import { useAuth } from '../../../context/authContext'
import {router} from 'expo-router'

const AppIndex = () => {
    const name = "berita"
    const [page, setPage] = React.useState({
        openSpeedDial: false
    });
    const { top } = useSafeAreaInsets()
    const {user} = useAuth()
    const colorBase = Kategori[name].color
    
    return (
        <>
            <View style={{ justifyContent: "flex-end", paddingTop: top, paddingBottom: hp(2), height: hp(12), backgroundColor: colorBase, paddingHorizontal: wp(5) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold", color: "white" }}>Warta berita</Text>
                </View>
            </View>
            <View style={{ paddingVertical: 10, paddingHorizontal: wp(3), flex: 1 }}>
                <View>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} >Hotnews</Text>
                    <Text style={{ fontFamily: "outfit", fontSize: hp(2), textAlign: "justify" }}>Selalu update dengan berita terbaru dari gereja lokal dan pusat</Text>
                </View>
                <CardBerita showControl={true}/>
            </View>
            {user &&
                <SpeedDial
                    color={colorBase}
                    isOpen={page.openSpeedDial}
                    icon={{ name: 'add', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setPage(prev => ({ ...prev, openSpeedDial: true }))}
                    onClose={() => setPage(prev => ({ ...prev, openSpeedDial: false }))}>
                    <SpeedDial.Action color={colorBase} icon={{ name: 'add', color: '#fff' }} title={name} onPress={() => router.push('berita/berita_tambah')} />
                </SpeedDial>
            }
        </>
    )
}

export default AppIndex