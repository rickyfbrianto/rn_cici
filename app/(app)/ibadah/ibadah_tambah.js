import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { Hari } from '../../../constants/Constant';
import CustomKeyboard from '../../../components/CustomKeyboard';
import { db } from '../../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Divider } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

const IbadahTambah = () => {
    const {control, reset, handleSubmit, setValue, formState:{errors, isSubmitting}} = useForm({defaultValues:{
        judul:null, hari:null, tanggal:null, jam:null, pdt:null, lokasi:null, 
    }})

    const [DTPicker, setDTPicker] = useState({
        tanggal: false,
        jam: false,
    })

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

    const handleHari = (event, selectedDate) => {
        try {
            const currentDate = selectedDate || new Date()
            let tempDate = new Date(currentDate)
            let fDate = tempDate.getUTCFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempDate.getDate()).slice(-2)
            let fDay = Hari[tempDate.getDay()]
            setDTPicker(prev => ({ ...prev, tanggal: false }))
            setValue("tanggal", fDate)
            setValue("hari", fDay)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleJam = (event, selectedDate) => {
        try {
            const currentDate = selectedDate || new Date()
            let tempDate = new Date(currentDate)
            let fTime = ('0' + tempDate.getHours()).slice(-2) + "." + ('0' + tempDate.getMinutes()).slice(-2)
            setDTPicker(prev => ({ ...prev, jam: false }))
            setValue("jam", fTime)   
        } catch (error) {
            console.log(error.message);
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
                        <TextInput style={{ flex:1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Judul Ibadah' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.judul && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>
                <Pressable onPress={() => setDTPicker(prev => ({ ...prev, tanggal: true }))} style={{ flexDirection: "row", borderWidth: errors.tanggal ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <FontAwesome name="calendar-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='hari' rules={{ required: { value: true } }} render={({ field }) => (
                        <TextInput style={{ fontSize: hp(2)}} editable={false} {...field} className="font-semibold text-neutral-500" placeholder='Hari' placeholderTextColor={'gray'} />
                    )} />
                    <Controller control={control} name='tanggal' rules={{ required: { value: true } }} render={({ field }) => (
                        <View>
                            {DTPicker.tanggal && <DateTimePicker mode='date' value={new Date()} display='default' onChange={handleHari} />}
                            <TextInput style={{ fontSize: hp(2), flex:1 }} {...field} className="flex-1 w-full font-semibold text-neutral-500" placeholder='Tanggal' placeholderTextColor={'gray'} />
                        </View>
                    )} />
                    {errors?.tanggal && <FontAwesome name="exclamation" size={24} color="red" />}
                </Pressable>
                <Pressable onPress={() => setDTPicker(prev => ({ ...prev, jam: true }))} style={{ flexDirection: "row", borderWidth: errors.jam ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <FontAwesome name="clock-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='jam' rules={{ required: { value: true } }} render={({ field: { onChange, value } }) => (
                        <View>
                            {DTPicker.jam && <DateTimePicker mode='time' is24Hour={true} value={new Date()} display='default' onChange={handleJam} />}
                            <TextInput style={{ flex:1, fontSize: hp(2) }} value={value}
                                onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Jam' placeholderTextColor={'gray'} />
                        </View>
                    )} />
                    {errors?.jam && <FontAwesome name="exclamation" size={24} color="red" />}
                </Pressable>
                <View style={{ flexDirection:"row", borderWidth:errors.pdt ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <FontAwesome name="user-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='pdt' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ flex:1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Pendeta' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.pdt && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>
                <View style={{ flexDirection:"row", borderWidth:errors.lokasi ? 2 : 0, borderColor:"red", height: hp(7), backgroundColor:"white", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                    <View style={{width:wp(10), alignItems:"center"}}>
                        <FontAwesome name="location-arrow" size={24} color="gray" />   
                    </View>
                    <Controller control={control} name='lokasi' rules={{required:{value:true}}} render={({field:{onChange, value, onBlur}}) => (
                        <TextInput style={{ flex:1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Lokasi' placeholderTextColor={'gray'} />
                    )}/>
                    {errors?.lokasi && <FontAwesome name="exclamation" size={24} color="red" /> }
                </View>

                <View style={{marginTop:hp(2)}}>
                    {isSubmitting ? 
                        <View style={{flexDirection:"row", justifyContent:"center"}}>
                            <ActivityIndicator size='large' color={COLORS.TEAL} />
                        </View>
                        :
                        <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleAdd)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL, borderRadius:15 }}>
                            <Text style={{ fontFamily:"outfit-bold", fontSize: hp(2.5) }} className="text-white font-bold tracking-wider">Buat Jadwal Ibadah</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </CustomKeyboard>
    )
}

export default IbadahTambah