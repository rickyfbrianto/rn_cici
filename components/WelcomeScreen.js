import { View, Text, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const WelcomeScreen = () => {
  return (
    <View style={{flex:1, alignItems:'center'}}>
        <Image style={{ height:hp(10), aspectRatio: 1, }} source={require('../assets/images/welcome.jpg')}/ >
        <Text style={{color:"#3c444c"}}>Sahabat Rohani</Text>
    </View>
  )
}

export default WelcomeScreen