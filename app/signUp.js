import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator} from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';
import { COLORS } from '../constants/Colors';
import { useForm, Controller } from 'react-hook-form';

const SignUp = () => {
    const router = useRouter()
    const { register } = useAuth()
    const invalidColor = "indianred"
    const [form, setForm] = useState({
        password:true,
        loading:false
    })

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { username:null, email: null, password: null}
    })

    const handleRegister = async (data) => {
        let response = await register(data.email, data.password, data.username)

        if (!response.success) {
            Alert.alert("Sign Up", response.msg)
        }
    }

    return (
        <CustomKeyboard>
            <View style={{flex:1}}>
                <View style={{ flex:1, paddingTop: hp(8), paddingHorizontal: wp(5) }}>
                    <View className="items-center">
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/signup.png')} />
                    </View>

                    <View style={{ rowGap: hp(2), flex: 1, marginTop:hp(5) }}>
                        <Text style={{ fontFamily:"outfit", fontSize: hp(4) }} className="font-bold tracking-wider text-neutral-500">Daftar</Text>
                        <View style={{ flexDirection: "row", borderWidth: errors.username ? 2 : 0, borderColor: "indianred", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                            <View style={{width:wp(10), alignItems:"center"}}>
                                <Feather name="user" size={24} color="gray" />
                            </View>
                            <Controller control={control} name='username' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Username' placeholderTextColor={'gray'} />
                            )} />
                            {errors?.username && <FontAwesome name="exclamation" size={24} color={invalidColor} />}
                        </View>
                        <View style={{ flexDirection: "row", borderWidth: errors.email ? 2 : 0, borderColor: {invalidColor}, height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                            <View style={{width:wp(10), alignItems:"center"}}>
                                <Octicons name="mail" size={24} color="gray" />
                            </View>
                            <Controller control={control} name='email' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Email' placeholderTextColor={'gray'} />
                            )} />
                            {errors?.email && <FontAwesome name="exclamation" size={24} color={invalidColor} />}
                        </View>
                        <View style={{ flexDirection: "row", borderWidth: errors.password ? 2 : 0, borderColor: {invalidColor}, height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                            <View style={{width:wp(10), alignItems:"center"}}>
                                <Octicons name="lock" size={24} color="gray" />
                            </View>
                            <Controller control={control} name='password' rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={val => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={form.password} />
                            )} />
                            {errors?.password && <FontAwesome name="exclamation" size={24} color={invalidColor} />}
                            <FontAwesome name={form.password ? "eye" :"eye-slash"} size={24} color={form.password ? COLORS.INDIGO : "gray"} onPress={()=>setForm(prev=>({...prev, password:!prev.password}))}/>
                        </View>
                        
                        <View>
                            <>
                                <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleRegister)} style={{ height: hp(7), backgroundColor:COLORS.INDIGO, justifyContent:"center", alignItems:"center", borderRadius:20 }}>
                                    <Text style={{ fontFamily:"outfit", fontSize: hp(3) }} className="text-white font-bold tracking-wider">Buat Akun</Text>
                                </TouchableOpacity>
                                <View style={{marginTop:hp(4), flexDirection:"row", justifyContent:"center", columnGap:wp(1)}}>
                                    <Text style={{ fontFamily:"outfit", fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Sudah punya akun?</Text>
                                    <Pressable onPress={() => router.push("signIn")}>
                                        <Text style={{ fontFamily:"outfit-bold", fontSize: hp(1.8), color:COLORS.INDIGO }}>Masuk</Text>
                                    </Pressable>
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"center", columnGap:wp(1)}}>
                                    <Text style={{ fontFamily:"outfit", fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Atau kembali ke</Text>
                                    <Pressable onPress={() => router.push("home")}>
                                        <Text style={{ fontFamily:"outfit-bold", fontSize: hp(1.8), color:COLORS.RED }}>Home</Text>
                                    </Pressable>
                                </View>
                            </>
                        </View>
                    </View>
                </View>
            </View >
        </CustomKeyboard>
    )
}

export default SignUp