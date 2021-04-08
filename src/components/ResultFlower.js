import React from "react";
import { View, Text } from "react-native";

const ResultFlower = ({ flower = { label: "Flower's Name" } }) => {
  return (
    <View>
      <Text>{flower.label}</Text>
      <Text>{flower.score}</Text>
    </View>
  );
};

export default ResultFlower;
