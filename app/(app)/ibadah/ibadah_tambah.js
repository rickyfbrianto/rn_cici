import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { Divider } from '@rneui/themed';
import CustomKeyboard from '../../../components/CustomKeyboard';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

const IbadahTambah = () => {
    const {control, reset, handleSubmit, formState:{errors, isSubmitting}} = useForm()

    const handleAdd = async (data)=>{
        try {
            const id_ibadah = "IBD-" + Date.now()
            // await addDoc(collection(db, "ibadah"), data)
            await setDoc(doc(db, "ibadah", id_ibadah), data)
            .then(()=>{
                reset()
                Toast.show({type: 'success', text1: 'Berhasil', text2: 'Jadwal ibadah berhasil ditambah'});
            })
            .catch(err=>{
                Toast.show({type: 'error', text1: 'Gagal', text2: err.message});
            })
        } catch (error) {
            Toast.show({type: 'error', text1: 'Gagal', text2: error.message});
        }
    }
    
    return (
        <CustomKeyboard>
            <Toast />
            <View style={{padding:20, rowGap:10}} >
                <Text style={{ fontFamily:"outfit-bold", fontSize: hp(2.4) }} className="font-bold tracking-wider text-neutral-500">Masukkan informasi jadwal baru</Text>
                <Divider style={{marginVertical:hp(2)}} />
                <View style={{ flexDirection:"row", borderWidth:errors.judul ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <MaterialIcons name="title" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='judul' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Judul Ibadah' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.judul && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>
                <View style={{ flexDirection:"row", borderWidth:errors.hari ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <FontAwesome name="calendar-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='hari' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Hari' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.hari && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>
                <View style={{ flexDirection:"row", borderWidth:errors.jam ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <FontAwesome name="clock-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='jam' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Jam' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.jam && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>
                <View style={{ flexDirection:"row", borderWidth:errors.pdt ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <FontAwesome name="user-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='pdt' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Pendeta' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.pdt && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>
                <View style={{ flexDirection:"row", borderWidth:errors.lokasi ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <FontAwesome name="location-arrow" size={24} color="gray" />   
                    </View>
                    <Controller control={control} name='lokasi' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Lokasi' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.lokasi && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>

                <View style={{marginTop:hp(2)}}>
                    {isSubmitting ? 
                        <View style={{flexDirection:"row", justifyContent:"center"}}>
                            <ActivityIndicator size='large' color={COLORS.TEAL} />
                        </View>
                        :
                        <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleAdd)} style={{ justifyContent:"center", alignItems:"center", height: hp(7), backgroundColor: COLORS.TEAL }} className="rounded-xl">
                            <Text style={{ fontFamily:"outfit-bold", fontSize: hp(2.5) }} className="text-white font-bold tracking-wider">Buat Jadwal</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </CustomKeyboard>
    )
}

export default IbadahTambah