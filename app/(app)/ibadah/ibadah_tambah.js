import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator, ScrollView, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Entypo, Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Colors";
import { Hari } from "../../../constants/Constant";
import CustomKeyboard from "../../../components/CustomKeyboard";
import { db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Divider } from "@rneui/themed";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";

const IbadahTambah = () => {
	const form = useForm({
		defaultValues: {
			judul: null,
			hari: null,
			tanggal: null,
			jam: null,
			pdt: null,
			lokasi: null,
			wl: [{ value: "" }],
			singer: [{ value: "" }],
			musik: [{ value: "" }],
			mm: [{ value: "" }],
			protokoler: [{ value: "" }],
			tbf: [{ value: "" }],
		},
	});
	const wl = useFieldArray({ name: "wl", control: form.control });
	const singer = useFieldArray({ name: "singer", control: form.control });
	const musik = useFieldArray({ name: "musik", control: form.control });
	const mm = useFieldArray({ name: "mm", control: form.control });
	const protokoler = useFieldArray({ name: "protokoler", control: form.control });
	const tbf = useFieldArray({ name: "tbf", control: form.control });

	const [DTPicker, setDTPicker] = useState({
		tanggal: false,
		jam: false,
	});

	const handleAdd = async (data) => {
		try {
			const id_ibadah = "IBD-" + Date.now();
			await setDoc(doc(db, "ibadah", id_ibadah), data)
				.then(() => {
					form.reset();
					ToastAndroid.show("Jadwal ibadah berhasil ditambah", ToastAndroid.SHORT)
					// Toast.show({ type: "success", text1: "Berhasil", text2: "Jadwal ibadah berhasil ditambah" });
				})
				.catch((err) => {
					Toast.show({ type: "error", text1: "Gagal", text2: err.message });
				});
		} catch (error) {
			Toast.show({ type: "error", text1: "Gagal", text2: error.message });
		}
	};

	const handleHari = (event, selectedDate) => {
		try {
			const currentDate = selectedDate || new Date();
			let tempDate = new Date(currentDate);
			let fDate = tempDate.getUTCFullYear() + "-" + ("0" + (tempDate.getMonth() + 1)).slice(-2) + "-" + ("0" + tempDate.getDate()).slice(-2);
			let fDay = Hari[tempDate.getDay()];
			setDTPicker((prev) => ({ ...prev, tanggal: false }));
			form.setValue("tanggal", fDate);
			form.setValue("hari", fDay);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleJam = (event, selectedDate) => {
		try {
			const currentDate = selectedDate || new Date();
			let tempDate = new Date(currentDate);
			let fTime = ("0" + tempDate.getHours()).slice(-2) + "." + ("0" + tempDate.getMinutes()).slice(-2);
			setDTPicker((prev) => ({ ...prev, jam: false }));
			form.setValue("jam", fTime);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<CustomKeyboard>
			<ScrollView>
				<View className="flex-1" style={{ padding: 20, rowGap: 10 }}>
					<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} className="font-bold tracking-wider text-neutral-500">
						Masukkan informasi jadwal baru
					</Text>
					<Divider style={{ marginVertical: hp(2) }} />
					<View style={{ flexDirection: "row", borderWidth: form.formState.errors.judul ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
						<View style={{ width: wp(10), alignItems: "center" }}>
							<MaterialIcons name="title" size={24} color="gray" />
						</View>
						<Controller control={form.control} name="judul" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Judul Ibadah" placeholderTextColor={"gray"} />} />
						{form.formState.errors?.judul && <FontAwesome name="exclamation" size={24} color="red" />}
					</View>
					<Pressable onPress={() => setDTPicker((prev) => ({ ...prev, tanggal: true }))} style={{ flexDirection: "row", borderWidth: form.formState.errors.tanggal ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
						<View style={{ width: wp(10), alignItems: "center" }}>
							<FontAwesome name="calendar-o" size={24} color="gray" />
						</View>
						<Controller control={form.control} name="hari" rules={{ required: { value: true } }} render={({ field }) => <TextInput style={{ fontSize: hp(2) }} editable={false} {...field} className="font-semibold text-neutral-500" placeholder="Hari" placeholderTextColor={"gray"} />} />
						<Controller
							control={form.control}
							name="tanggal"
							rules={{ required: { value: true } }}
							render={({ field }) => (
								<View>
									{DTPicker.tanggal && <DateTimePicker mode="date" value={new Date()} display="default" onChange={handleHari} />}
									<TextInput style={{ fontSize: hp(2), flex: 1 }} {...field} className="flex-1 w-full font-semibold text-neutral-500" placeholder="Tanggal" placeholderTextColor={"gray"} />
								</View>
							)}
						/>
						{form.formState.errors?.tanggal && <FontAwesome name="exclamation" size={24} color="red" />}
					</Pressable>
					<Pressable onPress={() => setDTPicker((prev) => ({ ...prev, jam: true }))} style={{ flexDirection: "row", borderWidth: form.formState.errors.jam ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
						<View style={{ width: wp(10), alignItems: "center" }}>
							<FontAwesome name="clock-o" size={24} color="gray" />
						</View>
						<Controller
							control={form.control}
							name="jam"
							rules={{ required: { value: true } }}
							render={({ field: { onChange, value } }) => (
								<View>
									{DTPicker.jam && <DateTimePicker mode="time" is24Hour={true} value={new Date()} display="default" onChange={handleJam} />}
									<TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Jam" placeholderTextColor={"gray"} />
								</View>
							)}
						/>
						{form.formState.errors?.jam && <FontAwesome name="exclamation" size={24} color="red" />}
					</Pressable>
					<View style={{ flexDirection: "row", borderWidth: form.formState.errors.pdt ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
						<View style={{ width: wp(10), alignItems: "center" }}>
							<FontAwesome name="user-o" size={24} color="gray" />
						</View>
						<Controller control={form.control} name="pdt" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Pendeta" placeholderTextColor={"gray"} />} />
						{form.formState.errors?.pdt && <FontAwesome name="exclamation" size={24} color="red" />}
					</View>
					<View style={{ flexDirection: "row", borderWidth: form.formState.errors.lokasi ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
						<View style={{ width: wp(10), alignItems: "center" }}>
							<FontAwesome name="location-arrow" size={24} color="gray" />
						</View>
						<Controller control={form.control} name="lokasi" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Lokasi" placeholderTextColor={"gray"} />} />
						{form.formState.errors?.lokasi && <FontAwesome name="exclamation" size={24} color="red" />}
					</View>

					<Text>Worship Leader</Text>
					{wl.fields.map((v, index) => {
						const len = wl.fields.length - 1;
						return (
							<View key={v.id} style={{ flexDirection: "row", borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
								{/* {form.formState.errors.wl.values && <Text>Tidak</Text>} */}
								<View style={{ width: wp(10), alignItems: "center" }}>
									<MaterialCommunityIcons name="microphone-variant" size={24} color="gray" />
								</View>
								<Controller control={form.control} name={`wl.${index}.value`} rules={{ required: true }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder={`Worship Leader ${index + 1}`} placeholderTextColor={"gray"} />} />
								{index == len && (
									<TouchableOpacity
										onPress={() => {
											wl.append({ value: "" });
										}}>
										<AntDesign name="pluscircle" size={24} color="green" />
									</TouchableOpacity>
								)}
								{len > 0 && (
									<TouchableOpacity
										onPress={() => {
											wl.remove(index);
										}}>
										<AntDesign name="minuscircle" size={24} color="red" />
									</TouchableOpacity>
								)}
							</View>
						);
					})}

					<Text>Singer</Text>
					{singer.fields?.map((v, index) => {
						const len = singer.fields.length - 1;
						return (
							<View key={v.id} style={{ flexDirection: "row", borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
								<View style={{ width: wp(10), alignItems: "center" }}>
									<Entypo name="modern-mic" size={24} color="gray" />
								</View>
								<Controller control={form.control} name={`singer.${index}.value`} rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder={`Singer ${index + 1}`} placeholderTextColor={"gray"} />} />
								{index == len && (
									<TouchableOpacity
										onPress={() => {
											singer.append({ value: "" });
										}}>
										<AntDesign name="pluscircle" size={24} color="green" />
									</TouchableOpacity>
								)}
								{len > 0 && (
									<TouchableOpacity
										onPress={() => {
											singer.remove(index);
										}}>
										<AntDesign name="minuscircle" size={24} color="red" />
									</TouchableOpacity>
								)}
							</View>
						);
					})}

					<Text>Musik</Text>
					{musik.fields?.map((v, index) => {
						const len = musik.fields.length - 1;
						return (
							<View key={v.id} style={{ flexDirection: "row", borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
								<View style={{ width: wp(10), alignItems: "center" }}>
									<MaterialCommunityIcons name="music" size={24} color="gray" />
								</View>
								<Controller control={form.control} name={`musik.${index}.value`} rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder={`Musik ${index + 1}`} placeholderTextColor={"gray"} />} />
								{index == len && (
									<TouchableOpacity
										onPress={() => {
											musik.append({ value: "" });
										}}>
										<AntDesign name="pluscircle" size={24} color="green" />
									</TouchableOpacity>
								)}
								{len > 0 && (
									<TouchableOpacity
										onPress={() => {
											musik.remove(index);
										}}>
										<AntDesign name="minuscircle" size={24} color="red" />
									</TouchableOpacity>
								)}
							</View>
						);
					})}

					<Text>Multimedia</Text>
					{mm.fields?.map((v, index) => {
						const len = mm.fields.length - 1;
						return (
							<View key={v.id} style={{ flexDirection: "row", borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
								<View style={{ width: wp(10), alignItems: "center" }}>
									<Feather name="monitor" size={24} color="gray" />
								</View>
								<Controller control={form.control} name={`mm.${index}.value`} rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder={`Multimedia ${index + 1}`} placeholderTextColor={"gray"} />} />
								{index == len && (
									<TouchableOpacity
										onPress={() => {
											mm.append({ value: "" });
										}}>
										<AntDesign name="pluscircle" size={24} color="green" />
									</TouchableOpacity>
								)}
								{len > 0 && (
									<TouchableOpacity
										onPress={() => {
											mm.remove(index);
										}}>
										<AntDesign name="minuscircle" size={24} color="red" />
									</TouchableOpacity>
								)}
							</View>
						);
					})}

					<Text>Protokoler</Text>
					{protokoler.fields?.map((v, index) => {
						const len = protokoler.fields.length - 1;
						return (
							<View key={v.id} style={{ flexDirection: "row", borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
								<View style={{ width: wp(10), alignItems: "center" }}>
									<MaterialIcons name="supervised-user-circle" size={24} color="gray" />
								</View>
								<Controller control={form.control} name={`protokoler.${index}.value`} rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder={`Protokoler ${index + 1}`} placeholderTextColor={"gray"} />} />
								{index == len && (
									<TouchableOpacity
										onPress={() => {
											protokoler.append({ value: "" });
										}}>
										<AntDesign name="pluscircle" size={24} color="green" />
									</TouchableOpacity>
								)}
								{len > 0 && (
									<TouchableOpacity
										onPress={() => {
											protokoler.remove(index);
										}}>
										<AntDesign name="minuscircle" size={24} color="red" />
									</TouchableOpacity>
								)}
							</View>
						);
					})}

					<Text>TBF</Text>
					{tbf.fields?.map((v, index) => {
						const len = tbf.fields.length - 1;
						return (
							<View key={v.id} style={{ flexDirection: "row", borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
								<View style={{ width: wp(10), alignItems: "center" }}>
									<FontAwesome name="user-circle-o" size={24} color="gray" />
								</View>
								<Controller control={form.control} name={`tbf.${index}.value`} rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder={`TBF ${index + 1}`} placeholderTextColor={"gray"} />} />
								{index == len && (
									<TouchableOpacity
										onPress={() => {
											tbf.append({ value: "" });
										}}>
										<AntDesign name="pluscircle" size={24} color="green" />
									</TouchableOpacity>
								)}
								{len > 0 && (
									<TouchableOpacity
										onPress={() => {
											tbf.remove(index);
										}}>
										<AntDesign name="minuscircle" size={24} color="red" />
									</TouchableOpacity>
								)}
							</View>
						);
					})}

					<View style={{ marginTop: hp(2) }}>
						{form.formState.isSubmitting ? (
							<View style={{ flexDirection: "row", justifyContent: "center" }}>
								<ActivityIndicator size="large" color={COLORS.TEAL} />
							</View>
						) : (
							<TouchableOpacity disabled={form.formState.isSubmitting} onPress={form.handleSubmit(handleAdd)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL, borderRadius: 15 }}>
								<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.5) }} className="text-white font-bold tracking-wider">
									Buat Jadwal Ibadah
								</Text>
							</TouchableOpacity>
						)}
					</View>
					<Toast />
				</View>
			</ScrollView>
		</CustomKeyboard>
	);
};

export default IbadahTambah;
