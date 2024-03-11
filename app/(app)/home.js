import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const { logout, user } = useAuth()
    const handleLogout = async () => {
        setLoading(true)
        setTimeout(async () => {
            await logout()
            setLoading(false)
        }, 1000)
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="mb-5">Hello {user.username} </Text>
            {loading
                ? <Text>Anda akan dikeluarkan dari halaman ini</Text>
                : <Button title='Logout' onPress={() => handleLogout()} />
            }
        </View>
    )
}

export default Home