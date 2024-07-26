import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontAwesome, Ionicons, Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import { db } from "../../../../firebaseConfig";
import CustomKeyboard from "../../../../components/CustomKeyboard";
import { Hari } from "../../../../constants/Constant";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Divider } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import IsFetching from "../../../../components/IsFetching";

const NikahEdit = () => {
	const { id_edit } = useLocalSearchParams();
	const name = "nikah";
	// const { control, reset, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({defaultValues:{
	//     pria:null, wanita:null, hari:null, tanggal:null, jam:null, pdt:null, lokasi:null
	// }})
	const {
		control,
		reset,
		handleSubmit,
		clearErrors,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			pria: null,
			tempat_lahir_pria: null,
			tanggal_lahir_pria: null,
			gereja_pria: null,
			alamat_pria: null,
			wanita: null,
			tempat_lahir_wanita: null,
			tanggal_lahir_wanita: null,
			gereja_wanita: null,
			alamat_wanita: null,
			saksi: null,
			hari: null,
			tanggal: null,
			jam: null,
			pdt: null,
			lokasi: null,
		},
	});

	// const [DTPicker, setDTPicker] = useState({
	// 	tanggal: false,
	// 	jam: false,
	// });
	const [DTPicker, setDTPicker] = useState({
		tanggal: false,
		jam: false,
		tanggal_lahir_pria: false,
		tanggal_lahir_wanita: false,
	});

	const dataQuery = useQuery({
		queryKey: ["nikahEdit", id_edit],
		queryFn: async () => {
			const queryRef = doc(db, name, id_edit);
			const querySnap = await getDoc(queryRef);
			const data = querySnap.data();
			Object.keys(data).map((v) => setValue(v, data[v]));
			return querySnap.data();
		},
	});

	const handleUpdate = async (data) => {
		try {
			const queryRef = doc(db, name, id_edit);
			await updateDoc(queryRef, data)
				.then(() => {
					Toast.show({ type: "success", text1: "Berhasil", text2: `Jadwal ${name} berhasil diubah` });
				})
				.catch((err) => {
					Toast.show({ type: "error", text1: "Gagal", text2: err.message });
				});
		} catch (error) {
			Toast.show({ type: "error", text1: "Gagal", text2: error.message });
		}
	};

	const handleHari = (event, selectedDate) => {
		const currentDate = selectedDate || new Date();
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getUTCFullYear() + "-" + ("0" + (tempDate.getMonth() + 1)).slice(-2) + "-" + ("0" + tempDate.getDate()).slice(-2);
		let fDay = Hari[tempDate.getDay()];
		setDTPicker((prev) => ({ ...prev, tanggal: false }));
		setValue("tanggal", fDate);
		setValue("hari", fDay);
		clearErrors(["tanggal"]);
	};

	const handleTanggalLahirPria = (event, selectedDate) => {
		const currentDate = selectedDate || new Date();
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getUTCFullYear() + "-" + ("0" + (tempDate.getMonth() + 1)).slice(-2) + "-" + ("0" + tempDate.getDate()).slice(-2);
		setDTPicker((prev) => ({ ...prev, tanggal_lahir_pria: false }));
		setValue("tanggal_lahir_pria", fDate);
		clearErrors(["tanggal_lahir_pria"]);
	};

	const handleTanggalLahirWanita = (event, selectedDate) => {
		const currentDate = selectedDate || new Date();
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getUTCFullYear() + "-" + ("0" + (tempDate.getMonth() + 1)).slice(-2) + "-" + ("0" + tempDate.getDate()).slice(-2);
		setDTPicker((prev) => ({ ...prev, tanggal_lahir_wanita: false }));
		setValue("tanggal_lahir_wanita", fDate);
		clearErrors(["tanggal_lahir_wanita"]);
	};

	const handleJam = (event, selectedDate) => {
		const currentDate = selectedDate || new Date();
		let tempDate = new Date(currentDate);
		let fTime = ("0" + tempDate.getHours()).slice(-2) + "." + ("0" + tempDate.getMinutes()).slice(-2);
		setDTPicker((prev) => ({ ...prev, jam: false }));
		setValue("jam", fTime);
		clearErrors(["jam"]);
	};

	return (
		<CustomKeyboard>
			<ScrollView>
				{dataQuery.isFetching ? (
					<IsFetching />
				) : (
					<View style={{ padding: 20, rowGap: 10 }}>
						<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.4) }} className="font-bold text-neutral-500">
							Masukkan jadwal nikah
						</Text>
						<View className="border-[1.2px] border-slate-200"></View>
						<View className="py-3 px-4 bg-slate-500 rounded-md">
							<Text className="text-white">Pria</Text>
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.pria ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<Ionicons name="man-sharp" size={24} color="gray" />
							</View>
							<Controller control={control} name="pria" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Nama Pria" placeholderTextColor={"gray"} />} />
							{errors?.pria && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.tempat_lahir_pria ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								{/* <Ionicons name="man-sharp" size={24} color="gray" /> */}
								<Entypo name="location" size={24} color="gray" />
							</View>
							<Controller control={control} name="tempat_lahir_pria" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Tempat Lahir Pria" placeholderTextColor={"gray"} />} />
							{errors?.tempat_lahir_pria && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<Pressable onPress={() => setDTPicker((prev) => ({ ...prev, tanggal_lahir_pria: true }))} className={`flex flex-row bg-white items-center`} style={{ borderWidth: errors.tanggal_lahir_pria ? 2 : 0, borderColor: "red", height: hp(7), borderRadius: 15, paddingHorizontal: hp(2), columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<FontAwesome name="calendar-o" size={24} color="gray" />
							</View>
							{/* <Controller control={control} name='tanggal_lahir_pria' rules={{ required: { value: true } }} render={({ field }) => (
                        <TextInput style={{ fontSize: hp(2) }} editable={false} {...field} className="font-semibold text-neutral-500" placeholder='Hari' placeholderTextColor={'gray'} />
                    )} /> */}
							<Controller
								control={control}
								name="tanggal_lahir_pria"
								rules={{ required: { value: true } }}
								render={({ field }) => (
									<View className="flex-1">
										{DTPicker.tanggal_lahir_pria && <DateTimePicker mode="date" value={new Date()} display="default" onChange={handleTanggalLahirPria} />}
										{/* {DTPicker.tanggal_lahir_pria && <DateTimePicker mode='date' value={value} display='default' onChange={handleTanggalLahirPria} />} */}
										<TextInput style={{ fontSize: hp(2) }} value={field.value} onChangeText={(v) => field.onChange(v)} className="flex-1 w-full font-semibold text-neutral-500" placeholder="Tanggal Lahir Pria" placeholderTextColor={"gray"} />
									</View>
								)}
							/>
							{errors?.tanggal_lahir_pria && <FontAwesome name="exclamation" size={24} color="red" />}
						</Pressable>
						<View style={{ flexDirection: "row", borderWidth: errors.gereja_pria ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<MaterialCommunityIcons name="church" size={24} color="gray" />
							</View>
							<Controller control={control} name="gereja_pria" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Gereja Pria" placeholderTextColor={"gray"} />} />
							{errors?.gereja_pria && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.alamat_pria ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<AntDesign name="home" size={24} color="gray" />
							</View>
							<Controller control={control} name="alamat_pria" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Alamat Pria" placeholderTextColor={"gray"} />} />
							{errors?.alamat_pria && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>

						<View className="py-3 px-4 bg-slate-500 rounded-md">
							<Text className="text-white">Wanita</Text>
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.wanita ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<Ionicons name="woman-sharp" size={24} color="gray" />
							</View>
							<Controller control={control} name="wanita" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Nama Wanita" placeholderTextColor={"gray"} />} />
							{errors?.wanita && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.tempat_lahir_wanita ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<Entypo name="location" size={24} color="gray" />
							</View>
							<Controller control={control} name="tempat_lahir_wanita" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Tempat Lahir Wanita" placeholderTextColor={"gray"} />} />
							{errors?.tempat_lahir_wanita && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<Pressable onPress={() => setDTPicker((prev) => ({ ...prev, tanggal_lahir_wanita: true }))} className={`flex flex-row bg-white items-center`} style={{ borderWidth: errors.tanggal_lahir_wanita ? 2 : 0, borderColor: "red", height: hp(7), borderRadius: 15, paddingHorizontal: hp(2), columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<FontAwesome name="calendar-o" size={24} color="gray" />
							</View>
							<Controller
								control={control}
								name="tanggal_lahir_wanita"
								rules={{ required: { value: true } }}
								render={({ field }) => (
									<View className="flex-1">
										{DTPicker.tanggal_lahir_wanita && <DateTimePicker mode="date" value={new Date()} display="default" onChange={handleTanggalLahirWanita} />}
										<TextInput style={{ fontSize: hp(2) }} value={field.value} onChangeText={(v) => field.onChange(v)} className="flex-1 w-full font-semibold text-neutral-500" placeholder="Tanggal Lahir Wanita" placeholderTextColor={"gray"} />
									</View>
								)}
							/>
							{errors?.tanggal_lahir_wanita && <FontAwesome name="exclamation" size={24} color="red" />}
						</Pressable>
						<View style={{ flexDirection: "row", borderWidth: errors.gereja_wanita ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<MaterialCommunityIcons name="church" size={24} color="gray" />
							</View>
							<Controller control={control} name="gereja_wanita" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Gereja Wanita" placeholderTextColor={"gray"} />} />
							{errors?.gereja_wanita && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.alamat_wanita ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<AntDesign name="home" size={24} color="gray" />
							</View>
							<Controller control={control} name="alamat_wanita" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Alamat Wanita" placeholderTextColor={"gray"} />} />
							{errors?.alamat_wanita && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>

						<View className="py-3 px-4 bg-slate-500 rounded-md">
							<Text className="text-white">Event</Text>
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.saksi ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<Entypo name="eye" size={24} color="gray" />
							</View>
							<Controller control={control} name="saksi" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Saksi" placeholderTextColor={"gray"} />} />
							{errors?.saksi && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>

						<Pressable onPress={() => setDTPicker((prev) => ({ ...prev, tanggal: true }))} style={{ flexDirection: "row", borderWidth: errors.tanggal ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<FontAwesome name="calendar-o" size={24} color="gray" />
							</View>
							<Controller control={control} name="hari" rules={{ required: { value: true } }} render={({ field }) => <TextInput style={{ fontSize: hp(2) }} editable={false} {...field} className="font-semibold text-neutral-500" placeholder="Hari" placeholderTextColor={"gray"} />} />
							<Controller
								control={control}
								name="tanggal"
								rules={{ required: { value: true } }}
								render={({ field, fieldState }) => (
									<View className="flex-1">
										{DTPicker.tanggal && <DateTimePicker mode="date" value={new Date()} display="default" onChange={handleHari} />}
										<TextInput style={{ flex: 1, fontSize: hp(2) }} {...field} className="flex-1 w-full font-semibold text-neutral-500" placeholder="Tanggal" placeholderTextColor={"gray"} />
									</View>
								)}
							/>
							{errors?.tanggal && <FontAwesome name="exclamation" size={24} color="red" />}
						</Pressable>
						<Pressable onPress={() => setDTPicker((prev) => ({ ...prev, jam: true }))} style={{ flexDirection: "row", borderWidth: errors.jam ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<FontAwesome name="clock-o" size={24} color="gray" />
							</View>
							<Controller
								control={control}
								name="jam"
								rules={{ required: { value: true } }}
								render={({ field: { onChange, value } }) => (
									<View className="flex-1">
										{DTPicker.jam && <DateTimePicker mode="time" is24Hour={true} value={new Date()} display="default" onChange={handleJam} />}
										<TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Jam" placeholderTextColor={"gray"} />
									</View>
								)}
							/>
							{errors?.jam && <FontAwesome name="exclamation" size={24} color="red" />}
						</Pressable>
						<View style={{ flexDirection: "row", borderWidth: errors.pdt ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<FontAwesome name="user-o" size={24} color="gray" />
							</View>
							<Controller control={control} name="pdt" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Pendeta" placeholderTextColor={"gray"} />} />
							{errors?.pdt && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>
						<View style={{ flexDirection: "row", borderWidth: errors.lokasi ? 2 : 0, borderColor: "red", height: hp(7), backgroundColor: "white", borderRadius: 15, paddingHorizontal: hp(2), alignItems: "center", columnGap: wp(2) }}>
							<View style={{ width: wp(10), alignItems: "center" }}>
								<FontAwesome name="location-arrow" size={24} color="gray" />
							</View>
							<Controller control={control} name="lokasi" rules={{ required: { value: true } }} render={({ field: { onChange, value, onBlur } }) => <TextInput style={{ flex: 1, fontSize: hp(2) }} value={value} onBlur={onBlur} onChangeText={(val) => onChange(val)} className="flex-1 font-semibold text-neutral-500" placeholder="Lokasi" placeholderTextColor={"gray"} />} />
							{errors?.lokasi && <FontAwesome name="exclamation" size={24} color="red" />}
						</View>

						<View style={{ marginTop: hp(2) }}>
							{isSubmitting ? (
								<View style={{ flexDirection: "row", justifyContent: "center" }}>
									<ActivityIndicator size="large" color={COLORS.TEAL} />
								</View>
							) : (
								<TouchableOpacity disabled={isSubmitting} onPress={handleSubmit(handleUpdate)} style={{ justifyContent: "center", alignItems: "center", height: hp(7), backgroundColor: COLORS.TEAL, borderRadius: 15 }}>
									<Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.5) }} className="text-white font-bold tracking-wider">
										Ubah Jadwal Nikah
									</Text>
								</TouchableOpacity>
							)}
						</View>
						<Toast />
					</View>
				)}
			</ScrollView>
		</CustomKeyboard>
	);
};

export default NikahEdit;
