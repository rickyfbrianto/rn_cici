import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { db } from '../../../../firebaseConfig';
import CustomKeyboard from '../../../../components/CustomKeyboard';
import { Hari } from '../../../../constants/Constant';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Divider } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import {router, useLocalSearchParams} from 'expo-router'
import {useQuery} from '@tanstack/react-query'

const BeritaEdit = () => {
    const { id_edit } = useLocalSearchParams()
    const name = "berita"
    const { control, reset, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            judul:null, desc:null, hari: null, tanggal: null, jam: null, lokasi: null, createdAt:null
        }
    })

    const [DTPicker, setDTPicker] = useState({
        tanggal: false,
        jam: false,
    })

    const dataQuery = useQuery({
        queryKey:['beritaEdit', id_edit],
        queryFn: async ()=>{
            const queryRef = doc(db, name, id_edit)
            const querySnap = await getDoc(queryRef)
            const data = querySnap.data()
            Object.keys(data).map(v=> setValue(v, data[v]))
            return querySnap.data()
        }
    })

    const handleHari = (event, selectedDate) => {
        const currentDate = selectedDate || new Date()
        let tempDate = new Date(currentDate)
        let fDate = tempDate.getUTCFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempDate.getDate()).slice(-2)
        let fDay = Hari[tempDate.getDay()]
        setDTPicker(prev => ({ ...prev, tanggal: false }))
        setValue("tanggal", fDate)
        setValue("hari", fDay)
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

    const handleUpdate = async (data) => {
        let tempDate = new Date()
        let fDate = tempDate.getUTCFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempDate.getDate()).slice(-2)
        // setValue("updatedAt", fDate)
        try {
            const queryRef = doc(db, name, id_edit)
            await updateDoc(queryRef, data)
                .then(() => {
                    Toast.show({ type: 'success', text1: 'Berhasil', text2: `Berita berhasil diubah`});
                })
                .catch(err => {
                    Toast.show({ type: 'error', text1: 'Gagal', text2: err.message });
                })
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Gagal', text2: error.message });
        }
    }

    return (
        <CustomKeyboard>
            <View style={{ padding: 20, rowGap: 10 }} >
                <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} className="font-bold tracking-wider text-neutral-500">Edit {name}</Text>
                <Divider style={{ marginVertical: hp(2) }} />

                <View style={{ flexDirection: "row", borderWidth: errors.judul ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <MaterialIcons name="title" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='judul' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Judul berita' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.judul && <FontAwesome name="exclamation" size={24} color="red" />}
                </View>
                <View style={{ flexDirection: "row", borderWidth: errors.desc ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <MaterialIcons name="description" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='desc' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Deskripsi' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.desc && <FontAwesome name="exclamation" size={24} color="red" />}
                </View>
                <Pressable onPress={() => setDTPicker(prev => ({ ...prev, tanggal: true }))} style={{ flexDirection: "row", borderWidth: errors.tanggal ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <FontAwesome name="calendar-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='hari' rules={{ required: { value: true } }} render={({ field }) => (
                        <TextInput style={{ fontSize: hp(2) }} editable={false} {...field} className="font-semibold text-neutral-500" placeholder='Hari' placeholderTextColor={'gray'} />
                    )} />
                    <Controller control={control} name='tanggal' rules={{ required: { value: true } }} render={({ field, fieldState }) => (
                        <View>
                            {DTPicker.tanggal && <DateTimePicker mode='date' value={new Date()} display='default' onChange={handleHari} />}
                            <TextInput style={{ flex: 1, fontSize: hp(2) }} {...field} className="flex-1 w-full font-semibold text-neutral-500" placeholder='Tanggal' placeholderTextColor={'gray'} />
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
                            <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value}
                                onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Jam' placeholderTextColor={'gray'} />
                        </View>
                    )} />
                    {errors?.jam && <FontAwesome name="exclamation" size={24} color="red" />}
                </Pressable>
                <View style={{ flexDirection: "row", borderWidth: errors.lokasi ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <FontAwesome name="location-arrow" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='lokasi' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Lokasi' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.lokasi && <FontAwesome name="exclamation" size={24} color="red" />}
                </View>

                <View style={{ marginTop: hp(2) }}>
                    {isSubmitting ?
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <ActivityIndicator size='large' color={COLORS.TEAL} />
                        </View>
                        :
                        <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleUpdate)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL, borderRadius: 15 }}>
                            <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.5) }} className="text-white font-bold tracking-wider">Ubah {name}</Text>
                        </TouchableOpacity>
                    }
                </View>
                <Toast />
            </View>
        </CustomKeyboard>
    )
}

export default BeritaEdit