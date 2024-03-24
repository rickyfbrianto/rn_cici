import { View, Text, Pressable, SectionList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ConvertDataToSection, addWeeks, getYearMonthDay } from '../constants/Function'
import { deleteDoc, doc, endAt, getDocs, orderBy, query, startAt } from 'firebase/firestore'
import { db, nikahCol } from '../firebaseConfig'
import { Kategori } from '../constants/Constant'
import { useAuth } from '../context/authContext'
import { Popup } from 'react-native-popup-confirm-toast'
import { Swipeable } from 'react-native-gesture-handler'

const name = "nikah"
const colorBase = Kategori[name].color

const NikahCard = ({ style, showControl = false }) => {
    const [refresh, setRefresh] = useState(false)
    const tanggal = getYearMonthDay(new Date())

    const dataQuery = useQuery({
        queryKey: ['nikahList'],
        queryFn: async () => {
            const queryRef = query(nikahCol, orderBy("tanggal"), startAt(tanggal), endAt(getYearMonthDay(addWeeks(new Date(), 1))))
            const querySnap = await getDocs(queryRef)
            let temp = []
            querySnap.forEach(v => {
                temp.push({ ...v.data(), id: v?.id })
            })
            return temp
        },
    })
    dataQuery.refetch()

    const handleRefresh = () => {
        setRefresh(true)
        setTimeout(() => {
            dataQuery.refetch()
            setRefresh(false)
        }, 50)
    }

    return (
        <View style={{ flex: 1 }}>
            {dataQuery.isLoading
                ? <View style={{ flex: 1, marginVertical: hp(2), borderBottomWidth: 1, borderBottomColor: COLORS.SECONDARY, justifyContent: "center", alignItems: "center", rowGap: hp(2) }}>
                    <ActivityIndicator size='large' color={COLORS.PRIMARY} />
                    <Text style={{ fontFamily: "outfit-bold" }}>Mengambil jadwal {name}..</Text>
                </View>
                :
                <>
                    {dataQuery.data.length > 0
                        ?
                        <SectionList sections={ConvertDataToSection(dataQuery.data)} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => item + index}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}
                            renderItem={({ item }) => <CardItem item={item} showControl={showControl} />}
                            renderSectionHeader={({ section }) => (
                                <View className="flex-row justify-start items-end mt-3 gap-x-3 p-3 rounded-2xl" style={{ backgroundColor: colorBase, borderRadius: 10, ...style }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                                        <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal.split(", ")[0]}</Text>
                                        <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal.split(", ")[1]}</Text>
                                    </View>
                                </View>
                            )}
                        />
                        :
                        <Pressable onPress={handleRefresh} style={{ rowGap: hp(1.5), height: 100, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name="refresh" size={24} color={COLORS.RED} />
                            <Text style={{ fontFamily: "outfit", fontSize: hp(2.4) }}>Refresh data {name}</Text>
                        </Pressable>
                    }
                </>
            }
        </View>
    )
}

const CardItem = ({ item, showControl }) => {
    const swipeRef = useRef()
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const ref = doc(db, `${name}/${item.id}`)

    const closeSwipable = (() => swipeRef?.current?.close())()

    const handleDelete = async () => {
        Popup.show({
            type: 'confirm',
            title: 'Hapus',
            textBody: `Hapus jadwal ${name}?`,
            confirmText: 'Batal',
            buttonText: 'Hapus',
            callback: () => {
                closeSwipable()
                deleteDoc(ref).then(() => queryClient.invalidateQueries('baptisList'))
                Popup.hide();
            },
            cancelCallback: () => Popup.hide(),
        })
    }

    const handleEdit = async () => router.replace(`${name}/edit/${item.id}`)

    const LeftSwipe = () => {
        return (
            <>
                {user && showControl &&
                    <View style={{ justifyContent: "center", marginEnd: 10 }}>
                        <View style={{ flexDirection: "row", columnGap: 10, width: 100, height: 50, marginVertical: 8 }}>
                            <Pressable style={{ ...styles.leftButtonAction, backgroundColor: "#f5e960" }} onPress={() => handleEdit(item.id)}>
                                <AntDesign name="edit" size={16} color="blue" />
                            </Pressable>
                            <Pressable style={{ ...styles.leftButtonAction, backgroundColor: "indianred" }} onPress={() => handleDelete(item.id)}>
                                <AntDesign name="delete" size={16} color="white" />
                            </Pressable>
                        </View>
                    </View>
                }
            </>
        )
    }

    return (
        <Swipeable ref={swipeRef} renderLeftActions={LeftSwipe}>
            <Pressable onPress={() => { router.push(`${name}/${item.id}`) }} key={item.id} className={`flex-row justify-between items-center gap-x-3 my-2 bg-slate-200 p-5 rounded-2xl`}>
                <View style={{ flexDirection: "column", rowGap: hp(1) }}>
                    <View className="flex-row justify-start items-center gap-x-1">
                        <Ionicons name="man-sharp" size={22} color={colorBase} />
                        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2) }}>{item.pria}</Text>
                    </View>
                    <View className="flex-row justify-start items-center gap-x-1">
                        <Ionicons name="woman-sharp" size={22} color={colorBase} />
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
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    leftButtonAction: {
        justifyContent: "center", alignItems: "center", flex: 1, borderRadius: 10
    }
})

export default NikahCard