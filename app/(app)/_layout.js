import React from 'react'
import { Tabs } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'
import { FontAwesome } from '@expo/vector-icons'
import BeritaHeader from '../../components/BeritaHeader'
import { COLORS } from '../../constants/Colors'
import { useAuth } from '../../context/authContext'

const AppLayout = () => {
    const { user } = useAuth()
    return (
        // <Stack>
        //     <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
        //     <Stack.Screen name="index" />

        //     <Stack.Screen name="tes/[id]/index" />
        //     <Stack.Screen name="tes/home" />
        // </Stack>
        <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.PRIMARY, tabBarStyle: { height: 70 }, tabBarLabelStyle: { bottom: 14 } }} >
            <Tabs.Screen name="home" options={{ header: () => <HomeHeader />, title: "Beranda", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />
            <Tabs.Screen name='berita' options={{ title: "Berita", headerShown:false, tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} /> }} />
            <Tabs.Screen name="users" options={{ href: user?.level == "admin" ? "users" : null, headerShown: false, tabBarIcon: ({ color }) => <FontAwesome name="user-o" size={28} color={color} /> }} />

            <Tabs.Screen name="ibadah" options={{ href: null, headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { display: "none" } }} />
            <Tabs.Screen name="pranikah" options={{ href: null, headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { display: "none" } }} />
            <Tabs.Screen name="nikah" options={{ href: null, headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { display: "none" } }} />
            <Tabs.Screen name="baptis" options={{ href: null, headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { display: "none" } }} />
        </Tabs>
    )
}

export default AppLayout