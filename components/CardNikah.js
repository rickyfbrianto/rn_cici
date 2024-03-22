import { View, Text, Pressable, SectionList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query'
import NoData from './NoData'
import { ConvertDataToSection } from '../constants/Function'
import { deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db, nikahCol } from '../firebaseConfig' 
import { Kategori } from '../constants/Constant'
import { ScrollView } from 'react-native'
import { useAuth } from '../context/authContext'
import { Popup } from 'react-native-popup-confirm-toast'

const NikahCard = ({style, showControl = false}) => {
    const name = "nikah"
    const [refresh, setRefresh] = useState(false)
    const colorBase = Kategori[name].color
    const {user} = useAuth()

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

    const handleDelete = async (id) =>{
        const ref = doc(db, `${name}/${id}`)
        Popup.show({
            type: 'confirm',
            title: 'Hapus',
            textBody: `Hapus jadwal ${name}?`,
            confirmText: 'Batal',
            buttonText: 'Hapus',
            callback: () => {
                deleteDoc(ref).then(()=> dataQuery.refetch() )
                Popup.hide();
            },
            cancelCallback: () => Popup.hide(),
        })
    }

    return (
        <View style={{flex:1}}>
            {dataQuery.isLoading 
            ?   <View style={{ flex: 1, marginVertical: hp(2), borderBottomWidth: 1, borderBottomColor: COLORS.SECONDARY, justifyContent: "center", alignItems: "center", rowGap: hp(2) }}>
                    <ActivityIndicator size='large' color={COLORS.PRIMARY} />
                    <Text style={{ fontFamily: "outfit-bold" }}>Mengambil jadwal {name}..</Text>
                </View>
            :
            <>
                {dataQuery.data.length > 0 
                ?   
                <SectionList sections={ConvertDataToSection( dataQuery.data)} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => item + index}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh}/> }
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => { router.push(`${name}/${item.id}`) }} key={index} className={`flex-row justify-between items-center gap-x-3 my-2 bg-slate-200 p-5 rounded-2xl`}>
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
                                {user && showControl &&
                                    <View style={{flexDirection:"row", columnGap:10, position:"absolute", right:15, top:10}}>
                                        <Pressable>
                                            <AntDesign name="edit" size={16} color="blue" />
                                        </Pressable>
                                        <Pressable onPress={()=>handleDelete(item.id)}>
                                            <AntDesign name="delete" size={16} color="red" />
                                        </Pressable>
                                    </View>
                                }
                            </Pressable>
                        )}
                        renderSectionHeader={({ section }) => (
                            <View className="flex-row justify-start items-end mt-3 gap-x-3 p-3 rounded-2xl" style={{backgroundColor:colorBase, borderRadius:10, ...style}}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", flex:1}}>
                                    <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal.split(", ")[0]}</Text>
                                    <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal.split(", ")[1]}</Text>
                                </View>
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