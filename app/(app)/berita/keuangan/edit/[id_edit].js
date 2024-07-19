import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../../constants/Colors';
import { db } from '../../../../../firebaseConfig';
import CustomKeyboard from '../../../../../components/CustomKeyboard';
import { Hari } from '../../../../../constants/Constant';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Divider } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const BeritaKeuanganEdit = () => {
    const { id_edit } = useLocalSearchParams()
    const name = "berita_keuangan"
    const [loading, setLoading] = useState(null)
    const { control, reset, watch, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            judul: null, hari: null, tanggal: null, image: null
        },
    })
    const watchImage = watch("image")
    const [DTPicker, setDTPicker] = useState({ tanggal: false })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) setValue("image", result.assets[0].uri)
    };

    const dataQuery = useQuery({
        queryKey: ['beritaKeuanganEdit', id_edit],
        queryFn: async () => {
            const queryRef = doc(db, "berita_keuangan", id_edit)
            const querySnap = await getDoc(queryRef)
            const data = querySnap.data()
            Object.keys(data).map(v => setValue(v, data[v]))
            return querySnap.data()
        }
    })

    const handleHari = (e, selectedDate) => {
        const currentDate = selectedDate || new Date()
        let tempDate = new Date(currentDate)
        let fDate = tempDate.getUTCFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempDate.getDate()).slice(-2)
        let fDay = Hari[tempDate.getDay()]
        setDTPicker(prev => ({ ...prev, tanggal: false }))
        setValue("tanggal", fDate)
        setValue("hari", fDay)
    }

    const handleUpdate = async (data) => {
        try {
            setLoading(true)

            const res = await fetch(watchImage)
            const blob = await res.blob()
            const storage = getStorage();
            const storageRef = ref(storage, 'berita_keuangan/' + id_edit + ".jpg");
            uploadBytes(storageRef, blob).then(() => {
                getDownloadURL(storageRef).then(async url => {
                    data.image = url
                    const queryRef = doc(db, name, id_edit)
                    await updateDoc(queryRef, data)
                        .then(() => {
                            reset()
                            Toast.show({ type: 'success', text1: 'Berhasil', text2: `Berita Keuangan berhasil diubah` })
                            router.replace('berita')
                        })
                        .catch(err => Toast.show({ type: 'error', text1: 'Gagal', text2: err.message }))
                        .finally(() => setLoading(false))
                })
            })
        } catch (error) {
            setLoading(false)
            Toast.show({ type: 'error', text1: 'Gagal', text2: error.message });
        }
    }

    return (
        <CustomKeyboard>
            <View style={{ padding: 20, rowGap: 10 }} >
                <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} className="font-bold tracking-wider text-neutral-500">Edit Berita Keuangan</Text>
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
                <Pressable onPress={() => setDTPicker(prev => ({ ...prev, tanggal: true }))} style={{ flexDirection: "row", borderWidth: errors.tanggal ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <FontAwesome name="calendar-o" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='hari' render={({ field }) => (
                        <TextInput style={{ fontSize: hp(2) }} editable={false} {...field} className="font-semibold text-neutral-500" placeholder='Hari' placeholderTextColor={'gray'} />
                    )} />
                    <Controller control={control} name='tanggal' render={({ field, fieldState }) => (
                        <View>
                            {DTPicker.tanggal && <DateTimePicker mode='date' value={new Date()} display='default' onChange={handleHari} />}
                            <TextInput style={{ flex: 1, fontSize: hp(2) }} {...field} className="flex-1 w-full font-semibold text-neutral-500" placeholder='Tanggal' placeholderTextColor={'gray'} />
                        </View>
                    )} />
                    {errors?.tanggal && <FontAwesome name="exclamation" size={24} color="red" />}
                </Pressable>
                <View className="flex-row items-center rounded-lg p-4 bg-white">
                    <Text>Banner</Text>
                    <Controller control={control} name='image' rules={{ required: { value: true } }} render={({ field }) => (
                        <TouchableOpacity onPress={pickImage} style={{ height: wp(25), width: wp(25), marginTop: 10 }} className="ml-4 w-[110px] h-[110px]">
                            <Image style={{ borderWidth: 1, height: wp(25), width: wp(25), borderColor: (errors.photoURL) ? COLORS.RED : COLORS.PRIMARY }}
                                className="w-[110px] h-[110px] rounded-md" source={field.value ? ({ uri: field.value }) : require('../../../../../assets/images/img.jpg')} />
                        </TouchableOpacity>
                    )} />
                </View>

                <View style={{ marginTop: hp(2) }}>
                    {loading ?
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <ActivityIndicator size='large' color={COLORS.TEAL} />
                        </View>
                        :
                        <TouchableOpacity disabled={loading} onPress={handleSubmit(handleUpdate)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL, borderRadius: 15 }}>
                            <Text className="text-[14px] text-white font-bold" style={{ fontFamily: "outfit-bold" }}>Ubah Berita Keuangan</Text>
                        </TouchableOpacity>
                    }
                </View>
                <Toast />
            </View>
        </CustomKeyboard>
    )
}

export default BeritaKeuanganEdit