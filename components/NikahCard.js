import { View, Text, Pressable, SectionList, ActivityIndicator } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query'
import NoData from './NoData'

const NikahCard = ({ data }) => {
    const dataQuery = useQuery({
        queryKey: ['nikahCard'],
        queryFn: async () => {
            let tempData = data?.reduce((accum, current) => {
                let dateGroup = accum.find(x => x.tanggal === current.tanggal);
                if (!dateGroup) {
                    dateGroup = { tanggal: current.tanggal , data: [] }
                    accum.push(dateGroup);
                }
                dateGroup.data.push(current);
                return accum;
            }, []);
            return tempData
        },
    })

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
                ?   <SectionList sections={dataQuery.data} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => item + index}
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