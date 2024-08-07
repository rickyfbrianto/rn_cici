import { View, ScrollView, Text, FlatList, Dimensions, useWindowDimensions, Image, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Kategori } from "../constants/Constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../constants/Colors";

const KategoriFilter = () => {
	const data = [];
	Object.keys(Kategori).filter((v) => {
		if (Kategori[v].nama.toLowerCase() != "user" && Kategori[v].nama.toLowerCase() != "berita") data.push({ nama: Kategori[v].nama, link: Kategori[v].link, color: Kategori[v].color, img: Kategori[v].img });
	});

	return (
		<View style={{ marginBottom: hp(2) }}>
			<Text className="text-slate-400" style={{ fontFamily: "outfit-bold", fontSize: hp(2) }}>
				Menu
			</Text>
			<Text style={{ fontFamily: "outfit", fontSize: hp(2) }}>Kategori dibagi menjadi beberapa form</Text>
			<FlatList keyExtractor={(item, index) => index} showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ columnGap: wp(3), marginVertical: hp(2), paddingHorizontal: wp(2) }} data={data} renderItem={({ item, index }) => <KategoriItem index={index} item={item} />} />
		</View>
	);
};

const KategoriItem = ({ item, index }) => {
	return (
		<Pressable onPress={() => router.push(item.link)} className="flex justify-center items-center h-[10px] rounded-md" style={{ rowGap: 10, width: wp(35), height: hp(15), backgroundColor: "#4A5759" }}>
			<Image style={{ height: 40, width: 40 }} source={item.img} />
			<Text className="flex text-[16px] text-white" style={{ fontFamily: "outfit" }}>
				{item.nama}
			</Text>
		</Pressable>
	);
};

export default KategoriFilter;
