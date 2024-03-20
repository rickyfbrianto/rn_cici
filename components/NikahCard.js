import { View, Text, FlatList, Image, Pressable, Alert, ScrollView, VirtualizedList, SectionList, ActivityIndicator } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {router} from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons, EvilIcons } from '@expo/vector-icons';

const NikahCard = ({data}) => {
    let jadwalNikah = data?.reduce((accum, current)=> {
        let dateGroup = accum.find(x => x.hari === current.hari);
        if(!dateGroup) {
            dateGroup = { hari: current.hari, data: [] }
            accum.push(dateGroup);
        }
        dateGroup.data.push(current);
        return accum;
    }, []);
    
    return (
        <View style={{flex:1}}>            
            {jadwalNikah ? 
            <SectionList sections={jadwalNikah} showsVerticalScrollIndicator={false} keyExtractor={(item,index) => item+index}
                renderItem={({item, index}) => (
                    <Pressable onPress={()=>{router.push(`nikah/${item.id}`)}} key={index} className={`flex-row justify-between items-center gap-x-3 my-2 bg-slate-200 p-5 rounded-3xl`}>
                        <View style={{flexDirection:"column"}}>
                            <View className="flex-row gap-x-1">
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text style={{fontFamily:"outfit", fontSize:hp(2)}}>{item.jam}</Text>
                            </View>
                            
                        </View>
                        <View style={{flexDirection:"column"}}>
                            <View className="flex-row justify-end gap-x-1">
                                <Text style={{fontFamily:"outfit-bold", fontSize:hp(2.5)}}>{item.pria}</Text>
                                <Ionicons name="man-sharp" size={22} color="black" />
                            </View>
                            <View className="flex-row justify-end gap-x-1">
                                <Text style={{fontFamily:"outfit-bold", fontSize:hp(2.5)}}>{item.wanita}</Text>
                                <Ionicons name="woman-sharp" size={22} color="black" />
                            </View>
                        </View>
                    </Pressable>
                )}
                renderSectionHeader={({section}) => (
                    <View className="flex-row justify-start items-end mt-5 gap-x-3 p-3 bg-gray-600 rounded-2xl">
                        <Ionicons name="today" size={24} color={`white`} />
                        <Text className={`text-white`} style={{fontFamily:"outfit", fontSize:hp(2)}}>{section.hari}</Text>
                    </View>
                )}
            />
            :
            <View style={{flex:1, marginVertical:hp(2), borderBottomWidth:1, borderBottomColor:COLORS.SECONDARY, justifyContent:"center", alignItems:"center", rowGap:hp(2)}}>
                <ActivityIndicator size='large' color={COLORS.PRIMARY}/>
                <Text style={{fontFamily:"outfit-bold"}}>Mengambil jadwal ibadah..</Text>
            </View>
            }
        </View>
    )
}

export default NikahCard