import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios = Platform.OS == "ios"
const CustomKeyboard = ({ children }) => {
    return (
        <KeyboardAvoidingView behavior={ios ? "padding" : "height"}
            style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}
                bounces={false} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboard