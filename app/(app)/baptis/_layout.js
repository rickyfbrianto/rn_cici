import React from 'react'
import { Stack } from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const BaptisLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerTitle: "Baptis", headerShown:false }} />
            <Stack.Screen name='[id]' options={{ headerTitle: "Jadwal Baptis", headerShown: false }} />
            <Stack.Screen name='baptis_tambah' options={{ headerTitle: "Tambah Jadwal Baptis", headerLeft: () => <BackButtonHeader to={"baptis"} /> }} />
            <Stack.Screen name='edit/[id_edit]' options={{ headerTitle: "Ubah Jadwal Baptis", headerLeft: () => <BackButtonHeader to={"baptis"} /> }} />
        </Stack>
    )
}

export default BaptisLayout