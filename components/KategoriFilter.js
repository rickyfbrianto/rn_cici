import { View, ScrollView, Text } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import { Kategori } from '../constants/Constant'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS } from '../constants/Colors'

const KategoriFilter = () => {
    return (
        <View>
            <Text style={{fontFamily:"outfit-bold", fontSize:hp(3)}}>Kategori</Text> 
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Kategori.map((v, index)=>(
                    <Link href={v.link} key={index} style={{backgroundColor:(index==0)? COLORS.PRIMARY:"white", borderRadius:8,marginHorizontal:hp(1.5), marginVertical:hp(1.5), 
                    paddingHorizontal:hp(3), paddingVertical:hp(1.4), shadowColor:"#000", shadowOffset:{width:0, height:4}, shadowOpacity:0.1, shadowRadius:7}}>
                        <Text style={{fontFamily:"outfit", fontSize:hp(2.4), color:(index==0)?"white":"gray"}}>{v.nama}</Text>
                    </Link>
                ))}
            </ScrollView>
        </View>
    )
}

export default KategoriFilter