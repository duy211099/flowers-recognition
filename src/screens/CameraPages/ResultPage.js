import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import RNPytorch from "../../../react-native-pytorch";
// components
import ResultFlower from "../../components/ResultFlower";

const ResultPage = ({ route }) => {
  const { uri } = route.params.filePath;
  const [result, setResult] = useState({
    label: "",
    score: "",
  });

  return (
    <View>
      <Text>{uri}</Text>
      <Image source={{ uri: uri }} style={{ height: 224, width: 224 }} />
      <Button
        title="Kiểm tra"
        onPress={async () => {
          const result = await RNPytorch.predict(route.params.filePath.uri);
          setResult((prevValue) => {
            return {
              ...prevValue,
              label: result[0].label,
              score: result[0].confidence,
            };
          });
        }}
      />
      <Text
        style={{
          color: "blue",
          fontWeight: "bold",
          fontSize: 30,
        }}
      >
        {result.label} - {result.score}
      </Text>
      <ResultFlower flower={result} />
    </View>
  );
};
export default ResultPage;
