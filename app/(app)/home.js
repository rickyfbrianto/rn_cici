import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import KategoriFilter from '../../components/KategoriFilter'
import IbadahCard from '../../components/IbadahCard'
import { doc, getDocs } from 'firebase/firestore'
import { db, ibadahCol } from '../../firebaseConfig'

const Home = () => {
    const [data, setData] = useState()

    useEffect(()=>{
        (async () =>{
            const querySnap = await getDocs(ibadahCol)
            let data = []
            querySnap.forEach(v=>{
                data.push({...v.data(), id:v?.id})
            })
            setData(data)
        })()
    }, [])

    return (
        <View className="" style={{paddingHorizontal:hp(2), marginTop:hp(2), flex:1}}>
            {/* <StatusBar style='light'>
                {users.length > 0 ? (
                    <View className=""></View>
                ) : (
                    <View className="flex items-center" style={{ top: hp(30) }}>

                    </View>
                )}
            </StatusBar > */}    
            <KategoriFilter/>
            <View style={{flex:1}}>
                <Text style={{fontFamily:"outfit", fontSize:hp(3), fontWeight:"bold"}}>Jadwal Ibadah</Text> 
                <IbadahCard data={data}/>
            </View>
        </View >
    )
}

export default Home