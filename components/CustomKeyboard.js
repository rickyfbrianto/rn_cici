import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios = Platform.OS == "ios"
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

const CustomKeyboard = ({ children }) => {

    return (
        <KeyboardAvoidingView behavior={ios ? "padding" : "height"} keyboardVerticalOffset={keyboardVerticalOffset} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboard