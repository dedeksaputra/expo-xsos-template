import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import FingerAuthScreen from "../screens/auth/FingerAuthScreen";
import TabsScreen from "./TabsScreen";
import { AuthContext } from "../context/AuthContext";
import FingerAuthScreenRegister from "../screens/auth/FingerAuthScreenRegister";
import { checkBiometric } from "../services/StorageService";

const Stack = createNativeStackNavigator();
const RootScreen = () => {
  const { isLogin, registerBiom, authLocal } = useContext(AuthContext);
  console.log(`screen reg locar auth ${registerBiom}`);
  let screens;
  if (isLogin) {
    if (registerBiom === null) {
      screens = (
        <Stack.Screen
          name="FingerRegister"
          component={FingerAuthScreenRegister}
          options={{ headerShown: false }}
        />
      );
    } else if (authLocal === false && registerBiom === true) {
      screens = (
        <Stack.Screen
          name="FingerAuth"
          component={FingerAuthScreen}
          options={{ headerShown: false }}
        />
      );
    } else {
      screens = (
        <Stack.Screen
          name="TabsRoot"
          component={TabsScreen}
          options={{ headerShown: false }}
        />
      );
    }
  } else {
    screens = (
      <>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  }

  return <Stack.Navigator>{screens}</Stack.Navigator>;
};

export default RootScreen;
