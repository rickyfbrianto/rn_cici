import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Kategori } from "../../../constants/Constant";
import CardBerita from "../../../components/CardBerita";
import { SpeedDial } from "@rneui/themed";
import { useAuth } from "../../../context/authContext";
import { router } from "expo-router";
import CardBeritaKeuangan from "../../../components/CardBeritaKeuangan";
import { COLORS } from "../../../constants/Colors";

const AppIndex = () => {
	const name = "berita";
	const [page, setPage] = React.useState({
		openSpeedDial: false,
	});
	const { top } = useSafeAreaInsets();
	const { user } = useAuth();
	const colorBase = Kategori[name].color;

	return (
		<>
			<View style={{ justifyContent: "flex-end", paddingTop: top, paddingBottom: hp(2), height: hp(12), backgroundColor: COLORS.PRIMARY, paddingHorizontal: wp(5) }}>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
					<Text style={{ fontFamily: "outfit", fontSize: hp(3), fontWeight: "bold", color: "white" }}>Warta berita</Text>
				</View>
			</View>
			<ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
				<View className="flex-1 p-4">
					<View>
						<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }}>Hot News</Text>
						<Text style={{ fontFamily: "outfit", fontSize: hp(2), textAlign: "justify" }}>Selalu update dengan berita terbaru dari gereja lokal dan pusat</Text>
						<CardBerita showControl={true} />
					</View>
					<View className="mt-4">
						<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }}>Berita Keuangan Gereja</Text>
						<Text style={{ fontFamily: "outfit", fontSize: hp(2), textAlign: "justify" }}>Dapatkan informasi terkait pendapatan gereja setiap minggunya</Text>
						<CardBeritaKeuangan showControl={true} />
					</View>
				</View>
			</ScrollView>
			{user && user?.level == "admin" && (
				<SpeedDial color={COLORS.PRIMARY} isOpen={page.openSpeedDial} icon={{ name: "add", color: "#fff" }} openIcon={{ name: "close", color: "#fff" }} onOpen={() => setPage((prev) => ({ ...prev, openSpeedDial: true }))} onClose={() => setPage((prev) => ({ ...prev, openSpeedDial: false }))}>
					<SpeedDial.Action color={COLORS.PRIMARY} icon={{ name: "add", color: "#fff" }} title={"Warta Berita"} onPress={() => router.push("berita/berita_tambah")} />
					<SpeedDial.Action color={COLORS.PRIMARY} icon={{ name: "add", color: "#fff" }} title={"Berita Keuangan"} onPress={() => router.push("berita/keuangan/keuangan_tambah")} />
				</SpeedDial>
			)}
		</>
	);
};

export default AppIndex;
