import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import { Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const StartPage = () => {
	return (
		<View style={{ flex: 1, rowGap: hp(2), alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
			<Image style={{ height: hp(30), aspectRatio: 1 }} source={require("../assets/images/icon.png")} />
			<Text style={{ color: COLORS.INDIGO, fontSize: hp(3) }}>GBI</Text>
			<ActivityIndicator size="large" color={COLORS.PRIMARY} />
		</View>
	);
};

export default StartPage;
