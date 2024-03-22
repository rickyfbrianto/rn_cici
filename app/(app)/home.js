import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import KategoriFilter from '../../components/KategoriFilter'
import CardIbadah from '../../components/CardIbadah'
import { COLORS } from '../../constants/Colors'

const Home = () => {    
    return (
        <View className="" style={{ paddingHorizontal: hp(2), marginTop: hp(2), flex: 1 }}>
            <KategoriFilter />
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold" }}>Jadwal Ibadah</Text>
                <CardIbadah batas={3} style={{backgroundColor:COLORS.PRIMARY}}/>
            </View>
        </View >
    )
}

export default Home