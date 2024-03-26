import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import {useLocalSearchParams} from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Kategori } from '../../../constants/Constant'
import BackButtonHeader from '../../../components/BackButtonHeader'
import {useQuery} from '@tanstack/react-query'
import { doc, getDoc, query } from 'firebase/firestore'
import { beritaCol, db } from '../../../firebaseConfig'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors'

const name = "berita"

const BeritaDetail = () => {
    const {id} = useLocalSearchParams()
    const {top} = useSafeAreaInsets()
    const colorBase = Kategori[name].color

    const {data, isLoading} = useQuery({
        queryKey:['beritaDetail', id]        ,
        queryFn:async () =>{
            const queryRef = doc(db, name, id )
            const querySnap = await getDoc(queryRef)
            const data = querySnap.data()
            return data
        }
    })

    return (
        <View style={{backgroundColor:"white", flex:1}}>
            <View style={{ justifyContent: "flex-end", borderBottomColor:"gray", borderBottomWidth:1, paddingTop: top, paddingBottom: hp(2), height: hp(12), paddingHorizontal: wp(5) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between" }}>
                    <BackButtonHeader to="berita" color="black"/>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2), color: "black" }}>Berita</Text>
                </View>
            </View>
            {isLoading ? <ActivityIndicator size={'large'} color="gray"/>
            :   
            <View style={{ flex:1}}>
                {/* Judul */}
                <View style={{justifyContent:"center", marginVertical:hp(2), alignItems:"center", paddingVertical:10, rowGap:10}}>
                    <Image style={{height:wp(20), width:wp(20)}} source={require('../../../assets/images/news1.png')}/>    
                    <View style={{alignItems:"center",}}>
                        <Text style={{fontFamily:"dm-bold", fontSize:hp(3)}}>{data.judul}</Text>
                    </View>
                </View>
                {/* Body */}
                <View style={{paddingHorizontal:wp(4), alignItems:"flex-start", backgroundColor:"#edebd7", flex:1, paddingVertical:hp(2), borderTopRightRadius:75, marginTop: data.lokasi ? hp(5) : 0}}>
                    {data.lokasi && <View style={{height:hp(10), rowGap:5, alignItems:"center", marginTop:hp(-7), backgroundColor:"#324a5f", minWidth:100, width:"auto", borderRadius:10, padding:wp(4)}}>
                        <EvilIcons name="location" size={28} color="white" />
                        <Text style={{fontFamily:"dm-bold", color:"white"}}>{data.lokasi}</Text>
                    </View>}
                    {data.tanggal && 
                        <View style={{rowGap:5, alignItems:"center", backgroundColor:"#324a5f", borderRadius:10, width:"auto", padding:wp(4), marginTop:hp(2)}}>
                            <EvilIcons name="clock" size={28} color="white" />
                            <View style={{flexDirection:"row", justifyContent:"space-between", columnGap:10}}>
                                <Text style={{fontFamily:"dm-bold", color:"white"}}>{data.hari}, {data.tanggal}</Text>
                                {data.jam && <Text style={{fontFamily:"dm-bold", color:"white"}}>{data.jam}</Text> }
                            </View>
                        </View>
                    }
                    <View style={{rowGap:5, width:"100%", marginTop:hp(2)}}>
                        <Text style={{fontFamily:"dm-bold", fontSize:hp(2.6)}}>Deskripsi</Text>
                        <Text style={{fontFamily:"dm-medium", color:"black"}}>{data.desc}</Text>
                    </View>
                </View>
            </View>
            }
        </View>
    )
}

export default BeritaDetail