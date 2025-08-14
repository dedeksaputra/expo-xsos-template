import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  saveRegisterBiometric,
  saveUserPin,
} from "../../services/StorageService";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../../context/AuthContext";

const FingerAuthScreenRegister = () => {
  const { skipRegisterAuthLocal, registerLocalAuth } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const [pin, setPin] = useState("");

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleSkip = async () => {
    setShowModal(false);
    // Lewati proses biometric
    await skipRegisterAuthLocal();
    console.log("Lewati biometric");
  };

  const handleEnable = () => {
    setShowModal(false);
    // Lakukan proses aktifkan biometric
    // saveRegisterBiometric(true);
    console.log("tahap register");
  };

  const handleRequestScanBiometric = async () => {
    if (!pin) {
      Alert.alert("Error", "PIN tidak boleh kosong");
      return;
    }

    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert("Error", "Perangkat tidak mendukung biometric");
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert("Error", "Tidak ada sidik jari terdaftar di perangkat");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan sidik jari untuk verifikasi",
      fallbackLabel: "Gunakan PIN",
      disableDeviceFallback: false,
    });

    if (!result.success) {
      Alert.alert("Gagal", "Verifikasi sidik jari gagal");
      return;
    }

    //this scane finger ketika success simpan pin dan status register true

    // await saveUserPin(pin);
    await registerLocalAuth(pin, true);
    Alert.alert("Sukses", "PIN dan status biometric disimpan");
  };

  return (
    <View className=" flex-1  bg-blue-900">
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        {/* Overlay */}
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-lg font-bold text-center mb-4">
              Konfirmasi Aktivasi Biometrik
            </Text>
            <TouchableOpacity
              className="p-3 bg-blue-600 rounded-full mb-3"
              onPress={() => handleEnable()}
            >
              <Text className="text-white text-center font-bold">
                Ya, Lanjut
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-3 bg-gray-400 rounded-full"
              onPress={handleSkip}
            >
              <Text className="text-white text-center font-bold">Nanti</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        enableOnAndroid={true}
        extraScrollHeight={50}
        className="bg-blue-900"
      >
        <Text className="text-center text-xl text-white">Buat Pin Baru</Text>
        <TextInput
          onChangeText={setPin}
          keyboardType="numeric"
          placeholder="NEW PIN"
          placeholderTextColor="#aaa"
          secureTextEntry
          className="p-3 border-2 text-center border-blue-500 bg-white text-xl rounded-full mx-10 mt-6"
        />
        <TouchableOpacity
          className="p-3 bg-blue-600 rounded-full mx-10 mt-6"
          onPress={() => handleRequestScanBiometric()}
        >
          <Text className="text-center text-white font-bold text-xl">
            Daftarkan Biometric
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FingerAuthScreenRegister;
