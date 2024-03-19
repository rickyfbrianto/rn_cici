import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import WelcomeScreen from '../components/WelcomeScreen'
import { COLORS } from '../constants/Colors'

const StartPage = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <WelcomeScreen/>
            <ActivityIndicator size='large' color={COLORS.PRIMARY} />
        </View>
    )
}

export default StartPage