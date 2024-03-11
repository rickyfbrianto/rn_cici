import React, { useEffect } from "react"
import { Slot, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "../context/authContext"
import "../global.css"
import { View } from "react-native"

const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return
        const inApp = segments[0] == '(app)'
        if (isAuthenticated && !inApp) {
            router.replace('home')
        } else if (!isAuthenticated) {
            router.replace('signIn')
        }
    }, [isAuthenticated])

    return (
        <Slot />
    )
}

const RootLayout = () => {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}

export default RootLayout;