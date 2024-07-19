import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BackButtonHeader from '../../../../components/BackButtonHeader'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc, query } from 'firebase/firestore'
import { beritaCol, db } from '../../../../firebaseConfig'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors'
import { Kategori } from '../../../../constants/Constant'
import img from '../../../../assets/images/news1.png'

const name = "berita"

const BeritaKeuanganDetail = () => {
    const { id } = useLocalSearchParams()
    const { top } = useSafeAreaInsets()
    const colorBase = Kategori[name].color

    const { data, isLoading } = useQuery({
        queryKey: ['beritaKeuanganDetail', id],
        queryFn: async () => {
            const queryRef = doc(db, "berita_keuangan", id)
            const querySnap = await getDoc(queryRef)
            const data = querySnap.data()
            return data
        }
    })

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ justifyContent: "flex-end", borderBottomColor: "gray", borderBottomWidth: 1, paddingTop: top, paddingBottom: hp(2), height: hp(12), paddingHorizontal: wp(5) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <BackButtonHeader to="berita" color="black" />
                    <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2), color: "black" }}>Berita Keuangan</Text>
                </View>
            </View>
            {isLoading ? <ActivityIndicator size={'large'} color="gray" />
                :
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    {/* Judul */}
                    <View className="flex justify-center items-center py-6">
                        <Image style={{ height: wp(100), width: wp(100), aspectRatio: 1 }} source={{ uri: data.image }} />
                        <View className="flex items-center mt-4">
                            <Text className="text-[22px]">Berita Keuangan</Text>
                        </View>
                    </View>

                    <View className="flex-1 bg-[#edebd7] rounded-tr-[50px]">
                        <View style={{ paddingHorizontal: wp(4), alignItems: "flex-start", flex: 1, paddingBottom: hp(4), borderTopRightRadius: 75, marginTop: data.lokasi ? hp(5) : 0 }}>
                            <View className="w-full mt-4">
                                <Text className="text-[20px] uppercase">{data.judul}</Text>
                            </View>

                            {data.tanggal &&
                                <View style={{ rowGap: 5, alignItems: "center", backgroundColor: "#324a5f", borderRadius: 10, width: "auto", padding: wp(4), marginTop: hp(2) }}>
                                    <EvilIcons name="clock" size={28} color="white" />
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", columnGap: 10 }}>
                                        <Text style={{ fontFamily: "dm-bold", color: "white" }}>{data.hari}, {data.tanggal}</Text>
                                        {data.jam && <Text style={{ fontFamily: "dm-bold", color: "white" }}>{data.jam}</Text>}
                                    </View>
                                </View>
                            }
                            {/* <View className="w-full mt-4">
                                <View className="w-[100%] h-[300px] p-[4px] bg-slate-300 rounded-md">
                                    <Image className="w-full h-full" source={{ uri: data.image }} />
                                </View>
                            </View> */}
                        </View>
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default BeritaKeuanganDetail