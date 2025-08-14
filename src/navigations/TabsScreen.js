import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabs/HomeScreen";
import UserScreen from "../screens/tabs/UserScreen";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const TabsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={UserScreen}
        name="User"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsScreen;
