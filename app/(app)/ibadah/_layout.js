import React from 'react'
import {Stack} from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const IbadahLayout = () => {
    return (
        <Stack>
            {/* <Stack.Screen name='index' options={{headerTitle:"Ibadah", headerLeft: ()=> <BackButtonHeader to={"home"}/>}}/> */}
            <Stack.Screen name='index' options={{headerTitle:"Ibadah", headerShown:false}}/>
            <Stack.Screen name='[id]' options={{headerTitle:"Jadwal Ibadah", headerShown:false}}/>
            <Stack.Screen name='ibadah_tambah' options={{headerTitle:"Tambah Ibadah", headerLeft: ()=> <BackButtonHeader to={"ibadah"}/>}}/>
            <Stack.Screen name='edit/[id_edit]' options={{ headerTitle: "Ubah Jadwal Ibadah", headerLeft: () => <BackButtonHeader to={"ibadah"} /> }} />
        </Stack>
    )
}

export default IbadahLayout