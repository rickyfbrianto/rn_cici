import { View, Text, SafeAreaView, Pressable, ActivityIndicator, Image, ScrollView, RefreshControl, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { COLORS } from "../../../constants/Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { router } from "expo-router";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { Kategori } from "../../../constants/Constant";

const IbadahDetail = () => {
	const { id } = useLocalSearchParams();
	const { top } = useSafeAreaInsets();
	const [refresh, setRefresh] = useState(false);
	const name = "ibadah";
	const colorBase = Kategori[name].color;

	const dataQuery = useQuery({
		queryKey: ["ibadahDetail", id],
		queryFn: async () => {
			const ref = doc(db, name, id);
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

	useFocusEffect(
		useCallback(() => {
			dataQuery.refetch();
		}, [])
	);

	return (
		<ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />} style={{ flex: 1, backgroundColor: "white" }}>
			<View style={{ backgroundColor: colorBase, flex: 1 }}>
				<SafeAreaView style={{ paddingTop: top + 10, flexDirection: "row", marginHorizontal: hp(2) }}>
					<Pressable onPress={() => router.back()}>
						<FontAwesome name="arrow-circle-left" size={28} color="white" />
					</Pressable>
				</SafeAreaView>
				{dataQuery.isLoading ? (
					<View className="flex items-center justify-center p-4">
						<Text className="text-white text-[14px] font-bold">Loading...</Text>
					</View>
				) : (
					<View className="flex-1 items-center bg-white rounded-t-[40px] pb-10" style={{ marginTop: 100 }}>
						<Image source={require("../../../assets/images/welcome.jpg")} style={{ top: hp(-10), height: hp(20), width: wp(40), resizeMode: "stretch", position: "absolute", borderRadius: 20 }} />
						<View className="w-full mt-14 px-6">
							<Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>{dataQuery.data.judul}</Text>
						</View>
						<View className="flex-1 justify-center mt-4 w-full px-4">
							<View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colorBase, columnGap: hp(2), marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
								<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
									<FontAwesome name="location-arrow" size={14} color="black" />
								</View>
								<Text style={{ fontSize: hp(1.8) }}>{dataQuery.data.lokasi}</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colorBase, columnGap: hp(2), marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
								<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
									<FontAwesome name="user" size={14} color="black" />
								</View>
								<Text style={{ fontSize: hp(1.8) }}>{dataQuery.data.pdt}</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colorBase, columnGap: hp(2), marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
								<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
									<FontAwesome name="calendar-o" size={14} color="black" />
								</View>
								<Text style={{ fontSize: hp(1.8) }}>
									{dataQuery.data.hari}, {dataQuery.data.tanggal}
								</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colorBase, columnGap: hp(2), marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
								<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
									<Feather name="clock" size={14} color="black" />
								</View>
								<Text style={{ fontSize: hp(1.8) }}>{dataQuery.data.jam}</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colorBase, columnGap: hp(2), marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
								<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
									<MaterialCommunityIcons name="seat" size={14} color="black" />
								</View>
								<Text style={{ fontSize: hp(1.8) }}>{dataQuery.data.kapasitas}</Text>
							</View>

							{/* WL */}
							{dataQuery.data.wl[0] && (
								<View style={{ borderBottomWidth: 1, borderBottomColor: colorBase, marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
									<View style={{ flexDirection: "row", marginBottom: 10, columnGap: hp(2), alignItems: "center" }}>
										<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
											<MaterialCommunityIcons name="microphone-variant" size={14} color="gray" />
										</View>
										<Text style={{ fontSize: hp(1.8) }}>Worship Leader</Text>
									</View>

									<FlatList
										scrollEnabled={false}
										data={dataQuery.data.wl}
										numColumns={2}
										contentContainerStyle={{ rowGap: 10, display: "flex" }}
										columnWrapperStyle={{ columnGap: 10 }}
										renderItem={({ item, index }) => (
											<View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "whitesmoke" }}>
												<Text>{index + 1 + ". " + item.value}</Text>
											</View>
										)}
									/>
								</View>
							)}

							{/* Singer */}
							{dataQuery.data.singer[0] && (
								<View style={{ borderBottomWidth: 1, borderBottomColor: colorBase, marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
									<View style={{ flexDirection: "row", marginBottom: 10, columnGap: hp(2), alignItems: "center" }}>
										<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
											<Entypo name="modern-mic" size={14} color="gray" />
										</View>
										<Text style={{ fontSize: hp(1.8) }}>Singer</Text>
									</View>

									<FlatList
										scrollEnabled={false}
										data={dataQuery.data.singer}
										numColumns={2}
										contentContainerStyle={{ rowGap: 10, display: "flex" }}
										columnWrapperStyle={{ columnGap: 10 }}
										renderItem={({ item, index }) => (
											<View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "whitesmoke" }}>
												<Text>{index + 1 + ". " + item.value}</Text>
											</View>
										)}
									/>
								</View>
							)}

							{/* Musik */}
							{dataQuery.data.musik[0] && (
								<View style={{ borderBottomWidth: 1, borderBottomColor: colorBase, marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
									<View style={{ flexDirection: "row", marginBottom: 10, columnGap: hp(2), alignItems: "center" }}>
										<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
											<MaterialCommunityIcons name="music" size={14} color="gray" />
										</View>
										<Text style={{ fontSize: hp(1.8) }}>Pemain Musik</Text>
									</View>

									<FlatList
										scrollEnabled={false}
										data={dataQuery.data.musik}
										numColumns={2}
										contentContainerStyle={{ rowGap: 10, display: "flex" }}
										columnWrapperStyle={{ columnGap: 10 }}
										renderItem={({ item, index }) => (
											<View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "whitesmoke" }}>
												<Text>{index + 1 + ". " + item.value}</Text>
											</View>
										)}
									/>
								</View>
							)}

							{/* MM */}
							{dataQuery.data.mm[0] && (
								<View style={{ borderBottomWidth: 1, borderBottomColor: colorBase, marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
									<View style={{ flexDirection: "row", marginBottom: 10, columnGap: hp(2), alignItems: "center" }}>
										<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
											<Feather name="monitor" size={14} color="gray" />
										</View>
										<Text style={{ fontSize: hp(1.8) }}>Multimedia</Text>
									</View>

									<FlatList
										scrollEnabled={false}
										data={dataQuery.data.mm}
										numColumns={2}
										contentContainerStyle={{ rowGap: 10, display: "flex" }}
										columnWrapperStyle={{ columnGap: 10 }}
										renderItem={({ item, index }) => (
											<View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "whitesmoke" }}>
												<Text>{index + 1 + ". " + item.value}</Text>
											</View>
										)}
									/>
								</View>
							)}

							{/* Protokoler */}
							{dataQuery.data.protokoler[0] && (
								<View style={{ borderBottomWidth: 1, borderBottomColor: colorBase, marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
									<View style={{ flexDirection: "row", marginBottom: 10, columnGap: hp(2), alignItems: "center" }}>
										<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
											<MaterialIcons name="supervised-user-circle" size={14} color="gray" />
										</View>
										<Text style={{ fontSize: hp(1.8) }}>Protokoler</Text>
									</View>

									<FlatList
										scrollEnabled={false}
										data={dataQuery.data.protokoler}
										numColumns={2}
										contentContainerStyle={{ rowGap: 10, display: "flex" }}
										columnWrapperStyle={{ columnGap: 10 }}
										renderItem={({ item, index }) => (
											<View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "whitesmoke" }}>
												<Text>{index + 1 + ". " + item.value}</Text>
											</View>
										)}
									/>
								</View>
							)}

							{/* TBF */}
							{dataQuery.data.tbf[0] && (
								<View style={{ borderBottomWidth: 1, borderBottomColor: colorBase, marginHorizontal: hp(1), paddingHorizontal: hp(1), paddingVertical: hp(1.4) }}>
									<View style={{ flexDirection: "row", marginBottom: 10, columnGap: hp(2), alignItems: "center" }}>
										<View style={{ flexDirection: "row", justifyContent: "center", width: 30 }}>
											<FontAwesome name="user-circle-o" size={14} color="gray" />
										</View>
										<Text style={{ fontSize: hp(1.8) }}>TBF</Text>
									</View>

									<FlatList
										scrollEnabled={false}
										data={dataQuery.data.tbf}
										numColumns={2}
										contentContainerStyle={{ rowGap: 10, display: "flex" }}
										columnWrapperStyle={{ columnGap: 10 }}
										renderItem={({ item, index }) => (
											<View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "whitesmoke" }}>
												<Text>{index + 1 + ". " + item.value}</Text>
											</View>
										)}
									/>
								</View>
							)}
						</View>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

export default IbadahDetail;
