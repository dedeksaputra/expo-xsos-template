import { View, Text } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSecureStore = true;

async function saveItem(key, value, secure = useSecureStore) {
  try {
    if (secure && SecureStore.isAvailableAsync()) {
      await SecureStore.setItemAsync(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    console.error(`error saving ${key}`, error);
  }
}

async function getItem(key, secure = useSecureStore) {
  try {
    if (secure && SecureStore.isAvailableAsync()) {
      return await SecureStore.getItemAsync(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  } catch (error) {
    console.error(`error getting ${key}`, error);
    return null;
  }
}

async function removeItem(key, secure = useSecureStore) {
  try {
    if (secure && SecureStore.isAvailableAsync()) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`error removing item ${key}`, error);
  }
}

///=============================================================

const TOKEN_KEY = "USER_TOKEN";
const USER_INFO_KEY = "USER_INFO_KEY";
const PIN_KEY = "USER_PIN";

const EMAIL_SAVED = "EMAIL_SAVED";
const BIOMETRIC_FLAG = "BIOMETRIC_FLAG";
const REGISTER_BIOMETRIC = "REGISTER_BIOMETRIC";

//email login saved memory
export const saveEmailUser = (email) => saveItem(EMAIL_SAVED, email, true);
export const getEmailUser = () => getItem(EMAIL_SAVED, true);
export const removeEmailUser = () => removeItem(EMAIL_SAVED, true);

//public api token
export const saveUserToken = (token) => saveItem(TOKEN_KEY, token, true);
export const getUserToken = () => getItem(TOKEN_KEY, true);
export const removeUserToken = () => removeItem(TOKEN_KEY, true);

//data user
export const saveUserInfo = (userInfo) =>
  saveItem(USER_INFO_KEY, JSON.stringify(userInfo), false);
export const getUserInfo = async () => {
  const json = await getItem(USER_INFO_KEY, false);
  return json ? JSON.parse(json) : null;
};
export const removeUserInfo = () => removeItem(USER_INFO_KEY, false);

//pin local auth
export const saveUserPin = (pin) => saveItem(PIN_KEY, pin, true);
export const getUserPin = () => getItem(PIN_KEY, true);
export const removeUserPin = () => removeItem(PIN_KEY, true);

//biometric flag check
export const saveBiometric = async (flag) =>
  saveItem(BIOMETRIC_FLAG, JSON.stringify(flag), false);
export const checkBiometric = async () => {
  const json = await getItem(BIOMETRIC_FLAG, false);
  return json ? JSON.parse(json) : false;
};
export const removeBiometric = async () => {
  await removeItem(BIOMETRIC_FLAG, false);
};

//register pin or biometric
export const saveRegisterBiometric = (enabled) =>
  saveItem(REGISTER_BIOMETRIC, JSON.stringify(enabled), false);
export const getRegisterBiometric = async () => {
  const value = await getItem(REGISTER_BIOMETRIC, false);
  return value !== null ? JSON.parse(value) : null;
};
export const removeRegisterBiometric = async () =>
  removeItem(REGISTER_BIOMETRIC, false);
