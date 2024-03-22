import { View, Text, Image, Pressable, SectionList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { COLORS } from '../constants/Colors'
import { useQuery } from '@tanstack/react-query'
import {ConvertDataToSection} from '../constants/Function'
import { baptisCol, db } from '../firebaseConfig'
import { deleteDoc, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import {router} from 'expo-router'
import { Kategori } from '../constants/Constant';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/authContext'
import { Popup } from 'react-native-popup-confirm-toast'

const CardBaptis = ({style, batas, showControl = false}) => {
    const name = "baptis"
    const [refresh, setRefresh] = useState(false)
    const colorBase = Kategori[name].color
    const {user} = useAuth()
    
    const dataQuery = useQuery({
        queryKey: ['baptisList'],
        queryFn: async () => {
            const queryRef = query(baptisCol)
            // const queryRef = query(baptisCol, orderBy("tanggal"), batas ? limit(batas):null)
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
                    ?   <SectionList sections={ConvertDataToSection(dataQuery.data)} showsVerticalScrollIndicator={false} keyExtractor={(item,index) => item+index} 
                        refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh}/>}
                            renderItem={({item, index}) => (
                                <Pressable onPress={()=>{router.push(`${name}/${item.id}`)}} key={index} style={{position:"relative"}} className="flex-row items-center gap-x-3 my-2 bg-white p-3 rounded-3xl">
                                    <Image style={{height:100, width:100}} source={require('../assets/images/welcome.jpg')}/>
                                    <View>
                                        <View style={{flexDirection:"row", alignItems:"center"}}>
                                            <Text style={{fontFamily:"outfit-bold", fontSize:hp(2.6)}}>{item.judul}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", alignItems:"center", columnGap:wp(2)}}>
                                            <AntDesign name="user" size={hp(1.7)} color="black" />
                                            <Text style={{fontFamily:"outfit", fontSize:hp(2)}}>Pdt. {item.pdt}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", alignItems:"center", columnGap:wp(2)}}>
                                            <Octicons name="clock" size={hp(1.7)} color="black" />
                                            <Text style={{fontFamily:"outfit", fontSize:hp(1.7)}}>{item.jam}</Text>
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
                            renderSectionHeader={({section}) => (
                                <View className="flex-row justify-start items-end mt-3 gap-x-3 p-3 rounded-2xl" style={{backgroundColor:colorBase, borderRadius:10, ...style}}>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", flex:1}}>
                                        <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal.split(", ")[0]}</Text>
                                        <Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>{section.tanggal.split(", ")[1]}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    :   
                        <Pressable onPress={handleRefresh}>
                            <Text>Klik untuk refresh</Text>
                        </Pressable>
                    }
                </>
            }
        </View>
    )
}

export default CardBaptis