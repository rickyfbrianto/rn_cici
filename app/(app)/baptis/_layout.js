import React from 'react'
import {Stack} from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const IbadahLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerTitle:"Baptis"}}/>
        {/* <Stack.Screen name='[id]' options={{headerTitle:"Jadwal Ibadah"}}/> */}
    </Stack>
  )
}

export default IbadahLayout