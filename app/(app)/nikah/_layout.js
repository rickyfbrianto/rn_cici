import React from 'react'
import {Stack} from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const NikahLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerTitle:"Nikah", headerShown:false}}/>
            <Stack.Screen name='[id]' options={{headerTitle:"Jadwal Nikah", headerShown:false}}/>
            <Stack.Screen name='nikah_tambah' options={{headerTitle:"Tambah Nikah", headerLeft: ()=> <BackButtonHeader to={"nikah"}/>}}/>
            <Stack.Screen name='edit/[id_edit]' options={{headerTitle:"Jadwal Nikah", headerLeft: ()=> <BackButtonHeader to={"nikah"}/>}}/>
        </Stack>
    )
}

export default NikahLayout