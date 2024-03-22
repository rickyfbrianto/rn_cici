import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../constants/Colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { SpeedDial } from '@rneui/themed';
import CardBaptis from '../../../components/CardBaptis'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Kategori } from '../../../constants/Constant'
import BackButtonHeader from '../../../components/BackButtonHeader'

const index = () => {
    const {top} = useSafeAreaInsets()
    const [page, setPage] = useState({
        openSpeedDial: false
    });
    const colorBase = Kategori["baptis"].color

    return (
        <>
            <View style={{ justifyContent:"flex-end", paddingTop:top, paddingBottom:hp(3), height:hp(20), borderBottomLeftRadius:50, backgroundColor:colorBase, paddingHorizontal:wp(5)}}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <BackButtonHeader color="white" to="home"/>
                    <Text style={{ fontFamily:"outfit", fontSize: hp(3), fontWeight: "bold", color:"white" }}>Jadwal Baptis</Text>
                </View>
            </View>
            <View style={{ padding: 10, flex:1}}>
                <CardBaptis style={{"backgroundColor":colorBase}} showControl={true}/>
            </View>
            <SpeedDial
                color={colorBase}
                isOpen={page.openSpeedDial}
                icon={{ name: 'add', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setPage(prev => ({ ...prev, openSpeedDial: true }))}
                onClose={() => setPage(prev => ({ ...prev, openSpeedDial: false }))}>
                <SpeedDial.Action color={colorBase} icon={{ name: 'add', color: '#fff' }} title="Baptis" onPress={() => router.push('baptis/baptis_tambah')} />
            </SpeedDial>
        </>
    )
}

export default index