import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import {
  checkBiometric,
  getRegisterBiometric,
  getUserInfo,
  getUserPin,
  getUserToken,
  removeRegisterBiometric,
  removeUserInfo,
  removeUserPin,
  removeUserToken,
  saveRegisterBiometric,
  saveUserPin,
} from "../services/StorageService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLogin: false,
    user: null,
    loading: true,
  });

  const [authLocal, setAuthLocal] = useState(false);

  const [registerBiom, setRegisterBiom] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      setAuthLocal(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const authLocalCheck = async () => {
      const sttsR = await getRegisterBiometric();
      setRegisterBiom(sttsR);
      const stts = await checkBiometric();
      setAuthLocal(stts);
      console.log(`status local auth ${stts}`);
    };
    authLocalCheck();
  }, []);

  const skipRegisterAuthLocal = async () => {
    await saveRegisterBiometric(false);
    setRegisterBiom(false);
    setAuthLocal(false);
  };

  const setAuthActions = (auth) => {
    setAuthLocal(auth);
  };

  const registerLocalAuth = async (pin, biomEnable) => {
    await saveUserPin(pin);
    await saveRegisterBiometric(biomEnable);
    setRegisterBiom(biomEnable);
    setAuthLocal(true);
  };

  useEffect(() => {
    const validateUser = async () => {
      const token = await getUserToken();
      const userData = await getUserInfo();
      if (token && userData) {
        setAuthState({
          isLogin: true,
          user: userData,
          loading: false,
        });
      } else {
        setAuthState({
          isLogin: false,
          user: null,
          loading: false,
        });
      }
    };
    validateUser();
  }, []);

  const login = async () => {
    const token = await getUserToken();
    const userData = await getUserInfo();
    if (token && userData) {
      setAuthState({
        isLogin: true,
        user: userData,
        loading: false,
      });
    } else {
      setAuthState({
        isLogin: false,
        user: null,
        loading: false,
      });
    }
  };

  const logout = async () => {
    await removeUserInfo();
    await removeUserPin();
    await removeUserToken();
    await removeRegisterBiometric();
    setAuthLocal(false);
    setRegisterBiom(null);

    setAuthState({
      isLogin: false,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin: authState.isLogin,
        login,
        logout,
        registerBiom,
        authLocal,
        setAuthActions,
        registerLocalAuth,
        skipRegisterAuthLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
