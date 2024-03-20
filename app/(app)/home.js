import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import KategoriFilter from '../../components/KategoriFilter'
import IbadahCard from '../../components/IbadahCard'
import { doc, getDocs } from 'firebase/firestore'
import { db, ibadahCol } from '../../firebaseConfig'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
    const ibadahQuery = useQuery({
        queryKey: ['ibadah'],
        queryFn: async () => {
            const querySnap = await getDocs(ibadahCol)
            let data = []
            querySnap.forEach(v => {
                data.push({ ...v.data(), id: v?.id })
            })
            return data
        },
    })

    return (
        <View className="" style={{ paddingHorizontal: hp(2), marginTop: hp(2), flex: 1 }}>
            <KategoriFilter />
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold" }}>Jadwal Ibadah</Text>
                {ibadahQuery.isLoading
                    ? <Text>Mengambil data ibadah...</Text>
                    : <IbadahCard data={ibadahQuery.data} />
                }
            </View>
        </View >
    )
}

export default Home