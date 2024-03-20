import { View, Text, FlatList, Image, Pressable, Alert, ScrollView, VirtualizedList, SectionList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons, EvilIcons } from '@expo/vector-icons';

const NikahCard = ({ data }) => {
    const [list, setList] = useState([])
    useEffect(() => {
        (async () => {
            let jadwalNikah = data?.reduce((accum, current) => {
                let dateGroup = accum.find(x => x.hari === current.hari);
                if (!dateGroup) {
                    dateGroup = { hari: current.hari, data: [] }
                    accum.push(dateGroup);
                }
                dateGroup.data.push(current);
                return accum;
            }, []);
            setList(jadwalNikah)
        })()
    }, [data])

    return (
        <View style={{ flex: 1 }}>
            {list.length > 0 ?
                <SectionList sections={list} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => item + index}
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
                            <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.hari}</Text>
                        </View>
                    )}
                />
                :
                <View style={{ flex: 1, marginVertical: hp(2), borderBottomWidth: 1, borderBottomColor: COLORS.SECONDARY, justifyContent: "center", alignItems: "center", rowGap: hp(2) }}>
                    <ActivityIndicator size='large' color={COLORS.PRIMARY} />
                    <Text style={{ fontFamily: "outfit-bold" }}>Mengambil jadwal Nikah..</Text>
                </View>
            }
        </View>
    )
}

export default NikahCard