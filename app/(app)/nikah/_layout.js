import React from 'react'
import {Stack} from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const IbadahLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerTitle:"Nikah", headerLeft: ()=> <BackButtonHeader to={"home"}/>}}/>
            <Stack.Screen name='[id]' options={{headerTitle:"Jadwal Nikah", headerShown:false}}/>
            <Stack.Screen name='nikah_tambah' options={{headerTitle:"Tambah Nikah", headerLeft: ()=> <BackButtonHeader to={"nikah"}/>}}/>
        </Stack>
    )
}

export default IbadahLayout