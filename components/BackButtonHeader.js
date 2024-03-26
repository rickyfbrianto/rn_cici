import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {router} from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons';

const BackButtonHeader = ({to, color}) => {
    const {top} = useSafeAreaInsets()
    
  return (
    <SafeAreaView className="flex-row justify-between ms-2 me-5" >
        <Pressable onPress={()=> (to) ? router.replace(to) : router.back()}>
            <Octicons name="arrow-left" size={24} color={`${(color) ? color:"gray"}`} />
        </Pressable>
    </SafeAreaView>
  )
}

export default BackButtonHeader