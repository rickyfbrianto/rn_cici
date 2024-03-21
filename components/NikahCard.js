import { View, Text, Pressable, SectionList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query'
import NoData from './NoData'
import { ConvertDataToSection } from '../constants/Function'
import { getDocs, orderBy, query } from 'firebase/firestore'
import { nikahCol } from '../firebaseConfig' 

const NikahCard = ({limit}) => {
    const [refresh, setRefresh] = useState(false)

    const dataQuery = useQuery({
        queryKey: ['nikahList'],
        queryFn: async () => {
            const queryRef = query(nikahCol, orderBy("tanggal"))
            const querySnap = await getDocs(queryRef)
            let temp = []
            querySnap.forEach(v => {
                temp.push({ ...v.data(), id: v?.id })
            })
            return temp
        },
    })

    const handleRefresh = () =>{
        setRefresh(true)
        setTimeout(()=>{
            dataQuery.refetch()
            setRefresh(false)
        }, 50)
    }

    return (
        <View style={{ flex: 1 }}>
            {dataQuery.isLoading 
            ?   <View style={{ flex: 1, marginVertical: hp(2), borderBottomWidth: 1, borderBottomColor: COLORS.SECONDARY, justifyContent: "center", alignItems: "center", rowGap: hp(2) }}>
                    <ActivityIndicator size='large' color={COLORS.PRIMARY} />
                    <Text style={{ fontFamily: "outfit-bold" }}>Mengambil jadwal Nikah..</Text>
                </View>
            :
            <>
                {dataQuery.data.length > 0 
                ?   <SectionList sections={ConvertDataToSection( dataQuery.data)} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => item + index}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh}/>}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => { router.push(`nikah/${item.id}`) }} key={index} className={`flex-row justify-between items-center gap-x-3 my-2 bg-slate-200 p-5 rounded-3xl`}>
                                <View style={{ flexDirection: "column", rowGap: hp(1) }}>
                                    <View className="flex-row justify-start items-center gap-x-1">
                                        <Ionicons name="man-sharp" size={22} color="black" />
                                        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2) }}>{item.pria}</Text>
                                    </View>
                                    <View className="flex-row justify-start items-center gap-x-1">
                                        <Ionicons name="woman-sharp" size={22} color="black" />
                                        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2) }}>{item.wanita}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "column" }}>
                                    <View className="flex-row gap-x-1">
                                        <EvilIcons name="clock" size={24} color="black" />
                                        <Text style={{ fontFamily: "outfit", fontSize: hp(2) }}>{item.jam}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                        renderSectionHeader={({ section }) => (
                            <View className="flex-row justify-start items-end mt-5 gap-x-3 p-3 bg-gray-600 rounded-2xl">
                                <Ionicons name="today" size={24} color={`white`} />
                                <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal}</Text>
                            </View>
                        )}
                    /> 
                :   <NoData pesan={"Tidak ada data"} />
                }
                </>
            }
        </View>
    )
}

export default NikahCard