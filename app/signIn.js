import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboard from '../components/CustomKeyboard';

const SignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const input = useRef({
        email: "",
        password: ""
    })

    const handleLogin = () => {
        if (!input.current.email || !input.current.password) {
            Alert.alert("Sign In", "Please fill on all the fields")
            return
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
                        <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-neutral-700">Sign In</Text>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                            <Octicons name="mail" size={24} color="gray" />
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.email = val} className="flex-1 font-semibold text-neutral-700" placeholder='Email Address' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                            <Octicons name="lock" size={24} color="gray" />
                            <TextInput style={{ fontSize: hp(2) }} onChangeText={val => input.current.password = val} className="flex-1 font-semibold text-neutral-700" placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={true} />
                        </View>
                        <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">Forgot Password?</Text>

                        <View>
                            {loading ?
                                <>
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(8)} />
                                    </View>
                                </>
                                :
                                <TouchableOpacity onPress={handleLogin} style={{ height: hp(7) }} className="bg-indigo-500 justify-center items-center rounded-xl">
                                    <Text style={{ fontSize: hp(3) }} className="text-white font-bold tracking-wider">Sign In</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View className="flex-row justify-center gap-x-2">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Dont have an account?</Text>
                            <Pressable onPress={() => router.push("signUp")}>
                                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    )
}

export default SignIn