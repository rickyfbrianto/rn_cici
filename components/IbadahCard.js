import { View, Text, FlatList, Image, Pressable, Alert, ScrollView, VirtualizedList, SectionList, ActivityIndicator } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {router} from 'expo-router'
import { COLORS } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import {  } from 'react-native-web'

const IbadahCard = ({data}) => {
    let jadwalIbadah = data?.reduce((accum, current)=> {
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
            {/* <FlatList data={ibadah_list} horizontal={false} keyExtractor={(item)=>item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{columnGap:hp(3)}} renderItem={({item})=>(
                <Pressable onPress={()=>router.replace({pathname:"ibadah/ibadah_detail"})} className="flex-1 bg-white shadow-xl rounded-xl my-2 py-2 items-center" style={{ shadowColor:"#000", shadowOffset:{width:0, height:4}, shadowOpacity:0.1, shadowRadius:7}}>
                    <Text className="text-gray-400 text-[1.4rem]" style={{fontSize:hp(2), fontWeight:"bold"}}>{item.pdt}</Text>
                    <Image source={require('../assets/images/welcome.jpg')} style={{height:hp(10), width: wp(30), resizeMode:"center"}}/>
                    <View className="flex-row gap-x-2">
                        <Text className="text-gray-700 text-[1.2rem] font-extrabold" style={{fontSize:hp(2)}}>{item.hari}</Text>
                        <Text>|</Text>
                        <Text className="text-gray-500 text-[1.4rem]" style={{fontSize:hp(2), fontWeight:"bold"}}>{item.jam}</Text>
                    </View>
                </Pressable>
            )}/> */}
            
            {jadwalIbadah ? 
            <SectionList sections={jadwalIbadah} showsVerticalScrollIndicator={false} keyExtractor={(item,index) => item+index}
                renderItem={({item, index}) => (
                    <Pressable onPress={()=>{router.push(`ibadah/${item.id}`)}} key={index} className="flex-row items-center gap-x-3 my-2 bg-white p-3 rounded-3xl">
                        <Image style={{height:100, width:100}} source={require('../assets/images/welcome.jpg')}/>
                        <View>
                            <View className="flex-row gap-x-1">
                                <Text style={{fontFamily:"outfit-bold", fontSize:hp(2.5)}}>{item.jam}</Text>
                            </View>
                            <Text style={{fontFamily:"outfit", fontSize:hp(2)}}>Pdt. {item.pdt}</Text>
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

export default IbadahCard