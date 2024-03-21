import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';
import { COLORS } from '../constants/Colors';

const SignIn = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        password: true,
        loading: false
    })
    const { user, login } = useAuth()
    const input = useRef({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (user) {
            router.replace('/home')
        }
    }, [])

    const handleLogin = async () => {
        if (!input.current.email || !input.current.password) {
            Alert.alert("Sign In", "Please fill on all the fields")
            return
        }

        setForm(prev => ({ ...prev, loading: true }))
        const response = await login(input.current.email, input.current.password)
        setForm(prev => ({ ...prev, loading: false }))

        if (!response.success) {
            Alert.alert("Login", response.msg)
        }
    }

    return (
        <CustomKeyboard>
            <View className="bg-white" style={{ flex: 1 }}>
                <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5), flex:1 }} className="gap-12">
                    <View className="items-center">
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/signin.png')} />
                    </View>

                    <View style={{ rowGap: hp(2), flex:1 }}>
                        <Text style={{ fontFamily: "outfit", fontSize: hp(4) }} className="font-bold tracking-wider text-neutral-500">Masuk</Text>
                        <View style={{ flexDirection: "row", height: hp(7), backgroundColor: "whitesmoke", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                            <View style={{ width: wp(10), alignItems: "center" }}>
                                <Octicons name="mail" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.email = val} className="flex-1 font-semibold text-neutral-500" placeholder='Email' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ flexDirection: "row", height: hp(7), backgroundColor: "whitesmoke", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
                            <View style={{ width: wp(10), alignItems: "center" }}>
                                <Octicons name="lock" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.password = val} className="flex-1 font-semibold text-neutral-500" placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={form.password} />
                            <FontAwesome name={form.password ? "eye" : "eye-slash"} size={24} color={form.password ? "green" : "gray"} onPress={() => setForm(prev => ({ ...prev, password: !prev.password }))} />
                        </View>
                        {/* <Text style={{fontFamily:"outfit-bold", fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">Lupa Password?</Text> */}

                        <View>
                            {form.loading ?
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <ActivityIndicator size='large' color={COLORS.INDIGO} />
                                </View>
                                :
                                <>
                                    <TouchableOpacity onPress={handleLogin} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL }} className="rounded-xl">
                                        <Text style={{ fontFamily: "outfit", fontSize: hp(3) }} className="text-white font-bold tracking-wider">Masuk</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: hp(2), flexDirection: "row", justifyContent: "center", columnGap: wp(1) }}>
                                        <Text style={{ fontFamily: "outfit", fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Tidak punya akun?</Text>
                                        <Pressable onPress={() => router.push("signUp")}>
                                            <Text style={{ fontFamily: "outfit-bold", fontSize: hp(1.8), color: COLORS.TEAL }}>Daftar sekarang</Text>
                                        </Pressable>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", columnGap: wp(1) }}>
                                        <Text style={{ fontFamily: "outfit", fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Atau kembali ke</Text>
                                        <Pressable onPress={() => router.push("home")}>
                                            <Text style={{ fontFamily: "outfit-bold", fontSize: hp(1.8), color: COLORS.RED }}>Home</Text>
                                        </Pressable>
                                    </View>
                                </>
                            }
                        </View>

                        {/* <View className="flex-col">
                            <View style={{flexDirection:"row", justifyContent:"center", columnGap:wp(1)}}>
                                <Text style={{ fontFamily:"outfit", fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Tidak punya akun?</Text>
                                <Pressable onPress={() => router.push("signUp")}>
                                    <Text style={{ fontFamily:"outfit-bold", fontSize: hp(1.8), color:COLORS.TEAL }}>Daftar sekarang</Text>
                                </Pressable>
                            </View>
                            <View style={{flexDirection:"row", justifyContent:"center", columnGap:wp(1)}}>
                                <Text style={{ fontFamily:"outfit", fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Atau kembali ke</Text>
                                <Pressable onPress={() => router.push("home")}>
                                    <Text style={{ fontFamily:"outfit-bold", fontSize: hp(1.8), color:COLORS.RED }}>Home</Text>
                                </Pressable>
                            </View>
                        </View> */}
                    </View>
                </View>
            </View>
        </CustomKeyboard >
    )
}

export default SignIn