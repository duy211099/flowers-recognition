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

function CameraStack() {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Camera" component={CameraPage} />
      <Stack.Screen name="Result" component={ResultPage} />
    </Stack.Navigator>
  );
}

const App = () => {
  useEffect(async () => {
    await RNPytorch.loadModel("model_ten_flowers.pt", "labels.txt");
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Giới thiệu"
          component={IntroPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name=" "
          component={CameraStack}
          options={{
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
