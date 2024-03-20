import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import IbadahCard from '../../../components/IbadahCard'
import { COLORS } from '../../../constants/Colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {router} from 'expo-router'
import { SpeedDial } from '@rneui/themed';
import { getDocs } from 'firebase/firestore'
import { ibadahCol } from '../../../firebaseConfig'

const index = () => {
    const [page, setPage] = React.useState({
        openSpeedDial:false
    });
    const [ibadah, setIbadah] = useState([])
    
    useEffect(()=>{
        (async () =>{
            const querySnap = await getDocs(ibadahCol)
            let data = []
            querySnap.forEach(v=>{
                data.push({...v.data(), id:v?.id})
            })
            setIbadah(data)
        })()
    }, [])
    
    return (
        <>
            <View className="flex-1 bg-teal-500 p-5" style={{padding:10}}>
                <Text style={{fontSize:hp(3), fontWeight:"bold"}}>Daftar</Text> 
                {ibadah 
                ? <IbadahCard data={ibadah}/>
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
                <SpeedDial.Action color={COLORS.PRIMARY} icon={{ name: 'add', color: '#fff' }} title="Ibadah" onPress={() => router.push('ibadah/ibadah_tambah')}/>
            </SpeedDial>
        </>
    )
}

export default index