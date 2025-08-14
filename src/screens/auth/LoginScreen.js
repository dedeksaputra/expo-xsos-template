import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import * as qs from "qs";
import {
  getEmailUser,
  removeEmailUser,
  saveEmailUser,
  saveUserInfo,
  saveUserToken,
} from "../../services/StorageService";
import api from "../../api/axiosInstance";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [emailLocked, setEmailLocked] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  useEffect(() => {
    const loadSavedEmail = async () => {
      const email = await getEmailUser();
      if (email) {
        setSavedEmail(email);
        setEmailLocked(true);
      }
    };
    loadSavedEmail();
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const data = qs.stringify({
        login: values.email,
        password: values.password,
      });
      const res = await api.post("/api/auth/login", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (res.data.status === "success") {
        const { token, user } = res.data;
        await saveUserToken(token);
        await saveUserInfo(user);
        await saveEmailUser(values.email);
        login();
        console.log(token);
      } else {
        const msg =
          typeof res.data.message === "string"
            ? res.data.message
            : Object.values(res.data.message)[0] || "Login gagal.";
        Alert.alert("Gagal", msg);
      }
    } catch (err) {
      console.error(`gagal login ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Minimal 6 karakter")
      .required("Password wajib diisi"),
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={50}
      className="bg-slate-900"
    >
      <View className="mt-14 items-center">
        <Image
          source={require("../../../assets/hero2.png")}
          className="w-60 h-60 rounded-xl "
        />
      </View>
      <Text className="text-lime-50 font-semibold text-4xl text-center mb-10 underline">
        Login
      </Text>
      <Formik
        initialValues={{ email: savedEmail, password: "" }}
        enableReinitialize
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {!emailLocked ? (
              <>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  className="p-3 border-2 border-blue-500 bg-white text-lg rounded-full mx-10 "
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text className="text-red-500  mx-12">{errors.email}</Text>
                )}
              </>
            ) : (
              <>
                <Text className="text-white mx-10 mb-4 text-center">
                  Masuk sebagai: {values.email}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("email", "");
                    setSavedEmail("");
                    setEmailLocked(false);
                    removeEmailUser();
                  }}
                >
                  <Text className="text-blue-400 text-center underline mt-2">
                    Ganti Akun
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              className="p-3 border-2 border-blue-500 bg-white text-lg rounded-full mx-10 mt-6"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text className="text-red-500 mx-12">{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              // onPress={() => navigation.replace("TabsRoot")}
              className="p-3 bg-blue-600 rounded-full mx-10 mt-6"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-center text-white font-bold text-xl">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View className="flex-row mx-10 mt-10 justify-center">
        <Text className="text-slate-400">Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-blue-500 mx-2 font-bold text-xl">Daftar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
