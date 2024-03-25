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
            <View style={{ paddingHorizontal: hp(2), paddingVertical:hp(2), flex: 1, backgroundColor:COLORS.PRIMARY, borderTopRightRadius:50, }}>
                <Text style={{ fontFamily: "outfit", fontSize: hp(3), marginBottom:hp(1), fontWeight: "bold", color:"white" }}>Jadwal Ibadah</Text>
                <View style={{borderBottomWidth:1, borderColor:"white"}}/>
                <CardIbadah batas={3} style={{backgroundColor:COLORS.PRIMARY}}/>
            </View>
        </View >
    )
}

export default Home