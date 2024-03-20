import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../constants/Colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {router} from 'expo-router'
import { SpeedDial } from '@rneui/themed';
import { getDocs, query } from 'firebase/firestore'
import { nikahCol } from '../../../firebaseConfig'
import { FontAwesome, Feather } from '@expo/vector-icons';
import NikahCard from '../../../components/NikahCard'

const index = () => {
    const [page, setPage] = React.useState({
        openSpeedDial:false
    });
    const [data, setData] = useState([])
    
    useEffect(()=>{
        (async () =>{
            const querySnap = await getDocs(nikahCol)
            let temp = []
            querySnap.forEach(v=>{
                temp.push({...v.data(), id:v?.id})
            })
            setData(temp)
        })()
    }, [])
    
    return (
        <>
            <View className="flex-1 bg-teal-500 p-5" style={{padding:10}}>
                <Text style={{fontSize:hp(3), fontWeight:"bold"}}>Daftar</Text> 
                {data 
                ? <NikahCard data={data}/>
                : <Text>Loading</Text>
                }
            </View>
            <SpeedDial
                color={COLORS.PRIMARY}
                isOpen={page.openSpeedDial}
                icon={{ name: 'add', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setPage(prev=>({...prev, openSpeedDial:true}))}
                onClose={() => setPage(prev=>({...prev, openSpeedDial:false}))}>
                <SpeedDial.Action color={COLORS.PRIMARY} icon={{ name: 'add', color: '#fff' }} title="Nikah" onPress={() => router.push('nikah/nikah_tambah')}/>
            </SpeedDial>
        </>
    )
}

export default index