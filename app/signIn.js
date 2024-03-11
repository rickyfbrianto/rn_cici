import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';

const SignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const input = useRef({
        email: "",
        password: ""
    })

    const handleLogin = async () => {
        if (!input.current.email || !input.current.password) {
            Alert.alert("Sign In", "Please fill on all the fields")
            return
        }

        setLoading(true)
        const response = await login(input.current.email, input.current.password)
        setLoading(false)

        if (!response.success) {
            Alert.alert("Login", response.msg)
        }

        // Login process
    }

    return (
        <CustomKeyboard>
            <View className="flex-1">
                <StatusBar style='dark' />
                <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                    <View className="items-center">
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/signin.png')} />
                    </View>

                    <View className="gap-4">
                        <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-neutral-700">Masuk</Text>
                        <View style={{ height: hp(7) }} className="flex-row gap-x-3 px-2 bg-neutral-100 items-center rounded-2xl">
                            <View className="w-[40px] flex-row justify-center">
                                <Octicons name="mail" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.email = val} className="flex-1 font-semibold text-neutral-700" placeholder='Alamat email' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-x-3 px-2 bg-neutral-100 items-center rounded-2xl">
                            <View className="w-[40px] flex-row justify-center">
                                <Octicons name="lock" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.password = val} className="flex-1 font-semibold text-neutral-700" placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={true} />
                        </View>
                        <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">Lupa Password?</Text>

                        <View>
                            {loading ?
                                <>
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(8)} />
                                    </View>
                                </>
                                :
                                <TouchableOpacity onPress={handleLogin} style={{ height: hp(7) }} className="bg-teal-600 justify-center items-center rounded-xl">
                                    <Text style={{ fontSize: hp(3) }} className="text-white font-bold tracking-wider">Masuk</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View className="flex-row justify-center gap-x-1">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Tidak punya akun?</Text>
                            <Pressable onPress={() => router.push("signUp")}>
                                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-teal-600">Daftar sekarang</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    )
}

export default SignIn