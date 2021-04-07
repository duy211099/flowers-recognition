import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
// screens
import HomePage from "./src/screens/HomePage";
import DemoPage from "./src/screens/DemoPage";
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
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="Demo" component={DemoPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
