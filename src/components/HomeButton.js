import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
const logo = require("../images/logo.png");

const HomeButton = ({ title = "TITLE", flexGrow = 0 }) => {
  const Background = styled.View`
    background-color: #bfcba8;
    padding: 20px;
    margin: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    height: 100px;
    justify-content: space-between;
    flex-grow: ${flexGrow};
  `;

  return (
    <Background>
      <Icon source={logo} />
      <Heading>{title}</Heading>
    </Background>
  );
};

const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

const Heading = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #464f41;
`;

export default HomeButton;
