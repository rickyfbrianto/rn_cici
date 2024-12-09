import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { db } from '../../../../firebaseConfig';
import CustomKeyboard from '../../../../components/CustomKeyboard';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Divider } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { getAuth, sendEmailVerification, updatePassword, updateProfile } from 'firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../../../context/authContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const UserEdit = () => {
    const { id_edit } = useLocalSearchParams()
    const name = "users"
    const userAuth = getAuth()
    const { user, updateUserData } = useAuth()
    const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: "", phone: "", nama:""
        }
    })
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const dataLevel = [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
    ]

    const dataQuery = useQuery({
        queryKey: ['userEdit', id_edit],
        queryFn: async () => {
            const queryRef = doc(db, name, id_edit)
            const querySnap = await getDoc(queryRef)
            const data = querySnap.data()
            setValue("username", data.username)
            setValue("nama", data?.nama ?? "")
            setValue("phone", data.phone)
            setValue("level", data.level)
            setImage(data.photoURL)
            return querySnap.data()
        }
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const handleUpdate = async (data) => {
        try {
            // const auth = getAuth();
            // const user = auth.currentUser;
            // const newPassword = getASecureRandomPassword();
            // const newPassword = data.password;

            // updatePassword(user, newPassword).then(() => {
            //     Toast.show({ type: 'success', text1: 'Berhasil', text2: `User berhasil diubah` });
            // }).catch((error) => {
            //     console.log(error);
            // });
            // return

            setLoading(true)
            const res = await fetch(image)
            const blob = await res.blob()
            const storage = getStorage();
            const storageRef = ref(storage, 'users/' + user.id + ".jpg");
            uploadBytes(storageRef, blob).then(() => {
                getDownloadURL(storageRef).then(async url => {
                    data.photoURL = url
                    Promise.all([
                        await updateProfile(userAuth.currentUser, {
                            displayName: data.username,
                            phoneNumber: data.phone,
                            photoURL: url
                        }),
                        await updateDoc(doc(db, name, id_edit), data),
                    ]).then(() => {
                        dataQuery.refetch()
                        setLoading(false)
                        Toast.show({ type: 'success', text1: 'Berhasil', text2: `User berhasil diubah` });
                    })
                })
            })
        } catch (error) {
            setLoading(false)
            Toast.show({ type: 'error', text1: 'Gagal', text2: error.message });
        }
    }

    const handleRefreshVerifikasi = async () => {
        setLoading(true)
        await userAuth.currentUser.reload().then(()=>{
            setLoading(false)
        })
    }
    
    const handleVerifikasi = ()=>{
        try {
            sendEmailVerification(userAuth.currentUser)
            Toast.show({ type: 'success', text1: 'Berhasil', text2: `Email verifikasi berhasil dikirim` });
        } catch (error) {
            Toast.show({ type: 'error', text1: "Error", text2: error.message });
        }
    }

    return (
        <CustomKeyboard>
            <View style={{ padding: 20, rowGap: 10 }} >
                <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} className="font-bold tracking-wider text-neutral-500">User {dataQuery.data?.username}</Text>
                <Divider style={{ marginVertical: hp(2) }} />
                {userAuth.currentUser.email !== "admin@gmail.com" ? 
                    userAuth.currentUser.emailVerified  
                        ? <View className='p-2 bg-green-600 rounded'>
                            <Text className='text-white'>Email berhasil diverifikasi</Text>
                        </View>
                        : 
                        <View className='flex p-2 bg-slate-200 space-y-2'>
                            <Text>Email belum diverifikasi</Text>
                            <View className='flex flex-row space-x-2'>
                                <TouchableOpacity onPress={handleRefreshVerifikasi} className="self-start p-2 bg-gray-400 rounded">
                                    <Text>Refresh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleVerifikasi} className="self-start p-2 bg-green-400 rounded">
                                    <Text>Kirim Email Verifikasi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : null
                }

                <View style={{ flexDirection: "row", borderWidth: errors.username ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <AntDesign name="user" size={20} color="gray" />
                    </View>
                    <Controller control={control} name='username' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Username' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.username && <FontAwesome name="exclamation" size={24} color="red" />}
                </View>
                <View style={{ flexDirection: "row", borderWidth: errors.username ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <AntDesign name="user" size={20} color="gray" />
                    </View>
                    <Controller control={control} name='nama' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Nama' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.nama && <FontAwesome name="exclamation" size={24} color="red" />}
                </View>
                <View style={{ flexDirection: "row", borderWidth: errors.phone ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <AntDesign name="phone" size={20} color="gray" />
                    </View>
                    <Controller control={control} name='phone' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Telpon' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.username && <FontAwesome name="exclamation" size={24} color="red" />}
                </View>
                <View className="px-6">
                    <Text>Photo</Text>
                    <TouchableOpacity onPress={pickImage} style={{ height: wp(25), width: wp(25), marginTop: 10 }} className="w-[110px] h-[110px]">
                        <Image style={{ borderWidth: 1, height: wp(25), width: wp(25), borderColor: (errors.photoURL) ? COLORS.RED : COLORS.PRIMARY }}
                            className="w-[110px] h-[110px] rounded-md" source={image ? ({ uri: image }) : require('../../../../assets/images/img.jpg')} />
                    </TouchableOpacity>
                </View>

                {/* <View style={{ flexDirection: "row", borderWidth: errors.password ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <Octicons name="lock" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='password' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput secureTextEntry={true} style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='password' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.password && <FontAwesome name="exclamation" size={24} color="red" />}
                </View> */}
                {user.level == "admin" &&
                    <View style={{ flexDirection: "row", borderWidth: errors.level ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                        <View style={{ width: wp(10), alignItems: "center" }}>
                            <Ionicons name="list" size={24} color="gray" />
                        </View>
                        <Controller control={control} name='level' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                            <Dropdown style={{ flex: 1, height: 50, }}
                                data={dataLevel} search maxHeight={300} labelField="label" valueField="value"
                                placeholder="Select item" searchPlaceholder="Search..." value={value}
                                onChange={item => onChange(item.value)} />
                        )} />
                        {errors?.level && <FontAwesome name="exclamation" size={24} color="red" />}
                    </View>
                }

                <View style={{ marginTop: hp(2) }}>
                    {loading ?
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <ActivityIndicator size='large' color={COLORS.TEAL} />
                        </View>
                        :
                        <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleUpdate)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.GUNMETAL, borderRadius: 15, alignSelf: "flex-start", paddingHorizontal: wp(4) }}>
                            <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2) }} className="text-white font-bold tracking-wider">Update Profil</Text>
                        </TouchableOpacity>
                    }
                </View>
                <Toast />
            </View>
        </CustomKeyboard>
    )
}

export default UserEdit