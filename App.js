// import { StatusBar } from "expo-status-bar";
import "./global.css";
import RootScreen from "./src/navigations/RootScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StatusBar, View } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        {Platform.OS === "android" && (
          <View
            style={{
              height: StatusBar.currentHeight,
              backgroundColor: "#030712",
            }}
          />
        )}
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <SafeAreaView className="flex-1">
          <RootScreen />
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}
