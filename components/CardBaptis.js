import { View, Text, Image, Pressable, SectionList, ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../constants/Colors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ConvertDataToSection, addWeeks, getYearMonthDay } from "../constants/Function";
import { baptisCol, db } from "../firebaseConfig";
import { deleteDoc, doc, endAt, getDocs, orderBy, query, startAt } from "firebase/firestore";
import { router } from "expo-router";
import { Kategori } from "../constants/Constant";
import { Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { useAuth } from "../context/authContext";
import { Popup } from "react-native-popup-confirm-toast";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native";
import IsFetching from "./IsFetching";

const name = "baptis";

const CardBaptis = ({ style, batas, showControl = false }) => {
	const [refresh, setRefresh] = useState(false);
	const colorBase = Kategori[name].color;
	const tanggal = getYearMonthDay(new Date());

	const dataQuery = useQuery({
		queryKey: ["baptisList"],
		queryFn: async () => {
			// const queryRef = query(baptisCol, orderBy("tanggal"), startAt(tanggal), endAt(getYearMonthDay(addWeeks(new Date(), 1))));
			const queryRef = query(baptisCol, orderBy("tanggal"), startAt(tanggal));
			const querySnap = await getDocs(queryRef);
			let temp = [];
			querySnap.forEach((v) => {
				temp.push({ ...v.data(), id: v?.id });
			});
			return temp;
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
		<View style={{ flex: 1 }}>
			{dataQuery.isFetching ? (
				<IsFetching />
			) : (
				<>
					{dataQuery.data.length > 0 ? (
						<SectionList
							sections={ConvertDataToSection({ val: dataQuery.data, sort: "jam" })}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item, index) => item + index}
							refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}
							renderItem={({ item }) => <CardItem item={item} showControl={showControl} />}
							renderSectionHeader={({ section }) => (
								<View className="flex-row justify-start items-end mt-3 p-3 rounded-2xl" style={{ backgroundColor: colorBase, borderRadius: 10, ...style }}>
									<View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
										<Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>
											{section.tanggal.split(", ")[0]}
										</Text>
										<Text className={`text-white`} style={{ fontFamily: "outfit", fontSize: hp(2) }}>
											{section.tanggal.split(", ")[1]}
										</Text>
									</View>
								</View>
							)}
						/>
					) : (
						<View className="flex items-center py-2">
							<Text style={{ fontFamily: "outfit", fontSize: hp(2) }}>Tidak ada jadwal {name}</Text>
							<TouchableOpacity style={{ backgroundColor: COLORS.PRIMARY }} className="mt-2 flex flex-row gap-x-2 items-center justify-center p-4 bg-slate-700 rounded-lg" onPress={handleRefresh}>
								<Text className="text-white">Refresh</Text>
								<Ionicons name="refresh" size={18} color="white" />
							</TouchableOpacity>
						</View>
					)}
				</>
			)}
		</View>
	);
};

const CardItem = ({ item, showControl }) => {
	const swipeRef = useRef();
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const ref = doc(db, `${name}/${item.id}`);

	const handleDelete = async () => {
		Popup.show({
			type: "confirm",
			title: "Hapus",
			textBody: `Hapus jadwal ${name}?`,
			confirmText: "Batal",
			buttonText: "Hapus",
			callback: () => {
				deleteDoc(ref).then(() => queryClient.invalidateQueries("baptisList"));
				Popup.hide();
			},
			cancelCallback: () => Popup.hide(),
		});
	};

	const handleEdit = async () => {
		router.replace(`${name}/edit/${item.id}`);
	};

	const LeftSwipe = () => {
		return (
			<>
				{user && user?.level == "admin" && showControl && (
					<View style={{ justifyContent: "center", marginEnd: 10 }}>
						<View style={{ flexDirection: "row", columnGap: 10, width: 100, height: 50, marginVertical: 8 }}>
							<Pressable style={{ ...styles.leftButtonAction, backgroundColor: "#f5e960" }} onPress={() => handleEdit(item.id)}>
								<AntDesign name="edit" size={16} color="blue" />
							</Pressable>
							<Pressable style={{ ...styles.leftButtonAction, backgroundColor: "indianred" }} onPress={() => handleDelete(item.id)}>
								<AntDesign name="delete" size={16} color="white" />
							</Pressable>
						</View>
					</View>
				)}
			</>
		);
	};

	return (
		<Swipeable ref={swipeRef} renderLeftActions={LeftSwipe}>
			<Pressable onPress={() => router.push(`${name}/${item.id}`)} key={item.id} style={{ position: "relative" }} className="flex-row items-center my-2 bg-white p-3 rounded-xl">
				<Image style={{ height: 75, width: 75 }} source={require("../assets/images/icon.png")} />
				<View className="ml-4">
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.6) }}>{item.judul}</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center", columnGap: wp(2) }}>
						<AntDesign name="user" size={hp(1.7)} color="black" />
						<Text style={{ fontFamily: "outfit", fontSize: hp(2) }}>Pdt. {item.pdt}</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center", columnGap: wp(2) }}>
						<Octicons name="clock" size={hp(1.7)} color="black" />
						<Text style={{ fontFamily: "outfit", fontSize: hp(1.7) }}>{item.jam}</Text>
					</View>
				</View>
			</Pressable>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	leftButtonAction: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		borderRadius: 10,
	},
});

export default CardBaptis;
