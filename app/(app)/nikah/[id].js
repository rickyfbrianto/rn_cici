import { View, Text, SafeAreaView, Pressable, ActivityIndicator, Image, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { COLORS } from "../../../constants/Colors";
import { AyatNikah } from "../../../constants/Constant";
import { useQuery } from "@tanstack/react-query";
import IsFetching from "../../../components/IsFetching";

const NikahDetail = () => {
	const { id } = useLocalSearchParams();
	const { top } = useSafeAreaInsets();
	const [refresh, setRefresh] = useState(false);
	const ayat = AyatNikah[Math.floor(Math.random() * 10)];

	const dataQuery = useQuery({
		queryKey: ["nikahDetail", id],
		queryFn: async () => {
			const ref = doc(db, "nikah", id);
			const dataSnap = await getDoc(ref);
			return dataSnap.data();
		},
	});

	const handleRefresh = () => {
		setRefresh(true);
		setTimeout(() => {
			dataQuery.refetch();
			setRefresh(false);
		}, 50);
	};

	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />} style={{ flex: 1, backgroundColor: "white" }}>
			<View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>
				<SafeAreaView style={{ paddingTop: top + 10, flexDirection: "row", marginHorizontal: hp(2) }}>
					<Pressable onPress={() => router.back()}>
						<FontAwesome name="arrow-circle-left" size={28} color="white" />
					</Pressable>
				</SafeAreaView>
				{dataQuery.isFetching ? (
					<IsFetching />
				) : (
					<View className="items-center bg-white" style={{ marginTop: hp(20), paddingTop: 20 }}>
						<View className="absolute flex justify-center items-center bg-white" style={{ top: hp(-18), height: hp(36), width: wp(80), borderBottomColor: COLORS.PRIMARY, borderBottomWidth: 1, paddingHorizontal: wp(5), paddingVertical: hp(2), borderTopLeftRadius: hp(3), borderTopRightRadius: hp(3) }}>
							<Text className="text-[38px] text-center" style={{ fontFamily: "wedding" }}>
								{dataQuery.data.pria}
							</Text>
							<Text style={{ fontFamily: "wedding", fontSize: hp(5) }}>&</Text>
							<Text className="text-[38px]" style={{ fontFamily: "wedding" }}>
								{dataQuery.data.wanita}
							</Text>
						</View>
						<View className="justify-center" style={{ marginTop: hp(18), width: "100%", paddingHorizontal: hp(2) }}>
							<View className="gap-y-3">
								<View className="items-center">
									<Text style={{ fontFamily: "outfit", fontSize: hp(2) }}>
										Oleh Pdt. <Text style={{ fontFamily: "outfit-bold" }}>{dataQuery.data.pdt.toUpperCase()}</Text>
									</Text>
									<Text style={{ fontFamily: "outfit" }}>Bertempat di {dataQuery.data.lokasi}</Text>
									<Text style={{ fontFamily: "outfit" }}>Pada,</Text>
									<View className="items-center" style={{ borderBottomWidth: 2, borderBottomColor: COLORS.PRIMARY, paddingVertical: hp(2), paddingHorizontal: wp(5), borderRadius: 10, marginTop: hp(2) }}>
										<Text style={{ fontFamily: "outfit", fontSize: hp(5) }}>{dataQuery.data.hari.toUpperCase()}</Text>
										<View className="flex-row gap-x-3" style={{ paddingVertical: hp(1) }}>
											<Text style={{ fontFamily: "outfit-bold" }}>{dataQuery.data.tanggal}</Text>
											<Text style={{ fontFamily: "outfit" }}>|</Text>
											<Text style={{ fontFamily: "outfit-bold" }}>{dataQuery.data.jam}</Text>
										</View>
									</View>
								</View>
								<View className="items-center gap-y-5" style={{ paddingTop: hp(3), paddingHorizontal: wp(4), rowGap: hp(1.5), flex: 1 }}>
									<Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>{ayat.ayat}</Text>
									<Text style={{ fontFamily: "outfit", fontSize: hp(2), textAlign: "justify", fontStyle: "italic" }}>"{ayat.desc}"</Text>
								</View>
							</View>
						</View>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

export default NikahDetail;
