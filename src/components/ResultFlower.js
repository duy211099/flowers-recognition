import React from "react";
import { View, Text } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import styled from "styled-components/native";

const ResultFlower = ({
  flower = {
    label: "Flower's Name",
    genus: "Genus",
    family: "Family",
    name: "Science Name",
  },
}) => {
  return (
    <StyledView>
      <Headline>{flower.label}</Headline>
      <Subheading>Chi: Genus{flower.genus}</Subheading>
      <Subheading>Họ: Family{flower.family}</Subheading>
      <Subheading>Tên khoa học: Science Name{flower.name}</Subheading>
    </StyledView>
  );
};

const StyledView = styled.View`
  background-color: white;
  padding: 10px;
  margin: 10px 0 10px 0;
  min-height: 100px;
  border-radius: 5px;
`;

export default ResultFlower;
