import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
// screens
import HomePage from "./src/screens/HomePage";
import IntroPage from "./src/screens/IntroPage";
import CameraPage from "./src/screens/CameraPages/CameraPage";
import CollectionPage from "./src/screens/CollectionPage";
import MomentPage from "./src/screens/MomentPage";
import SettingPage from "./src/screens/SettingPage";
import ResultPage from "./src/screens/CameraPages/ResultPage";
// model
import RNPytorch from "./react-native-pytorch";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Intro"
        component={IntroPage}
        options={{
          title: "Giới thiệu",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraPage}
        options={{
          title: " ",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                position: "absolute",
                height: 70,
                width: 70,
                borderRadius: 58,
                backgroundColor: `${focused ? "#5a94ff" : color}`,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 10,
                borderColor: "white",
              }}
            >
              <MaterialCommunityIcons name="camera" color="white" size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingPage}
        options={{
          title: "Bộ sưu tập",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="database" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(async () => {
    await RNPytorch.loadModel("model_ten_flowers.pt", "labels.txt");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name=" "
          component={HomeTab}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="Result"
          component={ResultPage}
          options={{
            title: "Kết quả",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
