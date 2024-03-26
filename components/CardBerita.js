import { View, Text, Image, Pressable, RefreshControl, StyleSheet, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { COLORS } from '../constants/Colors'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { beritaCol, db } from '../firebaseConfig'
import { deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { router } from 'expo-router'
import { Kategori } from '../constants/Constant';
import { Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/authContext'
import { Popup } from 'react-native-popup-confirm-toast'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const name = "berita"
const colorBase = Kategori[name].color

const CardBerita = ({ style, batas, showControl = false }) => {
    const [refresh, setRefresh] = useState(false)

    const dataQuery = useQuery({
        queryKey:['beritaList'],
        queryFn: async ()=>{
            const queryRef = query(beritaCol)
            const querySnap = await getDocs(queryRef)
            const temp = []
            querySnap.forEach(v => {
                temp.push({ ...v.data(), id: v?.id })
            })
            return temp
        }
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
            <FlatList data={dataQuery.data} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{columnGap:wp(4), flexWrap:"wrap"}} keyExtractor={(item, index) => index+item}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}
            renderItem={({ item, index }) => <CardItem index={index} item={item} showControl={showControl} />} />
        </View>
    )
}

const CardItem = ({ item, index, showControl }) => {
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
                {user && showControl &&
                    <View style={{ justifyContent: "center", marginEnd: 10, marginTop: 10 }}>
                        <View style={{ rowGap: 10, width: 50, height: 100, }}>
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
            <Pressable onPress={()=> router.push(`${name}/${item.id}`)} style={{ width: wp(45), height: wp(45), columnGap: 5, marginTop: wp(4), borderRadius: 10, backgroundColor: "#edebd7" }}>
                <Text style={{fontFamily:"outfit", zIndex:10, width:wp(8), textAlign:"center", backgroundColor:COLORS.VIRIDIAN, height:40, alignItems:"center", color:"white", position:"absolute", top:0, left:0, padding:10, borderTopLeftRadius:10, borderBottomRightRadius:10}}>{index +1}</Text>
                <View style={{alignItems:"center"}}>
                    <Image style={{height:wp(30), borderTopLeftRadius:10, borderTopRightRadius:10, resizeMode:"center", aspectRatio:1, width:wp(50)}} source={require(`../assets/images/news1.png`)}/>
                </View>
                <View style={{ backgroundColor:"white", height:wp(15), padding:wp(2), borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{ color: "gray", fontFamily: "outfit-bold" }}>{item.judul}</Text>
                    <Text style={{ color: "gray", fontFamily: "outfit", fontSize:hp(1.6) }}>{item.tanggal}</Text>
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

export default CardBerita