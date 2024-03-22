import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator} from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';
import { COLORS } from '../constants/Colors';

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
            <View className="bg-white" style={{flex:1}}>
                <View style={{ flex:1, paddingTop: hp(8), paddingHorizontal: wp(5) }}>
                    <View className="items-center">
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/signup.png')} />
                    </View>

                    <View style={{ flex:1, rowGap:hp(2)}}>
                        <Text style={{ fontFamily:"outfit", fontSize: hp(4) }} className="font-bold tracking-wider text-neutral-500">Daftar</Text>
                        <View style={{ flexDirection:"row", height: hp(7), backgroundColor:"whitesmoke", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                            <View style={{width:wp(10), alignItems:"center"}}>
                                <Feather name="user" size={24} color="gray" />
                            </View>
                            <TextInput style={{ flex:1, fontSize: hp(2) }} onChangeText={val => input.current.username = val} className="flex-1 font-semibold text-neutral-700" placeholder='Username' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ flexDirection:"row", height: hp(7), backgroundColor:"whitesmoke", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                            <View style={{width:wp(10), alignItems:"center"}}>
                                <Octicons name="mail" size={24} color="gray" />
                            </View>
                            <TextInput style={{ flex:1, fontSize: hp(2) }} onChangeText={val => input.current.email = val} className="flex-1 font-semibold text-neutral-700" placeholder='Email' placeholderTextColor={'gray'} />
                        </View>
                        <View style={{ flexDirection:"row", height: hp(7), backgroundColor:"whitesmoke", borderRadius:15, paddingHorizontal:hp(2), alignItems:"center", columnGap:wp(2) }}>
                            <View style={{width:wp(10), alignItems:"center"}}>
                                <Octicons name="lock" size={24} color="gray" />
                            </View>
                            <TextInput style={{ flex:1, fontSize: hp(2) }} onChangeText={val => input.current.password = val} className="flex-1 font-semibold text-neutral-700" placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={form.password} />
                            <FontAwesome name={form.password ? "eye" :"eye-slash"} size={24} color={form.password ? COLORS.INDIGO : "gray"} onPress={()=>setForm(prev=>({...prev, password:!prev.password}))}/>
                        </View>
                        
                        <View>
                            {loading ?
                                <View style={{flexDirection:"row", justifyContent:"center"}}>
                                    <ActivityIndicator size='large' color={COLORS.INDIGO} />
                                </View>
                                :
                                <>
                                    <TouchableOpacity onPress={handleRegister} style={{ height: hp(7), backgroundColor:COLORS.INDIGO, justifyContent:"center", alignItems:"center", borderRadius:20 }}>
                                        <Text style={{ fontFamily:"outfit", fontSize: hp(3) }} className="text-white font-bold tracking-wider">Buat Akun</Text>
                                    </TouchableOpacity>
                                    <View style={{marginTop:hp(2), flexDirection:"row", justifyContent:"center", columnGap:wp(1)}}>
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
                            }
                        </View>
                    </View>
                </View>
            </View >
        </CustomKeyboard>
    )
}

export default SignUp