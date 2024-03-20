import { View, Text, SafeAreaView, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {useLocalSearchParams} from 'expo-router'
import { COLORS } from '../../../constants/Colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const NikahDetail = () => {
    const {id} = useLocalSearchParams()
    const {top} = useSafeAreaInsets()
    const [data, setData] = useState()

    useEffect(()=>{
        (async () =>{
            const ref = doc(db, "nikah", id);
            const dataSnap = await getDoc(ref)
            setData(dataSnap.data())
        })()
    }, [])

    return (
        <View style={{backgroundColor:COLORS.PRIMARY, flex:1}}>
            <SafeAreaView style={{paddingTop:top + 10, flexDirection:'row', marginHorizontal:hp(2)}}>
                <Pressable onPress={()=>router.back()}>
                <FontAwesome name="arrow-circle-left" size={28} color="white" />
                </Pressable>
            </SafeAreaView>
            <View className="flex-1 items-center bg-white" style={{ marginTop:hp(20), paddingTop:20 ,}}>
                <View style={{position:"absolute", alignItems:"center", borderBottomColor:"red", borderBottomWidth:1, borderBottomLeftRadius:hp(6), borderBottomRightRadius:hp(6), paddingHorizontal:wp(8), backgroundColor:"white", top:hp(-15), borderTopLeftRadius:hp(3), borderTopRightRadius:hp(3)}}>
                    <Text style={{fontFamily:"geraldine", fontSize:hp(8)}}>{data?.pria}</Text>
                    <Text style={{fontFamily:"geraldine", fontSize:hp(7)}}>dan</Text>
                    <Text style={{fontFamily:"geraldine", fontSize:hp(8)}}>{data?.wanita}</Text>
                </View>
                <View className="flex-1 justify-center" style={{marginTop:hp(25), width:"100%", paddingHorizontal:hp(2)}}>
                    <View style={{flexDirection:"row", alignItems:"center", borderBottomWidth:2, borderBottomColor:COLORS.PRIMARY, columnGap:hp(2), marginHorizontal:hp(1), paddingHorizontal:hp(1), paddingVertical:hp(2)}}>
                        <View style={{ flexDirection:"row", justifyContent:"center", width:30}}>
                            <FontAwesome name="location-arrow" size={24} color="black" />
                        </View>
                        <Text>{data?.lokasi}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", borderBottomWidth:2, borderBottomColor:COLORS.PRIMARY, columnGap:hp(2), marginHorizontal:hp(1), paddingHorizontal:hp(1), paddingVertical:hp(2)}}>
                        <View style={{ flexDirection:"row", justifyContent:"center", width:30}}>
                            <FontAwesome name="user" size={24} color="black" />
                        </View>
                        <Text>{data?.pdt}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", borderBottomWidth:2, borderBottomColor:COLORS.PRIMARY, columnGap:hp(2), marginHorizontal:hp(1), paddingHorizontal:hp(1), paddingVertical:hp(2)}}>
                        <View style={{ flexDirection:"row", justifyContent:"center", width:30}}>
                            <FontAwesome name="calendar-o" size={24} color="black" />
                        </View>
                        <Text>{data?.hari}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", borderBottomWidth:2, borderBottomColor:COLORS.PRIMARY, columnGap:hp(2), marginHorizontal:hp(1), paddingHorizontal:hp(1), paddingVertical:hp(2)}}>
                        <View style={{ flexDirection:"row", justifyContent:"center", width:30}}>
                            <Feather name="clock" size={24} color="black" />
                        </View>
                        <Text>{data?.jam}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NikahDetail