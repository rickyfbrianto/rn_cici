import { View, ScrollView, Text, FlatList, Dimensions, useWindowDimensions, Image, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { Kategori } from '../constants/Constant'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS } from '../constants/Colors'

const KategoriFilter = () => {
    const data = []
    Object.keys(Kategori).filter(v=>{
        if(Kategori[v].nama.toLowerCase() != "user" && Kategori[v].nama.toLowerCase() != "berita")
        data.push({nama : Kategori[v].nama, link : Kategori[v].link, color : Kategori[v].color, img:Kategori[v].img })
    })
    
    return (
        <View style={{marginBottom:hp(2)}}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>Menu</Text>
            <Text style={{ fontFamily: "outfit", fontSize: hp(2.2) }}>Kategori dibagi menjadi beberapa form</Text>
            <FlatList keyExtractor={(item, index)=> index} numColumns={3} data={data} columnWrapperStyle={{columnGap:10, marginBottom:10}} renderItem={({item, index}) => <KategoriItem index={index} item={item}/>}/>
        </View>
    )
}

const KategoriItem = ({item, index})=>{
    return (
        <Pressable onPress={()=>router.push(item.link)} style={{flex:1, justifyContent:"center", rowGap:10, alignItems:"center", height:hp(15), 
        backgroundColor:"#f6f7eb", borderRadius:8}}>
            <Image style={{height:40, width:40}} source={item.img}/>
            <Text style={{fontFamily:"outfit", fontSize:hp(2), color:"gray"}}>{item.nama}</Text>
        </Pressable>
    )
}

export default KategoriFilter