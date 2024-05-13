import { View, Text, Image, Pressable, SectionList, ActivityIndicator, RefreshControl, StyleSheet, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { COLORS } from '../constants/Colors'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ConvertDataToSection, addWeeks, getYearMonthDay } from '../constants/Function'
import { db, usersCol } from '../firebaseConfig'
import { deleteDoc, doc, endAt, getDocs, orderBy, query, startAt } from 'firebase/firestore'
import { router } from 'expo-router'
import { Kategori } from '../constants/Constant';
import { Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/authContext'
import { Popup } from 'react-native-popup-confirm-toast'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const name = "users"
const colorBase = Kategori[name].color

const CardUser = ({ style, batas, showControl = false }) => {
    const [refresh, setRefresh] = useState(false)

    const dataQuery = useQuery({
        queryKey: ['usersList'],
        queryFn: async () => {
            const queryRef = query(usersCol, orderBy("username"))
            const querySnap = await getDocs(queryRef)
            let temp = []
            querySnap.forEach(v => {
                temp.push({ ...v.data(), id: v?.id, email: v?.email })
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
                        <FlatList data={dataQuery.data}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}
                            renderItem={({ item }) => <CardItem item={item} showControl={showControl} />} />
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

    const closeSwipable = () => swipeRef?.current?.close()

    const handleDelete = async () => {
        Popup.show({
            type: 'confirm',
            title: 'Hapus',
            textBody: `Hapus ${name}?`,
            confirmText: 'Batal',
            buttonText: 'Hapus',
            callback: () => {
                closeSwipable()
                deleteDoc(ref).then(() => queryClient.invalidateQueries('usersList'))
                Popup.hide();
            },
            cancelCallback: () => Popup.hide(),
        })
    }

    const handleEdit = async () => router.replace(`${name}/edit/${item.id}`)

    const LeftSwipe = () => {
        return (
            <>
                {user && user?.level == "admin" && showControl &&
                    <View style={{ justifyContent: "center", marginEnd: 10, marginTop: 10 }}>
                        <View style={{ flexDirection: "row", columnGap: 10, width: 100, height: 50, marginVertical: 8 }}>
                            <Pressable style={{ ...styles.leftButtonAction, backgroundColor: "#f5e960" }} onPress={() => handleEdit(item.id)}>
                                <AntDesign name="edit" size={16} color="blue" />
                            </Pressable>
                            {(item.username != user?.username) &&
                                <Pressable style={{ ...styles.leftButtonAction, backgroundColor: "indianred" }} onPress={() => handleDelete(item.id)}>
                                    <AntDesign name="delete" size={16} color="white" />
                                </Pressable>
                            }
                        </View>
                    </View>
                }
            </>
        )
    }

    return (
        <Swipeable ref={swipeRef} renderLeftActions={LeftSwipe}>
            <View style={{
                height: 50, flexDirection: "row", justifyContent: "space-between",
                columnGap: 5, alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, marginTop: 10,
                borderRadius: 10, backgroundColor: (item.username == user?.username ? colorBase : "white"),
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}>
                    <AntDesign name="user" size={18} color={item.username == user?.username ? "white" : "black"} />
                    <View>
                        <Text style={{ color: (item.username == user?.username && "white"), fontFamily: "outfit" }}>{item.username}</Text>
                        {item.username == user?.username && <Text style={{ color: "white", fontFamily: "outfit" }}>Sedang login</Text>}
                    </View>
                </View>
                <Text style={{ fontFamily: "outfit", color: (item.username == user?.username && "white") }}>{item?.level}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    leftButtonAction: {
        justifyContent: "center", alignItems: "center", flex: 1, borderRadius: 10
    }
})

export default CardUser