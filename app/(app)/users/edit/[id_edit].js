import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontAwesome, Ionicons, AntDesign, Octicons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { app, db } from '../../../../firebaseConfig';
import CustomKeyboard from '../../../../components/CustomKeyboard';
import { Hari } from '../../../../constants/Constant';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Divider } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { getAuth, updatePassword } from 'firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../../../context/authContext';

const UserEdit = () => {
    const { id_edit } = useLocalSearchParams()
    const name = "users"
    const { user, updateUserData } = useAuth()
    const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: null
        }
    })

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
            setValue("level", data.level)
            return querySnap.data()
        }
    })

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
            const queryRef = doc(db, name, id_edit)
            await updateDoc(queryRef, data)
                .then(() => {
                    if (user.userId == id_edit) updateUserData(id_edit)
                    dataQuery.refetch()
                    Toast.show({ type: 'success', text1: 'Berhasil', text2: `User berhasil diubah` });
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
                <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} className="font-bold tracking-wider text-neutral-500">User {dataQuery.data?.username}</Text>
                <Divider style={{ marginVertical: hp(2) }} />

                <View style={{ flexDirection: "row", borderWidth: errors.username ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                    <View style={{ width: wp(10), alignItems: "center" }}>
                        <AntDesign name="user" size={24} color="gray" />
                    </View>
                    <Controller control={control} name='username' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Username' placeholderTextColor={'gray'} />
                    )} />
                    {errors?.username && <FontAwesome name="exclamation" size={24} color="red" />}
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
                                data={dataLevel} search maxHeight={300}
                                labelField="label" valueField="value"
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    onChange(item.value);
                                }} />
                        )} />
                        {errors?.level && <FontAwesome name="exclamation" size={24} color="red" />}
                    </View>
                }

                <View style={{ marginTop: hp(2) }}>
                    {isSubmitting ?
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <ActivityIndicator size='large' color={COLORS.TEAL} />
                        </View>
                        :
                        <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleUpdate)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL, borderRadius: 15 }}>
                            <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.5) }} className="text-white font-bold tracking-wider">Ubah user</Text>
                        </TouchableOpacity>
                    }
                </View>
                <Toast />
            </View>
        </CustomKeyboard>
    )
}

export default UserEdit