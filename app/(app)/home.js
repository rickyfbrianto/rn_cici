import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import KategoriFilter from '../../components/KategoriFilter'
import CardIbadah from '../../components/CardIbadah'
import { COLORS } from '../../constants/Colors'

const Home = () => {    
    return (
        <View className="" style={{ marginTop: hp(2), flex: 1 }}>
            <View style={{paddingHorizontal: hp(2)}}>
                <KategoriFilter />
            </View>
            <View style={{ paddingHorizontal: hp(2), paddingVertical:hp(2), flex: 1, backgroundColor:COLORS.BABYPOWDER, borderTopRightRadius:50, }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.6), color:"gray" }}>Jadwal Ibadah</Text>
                <View style={{borderBottomWidth:1, marginVertical:hp(1), borderColor:"gray"}}/>
                <CardIbadah batas={3} style={{backgroundColor:COLORS.PRIMARY}}/>
            </View>
        </View >
    )
}

export default Home