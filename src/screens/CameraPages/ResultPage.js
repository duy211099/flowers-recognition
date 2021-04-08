import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button, IconButton } from "react-native-paper";
import styled from "styled-components/native";
import RNPytorch from "../../../react-native-pytorch";
// components
import ResultFlower from "../../components/ResultFlower";
import Spacer from "../../components/Spacer";

const ResultPage = ({ route, navigation }) => {
  useEffect(async () => {
    console.log("eff");
    const result = await RNPytorch.predict(route.params.filePath.uri);
    setResult((prevValue) => {
      return {
        ...prevValue,
        label: result[0].label,
        score: result[0].confidence,
      };
    });
  }, []);

  const { uri } = route.params.filePath;
  const [result, setResult] = useState({
    label: "",
    score: "",
  });

  return (
    <StyledView>
      <ImageContainer>
        <StyledImage source={{ uri: uri }} />
        <IconButton
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#ddd",
            padding: 15,
            width: 55,
            height: 55,
            borderRadius: 55,
          }}
          icon="camera-plus"
          color="#184d47"
          size={25}
          onPress={() => console.log("Pressed")}
        />
      </ImageContainer>
      {/* <Button
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
        }}
        icon="magnify"
        mode="contained"
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
      >
        Kiểm Tra
      </Button> */}

      {result.label != "" && <ResultFlower flower={result} />}
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  background-color: #ddd;
  padding: 10px;
`;

const StyledImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 10px solid white;
  border-radius: 4px;
  padding: 5px;
`;

const ImageContainer = styled.View`
  position: relative;
  height: 50%;
`;

export default ResultPage;
