import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';

const SignUp = () => {
    const router = useRouter()
    const { register } = useAuth()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        password:true,
        loading:false
    })
    const input = useRef({
        email: "",
        password: "",
        username: ""
    })

    const handleRegister = async () => {
        if (!input.current.email || !input.current.password || !input.current.username) {
            Alert.alert("Sign Up", "Please fill on all the fields")
            return
        }

        setLoading(true)
        let response = await register(input.current.email, input.current.password, input.current.username)
        setLoading(false)

        if (!response.success) {
            Alert.alert("Sign Up", response.msg)
        }
    }

    return (
        <CustomKeyboard>
            <View className="flex-1 h-screen bg-white">
                <StatusBar style='dark' />
                <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                    <View className="items-center">
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/signup.png')} />
                    </View>

                    <View className="gap-4">
                        <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-neutral-500">Daftar</Text>
                        <View style={{ height: hp(7) }} className="flex-row gap-x-3 px-5 bg-neutral-200 items-center rounded-2xl">
                            <View className="w-[30px] flex-row justify-center">
                                <Feather name="user" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.username = val} className="flex-1 font-semibold text-neutral-700" placeholder='Username' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-x-3 px-5 bg-neutral-200 items-center rounded-2xl">
                            <View className="w-[30px] flex-row justify-center">
                                <Octicons name="mail" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.email = val} className="flex-1 font-semibold text-neutral-700" placeholder='Email' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-x-3 px-5 bg-neutral-200 items-center rounded-2xl">
                            <View className="w-[30px] flex-row justify-center">
                                <Octicons name="lock" size={24} color="gray" />
                            </View>
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.password = val} className="flex-1 font-semibold text-neutral-700" placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={form.password} />
                            <FontAwesome name={form.password ? "eye" :"eye-slash"} size={24} color={form.password ? "green" : "gray"} onPress={()=>setForm(prev=>({...prev, password:!prev.password}))}/>
                        </View>
                        <View>
                            {loading ?
                                <>
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(8)} />
                                    </View>
                                </>
                                :
                                <TouchableOpacity onPress={handleRegister} style={{ height: hp(7) }} className="bg-indigo-500 justify-center items-center rounded-xl">
                                    <Text style={{ fontSize: hp(3) }} className="text-white font-bold tracking-wider">Buat Akun</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View className="flex-col">
                            <View className="flex-row justify-center gap-x-1">
                                <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Sudah punya akun?</Text>
                                <Pressable onPress={() => router.push("signIn")}>
                                    <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">Masuk</Text>
                                </Pressable>
                            </View>
                            <View style={{ marginTop: hp(1) }} className="flex-row justify-center gap-x-1">
                                <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Atau kembali ke</Text>
                                <Pressable onPress={() => router.push("home")}>
                                    <Text style={{ fontSize: hp(1.8) }} className="font-bold text-red-600">Home</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        </CustomKeyboard>
    )
}

export default SignUp