import React from 'react'
import { Stack, Tabs } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'
import { FontAwesome } from '@expo/vector-icons'
import BeritaHeader from '../../components/BeritaHeader'
import { COLORS } from '../../constants/Colors'
import BackButtonHeader from '../../components/BackButtonHeader'

const AppLayout = () => {
    return (
        // <Stack>
        //     <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
        //     <Stack.Screen name="index" />

        //     <Stack.Screen name="tes/[id]/index" />
        //     <Stack.Screen name="tes/home" />
        // </Stack>
        <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.PRIMARY, tabBarStyle: { height: 70 }, tabBarLabelStyle: { bottom: 14 } }} >
            <Tabs.Screen name="home" options={{ header: () => <HomeHeader />, title: "Beranda", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />
            <Tabs.Screen name='berita' options={{ header: () => <BeritaHeader />, title: "Berita", tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} /> }} />
            
            <Tabs.Screen name="ibadah" options={{ href:null, headerShown:false  }} />
            <Tabs.Screen name="baptis" options={{ href:null, headerShown:false  }} />
            <Tabs.Screen name="user" options={{ href: null, }} />
        </Tabs>
    )
}

export default AppLayout