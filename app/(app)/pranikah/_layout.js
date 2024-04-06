import React from 'react'
import {Stack} from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const PraNikahLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerTitle:"Pra Nikah", headerShown:false}}/>
            <Stack.Screen name='[id]' options={{headerTitle:"Jadwal Pra Nikah", headerShown:false}}/>
            <Stack.Screen name='pranikah_tambah' options={{headerTitle:"Tambah Pra Nikah", headerLeft: ()=> <BackButtonHeader to={"pranikah"}/>}}/>
            <Stack.Screen name='edit/[id_edit]' options={{headerTitle:"Jadwal Pra Nikah", headerLeft: ()=> <BackButtonHeader to={"pranikah"}/>}}/>
        </Stack>
    )
}

export default PraNikahLayout