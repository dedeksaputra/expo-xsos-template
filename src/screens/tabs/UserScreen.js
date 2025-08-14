import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserScreen = () => {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    Alert.alert("Konfirmasi", "Yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          setLoading(true);
          await logout();
          setLoading(false);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View className="justify-center content-center align-middle flex-1">
      <Text className="text-center">UserScreen</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 px-6 py-3 rounded-full"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;
