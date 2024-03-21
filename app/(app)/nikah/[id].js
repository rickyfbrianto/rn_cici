import { View, Text, SafeAreaView, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useLocalSearchParams} from 'expo-router'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { COLORS } from '../../../constants/Colors'
import {AyatNikah} from '../../../constants/Constant'
import { useQuery } from '@tanstack/react-query'

const NikahDetail = () => {
    const {id} = useLocalSearchParams()
    const {top} = useSafeAreaInsets()
    const ayat = AyatNikah[Math.floor(Math.random() * 10)]

    const dataQuery = useQuery({
        queryKey: ['nikahDetail', id],
        queryFn: async () => {
            const ref = doc(db, "nikah", id);
            const dataSnap = await getDoc(ref)
            return dataSnap.data()
        },
    })
    
    return (
        <View style={{backgroundColor:COLORS.PRIMARY, flex:1}}>
            <SafeAreaView style={{paddingTop:top + 10, flexDirection:'row', marginHorizontal:hp(2)}}>
                <Pressable onPress={()=>router.back()}>
                <FontAwesome name="arrow-circle-left" size={28} color="white" />
                </Pressable>
            </SafeAreaView>
            {dataQuery.isLoading 
            ? <Text>Loading...</Text>
            : <View className="items-center bg-white" style={{ marginTop:hp(20), paddingTop:20, flex:1}}>
                <View style={{position:"absolute", top:hp(-18), alignItems:"center", borderBottomColor:COLORS.PRIMARY, borderBottomWidth:1, paddingHorizontal:wp(10), paddingVertical:hp(2), backgroundColor:"white", borderTopLeftRadius:hp(3), borderTopRightRadius:hp(3)}}>
                    <Text style={{fontFamily:"wedding", fontSize:hp(8)}}>{dataQuery.data.pria}</Text>
                    <Text style={{fontFamily:"wedding", fontSize:hp(5)}}>&</Text>
                    <Text style={{fontFamily:"wedding", fontSize:hp(8)}}>{dataQuery.data.wanita}</Text>
                </View>
                <View className="flex-1 justify-center" style={{marginTop:hp(18), width:"100%", paddingHorizontal:hp(2)}}>
                    <View className="gap-y-3">
                        <View className="items-center">
                            <Text style={{fontFamily:"outfit", fontSize:hp(2)}}>Oleh Pdt. <Text style={{fontFamily:"outfit-bold"}}>{dataQuery.data.pdt.toUpperCase()}</Text></Text>
                            <Text style={{fontFamily:"outfit"}}>Bertempat di {dataQuery.data.lokasi}</Text>
                            <Text style={{fontFamily:"outfit"}}>Pada,</Text>
                            <View className="items-center" style={{borderBottomWidth:2, borderBottomColor:COLORS.PRIMARY, paddingVertical:hp(2), paddingHorizontal:wp(5), borderRadius:10, marginTop:hp(2)}}>
                                <Text style={{fontFamily:"outfit", fontSize:hp(5)}}>{dataQuery.data.hari.toUpperCase()}</Text>
                                <View className="flex-row gap-x-3" style={{ paddingVertical:hp(1)}}>
                                    <Text style={{fontFamily:"outfit-bold"}}>{dataQuery.data.tanggal}</Text>
                                    <Text style={{fontFamily:"outfit"}}>|</Text>
                                    <Text style={{fontFamily:"outfit-bold"}}>{dataQuery.data.jam}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="items-center gap-y-5" style={{paddingTop:hp(3), paddingHorizontal:wp(4), rowGap:hp(1.5)}}>
                            <Text style={{fontFamily:"outfit-bold", fontSize:hp(3)}}>{ayat.ayat}</Text>
                            <Text style={{fontFamily:"outfit",fontSize:hp(2), textAlign:"justify", fontStyle:"italic"}}>"{ayat.desc}"</Text>
                        </View>
                    </View>
                </View>
            </View>
            }
        </View>
    )
}

export default NikahDetail