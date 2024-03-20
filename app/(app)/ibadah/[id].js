import { View, Text, SafeAreaView, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useLocalSearchParams} from 'expo-router'
import { COLORS } from '../../../constants/Colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const IbadahDetail = () => {
    const {id} = useLocalSearchParams()
    const {top} = useSafeAreaInsets()
    const [data, setData] = useState()

    useEffect(()=>{
        (async () =>{
            const ref = doc(db, "ibadah", id);
            const ibadahSnap = await getDoc(ref)
            setData(ibadahSnap.data())
        })()
    }, [])

    return (
        <View style={{backgroundColor:COLORS.PRIMARY, flex:1}}>
            <SafeAreaView style={{paddingTop:top + 10, flexDirection:'row', marginHorizontal:hp(2)}}>
                <Pressable onPress={()=>router.back()}>
                <FontAwesome name="arrow-circle-left" size={28} color="white" />
                </Pressable>
            </SafeAreaView>
            <View className="flex-1 items-center bg-white" style={{borderTopLeftRadius:hp(6), borderTopRightRadius:hp(6), marginTop:100, paddingTop:20 ,}}>
                <Image source={require('../../../assets/images/welcome.jpg')} style={{top:hp(-10), height:hp(20), width:wp(40), resizeMode:"stretch", position:"absolute", borderRadius:20}}/>               
                <View className="w-full" style={{marginTop:hp(10), paddingBottom:10, borderBottomWidth:1, borderBottomColor:"teal"}}>
                    <Text style={{fontFamily:"outfit-bold", fontSize:hp(3)}}>{data?.judul}</Text>
                </View>
                <View className="flex-1 justify-center" style={{marginTop:hp(2), width:"100%", paddingHorizontal:hp(2)}}>
                    {/* <ActivityIndicator size="large" color={COLORS.PRIMARY} className="justify-self-center "/> */}
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

export default IbadahDetail