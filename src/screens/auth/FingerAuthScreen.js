import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/AuthContext";
import { getUserPin } from "../../services/StorageService";
import * as LocalAuthentication from "expo-local-authentication";

const FingerAuthScreen = () => {
  const { setAuthActions } = useContext(AuthContext);

  const [pin, setPin] = useState();

  // const handleSkip = async () => {
  //   await saveRegisterBiometric(true);
  //   navigation.replace("Tabs");
  // };
  useEffect(() => {
    const promptScan = async () => {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan sidik jari untuk masuk",
        fallbackLabel: "Gunakan PIN",
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthActions(true);
      } else {
        Alert.alert("Error", "Sidik jari salah");
      }
    };
    promptScan();
  }, []);

  const handleScanBiom = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan sidik jari untuk masuk",
      fallbackLabel: "Gunakan PIN",
      disableDeviceFallback: false,
    });

    if (result.success) {
      setAuthActions(true);
    } else {
      Alert.alert("Error", "Sidik jari salah");
    }
  };

  const authCheckPin = async () => {
    const pinStorage = await getUserPin();
    if (pin === pinStorage) {
      setAuthActions(true);
      console.log("pin ok");
    } else {
      console.log("pin salah");
      Alert.alert("Error", "PIN salah");
    }
  };

  return (
    <View className=" flex-1  bg-blue-900">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        enableOnAndroid={true}
        extraScrollHeight={50}
        className="bg-blue-900"
      >
        <Text className="text-center text-xl text-white">
          Application is Locked.. {"\n"} Buka kunci dengan PIN atau biometric
        </Text>
        <TextInput
          onChangeText={setPin}
          placeholder="PIN"
          keyboardType="numeric"
          placeholderTextColor="#aaa"
          secureTextEntry
          className="p-3 border-2 text-center border-blue-500 bg-white text-xl rounded-full mx-10 mt-6"
        />
        <TouchableOpacity
          className="p-3 bg-blue-600 rounded-full mx-10 mt-6"
          onPress={authCheckPin}
        >
          <Text className="text-center text-white font-bold text-xl">
            Login
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <View className="justify-center self-center bottom-16 w-[70%] absolute">
        <TouchableOpacity
          className="p-3 bg-blue-600 rounded-full flex-row justify-center "
          onPress={handleScanBiom}
        >
          <Text className="text-center text-white font-bold text-xl mx-2">
            Ulangi Biometric
          </Text>
          <Icon name="fingerprint" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FingerAuthScreen;
