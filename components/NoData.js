import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const NoData = ({pesan, pesanStyle, component}) => {
    const Component = ()=>{
        return (
            <>
                {component 
                ? component 
                : <Text style={(pesanStyle) ? {...pesanStyle} : {fontFamily:"outfit-bold", fontSize:hp(2)}}>{pesan}</Text>}
            </>
        )
    }
    
    return (
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Component/>
        </View>
    )
}

export default NoData