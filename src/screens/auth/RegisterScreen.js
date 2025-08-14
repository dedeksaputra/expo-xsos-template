import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username wajib diisi"),
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Minimal 6 karakter")
      .required("Password wajib diisi"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password tidak sama")
      .required("Konfirmasi password wajib diisi"),
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={50}
      className="bg-slate-900"
    >
      <View className="mt-3 items-center">
        <Image
          source={require("../../../assets/hero2.png")}
          className="w-48 h-48 rounded-xl "
        />
      </View>
      <Text className="text-lime-50 font-semibold text-4xl text-center mb-10 underline">
        Register
      </Text>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          console.log("Register Data:", values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#aaa"
              className="p-3 border-2 border-blue-500 bg-white text-lg rounded-full mx-10 "
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text className="text-red-500  mx-12">{errors.username}</Text>
            )}
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              className="p-3 border-2 border-blue-500 bg-white text-lg rounded-full mx-10  mt-6"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text className="text-red-500  mx-12">{errors.email}</Text>
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

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              className="p-3 border-2 border-blue-500 bg-white text-lg rounded-full mx-10 mt-6"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text className="text-red-500 mx-12">
                {errors.confirmPassword}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              className="p-3 bg-blue-600 rounded-full mx-10 mt-6"
            >
              <Text className="text-center text-white font-bold text-xl">
                Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View className="flex-row mx-10 mt-10 justify-center mb-20">
        <Text className="text-slate-400">Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-blue-500 mx-2 font-bold text-xl">Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
