import React, { useEffect } from "react"
import { Slot, Stack, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "../context/authContext"
import { MenuProvider } from 'react-native-popup-menu';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Root as PopupRootProvider } from 'react-native-popup-confirm-toast';

const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    const [fontsLoaded, fontError] = useFonts({
        'wedding': require('../assets/fonts/Stylish.ttf'),
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
        'dm': require('../assets/fonts/DMSans-Regular.ttf'),
        'dm-bold': require('../assets/fonts/DMSans-Bold.ttf'),
        'dm-medium': require('../assets/fonts/DMSans-Medium.ttf'),
    });

    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return
        const inApp = segments[0] == '(app)'
        // if (isAuthenticated && !inApp) {
        //     router.replace('home')
        // } else if (!isAuthenticated) {
        //     router.replace('signIn')
        // }
        router.replace('home')
    }, [isAuthenticated])

    // return <Slot />
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name='signIn' options={{ headerShown: false }} />
            <Stack.Screen name='signUp' options={{ headerShown: false }} />
        </Stack>
    )
}

const RootLayout = () => {
    const queryClient = new QueryClient()

    return (
        <MenuProvider>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <PopupRootProvider>
                        <MainLayout />
                    </PopupRootProvider>
                </QueryClientProvider>
            </AuthContextProvider>
        </MenuProvider>
    )
}

export default RootLayout;