import { View, Text, Image, Pressable, SectionList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {router} from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import NoData from './NoData'
import {ConvertDataToSection} from '../constants/Function'
import { ibadahCol } from '../firebaseConfig'
import { getDocs, limit, orderBy, query } from 'firebase/firestore'

const IbadahCard = ({batas}) => {
    const [refresh, setRefresh] = useState(false)
    const [data, setData]= useState([])
    
    const dataQuery = useQuery({
        queryKey: ['ibadahList'],
        queryFn: async () => {
            const queryRef = query(ibadahCol, orderBy("tanggal"), batas ? limit(batas):null)
            const querySnap = await getDocs(queryRef)
            let temp = []
            querySnap.forEach(v => {
                temp.push({ ...v.data(), id: v?.id })
            })
            // setData(temp)
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
        <View style={{flex:1}}>            
            {dataQuery.isLoading 
            ?   <View style={{ flex: 1, marginVertical: hp(2), borderBottomWidth: 1, borderBottomColor: COLORS.SECONDARY, justifyContent: "center", alignItems: "center", rowGap: hp(2) }}>
                <ActivityIndicator size='large' color={COLORS.PRIMARY} />
                <Text style={{ fontFamily: "outfit-bold" }}>Mengambil jadwal ibadah..</Text>
            </View>
            :   
                <>
                    {dataQuery.data.length > 0  
                    ?   <SectionList sections={ConvertDataToSection(dataQuery.data)} showsVerticalScrollIndicator={false} keyExtractor={(item,index) => item+index} 
                        refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh}/>}
                            renderItem={({item, index}) => (
                                <Pressable onPress={()=>{router.push(`ibadah/${item.id}`)}} key={index} className="flex-row items-center gap-x-3 my-2 bg-white p-3 rounded-3xl">
                                    <Image style={{height:100, width:100}} source={require('../assets/images/welcome.jpg')}/>
                                    <View>
                                        <View className="flex-row gap-x-1">
                                            <Text style={{fontFamily:"outfit-bold", fontSize:hp(2.6)}}>{item.judul}</Text>
                                        </View>
                                        <Text style={{fontFamily:"outfit", fontSize:hp(2)}}>Pdt. {item.pdt}</Text>
                                        <Text style={{fontFamily:"outfit", fontSize:hp(1.7)}}>{item.jam}</Text>
                                    </View>
                                </Pressable>
                            )}
                            renderSectionHeader={({section}) => (
                                <View className="flex-row justify-start items-end mt-5 gap-x-3 p-3 bg-gray-600 rounded-2xl">
                                    <Ionicons name="today" size={24} color={`white`} />
                                    <Text className={`text-white`} style={{fontFamily:"outfit", fontSize:hp(2)}}>{section.tanggal}</Text>
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

export default IbadahCard