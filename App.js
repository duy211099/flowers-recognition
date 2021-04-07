import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
// screens
import HomePage from "./src/screens/HomePage";
import DemoPage from "./src/screens/DemoPage";
import CollectionPage from "./src/screens/CollectionPage";
import MomentPage from "./src/screens/MomentPage";
import SettingPage from "./src/screens/SettingPage";
// model
import RNPytorch from "./react-native-pytorch";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(async () => {
    await RNPytorch.loadModel("model_ten_flowers.pt", "labels.txt");
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Trang chủ"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Khoảnh khắc"
          component={MomentPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="image-multiple"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name=" "
          component={DemoPage}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  position: "absolute",
                  height: 70,
                  width: 70,
                  borderRadius: 58,
                  backgroundColor: `${focused ? "#5a94ff" : "#76a6ff"}`,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 10,
                  borderColor: "white",
                }}
              >
                <MaterialCommunityIcons
                  name="camera"
                  color="white"
                  size={size}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Bộ sưu tập"
          component={CollectionPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="database"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cài đặt"
          component={SettingPage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
