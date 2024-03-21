import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import KategoriFilter from '../../components/KategoriFilter'
import IbadahCard from '../../components/IbadahCard'

const Home = () => {    
    return (
        <View className="" style={{ paddingHorizontal: hp(2), marginTop: hp(2), flex: 1 }}>
            <KategoriFilter />
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold" }}>Jadwal Ibadah</Text>
                <IbadahCard batas={3} />
            </View>
        </View >
    )
}

export default Home