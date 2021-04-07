import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
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

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(async () => {
    await RNPytorch.loadModel("model_ten_flowers.pt", "labels.txt");
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Trang chủ" component={HomePage} />
        <Tab.Screen name="Khoảnh khắc" component={MomentPage} />
        <Tab.Screen name=" " component={DemoPage} />
        <Tab.Screen name="Bộ sưu tập" component={CollectionPage} />
        <Tab.Screen name="Cài đặt" component={SettingPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
